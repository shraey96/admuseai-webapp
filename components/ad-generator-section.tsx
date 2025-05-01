"use client";

import { motion } from "framer-motion";
import AdGenerator from "./ad-generator";

export default function AdGeneratorSection() {
  return (
    <section id="ad-generator" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Create Your Ad
          </h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Start generating professional ads in seconds
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <AdGenerator />
        </motion.div>
      </div>
    </section>
  );
}
