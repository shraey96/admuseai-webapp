"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SAMPLE_IMAGES } from "@/constants/samples";
import { Search } from "lucide-react";
import { getTemplateName } from "@/lib/prompt-wizard-config";
import { useState } from "react";
import ExamplePreview from "@/components/example-preview";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

export default function Examples() {
  const [selectedExample, setSelectedExample] = useState<
    (typeof SAMPLE_IMAGES)[0] | null
  >(null);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <>
      <section id="examples" className="py-16 scroll-mt-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
              Inspiring Examples
            </h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              See what's possible with AdMuseAI's creative potential
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {SAMPLE_IMAGES.map((example, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="flex flex-col h-full"
                onClick={() => {
                  setSelectedExample(example);
                  trackAnalytics(ANALYTICS_EVENTS.EXAMPLE_PREVIEW_OPENED, {
                    example_type: example.adType,
                    example_image: example.image,
                    example_template: example.templateUsed,
                  });
                }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg h-full bg-white group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={example.image}
                      alt={example.adType}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-2">
                        <Search className="w-6 h-6" />
                        <span className="font-medium">Generated using</span>
                        <span className="font-bold">
                          {getTemplateName(example.templateUsed)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                      {example.adType}
                    </h3>
                    <p className="text-zinc-600 mt-2">{example.visualStyle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedExample && (
        <ExamplePreview
          example={selectedExample}
          onClose={() => setSelectedExample(null)}
        />
      )}
    </>
  );
}
