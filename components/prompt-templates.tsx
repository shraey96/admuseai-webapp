"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

interface PromptTemplate {
  title: string;
  prompt: string;
  category: string;
  image: string;
}

const templates: PromptTemplate[] = [
  {
    title: "Luxury Product Showcase",
    prompt:
      "Premium product on marble background with soft lighting, elegant composition, high-end aesthetic",
    category: "luxury",
    image:
      "https://plus.unsplash.com/premium_photo-1691592876700-8ff4179ad25c?q=80&w=3587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Vibrant Lifestyle",
    prompt:
      "Dynamic product in action, bright colors, energetic composition, lifestyle context",
    category: "lifestyle",
    image:
      "https://images.unsplash.com/photo-1656428361240-47e1737b7dce?q=80&w=2583&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Minimalist Design",
    prompt:
      "Clean product presentation, negative space, simple composition, modern aesthetic",
    category: "minimalist",
    image:
      "https://images.unsplash.com/photo-1653661198822-171fb20fea83?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Natural & Organic",
    prompt:
      "Product in natural setting, earthy tones, organic elements, authentic feel",
    category: "natural",
    image:
      "https://images.unsplash.com/photo-1643901147788-77ee53a6b059?q=80&w=2150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Bold & Dramatic",
    prompt:
      "High contrast lighting, dramatic shadows, intense colors, striking composition",
    category: "dramatic",
    image:
      "https://images.unsplash.com/photo-1618414074972-723c8314d3db?q=80&w=2624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

interface PromptTemplatesProps {
  onSelect: (prompt: string) => void;
}

export default function PromptTemplates({ onSelect }: PromptTemplatesProps) {
  const categories = Array.from(new Set(templates.map((t) => t.category)));

  return (
    <Tabs defaultValue={categories[0]} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category} value={category} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates
              .filter((t) => t.category === category)
              .map((template, index) => (
                <motion.div
                  key={template.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {template.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {template.prompt}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => onSelect(template.prompt)}
                    >
                      Use Template
                    </Button>
                  </div>
                </motion.div>
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
