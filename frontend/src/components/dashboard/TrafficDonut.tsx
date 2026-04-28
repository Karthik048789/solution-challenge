"use client";

import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface TrafficDonutProps {
  data: { severity: string; count: number }[];
}

const SEVERITY_COLORS: Record<string, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#10b981",
};

const SEVERITY_LABELS: Record<string, string> = {
  high: "High Risk",
  medium: "Medium Risk",
  low: "Low Risk",
};

export default function TrafficDonut({ data }: TrafficDonutProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card-glow rounded-2xl p-6"
    >
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Risk Distribution
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">By severity level</p>
      </div>

      <div className="h-48 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="severity"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={78}
              paddingAngle={4}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={SEVERITY_COLORS[entry.severity] ?? "#6366f1"}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
              formatter={(value: number, name: string) => [
                `${value} groups`,
                SEVERITY_LABELS[name] || name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-slate-900 dark:text-white">{total}</span>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            Total Groups
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div key={item.severity} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: SEVERITY_COLORS[item.severity] }}
              />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {SEVERITY_LABELS[item.severity] || item.severity}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {item.count}
              </span>
              <span className="text-[10px] text-slate-400">
                ({total > 0 ? Math.round((item.count / total) * 100) : 0}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
