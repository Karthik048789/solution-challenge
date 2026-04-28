"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BiasedGroup } from "@/lib/types";

interface BiasAnalysisProps {
  groups: BiasedGroup[];
  onSelectGroup?: (group: BiasedGroup) => void;
  selectedGroup?: BiasedGroup | null;
}

const SEVERITY_COLORS: Record<string, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#10b981",
};

const SEVERITY_BG: Record<string, string> = {
  high: "bg-red-500/10",
  medium: "bg-amber-500/10",
  low: "bg-emerald-500/10",
};

function formatGroupLabel(label: any): string {
  if (!label || typeof label !== "string") {
    return String(label || "Unknown Group");
  }
  const parts = label.split(" + ");
  return parts
    .map((part) => {
      const [key, value = ""] = part.split("=");
      const fmtKey = key.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const fmtVal = value.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return `${fmtKey}: ${fmtVal}`;
    })
    .join(" · ");
}

export default function BiasAnalysis({ groups, onSelectGroup, selectedGroup }: BiasAnalysisProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Find max difference for scaling bars
  const maxDiff = Math.max(...groups.map((g) => Math.abs(g.difference)), 0.01);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card-glow rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Bias Analysis
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            SHAP-style attribution by demographic dimension
          </p>
        </div>
        <div className="flex gap-2">
          {Object.entries(SEVERITY_COLORS).map(([severity, color]) => (
            <div
              key={severity}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/50 dark:bg-slate-800/50"
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                {severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {groups.map((group, index) => {
          const barWidth = (Math.abs(group.difference) / maxDiff) * 100;
          const isSelected = selectedGroup?.group === group.group;
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              onClick={() => onSelectGroup?.(group)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                "relative p-3 rounded-xl cursor-pointer transition-all duration-200",
                isSelected
                  ? "bg-indigo-500/10 border border-indigo-500/20"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800/30 border border-transparent"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[60%]">
                  {formatGroupLabel(group.group)}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                      SEVERITY_BG[group.severity]
                    )}
                    style={{ color: SEVERITY_COLORS[group.severity] }}
                  >
                    {group.severity}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    {(group.difference * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Animated Bar */}
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 * index,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="h-full rounded-full relative"
                  style={{
                    backgroundColor: SEVERITY_COLORS[group.severity],
                    boxShadow: isHovered
                      ? `0 0 12px ${SEVERITY_COLORS[group.severity]}40`
                      : "none",
                  }}
                >
                  {/* Shimmer effect on bar */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s linear infinite",
                    }}
                  />
                </motion.div>
              </div>

              {/* Expanded Details (on hover/select) */}
              {(isHovered || isSelected) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 grid grid-cols-3 gap-2"
                >
                  <div className="text-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-[9px] uppercase text-slate-400 font-semibold tracking-wider">
                      Sample
                    </p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {group.count?.toLocaleString() ?? "N/A"}
                    </p>
                  </div>
                  <div className="text-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-[9px] uppercase text-slate-400 font-semibold tracking-wider">
                      Approval
                    </p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {(group.approval_rate * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-[9px] uppercase text-slate-400 font-semibold tracking-wider">
                      Baseline
                    </p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {(group.baseline_rate * 100).toFixed(1)}%
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
