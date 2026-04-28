import { Suspense, lazy } from "react";
import HeroGeometric from "@/components/sections/HeroGeometric";

// Lazy load below-the-fold sections for performance
const Features = lazy(() => import("@/components/sections/Features"));
const HowItWorks = lazy(() => import("@/components/sections/HowItWorks"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const Pricing = lazy(() => import("@/components/sections/Pricing"));
const CTA = lazy(() => import("@/components/sections/CTA"));

function SectionFallback() {
  return (
    <div className="py-20 flex justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      <HeroGeometric />
      <Suspense fallback={<SectionFallback />}>
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
      </Suspense>
    </>
  );
}
