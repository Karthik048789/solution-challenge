"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Upload,
  BarChart3,
  Eye,
  Zap,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BiasedGroup } from "@/lib/types";

interface ActivityFeedProps {
  groups: BiasedGroup[];
  fairnessScore: number;
}

interface FeedEvent {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  severity?: "high" | "medium" | "low";
}

function generateEvents(groups: BiasedGroup[], fairnessScore: number): FeedEvent[] {
  const events: FeedEvent[] = [
    {
      id: "scan-complete",
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
      title: "Scan Completed",
      description: `Fairness audit finished with score ${fairnessScore}%`,
      time: "Just now",
    },
    {
      id: "dataset-loaded",
      icon: Upload,
      iconColor: "text-indigo-500",
      iconBg: "bg-indigo-500/10",
      title: "Dataset Loaded",
      description: "CSV file uploaded and validated",
      time: "2 min ago",
    },
  ];

  // Add events from top biased groups
  groups.slice(0, 3).forEach((group, i) => {
    const rawLabel = String(group.group || "Unknown");
    const label = rawLabel
      .split(" + ")[0]
      .split("=")
      .map((s) => s.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()))
      .join(": ");

    if (group.severity === "high") {
      events.push({
        id: `alert-${i}`,
        icon: AlertTriangle,
        iconColor: "text-red-500",
        iconBg: "bg-red-500/10",
        title: "High Risk Detected",
        description: `${label} shows ${(group.difference * 100).toFixed(1)}% gap`,
        time: `${3 + i} min ago`,
        severity: "high",
      });
    } else if (group.severity === "medium") {
      events.push({
        id: `warn-${i}`,
        icon: Eye,
        iconColor: "text-amber-500",
        iconBg: "bg-amber-500/10",
        title: "Moderate Bias Found",
        description: `${label} needs attention`,
        time: `${3 + i} min ago`,
        severity: "medium",
      });
    }
  });

  events.push(
    {
      id: "model-check",
      icon: Zap,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-500/10",
      title: "AI Model Active",
      description: "Gemini explanation engine connected",
      time: "5 min ago",
    },
    {
      id: "metrics-calc",
      icon: BarChart3,
      iconColor: "text-cyan-500",
      iconBg: "bg-cyan-500/10",
      title: "Metrics Calculated",
      description: "Disparate impact ratios computed",
      time: "6 min ago",
    },
    {
      id: "system-init",
      icon: RefreshCcw,
      iconColor: "text-slate-400",
      iconBg: "bg-slate-500/10",
      title: "System Initialized",
      description: "BiasX-Ray engine started successfully",
      time: "10 min ago",
    }
  );

  return events;
}

export default function ActivityFeed({ groups, fairnessScore }: ActivityFeedProps) {
  const events = generateEvents(groups, fairnessScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card-glow rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Activity Feed
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Recent audit events</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>

      <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1 -mr-1">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.08 * index }}
            className={cn(
              "flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30 group cursor-default",
              event.severity === "high" && "border-l-2 border-red-500/50"
            )}
          >
            <div className={cn("p-1.5 rounded-lg shrink-0 mt-0.5", event.iconBg)}>
              <event.icon className={cn("w-3.5 h-3.5", event.iconColor)} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {event.title}
                </p>
                <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">
                  {event.time}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
