"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  Share,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { downloadImage } from "@/lib/utils";

interface ResultScreenProps {
  images: string[];
  onGenerateAnother: () => void;
}

export default function ResultScreen({
  images,
  onGenerateAnother,
}: ResultScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = images[activeIndex];

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDownload = () => {
    downloadImage(
      currentImage,
      `admuseai-creative-${activeIndex + 1}-${Date.now()}.png`
    );
  };

  return (
    <Card className="bg-white/95 backdrop-blur-xl shadow-xl border-0 overflow-hidden rounded-2xl relative w-full max-w-3xl">
      <CardContent className="p-6">
        <div className="text-center mb-3">
          <div className="flex items-center justify-center mb-1">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mr-2">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="bg-gradient-to-r from-indigo-500 to-violet-600 text-transparent bg-clip-text font-semibold">
              AdMuseAI
            </span>
          </div>

          <motion.h3
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text mb-0.5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Your Ad Creatives are Ready!
          </motion.h3>
        </div>

        {/* Main image display - Set to fixed height instead of aspect-square */}
        <motion.div
          className="relative h-[min(65vh,480px)] w-full mb-3 rounded-xl overflow-hidden shadow-lg group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Image
            src={currentImage || "/placeholder.svg"}
            alt={`Generated ad creative ${activeIndex + 1}`}
            fill
            className="object-contain"
          />

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm h-9 w-9 rounded-full shadow-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm h-9 w-9 rounded-full shadow-md"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </motion.div>

        {/* Thumbnail gallery */}
        {images.length > 1 && (
          <motion.div
            className="flex gap-1.5 mb-4 justify-center flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className={`relative h-14 w-14 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${
                  index === activeIndex
                    ? "ring-2 ring-indigo-500 ring-offset-1"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="flex flex-row gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg border-0 py-3 h-auto"
              size="default"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button
              variant="outline"
              onClick={onGenerateAnother}
              size="default"
              className="w-full border-indigo-200 hover:bg-indigo-50 text-indigo-700 rounded-xl transition-all duration-300 py-3 h-auto"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate More
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
