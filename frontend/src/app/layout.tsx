import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BiasX-Ray | AI Fairness Auditing Platform",
  description:
    "Detect hidden discrimination in ML decisions with BiasX-Ray audits, simulation, and recommendations.",
};

import { ThemeProvider } from "@/context/ThemeContext";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full transition-colors duration-300">
        <ThemeProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
