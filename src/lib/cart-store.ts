import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  itemId: number;
  slug: string;
  name: string;
  priceCents: number;
  imagePath: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  add: (item: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (itemId: number, qty: number) => void;
  remove: (itemId: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (item, qty = 1) =>
        set((state) => {
          const existing = state.lines.find((line) => line.itemId === item.itemId);
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.itemId === item.itemId
                  ? { ...line, qty: Math.min(200, line.qty + qty) }
                  : line,
              ),
            };
          }
          return { lines: [...state.lines, { ...item, qty }] };
        }),
      setQty: (itemId, qty) =>
        set((state) => ({
          lines:
            qty < 1
              ? state.lines.filter((line) => line.itemId !== itemId)
              : state.lines.map((line) =>
                  line.itemId === itemId ? { ...line, qty } : line,
                ),
        })),
      remove: (itemId) =>
        set((state) => ({
          lines: state.lines.filter((line) => line.itemId !== itemId),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "gabriel-bakery-cart" },
  ),
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.qty * line.priceCents, 0);
}

/** Avoid SSR/localStorage mismatch for the persisted cart. */
export function useHydratedCart() {
  const lines = useCart((s) => s.lines);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return { lines: hydrated ? lines : [], hydrated };
}
