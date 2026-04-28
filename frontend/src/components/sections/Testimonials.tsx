"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Card from "../ui/Card";

const TESTIMONIALS = [
  {
    quote:
      "BiasX-Ray caught gender bias in our loan model that we completely missed. Their remediation suggestions saved us from a PR disaster.",
    name: "Sarah Chen",
    role: "Head of ML, FinTech Corp",
    avatar: "SC",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    quote:
      "The AI-powered explanations are gold. I can finally show non-technical stakeholders exactly why our model makes the decisions it does.",
    name: "Marcus Johnson",
    role: "Data Science Lead, HealthAI",
    avatar: "MJ",
    gradient: "from-pink-500 to-orange-500",
  },
  {
    quote:
      "Implementing BiasX-Ray cut our compliance audit time from weeks to hours. Best investment our team has made this year.",
    name: "Dr. Elena Rodriguez",
    role: "Chief AI Officer, EduTech",
    avatar: "ER",
    gradient: "from-cyan-500 to-blue-500",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Trusted by teams building{" "}
            <span className="text-gradient">responsible AI</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <Quote className="w-8 h-8 text-indigo-500/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 flex-grow leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-semibold text-sm`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
