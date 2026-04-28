"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "../ui/Button";

const TIERS = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "Perfect for exploring fairness on personal projects.",
    features: [
      "1 dataset upload",
      "Basic bias scanning",
      "Community support",
      "Public reports",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/month",
    desc: "For ML teams shipping production models.",
    features: [
      "Unlimited datasets",
      "Advanced bias metrics",
      "AI-powered explanations",
      "Priority support",
      "PDF reports",
    ],
    cta: "Start 14-day Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For regulated industries and large organizations.",
    features: [
      "Everything in Pro",
      "SSO & RBAC",
      "On-premise deployment",
      "Custom integrations",
      "Dedicated CSM",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900/30 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Simple, transparent{" "}
            <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Start free. Scale when you're ready. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                tier.highlight
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-2xl shadow-indigo-500/30 md:scale-105"
                  : "bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              <p
                className={`text-sm mb-6 ${
                  tier.highlight ? "text-white/80" : "text-slate-500"
                }`}
              >
                {tier.desc}
              </p>

              <div className="mb-6">
                <span className="text-4xl md:text-5xl font-bold">{tier.price}</span>
                <span
                  className={`ml-1 ${
                    tier.highlight ? "text-white/70" : "text-slate-500"
                  }`}
                >
                  {tier.period}
                </span>
              </div>

              <Button
                variant={tier.highlight ? "secondary" : "primary"}
                className="w-full mb-8"
              >
                {tier.cta}
              </Button>

              <ul className="space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 ${
                        tier.highlight ? "text-white" : "text-green-500"
                      }`}
                    />
                    <span
                      className={
                        tier.highlight
                          ? "text-white/90"
                          : "text-slate-700 dark:text-slate-300"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
