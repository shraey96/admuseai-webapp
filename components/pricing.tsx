"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 relative">
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#4f46e5] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            No subscriptions, no hidden fees. Just pay for what you need.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-md mx-auto"
        >
          <Card className="border-0 shadow-xl overflow-hidden bg-white">
            <CardHeader className="relative z-10 text-center pb-2">
              <CardTitle className="text-2xl font-bold text-[#4f46e5]">
                Single Ad Creative
              </CardTitle>
              <CardDescription>Perfect for one-off projects</CardDescription>
              <div className="mt-4 text-4xl font-bold text-zinc-900">$2.99</div>
            </CardHeader>
            <CardContent className="relative z-10 pt-4">
              <ul className="space-y-3">
                {[
                  "High-quality AI-generated ad creative",
                  "Upload your own product image",
                  "Add up to 3 reference images",
                  "Custom prompt guidance",
                  "Immediate download",
                  "Commercial usage rights",
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Check className="h-5 w-5 text-[#4f46e5] mr-2 flex-shrink-0" />
                    <span className="text-zinc-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="relative z-10 pt-2 pb-6 flex justify-center">
              <p className="text-sm text-zinc-500 text-center max-w-xs">
                Bundle pricing coming soon! Contact us for high-volume needs.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
