"use client";

import { motion } from "framer-motion";
import {
  Scan,
  BarChart3,
  Sparkles,
  Shield,
  GitBranch,
  FileCheck,
} from "lucide-react";
import Card from "../ui/Card";

const FEATURES = [
  {
    icon: Scan,
    title: "Automated Bias Scanning",
    desc: "Upload any dataset and our engine automatically discovers sensitive groups and measures disparate impact across intersections.",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: BarChart3,
    title: "Fairness Metrics",
    desc: "Industry-standard metrics including Disparate Impact, Statistical Parity Gap, and Equal Opportunity analyzed in real-time.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    desc: "Gemini-powered natural language explanations translate complex statistics into actionable business insights.",
    gradient: "from-pink-500 to-orange-400",
  },
  {
    icon: GitBranch,
    title: "What-If Simulator",
    desc: "Test hypothetical changes to user profiles and see how your model responds — instantly spot discriminatory decisions.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    desc: "Generate audit reports aligned with EU AI Act, NYC Local Law 144, and EEOC guidelines for regulatory confidence.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: FileCheck,
    title: "Automated Remediation",
    desc: "Agentic workflows suggest and apply fairness interventions — from reweighting to adversarial debiasing.",
    gradient: "from-amber-500 to-red-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Everything you need to build{" "}
            <span className="text-gradient">fair AI</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A complete fairness toolkit engineered for modern ML teams — from
            detection to explanation to remediation.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={cardVariants}>
                <Card className="h-full group">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
