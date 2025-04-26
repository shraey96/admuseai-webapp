"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  getTemplateName,
  templateDescriptions,
} from "@/lib/prompt-wizard-config";

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

          <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Template Information
              </h3>
              <Badge
                variant="secondary"
                className="text-sm bg-white/80 shadow-sm"
              >
                {getTemplateName(example.templateUsed)}
              </Badge>
            </div>

            <div className="space-y-6">
              <div className="bg-white/60 rounded-md p-4 shadow-sm">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Overview
                </h4>
                <p className="text-base text-gray-900 leading-relaxed">
                  {templateDescriptions[example.templateUsed].short}
                </p>
              </div>

              <div className="bg-white/60 rounded-md p-4 shadow-sm">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Details
                </h4>
                <p className="text-base text-gray-900 leading-relaxed">
                  {templateDescriptions[example.templateUsed].detailed}
                </p>
              </div>

              <div className="bg-white/60 rounded-md p-4 shadow-sm">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Best Use Cases
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {templateDescriptions[example.templateUsed].useCases.map(
                    (useCase, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-900"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{useCase}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
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
