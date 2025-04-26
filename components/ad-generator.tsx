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
import AnimatedBorder from "@/components/animated-border";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

import PromptWizard from "./prompt-wizard";

type Stage = "upload" | "generating" | "result";

export default function AdGenerator() {
  const [stage, setStage] = useState<Stage>("upload");
  const [images, setImages] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const [isWizardOpen, setIsWizardOpen] = useState(false);
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

    trackAnalytics(ANALYTICS_EVENTS.GENERATE_AD_CLICKED);

    const isPaddleReady = typeof window !== "undefined" && window.Paddle;

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

  const handlePromptGenerated = (generatedPrompt: string) => {
    setPrompt(generatedPrompt);
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
            window.Paddle.Environment.set(process.env.PADDLE_ENV);
          }
        }}
      />
      <AnimatedBorder>
        <Card className="bg-white shadow-xl border border-gray-100 rounded-2xl overflow-hidden">
          <CardContent className="p-4 sm:p-7">
            <div className="mb-4 sm:mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Try it out!
              </h2>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <Label
                  htmlFor="images"
                  className="text-sm font-medium text-zinc-700 mb-2 sm:mb-3 block"
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
                    className="border-2 border-dashed border-indigo-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 py-8 sm:py-14 px-4 transition-colors"
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    {images.map((img, index) => (
                      <motion.div
                        key={index}
                        className="relative aspect-square border rounded-xl overflow-hidden shadow-sm group"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={img}
                          alt={`Uploaded image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                    {images.length < 4 && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="aspect-square border-2 border-dashed border-indigo-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImagePlus className="h-6 w-6 text-indigo-500 mb-1" />
                        <span className="text-xs text-center text-zinc-600">
                          Add More
                        </span>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-zinc-700 mb-2 sm:mb-3 block">
                  <span className="flex items-center">
                    <span className="inline-flex h-6 w-6 rounded-full bg-indigo-500 items-center justify-center text-white text-xs font-medium mr-2">
                      2
                    </span>
                    Add Prompt
                  </span>
                </Label>
                <div className="space-y-4">
                  <div className="relative">
                    <Textarea
                      id="prompt"
                      placeholder="Describe your ad creative: guidelines, setting, lighting, mood, etc. E.g. 'Product shot of serum bottle on marble counter, modern bathroom, soft morning light'"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                    <div className="mt-1.5 text-right">
                      <a
                        href="/prompt-writing-guidelines"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline"
                        onClick={() => {
                          trackAnalytics(
                            ANALYTICS_EVENTS.PROMPT_WRITING_GUIDELINES_CLICKED,
                            {
                              source: "ad_generator",
                            }
                          );
                        }}
                      >
                        Prompt Writing Guidelines
                      </a>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      trackAnalytics(ANALYTICS_EVENTS.PROMPT_WIZARD_OPENED);
                      setIsWizardOpen(true);
                    }}
                    className="w-full flex items-center gap-2 py-6"
                  >
                    <span>💡</span>
                    Help me write a prompt
                  </Button>
                </div>
              </div>

              <GenerateButton
                onClick={handleGenerate}
                disabled={images.length === 0 || !prompt || isLoading}
                loading={isLoading}
              />
            </div>
          </CardContent>
        </Card>
      </AnimatedBorder>

      {showResultModal && generatedImages && (
        <ResultModal
          isOpen={showResultModal}
          images={generatedImages}
          onClose={() => setShowResultModal(false)}
          onGenerateAnother={handleGenerateAnother}
        />
      )}

      <PromptWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onPromptGenerated={handlePromptGenerated}
      />
    </>
  );
}
