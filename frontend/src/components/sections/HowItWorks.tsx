"use client";

import { motion } from "framer-motion";
import { Upload, Search, FileText } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Data",
    desc: "Drag and drop your CSV dataset. We automatically train baseline models and identify sensitive features.",
  },
  {
    icon: Search,
    step: "02",
    title: "Scan for Bias",
    desc: "Our engine slices your data across demographic intersections, flagging groups with significantly different outcomes.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Get Your Report",
    desc: "Receive a comprehensive audit report with visualizations, AI explanations, and prioritized remediation steps.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
            How it Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            From data to audit in{" "}
            <span className="text-gradient">three steps</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/10 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-indigo-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
