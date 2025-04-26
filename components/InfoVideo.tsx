import React from "react";
import { motion } from "framer-motion";

const InfoVideo = () => {
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
            See AdMuseAI in Action
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Watch How Easy It Is to Create Stunning Ads
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-zinc-600 max-w-2xl mx-auto"
          >
            See how our AI-powered platform transforms your ideas into
            professional ad creatives in minutes. Learn about our intuitive
            interface, powerful features, and how to get started with AdMuseAI.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl mx-auto my-8"
        >
          <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full border-0"
              src="https://www.tella.tv/video/cm9ym3ity00060blb655photf/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=0"
              allowFullScreen
              allowTransparency
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InfoVideo;
