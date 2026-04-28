"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  AlertCircle,
  BarChart3,
  RefreshCcw,
  Users,
  Sparkles,
} from "lucide-react";
import { explain, getReport } from "@/lib/api";
import { BiasedGroup, ExplainResponse, ScanResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import DashboardShell from "@/components/dashboard/DashboardShell";
import KPICard3D from "@/components/dashboard/KPICard3D";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import TrafficDonut from "@/components/dashboard/TrafficDonut";
import BiasAnalysis from "@/components/dashboard/BiasAnalysis";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import Three.js background (no SSR)
const ThreeBackground = dynamic(
  () => import("@/components/dashboard/ThreeBackground"),
  { ssr: false }
);

const SEVERITY_COLORS: Record<string, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#10b981",
};

const MAX_GROUPS_FOR_CHARTS = 8;

const FEATURE_LABELS: Record<string, string> = {
  gender: "Gender",
  region: "Region",
  education: "Education",
  income_bucket: "Income",
  age_bucket: "Age",
};

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1).toLowerCase())
    .join(" ");
}

function formatGroupValue(value: string): string {
  return toTitleCase(value.replaceAll("_", " "));
}

function prettifyGroupLabel(label: any): string {
  if (!label || typeof label !== "string") {
    return String(label || "Unknown Group");
  }
  const parts = label.split(" + ");
  const formatted = parts.map((part) => {
    const [rawKey, rawValue = ""] = part.split("=");
    const key = FEATURE_LABELS[rawKey] ?? toTitleCase(rawKey.replaceAll("_", " "));
    const value = formatGroupValue(rawValue);
    return `${key} = ${value}`;
  });
  return formatted.join(" + ");
}

function compactGroupLabel(label: string, maxLength = 28): string {
  const pretty = prettifyGroupLabel(String(label));
  if (pretty.length <= maxLength) {
    return pretty;
  }
  return `${pretty.slice(0, maxLength - 1)}…`;
}

function severityBreakdown(groups: BiasedGroup[]) {
  const counts: Record<string, number> = { high: 0, medium: 0, low: 0 };
  for (const group of groups) {
    counts[group.severity] = (counts[group.severity] ?? 0) + 1;
  }
  return Object.entries(counts).map(([severity, count]) => ({ severity, count }));
}

