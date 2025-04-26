"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface PromptExampleProps {
  example: {
    image: string;
    referenceImages?: string[];
    headline: string;
    description: string;
    adType: string;
    visualStyle: string;
    tone: string;
    generationPrompt: string;
    templateUsed: string;
  };
}

export default function PromptExample({ example }: PromptExampleProps) {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reference Images */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Reference Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {example.referenceImages?.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`Reference ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-black/50">
                    Reference {idx + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Generated Result</h3>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src={example.image}
                alt={example.headline}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{example.adType}</Badge>
            <Badge variant="outline">{example.templateUsed}</Badge>
            <Badge variant="outline">{example.tone}</Badge>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">{example.headline}</h3>
            <p className="text-zinc-600">{example.description}</p>
          </div>

          <div
            className="bg-gray-50 p-4 rounded-lg cursor-pointer"
            onClick={() => setShowPrompt(!showPrompt)}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium">View Prompt</h4>
              <span className="text-sm text-zinc-500">
                {showPrompt ? "Hide" : "Show"}
              </span>
            </div>
            {showPrompt && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded border">
                  {example.generationPrompt}
                </pre>
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
