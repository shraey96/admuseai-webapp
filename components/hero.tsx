"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import AdGenerator from "./ad-generator";
import { getFormattedPrice } from "@/lib/constants";

export default function Hero() {
  const scrollToExamples = () => {
    const examplesSection = document.getElementById("examples");
    if (examplesSection) {
      examplesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen pt-20 md:pt-28 relative overflow-hidden">
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

      <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center">
          {/* Left side - Text & Features */}
          <div className="space-y-6 md:space-y-8 pt-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
                <span className="block mb-2">Never Create Ads Again.</span>
                <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 text-transparent bg-clip-text">
                  AdMuse Does It Better.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 max-w-xl mt-4">
                Upload your product, add a prompt, and get professional-quality
                ad creatives instantly. No login required.
              </p>
              <motion.div
                onClick={scrollToExamples}
                className="mt-6 inline-flex items-center gap-2 text-lg md:text-xl font-semibold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  animate={{
                    opacity: [1, 0.8, 1],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✨ View Our Ad Gallery
                </motion.span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.div>
            </div>

            <div className="space-y-3 md:space-y-4">
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
                  Just {getFormattedPrice()} per ad creative
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Interactive UI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-xl mx-auto lg:mx-0"
          >
            <AdGenerator />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
