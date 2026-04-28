"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import GradientOrb from "../ui/GradientOrb";
import Link from "next/link";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Orbs */}
      <GradientOrb className="w-[500px] h-[500px] -top-40 -left-40" color="indigo" />
      <GradientOrb
        className="w-[400px] h-[400px] top-40 -right-20"
        color="pink"
      />

      {/* Grid backdrop */}
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium">
                AI Fairness Auditing Platform
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Detect hidden bias in your{" "}
            <span className="text-gradient">AI systems</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed"
          >
            BiasX-Ray scans your ML models for discriminatory patterns across
            demographics, generating transparent fairness reports and remediation
            strategies in minutes.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/upload">
              <Button size="lg" className="group">
                <span className="flex items-center gap-2">
                  Start Free Audit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Button variant="secondary" size="lg">
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Watch Demo
              </span>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="grid grid-cols-3 gap-6 md:gap-12 w-full max-w-2xl"
          >
            {[
              { value: "500+", label: "Companies" },
              { value: "10M+", label: "Models Audited" },
              { value: "99.9%", label: "Accuracy" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative mt-20 max-w-5xl mx-auto"
        >
          <div className="glass rounded-2xl p-4 md:p-6 shadow-2xl shadow-indigo-500/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-slate-500">
                biasx-ray.io/dashboard
              </span>
            </div>
            <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center border border-slate-200 dark:border-slate-800">
              <div className="text-center">
                <div className="text-5xl md:text-7xl mb-2">📊</div>
                <p className="text-slate-500 text-sm">
                  Live Dashboard Preview
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
