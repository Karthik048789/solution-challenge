"use client";

import React from "react";

interface DashboardShellProps {
  children: React.ReactNode;
}

/**
 * Simplified DashboardShell that removes the sidebar and internal header,
 * allowing the global navigation to take over.
 */
export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1600px] mx-auto">
        {children}
      </div>
    </div>
  );
}
