import { Suspense } from "react";
import Hero from "@/components/hero";
import Benefits from "@/components/benefits";
import Features from "@/components/features";
import Examples from "@/components/examples";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <div className="bg-[url('/images/background-pattern.png')] bg-repeat">
          <Suspense fallback={<div>Loading...</div>}>
            <Hero />
          </Suspense>
        </div>

        <Benefits />

        <div className="bg-[url('/images/background-pattern.png')] bg-repeat py-20">
          <div className="container mx-auto px-4">
            <Examples />
          </div>
        </div>

        <div className="bg-white bg-[url('/images/background-pattern.png')] bg-repeat py-20">
          <div className="container mx-auto px-4">
            <Features />
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#f5f5ff] to-white bg-[url('/images/background-pattern.png')] bg-repeat py-20">
          <div className="container mx-auto px-4">
            <Pricing />
          </div>
        </div>

        <div className="bg-white bg-[url('/images/background-pattern.png')] bg-repeat py-20">
          <div className="container mx-auto px-4">
            <FAQ />
          </div>
        </div>
      </main>
    </>
  );
}
