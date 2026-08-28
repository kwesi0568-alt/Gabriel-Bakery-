import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetPortal = DialogPrimitive.Portal;

export const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-fg/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: "right" | "left";
  }
>(({ className, children, side = "right", ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex h-full w-full max-w-md flex-col bg-surface text-fg shadow-[var(--shadow-border-hover)] transition ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-150 data-[state=open]:duration-250",
        side === "right" &&
          "inset-y-0 right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        side === "left" &&
          "inset-y-0 left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4 grid size-11 place-items-center rounded-md text-muted transition-colors hover:bg-secondary hover:text-fg focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none">
        <X className="size-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = DialogPrimitive.Content.displayName;

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("border-b border-border px-6 py-5 pr-14", className)}
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-2xl font-medium", className)}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("mt-1 text-sm text-muted", className)}
      {...props}
    />
  );
}
