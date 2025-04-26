import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, Palette, Box, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import PromptExample from "@/components/prompt-example";
import { SAMPLE_IMAGES } from "@/constants/samples";

export default function RealExamples() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Learn from Real Examples</h2>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Study these real-world examples to understand how different prompts
          and reference images lead to specific results.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {SAMPLE_IMAGES.map((example, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <PromptExample example={example} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
