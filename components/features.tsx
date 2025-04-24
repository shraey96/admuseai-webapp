"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Image,
  ImagePlus,
  Sparkles,
  Clock,
  Server,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Image className="h-6 w-6 text-indigo-500" />,
    title: "Simple Prompt + Image",
    description:
      "Upload a single product image and add a descriptive prompt. Our AI will transform it into a professional ad creative that matches your vision and style requirements.",
    iconBg: "bg-indigo-100",
  },
  {
    icon: <ImagePlus className="h-6 w-6 text-pink-500" />,
    title: "Enhanced with References",
    description:
      "Add up to 3 reference images along with your main product to guide the AI. Reference images help define the aesthetic, composition, and mood you're aiming for.",
    iconBg: "bg-pink-100",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-amber-500" />,
    title: "AI Does the Heavy Lifting",
    description:
      "Our sophisticated AI systems handle all the complex design work. No graphic design skills needed - the AI interprets your inputs and generates stunning, on-brand ad creatives.",
    iconBg: "bg-amber-100",
  },
  {
    icon: <Clock className="h-6 w-6 text-green-500" />,
    title: "Results Within Minutes",
    description:
      "No long waits or complex processes. From upload to finished ad creative, you'll have your result within minutes, ready to deploy in your marketing campaigns.",
    iconBg: "bg-green-100",
  },
  {
    icon: <Server className="h-6 w-6 text-cyan-500" />,
    title: "Cutting-Edge Technology",
    description:
      "Powered by state-of-the-art AI trained on thousands of successful ad campaigns. Our system understands composition, color theory, and what makes ads effective.",
    iconBg: "bg-cyan-100",
  },
  {
    icon: <Download className="h-6 w-6 text-violet-500" />,
    title: "Instant Download",
    description:
      "Once your ad is generated, download it instantly in high resolution. No watermarks or quality compromises - your ads are ready to use immediately.",
    iconBg: "bg-violet-100",
  },
];

export default function Features() {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg font-medium text-gray-500 mb-2"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Generate professional ad creatives with AI in just a few simple
            steps
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
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
                      className={`mr-4 mt-1 ${feature.iconBg} p-2 rounded-full`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-zinc-600 text-sm">
                        {feature.description}
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
