export const BAKERY = {
  name: "Gabriel Bakery",
  tagline: "Bread, pastry, and the long rise",
  founder: "Gabriel Atta",
  founded: 2014,
  address: "United Arab Emirates",
  city: "",
  phone: "+971 543 191697",
  email: "gatta9707@gmail.com",
  hours: [
    { day: "Tuesday – Friday", time: "7:00 – 5:00" },
    { day: "Saturday", time: "8:00 – 5:00" },
    { day: "Sunday", time: "8:00 – 2:00" },
    { day: "Monday", time: "Closed" },
  ],
} as const;

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "bread", label: "Bread" },
  { id: "pastry", label: "Pastry" },
  { id: "cake", label: "Cakes" },
  { id: "savory", label: "Savory" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type MenuItem = {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  priceCents: number;
  imagePath: string;
  featured: boolean;
  serves: string | null;
  allergens: string | null;
  sortOrder: number;
  avgStars: number | null;
  ratingCount: number;
};

export type Rating = {
  id: number;
  stars: number;
  comment: string | null;
  createdAt: string;
  isMine?: boolean;
};

export type OrderKind = "pickup" | "bulk" | "catering";
export type PaymentMethod = "online" | "pickup";
export type PaymentStatus = "paid" | "pay_at_pickup";

export type OrderSummary = {
  id: number;
  kind: OrderKind;
  status: string;
  eventDate: string | null;
  eventTime: string | null;
  guestCount: number | null;
  notes: string | null;
  createdAt: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paidCents: number | null;
  cardLast4: string | null;
  cardBrand: string | null;
  items: { name: string; quantity: number; unitPriceCents: number }[];
};

