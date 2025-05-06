"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Tables } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pencil,
  Trash2,
  ImageIcon,
  Download,
  CalendarDays,
  Type,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { downloadImage } from "@/lib/utils";
import { getTemplateName } from "@/lib/prompt-wizard-config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ImagePreviewDialog from "../image-preview-dialog";

interface AdItemProps {
  ad: Tables["ads"];
  onDeleteClick: (adId: string) => void;
}

export default function AdItem({ ad, onDeleteClick }: AdItemProps) {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const multipleImages = ad.result_urls && ad.result_urls.length > 1;
  const imageUrl =
    ad.result_urls && ad.result_urls.length > 0
      ? ad.result_urls[activeImageIndex]
      : null;

  const templateName = ad.ad_type ? getTemplateName(ad.ad_type) : "N/A";

  const handleCardClick = () => {
    router.push(`/ads/${ad.id}`);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(
      (prevIndex) => (prevIndex + 1) % (ad.result_urls?.length || 1)
    );
  };

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + (ad.result_urls?.length || 1)) %
        (ad.result_urls?.length || 1)
    );
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col bg-white h-full group cursor-pointer"
      >
        <div className="relative w-full aspect-square bg-muted overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${ad.name || "Ad image"} - Image ${activeImageIndex + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
              <ImageIcon className="h-12 w-12 mb-2 text-gray-300" />
              <span className="text-sm text-center">No image generated</span>
            </div>
          )}
          {multipleImages && imageUrl && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePreviousImage}
                className={cn(
                  "absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8 transition-opacity duration-200 z-10",
                  "opacity-0 group-hover:opacity-100"
                )}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextImage}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8 transition-opacity duration-200 z-10",
                  "opacity-0 group-hover:opacity-100"
                )}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {imageUrl && (
            <div
              className={cn(
                "absolute bottom-2 right-2 flex items-center gap-x-1 bg-black/40 text-white p-1 rounded-lg shadow-md transition-opacity duration-200 z-10",
                "opacity-0 group-hover:opacity-100"
              )}
            >
              {multipleImages && (
                <span className="text-xs px-1.5 py-0.5">
                  {activeImageIndex + 1} / {ad.result_urls?.length}
                </span>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (ad.result_urls && ad.result_urls.length > 0) {
                          setIsPreviewOpen(true);
                        }
                      }}
                      className="text-white hover:bg-white/20 h-7 w-7 p-1"
                      aria-label="Zoom image"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={5}
                    className="bg-black/70 text-white border-none text-xs"
                  >
                    <p>Zoom image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
            {ad.name || "Untitled Ad"}
          </CardTitle>

          <div className="space-y-2 text-sm text-muted-foreground mb-3 flex-grow">
            <div className="flex items-center">
              <Type className="h-4 w-4 mr-2 text-sky-500" />
              <span>{templateName}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-amber-500" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild onClick={handleActionClick}>
                    <span className="cursor-default">
                      {formatDistanceToNow(new Date(ad.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {new Date(ad.created_at).toLocaleString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t">
            <div className="flex gap-1" onClick={handleActionClick}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild onClick={handleActionClick}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-50 text-blue-600 hover:text-blue-700"
                      asChild
                    >
                      <Link href={`/ads/${ad.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit Ad</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild onClick={handleActionClick}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-50 text-red-600 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClick(ad.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete Ad</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {imageUrl && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(
                    imageUrl,
                    `${ad.name || "ad-image"} - ${activeImageIndex + 1}.png`
                  );
                }}
              >
                <Download className="h-3.5 w-3.5" /> Download
              </Button>
            )}
          </div>
        </div>
      </Card>

      {ad.result_urls && ad.result_urls.length > 0 && (
        <ImagePreviewDialog
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          images={ad.result_urls}
          startIndex={activeImageIndex}
        />
      )}
    </>
  );
}
