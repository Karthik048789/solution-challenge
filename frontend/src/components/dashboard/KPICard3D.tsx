"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICard3DProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  accentColor?: string;
  className?: string;
  delay?: number;
  sparklineData?: number[];
}

function AnimatedNumber({ value }: { value: string | number }) {
  const [display, setDisplay] = useState("0");
  const strVal = String(value);

  useEffect(() => {
    // Extract numeric part for animation
    const numMatch = strVal.match(/^[\d,]+/);
    if (!numMatch) {
      setDisplay(strVal);
      return;
    }

    const target = parseInt(numMatch[0].replace(/,/g, ""), 10);
    const suffix = strVal.slice(numMatch[0].length);
    const duration = 1200;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(target * eased);
      setDisplay(current.toLocaleString() + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [strVal]);

  return <>{display}</>;
}

function MiniSparkline({ data, color = "#6366f1" }: { data: number[]; color?: string }) {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 28;
  const padding = 2;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const areaD = `${pathD} L ${width - padding},${height} L ${padding},${height} Z`;

  return (
    <svg width={width} height={height} className="opacity-60">
      <defs>
        <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#spark-${color.replace("#", "")})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function KPICard3D({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  accentColor = "indigo",
  className,
  delay = 0,
  sparklineData,
}: KPICard3DProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const colorMap: Record<string, { bg: string; text: string; glow: string; hex: string }> = {
    indigo: { bg: "bg-indigo-500/10", text: "text-indigo-500", glow: "glow-indigo", hex: "#6366f1" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", glow: "glow-emerald", hex: "#10b981" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-500", glow: "glow-amber", hex: "#f59e0b" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-500", glow: "glow-rose", hex: "#f43e5e" },
  };

  const colors = colorMap[accentColor] || colorMap.indigo;

  // Default sparkline data if not provided
  const sparkData = sparklineData || [3, 5, 4, 7, 6, 8, 7, 9, 8, 10];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1, ease: [0.4, 0, 0.2, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative glass-card-glow p-5 rounded-2xl group cursor-default transition-all duration-300",
        `hover:${colors.glow}`,
        className
      )}
    >
      <div
        style={{
          transform: "translateZ(40px)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <p className={cn(
            "text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500",
            `group-hover:${colors.text}`,
            "transition-colors"
          )}>
            {title}
          </p>
          <div className={cn(
            "p-2 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
            colors.bg,
            colors.text
          )}>
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          <AnimatedNumber value={value} />
        </h3>

        <div className="flex items-center justify-between">
          {change && (
            <p
              className={cn(
                "text-[11px] font-semibold px-2 py-0.5 rounded-full",
                isPositive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              )}
            >
              {change}
            </p>
          )}
          <MiniSparkline data={sparkData} color={colors.hex} />
        </div>
      </div>

      {/* Animated Glow Effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
        "bg-gradient-to-br",
        accentColor === "indigo" && "from-indigo-500/5 to-purple-500/5",
        accentColor === "emerald" && "from-emerald-500/5 to-teal-500/5",
        accentColor === "amber" && "from-amber-500/5 to-orange-500/5",
        accentColor === "rose" && "from-rose-500/5 to-pink-500/5",
      )} />

      {/* Border Shimmer */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.hex}15, transparent)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 2s linear infinite",
          maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1px",
          borderRadius: "1rem",
        }}
      />
    </motion.div>
  );
}
