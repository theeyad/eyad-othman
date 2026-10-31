"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { GalleryItem, MultiImageUploaderProps } from "@/lib/types";

export function MultiImageUploader({
  value = [],
  onChange,
  onError,
  disabled = false,
}: MultiImageUploaderProps) {
  const t = useTranslations("Admin");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function processFiles(files: FileList | File[]) {
    const fileList = Array.from(files);
    const validFiles = fileList.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length === 0) {
      onError(t("invalidImageFile"));
      return;
    }

    const oversizedFiles = validFiles.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      onError(t("imageTooLarge"));
      return;
    }

    const newItems: GalleryItem[] = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      is_primary: false,
    }));

    const updatedList = [...value, ...newItems];
    // If no image is marked as primary, make the first one primary
    const hasPrimary = updatedList.some((img) => img.is_primary);
    if (!hasPrimary && updatedList.length > 0) {
      updatedList[0].is_primary = true;
    }
    onChange(updatedList);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Reset input value so re-selecting same file works
      e.target.value = "";
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLLabelElement>) {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }

  function setPrimaryImage(indexToMakePrimary: number) {
    const updated = value.map((img, idx) => ({
      ...img,
      is_primary: idx === indexToMakePrimary,
    }));
    onChange(updated);
  }

  function removeImage(indexToRemove: number) {
    const itemToRemove = value[indexToRemove];
    if (itemToRemove && itemToRemove.file && itemToRemove.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(itemToRemove.previewUrl);
    }

    const updated = value.filter((_, idx) => idx !== indexToRemove);
    if (updated.length > 0 && !updated.some((img) => img.is_primary)) {
      updated[0].is_primary = true;
    }
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {/* Upload Dropzone */}
      <label
        tabIndex={disabled ? -1 : 0}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex flex-col items-center justify-center w-full h-36 border border-dashed rounded-2xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
          disabled
            ? "cursor-not-allowed opacity-60 pointer-events-none"
            : "cursor-default",
          isDragging
            ? "border-foreground bg-muted/30"
            : "border-border bg-card hover:border-foreground/40"
        )}
      >
        <div className="flex flex-col items-center justify-center pt-4 pb-4 px-4 text-center">
          <Upload
            className={cn(
              "size-6 mb-2 transition-transform duration-200",
              isDragging ? "scale-110 text-foreground" : "text-muted-foreground"
            )}
          />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {t("uploadProjectImages")}
            </span>
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            {t("uploadProjectImagesSub")}
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={disabled}
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {/* Gallery Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {value.map((img, idx) => (
            <div
              key={img.id || `${img.previewUrl}-${idx}`}
              className={cn(
                "relative group w-full h-32 rounded-2xl overflow-hidden border transition-all duration-200 bg-card",
                img.is_primary ? "ring-2 ring-foreground border-foreground" : "border-border"
              )}
            >
              <Image
                src={img.previewUrl}
                alt={`Project image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized={img.previewUrl.startsWith("blob:")}
                className="object-cover"
              />

              {/* Primary Badge Action */}
              <button
                type="button"
                onClick={() => setPrimaryImage(idx)}
                disabled={disabled}
                aria-label={img.is_primary ? t("primaryImage") : t("setAsPrimary")}
                className={cn(
                  "absolute top-2.5 inset-s-2.5 p-1.5 rounded-full transition-colors cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
                  img.is_primary
                    ? "bg-foreground text-background"
                    : "bg-[#111111]/70 dark:bg-[#ffffff]/70 text-white dark:text-[#111111] hover:bg-foreground hover:text-background"
                )}
              >
                {img.is_primary ? <Star className="size-3.5 fill-current" /> : <Star className="size-3.5" />}
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeImage(idx)}
                disabled={disabled}
                aria-label={t("removeImage")}
                className="absolute top-2.5 inset-e-2.5 bg-[#111111]/70 dark:bg-[#ffffff]/70 text-white dark:text-[#111111] hover:bg-foreground hover:text-background p-1.5 rounded-full transition-colors disabled:opacity-50 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
              >
                <X className="size-3.5" />
              </button>

              {/* Primary Indicator Tag */}
              {img.is_primary && (
                <span className="absolute bottom-2.5 inset-s-2.5 bg-foreground text-background text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {t("primaryImage")}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
