import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRow({
  value,
  size = "sm",
  className,
}: {
  value: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const icon = size === "md" ? "size-5" : "size-3.5";
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = value >= i + 1;
        const half = !filled && value >= i + 0.5;
        return (
          <Star
            key={i}
            className={cn(
              icon,
              filled || half ? "fill-primary text-primary" : "text-border",
            )}
          />
        );
      })}
    </span>
  );
}

export function StarPicker({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (stars: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {Array.from({ length: 5 }, (_, i) => {
        const stars = i + 1;
        const selected = value >= stars;
        return (
          <button
            key={stars}
            type="button"
            role="radio"
            aria-checked={value === stars}
            aria-label={`${stars} star${stars === 1 ? "" : "s"}`}
            disabled={disabled}
            onClick={() => onChange(stars)}
            className="grid size-11 place-items-center rounded-md transition-colors hover:bg-secondary disabled:opacity-50"
          >
            <Star
              className={cn(
                "size-6",
                selected ? "fill-primary text-primary" : "text-border",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
