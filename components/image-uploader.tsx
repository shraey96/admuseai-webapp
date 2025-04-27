import React, { useRef, useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export default function ImageUploader({
  images,
  onImagesChange,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files)
        .slice(0, 4 - images.length)
        .map((file) => URL.createObjectURL(file));

      onImagesChange([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const newImages = Array.from(files)
          .slice(0, 4 - images.length)
          .map((file) => URL.createObjectURL(file));

        onImagesChange([...images, ...newImages]);
      }
    },
    [images, onImagesChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  return (
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

      <input
        type="file"
        id="images"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
      {images.length === 0 ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer py-8 sm:py-14 px-4 transition-all duration-200 ${
            isDragging
              ? "border-indigo-500 bg-indigo-50/80"
              : "border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/50"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <motion.div
            className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3"
            animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ImagePlus
              className={`h-6 w-6 ${
                isDragging ? "text-indigo-600" : "text-indigo-500"
              }`}
            />
          </motion.div>
          <p className="text-sm text-center text-zinc-700 font-medium">
            Upload product or reference image
          </p>
          <p className="text-xs text-center text-zinc-500 mt-2">
            or drag and drop files here
          </p>
        </motion.div>
      ) : (
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-2 rounded-xl transition-all duration-200 ${
            isDragging ? "bg-indigo-50/80" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
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
              className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-indigo-500 bg-indigo-50/80"
                  : "border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/50"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <motion.div
                animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ImagePlus
                  className={`h-6 w-6 mb-1 ${
                    isDragging ? "text-indigo-600" : "text-indigo-500"
                  }`}
                />
              </motion.div>
              <span className="text-xs text-center text-zinc-600">
                Add/Drop More
              </span>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
