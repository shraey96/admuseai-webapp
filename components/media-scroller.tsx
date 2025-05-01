"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaScrollerProps {
  media: { type: "image" | "video"; src: string }[];
  direction?:
    | "top-to-bottom"
    | "bottom-to-top"
    | "left-to-right"
    | "right-to-left";
  speed?: number;
  gap?: number;
  syncDirection?: boolean; // If true, both columns scroll in same direction
  isSecondary?: boolean; // Used for second column when synced
  className?: string;
}

export default function MediaScroller({
  media,
  direction = "bottom-to-top",
  speed = 2,
  gap = 24,
  syncDirection = false,
  isSecondary = false,
  className,
}: MediaScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible] = useState(true);

  // Determine scroll direction based on syncDirection and isSecondary
  const effectiveDirection = syncDirection
    ? direction
    : isSecondary
    ? direction === "bottom-to-top"
      ? "top-to-bottom"
      : direction === "left-to-right"
      ? "right-to-left"
      : direction === "right-to-left"
      ? "left-to-right"
      : "bottom-to-top"
    : direction;

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => setIsVisible(entry.isIntersecting),
  //     { threshold: 0.1 }
  //   );

  //   if (containerRef.current) {
  //     observer.observe(containerRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, []);

  // Double the media array for seamless looping
  const displayMedia = [...media, ...media];

  const isHorizontal =
    direction === "left-to-right" || direction === "right-to-left";

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className={cn(
          "animate-scroll",
          isHorizontal ? "flex flex-row" : "flex flex-col"
        )}
        style={{
          gap: `${gap}px`,
          animationDirection:
            effectiveDirection === "bottom-to-top" ||
            effectiveDirection === "left-to-right"
              ? "normal"
              : "reverse",
          animationPlayState: !isVisible ? "paused" : "running",
          animationDuration: `${isHorizontal ? 8 : 30 / speed}s`,
        }}
      >
        {displayMedia.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className={cn(
              "relative overflow-hidden flex-shrink-0",
              isHorizontal ? "w-[55vw] aspect-[4/5]" : "w-full aspect-[4/5]"
            )}
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 55vw, 33vw"
                  priority={index < 4}
                />
              ) : (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .animate-scroll {
          animation: ${isHorizontal ? "scroll-horizontal" : "scroll-vertical"}
            ${isHorizontal ? 8 : 30}s linear infinite;
        }

        @keyframes scroll-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
