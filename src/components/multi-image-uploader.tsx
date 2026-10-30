"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { uploadStorageImage } from "@/lib/upload";
import { cn } from "@/lib/utils";

export interface UploadedImage {
  url: string;
  is_primary: boolean;
}

interface MultiImageUploaderProps {
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  onError: (message: string) => void;
  bucket?: string;
  folder?: string;
  disabled?: boolean;
}

export function MultiImageUploader({
  value = [],
  onChange,
  onError,
  bucket = "project_media",
  disabled = false,
}: MultiImageUploaderProps) {
  const t = useTranslations("Admin");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function processFiles(files: FileList | File[]) {
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) {
      onError(t("invalidImageFile"));
      return;
    }

    const oversizedFiles = validFiles.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      onError(t("imageTooLarge"));
      return;
    }

    setUploading(true);
    const newUploadedImages: UploadedImage[] = [];

    try {
      for (const file of validFiles) {
        const result = await uploadStorageImage(file, bucket);
        if (result.error) {
          onError(t("uploadError"));
        } else if (result.publicUrl) {
          newUploadedImages.push({
            url: result.publicUrl,
            is_primary: false,
          });
        }
      }

      if (newUploadedImages.length > 0) {
        const updatedList = [...value, ...newUploadedImages];
        // If no image is marked as primary, make the first one primary
        const hasPrimary = updatedList.some((img) => img.is_primary);
        if (!hasPrimary && updatedList.length > 0) {
          updatedList[0].is_primary = true;
        }
        onChange(updatedList);
      }
    } catch {
      onError(t("uploadError"));
    } finally {
      setUploading(false);
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !uploading) {
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

    if (disabled || uploading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLLabelElement>) {
    if ((e.key === "Enter" || e.key === " ") && !disabled && !uploading) {
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
        tabIndex={disabled || uploading ? -1 : 0}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex flex-col items-center justify-center w-full h-36 border border-dashed rounded-2xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
          disabled || uploading
            ? "cursor-not-allowed opacity-60 pointer-events-none"
            : "cursor-default",
          isDragging
            ? "border-foreground bg-muted/30"
            : "border-border bg-card hover:border-foreground/40"
        )}
      >
        <div className="flex flex-col items-center justify-center pt-4 pb-4 px-4 text-center">
          {uploading ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
              <Loader2 className="size-5 animate-spin text-foreground" />
              <span>{t("uploadingImages")}</span>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={disabled || uploading}
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {/* Gallery Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {value.map((img, idx) => (
            <div
              key={`${img.url}-${idx}`}
              className={cn(
                "relative group w-full h-32 rounded-2xl overflow-hidden border transition-all duration-200 bg-card",
                img.is_primary ? "ring-2 ring-foreground border-foreground" : "border-border"
              )}
            >
              <Image
                src={img.url}
                alt={`Project image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
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
                <Star className="size-3.5 fill-current" />
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
