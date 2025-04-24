"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import GenerationScreen from "./generation-screen";
import ResultModal from "./result-modal";
import GenerateButton from "./ui/generate-button";
import { generateAdCreative } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import Script from "next/script";
import { initPayment } from "@/lib/payment";

type Stage = "upload" | "generating" | "result";

const promptExamples = [
  "Luxe skincare in marble bathroom",
  "Playful candy ad, high contrast",
  "Modern minimal shoe ad with shadows",
];

export default function AdGenerator() {
  const [stage, setStage] = useState<Stage>("upload");
  const [images, setImages] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isPaddleReady, setIsPaddleReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        // Create a local blob URL for the file
        const objectUrl = URL.createObjectURL(file);
        if (images.length < 4) {
          setImages((prev) => [...prev, objectUrl]);
        }
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (images.length === 0 || !prompt) return;

    setError(null);
    setIsLoading(true);

    if (!isPaddleReady) {
      toast({
        title: "Payment System Loading",
        description: "Please wait while we initialize the payment system.",
        variant: "default",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Initialize payment
      const { transactionId, email } = await initPayment(
        "user@admuseai.com", // In a real app, this would be the user's email
        "user-" + Date.now()
      );

      console.log(transactionId, email);
      // Show generation screen
      setStage("generating");

      // Call API to generate ad
      const result = await generateAdCreative(
        images,
        prompt,
        transactionId,
        email
      );

      if (result.success && result.imageUrls) {
        setGeneratedImages(result.imageUrls);
        setStage("upload"); // Return to upload stage, but show modal
        setShowResultModal(true);
      } else {
        throw new Error(result.error || "Failed to generate ad");
      }
    } catch (err) {
      console.error("Process failed:", err);

      // Don't show error for cancelled payments
      if (err instanceof Error && err.message === "Payment cancelled") {
        setIsLoading(false);
        return;
      }

      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      toast({
        title: "Generation Failed",
        description:
          err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setStage("upload");
    }
  };

  const handleGenerateAnother = () => {
    setImages([]);
    setPrompt("");
    setGeneratedImages(null);
    setError(null);
    setShowResultModal(false);
  };

  if (stage === "generating") {
    return <GenerationScreen />;
  }

  return (
    <>
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        onLoad={() => {
          if (window.Paddle) {
            window.Paddle.Environment.set(process.env.NEXT_PUBLIC_PADDLE_ENV);
            setIsPaddleReady(true);
          }
        }}
      />
      <Card className="bg-white shadow-xl border border-gray-100 rounded-2xl overflow-hidden">
        <CardContent className="p-7">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-800">Try it out!</h2>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="space-y-6">
            <div>
              <Label
                htmlFor="images"
                className="text-sm font-medium text-zinc-700 mb-3 block"
              >
                <span className="flex items-center">
                  <span className="inline-flex h-6 w-6 rounded-full bg-indigo-500 items-center justify-center text-white text-xs font-medium mr-2">
                    1
                  </span>
                  Upload Images{" "}
                  <span className="text-xs text-zinc-500 ml-2">
                    ({images.length}/4)
                  </span>
                </span>
              </Label>

              {images.length === 0 ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-dashed border-indigo-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 py-14 px-4 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    id="images"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                    <ImagePlus className="h-6 w-6 text-indigo-500" />
                  </div>
                  <p className="text-sm text-center text-zinc-700 font-medium">
                    Upload product or reference image
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {images.map((img, index) => (
                    <motion.div
                      key={index}
                      className="relative aspect-square border rounded-xl overflow-hidden shadow-sm group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1 right-1 h-5 w-5 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-2.5 w-2.5" />
                      </Button>
                    </motion.div>
                  ))}
                  {images.length < 4 && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border-2 border-dashed border-indigo-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 aspect-square py-6 px-3 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        id="images"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                      />
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                        <ImagePlus className="h-5 w-5 text-indigo-500" />
                      </div>
                      <p className="text-xs text-center text-zinc-700 font-medium">
                        Add reference image
                      </p>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="prompt"
                className="text-sm font-medium text-zinc-700 block"
              >
                <span className="flex items-center">
                  <span className="inline-flex h-6 w-6 rounded-full bg-indigo-500 items-center justify-center text-white text-xs font-medium mr-2">
                    2
                  </span>
                  Describe Your Ad
                </span>
              </Label>
              <Textarea
                id="prompt"
                placeholder="Describe the style, mood, and setting for your ad..."
                className="resize-none h-24 focus:ring-indigo-400 focus:border-indigo-400 rounded-xl border-gray-200 text-sm"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-xs text-zinc-500 mb-2 block">
                Try these examples:
              </Label>
              <div className="flex flex-wrap gap-2">
                {promptExamples.map((example, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
                    onClick={() => setPrompt(example)}
                  >
                    {example}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <GenerateButton
                onClick={handleGenerate}
                disabled={images.length === 0 || !prompt}
                loading={isLoading}
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Results Modal */}
      {generatedImages && (
        <ResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          images={generatedImages}
          onGenerateAnother={handleGenerateAnother}
        />
      )}
    </>
  );
}
