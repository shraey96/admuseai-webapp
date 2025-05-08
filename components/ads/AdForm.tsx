"use client";

import { useRef, useState, useEffect } from "react";
import { Tables } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ImagePlus,
  X,
  Sparkles,
  Image as ImageIcon,
  Wand2,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BASE_WEBSITE_URL } from "@/lib/constants";

export type AdFormPayload = {
  name: string;
  prompt: string;
  images: File[];
  visualStyle?: string;
  brandId?: string;
  numSamples?: number;
  quality?: string;
  ad_type?: string;
  dimensions?: string;
};

interface AdFormProps {
  initialValues?: Partial<Tables["ads"]>;
  onSubmit: (values: AdFormPayload) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
}

export default function AdForm({
  initialValues = {},
  onSubmit,
  loading,
  submitLabel = "Save Ad",
}: AdFormProps) {
  const [form, setForm] = useState({
    prompt: initialValues.prompt || "",
    brand_id: initialValues.brand_id || "",
    visual_style: initialValues.visual_style || "",
    ad_type: initialValues.ad_type || "image",
    dimensions: initialValues.dimensions || "",
    num_samples: 1,
    quality: "auto",
  });
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleNumberChange = (name: string, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setForm({ ...form, [name]: numValue });
    }
  };

  const createObjectURLs = (files: File[]): string[] => {
    return files.map((file) => URL.createObjectURL(file));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files).slice(0, 4 - images.length);
      setImages([...images, ...selectedFiles]);

      // Create preview URLs for the images
      const newPreviews = createObjectURLs(selectedFiles);
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    // Remove the image preview URL and revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index]);

    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files).slice(0, 4 - images.length);
      setImages([...images, ...selectedFiles]);

      // Create preview URLs for the images
      const newPreviews = createObjectURLs(selectedFiles);
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.prompt.trim()) {
      setError("Prompt is required");
      return;
    }

    if (images.length === 0) {
      setError("At least one reference image is required");
      return;
    }

    // Format values according to the API documentation
    const values: AdFormPayload = {
      prompt: form.prompt.trim(),
      images: images,
      visualStyle: form.visual_style || undefined,
      brandId: form.brand_id || undefined,
      numSamples: form.num_samples,
      quality: form.quality,
      // Keep these for the database record
      ad_type: form.ad_type,
      dimensions: form.dimensions || undefined,
    };

    await onSubmit(values);
  };

  // Clean up object URLs when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((previewUrl) => {
        URL.revokeObjectURL(previewUrl);
      });
    };
  }, [imagePreviews]);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Image Upload Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary">
            <ImageIcon className="h-4 w-4" />
          </div>
          <Label htmlFor="images" className="text-sm font-medium">
            Upload Images{" "}
            <span className="text-xs text-muted-foreground ml-1">
              ({imagePreviews.length}/4)
            </span>
          </Label>
        </div>

        <input
          type="file"
          id="images"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          required
        />

        {imagePreviews.length === 0 ? (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              "border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer py-10 px-4 transition-all duration-200",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-slate-200 hover:border-primary/50 hover:bg-slate-50"
            )}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <motion.div
              className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-3"
              animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <ImagePlus
                className={cn(
                  "h-7 w-7",
                  isDragging ? "text-primary" : "text-primary/80"
                )}
              />
            </motion.div>
            <p className="text-sm font-medium text-center text-slate-700">
              Upload product or reference image
            </p>
            <p className="text-xs text-center text-slate-500 mt-2">
              or drag and drop files here
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl transition-all duration-200 border border-slate-200 bg-slate-50/50",
              isDragging ? "bg-primary/5 border-primary/20" : ""
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            {imagePreviews.map((imgUrl, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-lg overflow-hidden shadow-md group"
              >
                <Image
                  src={imgUrl}
                  alt={`Uploaded image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 shadow-sm text-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </motion.div>
            ))}
            {imagePreviews.length < 4 && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-slate-200 hover:border-primary/50 hover:bg-slate-50"
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus
                  className={cn(
                    "h-6 w-6 mb-1",
                    isDragging ? "text-primary" : "text-primary/80"
                  )}
                />
                <span className="text-xs text-center text-slate-600">
                  Add More
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Prompt Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary">
            <Wand2 className="h-4 w-4" />
          </div>
          <Label htmlFor="prompt" className="text-sm font-medium">
            Create Your Prompt
          </Label>
        </div>

        <Textarea
          id="prompt"
          name="prompt"
          value={form.prompt}
          onChange={handleChange}
          placeholder="Describe your ad creative: guidelines, setting, lighting, mood, etc. E.g. 'Product shot of serum bottle on marble counter, modern bathroom, soft morning light'"
          className="min-h-[120px] resize-none focus:ring-1 focus:ring-primary/40"
          required
        />
        <div className="mt-1.5 flex justify-between items-center">
          <a
            href={`${BASE_WEBSITE_URL}/prompt-writing-guidelines`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1"
          >
            Prompt Writing Guidelines
            <ExternalLink
              className="h-3 w-3 ml-0.5"
              aria-label="Open guidelines in new tab"
            />
          </a>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="w-full py-6 text-base font-medium shadow-md"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              <span>Generating...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>{submitLabel}</span>
            </div>
          )}
        </Button>
      </motion.div>
    </form>
  );
}
