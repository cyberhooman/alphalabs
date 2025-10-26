import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type TypingAnimationProps = {
  text: string;
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export const TypingAnimation = ({
  text,
  duration = 60,
  className,
  as = 'span'
}: TypingAnimationProps) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayed('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (!text) {
      setDisplayed('');
      return;
    }

    if (index > text.length) {
      return;
    }

    if (index === text.length) {
      setDisplayed(text);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, index + 1));
      setIndex((prev) => prev + 1);
    }, duration);

    return () => clearTimeout(timeout);
  }, [index, duration, text]);

  const Component = as;

  return (
    <Component className={cn('inline-block', className)} aria-label={text}>
      {displayed || text}
    </Component>
  );
};
