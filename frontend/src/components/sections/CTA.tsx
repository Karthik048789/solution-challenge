"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-10 md:p-16 text-white text-center"
        >
          {/* Decorative blurs */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-black/20 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Ready to audit your AI?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of ML teams shipping fair, transparent, and compliant
              models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button variant="secondary" size="lg" className="group">
                  <span className="flex items-center gap-2 text-indigo-600">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Button
                size="lg"
                className="!bg-transparent !border-2 !border-white/30 hover:!bg-white/10 !shadow-none"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
