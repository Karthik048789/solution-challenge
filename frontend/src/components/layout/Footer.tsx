"use client";

import { Shield, Code2, Globe, Briefcase, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Dashboard", "API Docs"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "Guides", "Research", "Support"],
  Legal: ["Privacy", "Terms", "Security", "Compliance"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                BiasX<span className="text-gradient">-Ray</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mb-6">
              Detect hidden discrimination in your ML systems. Build fairer AI with
              confidence.
            </p>
            <div className="flex gap-3">
              {[Code2, Globe, Briefcase, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4 text-slate-900 dark:text-white">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} BiasX-Ray. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Built for fairness • Powered by AI
          </p>
        </div>
      </div>
    </footer>
  );
}