export default function DashboardPage() {
  const [report, setReport] = useState<ScanResponse | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<BiasedGroup | null>(null);
  const [explanation, setExplanation] = useState<ExplainResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const latest = await getReport();
      setReport(latest);
      setSelectedGroup(latest?.top_biased_groups?.[0] ?? null);
      localStorage.setItem("biasxray_scan_report", JSON.stringify(latest));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load report.");
      const cached = localStorage.getItem("biasxray_scan_report");
      if (cached) {
        setReport(JSON.parse(cached) as ScanResponse);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const pieData = useMemo(
    () => severityBreakdown((report?.top_biased_groups ?? []).slice(0, MAX_GROUPS_FOR_CHARTS)),
    [report?.top_biased_groups]
  );

  const displayedGroups = useMemo(
    () => (report?.top_biased_groups ?? []).slice(0, MAX_GROUPS_FOR_CHARTS),
    [report?.top_biased_groups]
  );

  const requestExplanation = async () => {
    if (!selectedGroup) return;

    try {
      setError(null);
      const result = await explain({
        group: prettifyGroupLabel(selectedGroup.group),
        count: selectedGroup.count,
        approval_rate: selectedGroup.approval_rate,
        baseline_rate: selectedGroup.baseline_rate,
        difference: selectedGroup.difference,
        severity: selectedGroup.severity,
        ranking_reason: selectedGroup.ranking_reason,
      });
      setExplanation(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate explanation.");
    }
  };

  if (loading) {
    return (
      <DashboardShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-slate-400 font-medium">Loading dashboard...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (!report) {
    return (
      <DashboardShell>
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="glass-card-glow rounded-2xl p-8 text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              No Report Found
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {error ?? "Upload a dataset and run a bias scan first."}
            </p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Gradient Overlays for depth */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-purple-500/[0.03]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/80 dark:from-slate-950/80 to-transparent" />
      </div>

      <div className="relative z-10 p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Bias Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              Real-time fairness intelligence. Monitor risk patterns and AI decision integrity.
            </p>
          </div>
          <button
            onClick={() => void refresh()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Sync Data
          </button>
        </motion.div>

        {/* Error Banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-400 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* KPI Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <KPICard3D
            title="Total Records"
            value={report.total_rows.toLocaleString()}
            icon={Users}
            change="+12% from last scan"
            isPositive
            accentColor="indigo"
            delay={0}
            sparklineData={[120, 140, 135, 160, 155, 180, 170, 195, 190, 210]}
          />
          <KPICard3D
            title="Groups Audited"
            value={report.groups_scanned.toLocaleString()}
            icon={Activity}
            accentColor="cyan"
            delay={1}
            sparklineData={[15, 18, 17, 22, 20, 25, 24, 28, 27, 30]}
          />
          <KPICard3D
            title="Risk Groups"
            value={report.biased_groups_found}
            icon={AlertCircle}
            change="-2 since yesterday"
            isPositive
            accentColor="amber"
            delay={2}
            sparklineData={[8, 7, 9, 6, 7, 5, 6, 4, 5, 3]}
          />
          <KPICard3D
            title="Fairness Score"
            value={`${report.fairness_score}%`}
            icon={BarChart3}
            change="+4.5%"
            isPositive
            accentColor="emerald"
            delay={3}
            sparklineData={[65, 68, 70, 72, 71, 75, 78, 80, 82, report.fairness_score]}
          />
        </div>

        {/* Row 2: Performance Chart + Traffic Donut */}
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PerformanceChart fairnessScore={report.fairness_score} />
          </div>
          <TrafficDonut data={pieData} />
        </div>

        {/* Row 3: Bias Analysis + Activity Feed */}
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BiasAnalysis
              groups={displayedGroups}
              selectedGroup={selectedGroup}
              onSelectGroup={(group) => {
                setSelectedGroup(group);
                setExplanation(null);
              }}
            />
          </div>
          <ActivityFeed
            groups={displayedGroups}
            fairnessScore={report.fairness_score}
          />
        </div>

        {/* Row 4: Detailed Table + AI Insights */}
        <div className="grid gap-5 lg:grid-cols-3">
          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="lg:col-span-2 glass-card-glow rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 dark:border-slate-800/50">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Audited Group Rankings
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Click a row to generate AI insights</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-500/5 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Protected Group</th>
                    <th className="px-6 py-4">Sample Size</th>
                    <th className="px-6 py-4">Approval</th>
                    <th className="px-6 py-4">Gap</th>
                    <th className="px-6 py-4">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 dark:divide-slate-800/30">
                  {displayedGroups.map((group, index) => (
                    <motion.tr
                      key={group.group}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      onClick={() => {
                        setSelectedGroup(group);
                        setExplanation(null);
                      }}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedGroup?.group === group.group
                          ? "bg-indigo-500/10"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/20"
                      )}
                    >
                      <td className="px-6 py-4 font-medium text-sm text-slate-900 dark:text-white">
                        {prettifyGroupLabel(group.group)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        {group.count.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        {(group.approval_rate * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-slate-900 dark:text-white">
                        {(group.difference * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{
                              backgroundColor: SEVERITY_COLORS[group.severity],
                            }}
                          />
                          <span
                            className="text-xs font-bold uppercase"
                            style={{ color: SEVERITY_COLORS[group.severity] }}
                          >
                            {group.severity}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* AI Insights Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="glass-card-glow rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  AI Insights
                </h3>
              </div>
              <button
                onClick={() => void requestExplanation()}
                disabled={!selectedGroup}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <RefreshCcw className="w-4 h-4 text-indigo-500" />
              </button>
            </div>

            {selectedGroup ? (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                  <p className="text-[10px] uppercase font-bold text-indigo-500 mb-1 tracking-wider">
                    Focus Group
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {prettifyGroupLabel(selectedGroup.group)}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 text-center">
                    <p className="text-[9px] uppercase text-slate-400 font-bold tracking-wider">
                      Approval Rate
                    </p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {(selectedGroup.approval_rate * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 text-center">
                    <p className="text-[9px] uppercase text-slate-400 font-bold tracking-wider">
                      Bias Gap
                    </p>
                    <p
                      className="text-lg font-bold"
                      style={{ color: SEVERITY_COLORS[selectedGroup.severity] }}
                    >
                      {(selectedGroup.difference * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                {explanation ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {explanation.explanation}
                    </p>
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                        Recommendations
                      </p>
                      {explanation.recommendations.map((rec, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex gap-2 p-2.5 rounded-lg bg-white/30 dark:bg-slate-800/20 border border-white/10 dark:border-slate-700/20"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                          <p className="text-xs text-slate-600 dark:text-slate-300">
                            {rec}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="py-6 text-center">
                    <button
                      onClick={() => void requestExplanation()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Generate Explanation
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-sm">
                  Select a group to see AI-powered audit insights.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  );
}
