"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GeometricBackground from "@/components/ui/geometric-background";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <GeometricBackground>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow z-10">{children}</main>
        <Footer />
      </div>
    </GeometricBackground>
  );
}
