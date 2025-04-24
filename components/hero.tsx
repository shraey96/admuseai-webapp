"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import AdGenerator from "./ad-generator";

export default function Hero() {
  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text & Features */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                <span className="block">Never Create Ads Again.</span>
                <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 text-transparent bg-clip-text">
                  There's an AI for that.
                </span>
              </h1>
              <p className="text-xl text-zinc-600 max-w-xl">
                Upload your product, add a prompt, and get professional-quality
                ad creatives instantly. No login required.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                </div>
                <span className="text-zinc-700">Zero design skills needed</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                </div>
                <span className="text-zinc-700">
                  Professional results in seconds
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                </div>
                <span className="text-zinc-700">
                  Just $2.99 per ad creative
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Interactive UI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <AdGenerator />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
