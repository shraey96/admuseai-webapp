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
import ConfettiPortal from "./ui/confetti-portal";

import PromptWizard from "./prompt-wizard";
import ImageUploader from "./image-uploader";

type Stage = "upload" | "generating" | "result";

const IS_FREE = true;

export default function AdGenerator() {
  const [stage, setStage] = useState<Stage>("upload");
  const [images, setImages] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const confettiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      const uid = "user-" + Date.now();
      let transactionId = `t_${uid}`;
      let email = `${uid}@admuseai.com`;

      if (!IS_FREE) {
        const result = await initPayment(
          "user@admuseai.com", // In a real app, this would be the user's email
          "user-" + Date.now()
        );
        transactionId = result.transactionId;
        email = result.email;
      }

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
        // Start confetti celebration
        setShowConfetti(true);
        if (confettiTimeoutRef.current) {
          clearTimeout(confettiTimeoutRef.current);
        }
        confettiTimeoutRef.current = setTimeout(() => removeConfetti(), 3000); // Stop after 5 seconds
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
    removeConfetti();
  };

  const removeConfetti = () => {
    if (confettiTimeoutRef.current) {
      clearTimeout(confettiTimeoutRef.current);
      confettiTimeoutRef.current = null;
    }
    setShowConfetti(false);
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
              <ImageUploader images={images} onImagesChange={setImages} />

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
          onClose={() => {
            setShowResultModal(false);
            removeConfetti();
          }}
          onGenerateAnother={handleGenerateAnother}
        />
      )}

      <PromptWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onPromptGenerated={handlePromptGenerated}
      />

      <ConfettiPortal show={showConfetti} />
    </>
  );
}
