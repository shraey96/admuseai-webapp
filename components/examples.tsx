"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Examples() {
  const examples = [
    {
      title: "Luxury Tech",
      description: "Premium device on marble background",
      image:
        "https://plus.unsplash.com/premium_photo-1691592876700-8ff4179ad25c?q=80&w=3587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Vibrant Lighting",
      description: "Neon aesthetic with striking colors",
      image:
        "https://images.unsplash.com/photo-1656428361240-47e1737b7dce?q=80&w=2583&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Modern Workspace",
      description: "Sleek tech arrangement for productivity",
      image:
        "https://images.unsplash.com/photo-1653661198822-171fb20fea83?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Abstract Design",
      description: "Elegant flowing patterns with depth",
      image:
        "https://images.unsplash.com/photo-1643901147788-77ee53a6b059?q=80&w=2150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Creative Concept",
      description: "Artistic composition with vivid colors",
      image:
        "https://images.unsplash.com/photo-1618414074972-723c8314d3db?q=80&w=2624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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
          {examples.map((example, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="flex flex-col h-full"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg h-full bg-white group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={example.image}
                    alt={example.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                    {example.title}
                  </h3>
                  <p className="text-zinc-600 mt-2">{example.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
