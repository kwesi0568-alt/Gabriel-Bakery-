export type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "card";

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function formatCardNumber(value: string) {
  const digits = digitsOnly(value).slice(0, 19);
  if (cardBrand(digits) === "amex") {
    return digits.replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(" "),
    );
  }
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatExpiry(value: string) {
  const digits = digitsOnly(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function cardBrand(number: string): CardBrand {
  const d = digitsOnly(number);
  if (/^4/.test(d)) return "visa";
  if (/^3[47]/.test(d)) return "amex";
  if (/^(5[1-5]|2[2-7])/.test(d)) return "mastercard";
  if (/^(6011|65|64[4-9])/.test(d)) return "discover";
  return "card";
}

export function brandLabel(brand: CardBrand) {
  if (brand === "visa") return "Visa";
  if (brand === "mastercard") return "Mastercard";
  if (brand === "amex") return "Amex";
  if (brand === "discover") return "Discover";
  return "Card";
}

export function luhnValid(number: string) {
  const digits = digitsOnly(number);
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i]);
    if (Number.isNaN(n)) return false;
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export function parseExpiry(value: string): { month: number; year: number } | null {
  const digits = digitsOnly(value);
  if (digits.length !== 4) return null;
  const month = Number(digits.slice(0, 2));
  const year = 2000 + Number(digits.slice(2));
  if (month < 1 || month > 12 || year < 2000) return null;
  return { month, year };
}

export function expiryValid(value: string, now = new Date()) {
  const parsed = parseExpiry(value);
  if (!parsed) return false;
  const lastDay = new Date(parsed.year, parsed.month, 0, 23, 59, 59);
  return lastDay >= now;
}

const DECLINED_TEST_CARDS = new Set(["4000000000000002", "4000000000009995"]);

export type ChargeInput = {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
};

export type ChargeResult =
  | { ok: true; last4: string; brand: CardBrand }
  | { ok: false; error: string };

/** Validates and tokenizes a card. Never keep the PAN or CVC. */
export function chargeCard(input: ChargeInput): ChargeResult {
  const name = input.name.trim();
  if (name.length < 2) return { ok: false, error: "Name on the card is required." };

  const number = digitsOnly(input.number);
  const brand = cardBrand(number);
  const expectedLen = brand === "amex" ? 15 : 16;
  if (number.length < 13 || number.length > 19) {
    return { ok: false, error: "Enter a valid card number." };
  }
  if (brand !== "card" && number.length !== expectedLen && number.length < 15) {
    return { ok: false, error: "Enter a valid card number." };
  }
  if (!luhnValid(number)) {
    return { ok: false, error: "That card number doesn’t look right." };
  }
  if (!expiryValid(input.expiry)) {
    return { ok: false, error: "That expiry date is invalid or has passed." };
  }
  const cvc = digitsOnly(input.cvc);
  const cvcLen = brand === "amex" ? 4 : 3;
  if (cvc.length < 3 || cvc.length > 4 || (brand !== "card" && cvc.length !== cvcLen)) {
    return { ok: false, error: "Enter the security code from the card." };
  }
  if (DECLINED_TEST_CARDS.has(number)) {
    return { ok: false, error: "The card was declined. Try another card or pay at pickup." };
  }
  return { ok: true, last4: number.slice(-4), brand };
}
