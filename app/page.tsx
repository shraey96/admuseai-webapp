import { Suspense } from "react";
import Hero from "@/components/hero";
import Benefits from "@/components/benefits";
import Features from "@/components/features";
import Examples from "@/components/examples";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import BackgroundWrapper from "./components/BackgroundWrapper";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <BackgroundWrapper variant="waves" className="relative z-10">
          <Suspense fallback={<div>Loading...</div>}>
            <Hero />
          </Suspense>
        </BackgroundWrapper>

        <BackgroundWrapper variant="default">
          <Benefits />
        </BackgroundWrapper>

        <BackgroundWrapper variant="dots" className="py-20">
          <div className="container mx-auto px-4">
            <Examples />
          </div>
        </BackgroundWrapper>

        <BackgroundWrapper variant="gradient" className="py-20">
          <div className="container mx-auto px-4">
            <Features />
          </div>
        </BackgroundWrapper>

        <BackgroundWrapper variant="dots" className="py-20">
          <div className="container mx-auto px-4">
            <Pricing />
          </div>
        </BackgroundWrapper>

        <BackgroundWrapper variant="gradient" className="py-20">
          <div className="container mx-auto px-4">
            <FAQ />
          </div>
        </BackgroundWrapper>
      </main>
    </>
  );
}
