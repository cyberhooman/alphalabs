import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

const morphingSquareVariants = cva("flex items-center justify-center gap-3", {
  variants: {
    messagePlacement: {
      bottom: "flex-col",
      top: "flex-col-reverse",
      right: "flex-row",
      left: "flex-row-reverse",
    },
  },
  defaultVariants: {
    messagePlacement: "bottom",
  },
});

export interface MorphingSquareProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof morphingSquareVariants> {
  message?: string;
}

const MorphingSquare = React.forwardRef<HTMLDivElement, MorphingSquareProps>(
  (
    { className, message, messagePlacement = "bottom", ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(morphingSquareVariants({ messagePlacement }))}
      >
        <motion.div
          className={cn("h-12 w-12 rounded-md bg-foreground", className)}
          animate={{
            borderRadius: ["12%", "50%", "12%"],
            rotate: [0, 180, 360],
            scale: [1, 0.85, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          {...props}
        />
        {message && (
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-foreground">
            {message}
          </span>
        )}
      </div>
    );
  },
);

MorphingSquare.displayName = "MorphingSquare";

export { MorphingSquare };

