"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function GenerationScreen() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white shadow-xl border-0 overflow-hidden rounded-2xl relative z-10">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full bg-indigo-100 flex items-center justify-center">
                <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-indigo-600 border-r-violet-500 animate-spin"></div>
                <Sparkles className="h-6 w-6 text-indigo-600 z-10 animate-pulse" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              Generating your ad
            </h3>
            <p className="text-zinc-600">This usually takes a minute</p>

            <div className="w-full mt-8 bg-gray-100 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-indigo-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 40, ease: "linear" }}
              />
            </div>

            <div className="mt-6 text-sm text-zinc-500 max-w-xs text-center">
              We're carefully crafting your ad based on your product image and
              prompt
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 w-full">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 rounded-full bg-indigo-200"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scaleX: [0.7, 1, 0.7],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
