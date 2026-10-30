"use client";

import { useState, useRef } from "react";
import React from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { uploadStorageImage } from "@/lib/upload";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onError?: (message: string) => void;
  bucket?: string;
  folder?: string;
  disabled?: boolean;
}

export function ImageUploader({
  value = "",
  onChange,
  onError,
  bucket = "profile_media",
  disabled = false,
}: ImageUploaderProps) {
  const t = useTranslations("Admin");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    if (!file.type.startsWith("image/")) {
      onError?.(t("invalidImageFile"));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      onError?.(t("imageTooLarge"));
      return;
    }

    setUploading(true);
    try {
      const result = await uploadStorageImage(file, bucket);

      if (result.error) {
        onError?.(t("uploadError"));
        return;
      }

      if (result.publicUrl) {
        onChange(result.publicUrl);
      }
    } catch {
      onError?.(t("uploadError"));
    } finally {
      setUploading(false);
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
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

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLLabelElement>) {
    if ((e.key === "Enter" || e.key === " ") && !disabled && !uploading) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }

  function handleRemoveImage() {
    onChange("");
  }

  return (
    <div>
      {value ? (
        <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-border bg-card">
          <Image
            src={value}
            alt="Uploaded Preview"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={disabled}
            aria-label={t("removeImage")}
            className="absolute top-3 inset-e-3 bg-[#111111]/80 hover:bg-[#111111] dark:bg-[#ffffff]/80 dark:hover:bg-[#ffffff] text-white dark:text-[#111111] p-1.5 rounded-full transition-colors disabled:opacity-50 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <label
          tabIndex={disabled || uploading ? -1 : 0}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex flex-col items-center justify-center w-full h-40 border border-dashed rounded-2xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
            disabled || uploading
              ? "cursor-not-allowed opacity-60 pointer-events-none"
              : "cursor-default",
            isDragging
              ? "border-foreground bg-muted/30"
              : "border-border bg-card hover:border-foreground/40"
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
            {uploading ? (
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                <Loader2 className="size-5 animate-spin text-foreground" />
                <span>{t("uploadingImage")}</span>
              </div>
            ) : (
              <>
                <Upload
                  className={cn(
                    "size-6 mb-2.5 transition-transform duration-200",
                    isDragging ? "scale-110 text-foreground" : "text-muted-foreground"
                  )}
                />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {t("uploadProfileImage")}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {t("uploadProfileImageSub")}
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            disabled={disabled || uploading}
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
