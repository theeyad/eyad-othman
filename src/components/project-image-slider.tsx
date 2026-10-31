"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ProjectImageSliderProps } from "@/lib/types";

export function ProjectImageSlider({
  images,
  title,
  isAr = false,
}: ProjectImageSliderProps) {
  const t = useTranslations("ProjectsPage");
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = images.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation support
  useEffect(() => {
    if (total <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (isAr) handlePrev();
        else handleNext();
      } else if (e.key === "ArrowLeft") {
        if (isAr) handleNext();
        else handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total, isAr, handleNext, handlePrev]);

  if (!images || total === 0) {
    return null;
  }

  const currentImage = images[currentIndex];
  const altText = currentImage.alt_text || `${title} - preview ${currentIndex + 1}`;

  return (
    <div
      className="relative aspect-video w-full rounded-2xl sm:rounded-3xl border border-border bg-card overflow-hidden my-10 sm:my-12 select-none group"
      role="region"
      aria-label={title}
    >
      {/* Active Image */}
      <Image
        key={currentImage.url}
        src={currentImage.url}
        alt={altText}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 960px"
        className="object-cover transition-opacity duration-300 ease-in-out"
      />

      {/* Navigation Controls (Only shown if more than 1 image) */}
      {total > 1 && (
        <>
          {/* Previous Button (Visually on Start) */}
          <button
            type="button"
            onClick={isAr ? handleNext : handlePrev}
            aria-label={t("previousImage")}
            className="absolute inset-y-1/2 -translate-y-1/2 inset-s-3 sm:inset-s-4 size-10 sm:size-11 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:bg-black/85 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isAr ? (
              <ChevronRight className="size-5" />
            ) : (
              <ChevronLeft className="size-5" />
            )}
          </button>

          {/* Next Button (Visually on End) */}
          <button
            type="button"
            onClick={isAr ? handlePrev : handleNext}
            aria-label={t("nextImage")}
            className="absolute inset-y-1/2 -translate-y-1/2 inset-e-3 sm:inset-e-4 size-10 sm:size-11 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:bg-black/85 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isAr ? (
              <ChevronLeft className="size-5" />
            ) : (
              <ChevronRight className="size-5" />
            )}
          </button>

          {/* Bottom Indicators & Counter */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
            {/* Pill Dots */}
            <div className="flex items-center gap-1.5 pointer-events-auto bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={cn(
                    "size-2 rounded-full transition-all duration-200 cursor-default",
                    currentIndex === idx
                      ? "w-5 bg-white"
                      : "bg-white/40 hover:bg-white/70"
                  )}
                />
              ))}
            </div>

            {/* Counter Badge */}
            <div className="pointer-events-auto bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-xs font-medium text-white tracking-wider">
              <span>{currentIndex + 1}</span>
              <span className="mx-1 text-white/50">/</span>
              <span>{total}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

