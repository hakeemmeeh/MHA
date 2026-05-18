"use client";

/**
 * Magic UI–style animated list (sequenced items with spring motion).
 * @see https://magicui.design/docs/components/animated-list
 * Uses `framer-motion` (project dependency); Magic registry uses `motion/react`.
 */
import React, {
  startTransition,
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const listItemMotion: Pick<HTMLMotionProps<"li">, "initial" | "animate" | "exit" | "transition"> = {
  initial: { scale: 0.96, opacity: 0, y: 10 },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.96, opacity: 0, y: 6 },
  transition: { type: "spring", stiffness: 380, damping: 36 },
};

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.li {...listItemMotion} layout className="[list-style:none]">
      {children}
    </motion.li>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"ul"> {
  children: React.ReactNode;
  /** Delay (ms) before each additional list item appears. */
  delay?: number;
  /** When true, begins revealing children one-by-one from the first item. */
  enabled?: boolean;
  /** When true with `enabled`, all items show immediately (no stagger). */
  revealAll?: boolean;
}

function childKey(item: React.ReactNode, index: number): React.Key {
  if (React.isValidElement(item) && item.key != null) return item.key;
  return index;
}

export const AnimatedList = React.memo(function AnimatedList({
  children,
  className,
  delay = 400,
  enabled = false,
  revealAll = false,
  ...props
}: AnimatedListProps) {
  const [index, setIndex] = useState(-1);
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    startTransition(() => {
      if (!enabled) {
        setIndex(-1);
        return;
      }
      if (revealAll && childrenArray.length > 0) {
        setIndex(childrenArray.length - 1);
      } else {
        setIndex(0);
      }
    });
  }, [enabled, revealAll, childrenArray.length]);

  useEffect(() => {
    if (!enabled || index < 0 || revealAll) return;
    if (index >= childrenArray.length - 1) return;
    const timeout = window.setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [enabled, index, delay, childrenArray.length, revealAll]);

  const itemsToShow = useMemo(() => {
    if (index < 0) return [];
    return childrenArray.slice(0, index + 1);
  }, [index, childrenArray]);

  return (
    <ul role="list" className={cn("m-0 space-y-3 p-0", className)} {...props}>
      <AnimatePresence initial={false}>
        {itemsToShow.map((item, i) => (
          <AnimatedListItem key={childKey(item, i)}>{item}</AnimatedListItem>
        ))}
      </AnimatePresence>
    </ul>
  );
});
