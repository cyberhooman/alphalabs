import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  className?: string;
  animateOnLoad?: boolean;
  wrapperClassName?: string;
}

const defaultFramerProps: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 3 },
};

const HyperText = React.forwardRef<HTMLSpanElement, HyperTextProps>(
  (
    {
      text,
      duration = 800,
      framerProps = defaultFramerProps,
      className,
      animateOnLoad = true,
      wrapperClassName,
    },
    ref,
  ) => {
    const [displayText, setDisplayText] = useState(() => text.split(""));
    const [trigger, setTrigger] = useState(false);
    const iterations = useRef(0);
    const isFirstRender = useRef(true);

    const triggerAnimation = () => {
      iterations.current = 0;
      setTrigger(true);
    };

    useEffect(() => {
      setDisplayText(text.split(""));
    }, [text]);

    useEffect(() => {
      const interval = setInterval(() => {
        if (!animateOnLoad && isFirstRender.current) {
          clearInterval(interval);
          isFirstRender.current = false;
          return;
        }

        if (iterations.current < text.length) {
          setDisplayText((prev) =>
            prev.map((letter, idx) =>
              letter === " "
                ? letter
                : idx <= iterations.current
                  ? text[idx]
                  : alphabets[getRandomInt(26)],
            ),
          );

          iterations.current = iterations.current + 0.1;
        } else {
          setTrigger(false);
          clearInterval(interval);
          isFirstRender.current = false;
        }
      }, duration / (text.length * 10));

      return () => clearInterval(interval);
    }, [text, duration, trigger, animateOnLoad]);

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex scale-100 cursor-default select-none overflow-hidden py-2",
          wrapperClassName,
        )}
        onMouseEnter={triggerAnimation}
      >
        <AnimatePresence mode="wait">
          {displayText.map((letter, idx) => (
            <motion.span
              key={idx}
              className={cn(
                "font-mono",
                letter === " " ? "w-3" : "",
                className,
              )}
              {...framerProps}
            >
              {letter.toUpperCase()}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
    );
  },
);

HyperText.displayName = "HyperText";

export { HyperText };
