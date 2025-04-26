"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

import PromptStructure from "./components/PromptStructure";
import CoreComponents from "./components/CoreComponents";
import RealExamples from "./components/RealExamples";
import AdvancedTips from "./components/AdvancedTips";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";
import { useEffect } from "react";
const PROMPT_GUIDELINE_TABS = [
  { value: "structure", label: "Prompt Structure" },
  { value: "components", label: "Core Components" },
  { value: "examples", label: "Real Examples" },
  { value: "advanced", label: "Advanced Tips" },
] as const;

export default function PromptWritingGuidelines() {
  useEffect(() => {
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      page: "prompt-writing-guidelines",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
              Master the Art of Prompt Writing
            </h1>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              Learn how to craft perfect prompts for AI-generated ads. From
              basic structures to advanced techniques, we've got you covered.
            </p>
          </motion.div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">🎯 Core Components</h3>
              <p className="text-zinc-600">
                Learn the essential building blocks of effective prompts
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">💡 Real Examples</h3>
              <p className="text-zinc-600">
                See real-world examples and their results
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">🚀 Advanced Tips</h3>
              <p className="text-zinc-600">
                Master advanced techniques for perfect results
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="structure" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
              {PROMPT_GUIDELINE_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  onClick={() => {
                    trackAnalytics(
                      ANALYTICS_EVENTS.PROMPT_WRITING_GUIDELINES_TAB_CLICKED,
                      {
                        source: tab.label,
                      }
                    );
                  }}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Prompt Structure Tab */}
            <TabsContent value="structure">
              <PromptStructure />
            </TabsContent>

            {/* Core Components Tab */}
            <TabsContent value="components">
              <CoreComponents />
            </TabsContent>

            {/* Real Examples Tab */}
            <TabsContent value="examples">
              <RealExamples />
            </TabsContent>

            {/* Advanced Tips Tab */}
            <TabsContent value="advanced">
              <AdvancedTips />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
