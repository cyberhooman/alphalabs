import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, type = "button", ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "group relative inline-flex w-48 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-background px-6 py-3 text-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex w-full items-center justify-center transition-transform duration-300 group-hover:translate-x-full group-hover:opacity-0 group-focus:translate-x-full group-focus:opacity-0 group-focus-visible:translate-x-full group-focus-visible:opacity-0 group-active:translate-x-full group-active:opacity-0">
        {text}
      </span>
      <div className="pointer-events-none absolute inset-0 z-10 flex translate-x-full items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-active:translate-x-0 group-active:opacity-100">
        <span>{text}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
      <div
        className="pointer-events-none absolute left-[20%] top-[40%] z-0 h-2 w-2 scale-[1] rounded-lg bg-primary/80 opacity-0 transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary/80 group-hover:opacity-100"
        aria-hidden="true"
      ></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
