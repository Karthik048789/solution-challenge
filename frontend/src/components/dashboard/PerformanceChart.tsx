"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PerformanceChartProps {
  fairnessScore: number;
}

// Generate mock trend data based on the current fairness score
function generateTrendData(currentScore: number) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const base = Math.max(currentScore - 15, 50);
  return days.map((day, i) => ({
    day,
    fairness: Math.round(base + (currentScore - base) * (i / 6) + (Math.random() - 0.5) * 5),
    accuracy: Math.round(75 + Math.random() * 15),
    coverage: Math.round(60 + Math.random() * 20),
  }));
}

export default function PerformanceChart({ fairnessScore }: PerformanceChartProps) {
  const data = generateTrendData(fairnessScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card-glow rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Performance Trends
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Last 7 days</p>
        </div>
        <div className="flex gap-4">
          {[
            { label: "Fairness", color: "#6366f1" },
            { label: "Accuracy", color: "#06b6d4" },
            { label: "Coverage", color: "#a855f7" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="fairnessGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="coverageGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(148, 163, 184, 0.08)"
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              domain={[40, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
              itemStyle={{ color: "#e2e8f0" }}
              labelStyle={{ color: "#94a3b8", marginBottom: "4px" }}
            />
            <Area
              type="monotone"
              dataKey="fairness"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#fairnessGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="accuracy"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#accuracyGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#06b6d4", stroke: "#fff", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="coverage"
              stroke="#a855f7"
              strokeWidth={2}
              fill="url(#coverageGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#a855f7", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
