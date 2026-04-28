"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
}

export default function Card({
  children,
  className,
  hover = true,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : {}}
      className={cn(
        "relative rounded-2xl p-6 md:p-8",
        "bg-white dark:bg-slate-900/50",
        "border border-slate-200 dark:border-slate-800",
        "shadow-sm hover:shadow-xl hover:shadow-indigo-500/5",
        "transition-shadow duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
