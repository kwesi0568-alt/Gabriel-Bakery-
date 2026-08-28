import { CreditCard } from "lucide-react";
import { brandLabel, cardBrand, formatCardNumber, formatExpiry } from "@/lib/payment";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type CardDraft = {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
};

export function CardFields({
  value,
  onChange,
  disabled,
}: {
  value: CardDraft;
  onChange: (next: CardDraft) => void;
  disabled?: boolean;
}) {
  const brand = cardBrand(value.number);
  const brandText = value.number.trim() ? brandLabel(brand) : "Card";

  return (
    <div className="space-y-4 rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-medium">
          <CreditCard className="size-4" />
          Pay with card
        </p>
        <span className="text-xs text-muted">{brandText}</span>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="card-name">Name on card</Label>
        <Input
          id="card-name"
          autoComplete="cc-name"
          disabled={disabled}
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="card-number">Card number</Label>
        <Input
          id="card-number"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="ACCT-000015"
          disabled={disabled}
          value={value.number}
          onChange={(e) =>
            onChange({ ...value, number: formatCardNumber(e.target.value) })
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="card-expiry">Expiry</Label>
          <Input
            id="card-expiry"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            disabled={disabled}
            value={value.expiry}
            onChange={(e) =>
              onChange({ ...value, expiry: formatExpiry(e.target.value) })
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="card-cvc">CVC</Label>
          <Input
            id="card-cvc"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            disabled={disabled}
            value={value.cvc}
            onChange={(e) =>
              onChange({
                ...value,
                cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
              })
            }
          />
        </div>
      </div>
      <p className="text-xs text-muted">
        We never store the full card number. Use 4242 4242 4242 4242 to try a
        test payment.
      </p>
    </div>
  );
}
