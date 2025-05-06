"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";
import { downloadImage } from "@/lib/utils";

interface ImagePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  startIndex?: number;
}

export default function ImagePreviewDialog({
  isOpen,
  onClose,
  images,
  startIndex = 0,
}: ImagePreviewDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    // Ensure currentIndex is updated if startIndex changes while dialog is open,
    // or when it initially opens with a specific startIndex.
    if (isOpen) {
      setCurrentIndex(startIndex);
    }
  }, [startIndex, isOpen]);

  if (!images || images.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Ensure currentImageSrc is valid even if images array is empty initially or currentIndex is out of bounds.
  const currentImageSrc = images[currentIndex] || null;

  const handleDownload = () => {
    if (currentImageSrc) {
      downloadImage(
        currentImageSrc,
        `admuseai-preview-${currentIndex + 1}-${Date.now()}.png`
      );
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-3xl w-full p-4 sm:p-6 bg-background shadow-2xl rounded-lg border-border flex flex-col gap-4">
        <div className="relative aspect-[4/3] w-full bg-muted overflow-hidden rounded-md">
          {" "}
          {/* Added margin-top for close button spacing */}
          {currentImageSrc ? (
            <Image
              src={currentImageSrc}
              alt={`Preview ${currentIndex + 1} of ${images.length}`}
              fill
              className="object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Image not available
            </div>
          )}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/45 text-white backdrop-blur-sm h-9 w-9 sm:h-10 sm:w-10 rounded-full z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/45 text-white backdrop-blur-sm h-9 w-9 sm:h-10 sm:w-10 rounded-full z-10"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </>
          )}
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" /> Close
          </Button>
          {currentImageSrc && (
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
