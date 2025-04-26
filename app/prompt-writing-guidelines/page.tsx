"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useState, useEffect } from "react";

import PromptStructure from "./components/PromptStructure";
import CoreComponents from "./components/CoreComponents";
import RealExamples from "./components/RealExamples";
import AdvancedTips from "./components/AdvancedTips";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

const PROMPT_GUIDELINE_TABS = [
  { value: "beginner", label: "Getting Started" },
  { value: "examples", label: "Examples" },
  { value: "advanced", label: "Advanced Tips" },
] as const;

export default function PromptWritingGuidelines() {
  const [activeTab, setActiveTab] = useState("beginner");

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
              Create Perfect Ads with AdMuseAI
            </h1>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              Learn how to create stunning ads using our AI-powered platform.
              From basic prompts to advanced techniques, we'll guide you every
              step of the way.
            </p>
          </motion.div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">🎯 Getting Started</h3>
              <p className="text-zinc-600 mb-4">
                Learn the basics of creating effective prompts
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">💡 Examples</h3>
              <p className="text-zinc-600 mb-4">
                See real-world examples and their results
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">🚀 Advanced Tips</h3>
              <p className="text-zinc-600 mb-4">
                Master advanced techniques for perfect results
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
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

            {/* Getting Started Tab */}
            <TabsContent value="beginner">
              <PromptStructure
                onViewExamples={() => setActiveTab("examples")}
              />
            </TabsContent>

            {/* Examples Tab */}
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
