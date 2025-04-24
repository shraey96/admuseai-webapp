"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  CheckSquare,
  Zap,
  Rocket,
  Layout,
  BrainCircuit,
} from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    title: "Save Time",
    description:
      "Focus on what matters. Let AI handle the busywork of organizing your ads so you can reclaim your time and dedicate it to high-impact tasks.",
    iconBg: "bg-blue-100",
  },
  {
    icon: <CheckSquare className="h-6 w-6 text-green-500" />,
    title: "Get More Done",
    description:
      "Boost your productivity. Capture ad ideas quickly, stay on top of your workload, and move through tasks with greater efficiency.",
    iconBg: "bg-green-100",
  },
  {
    icon: <Zap className="h-6 w-6 text-amber-500" />,
    title: "Work Smart, Not Hard",
    description:
      "Leverage AI for effortless ad creation. AdMuseAI makes it easy to stay productive and efficient without the hassle of manual design work.",
    iconBg: "bg-amber-100",
  },
  {
    icon: <Rocket className="h-6 w-6 text-red-500" />,
    title: "Get Ahead Instead of Left Behind",
    description:
      "Stay competitive in an AI-driven world. Using AI isn't optional — it's essential. Keep pace with modern tools to maintain your edge.",
    iconBg: "bg-red-100",
  },
  {
    icon: <Layout className="h-6 w-6 text-cyan-500" />,
    title: "Stay Organized",
    description:
      "Turn chaos into clarity. With customizable templates and automatic structuring, AdMuseAI ensures that every ad is right where you need it.",
    iconBg: "bg-cyan-100",
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-violet-500" />,
    title: "Never Miss a Thing",
    description:
      "Capture every idea, every detail. AdMuseAI helps you avoid information overload by keeping all your ad concepts organized and accessible whenever you need them.",
    iconBg: "bg-violet-100",
  },
];

export default function Benefits() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg font-medium text-gray-500 mb-2"
          >
            Why Choose AdMuseAI?
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Work with AI by Your Side, Every Step of the Way
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.description}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                whileHover: { duration: 0.2 },
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="h-full"
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-all h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div
                      className={`mr-4 mt-1 ${benefit.iconBg} p-2 rounded-full`}
                    >
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-zinc-600 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
