"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ImageUploaderProps } from "@/lib/types";

export function ImageUploader({
  value = "",
  onSave,
  onCancel,
  onError,
  disabled = false,
}: ImageUploaderProps) {
  const t = useTranslations("Admin");
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [stagedPreview, setStagedPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URL on unmount or when stagedPreview changes
  useEffect(() => {
    return () => {
      if (stagedPreview && stagedPreview.startsWith("blob:")) {
        URL.revokeObjectURL(stagedPreview);
      }
    };
  }, [stagedPreview]);

  function processFile(file: File) {
    if (!file.type.startsWith("image/")) {
      onError?.(t("invalidImageFile"));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      onError?.(t("imageTooLarge"));
      return;
    }

    if (stagedPreview && stagedPreview.startsWith("blob:")) {
      URL.revokeObjectURL(stagedPreview);
    }

    setStagedFile(file);
    setStagedPreview(URL.createObjectURL(file));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
      e.target.value = "";
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isSaving) {
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

    if (disabled || isSaving) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLLabelElement>) {
    if ((e.key === "Enter" || e.key === " ") && !disabled && !isSaving) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }

  function handleDiscardStaged() {
    if (stagedPreview && stagedPreview.startsWith("blob:")) {
      URL.revokeObjectURL(stagedPreview);
    }
    setStagedFile(null);
    setStagedPreview(null);
    onCancel?.();
  }

  async function handleConfirmSave() {
    if (!stagedFile) return;
    setIsSaving(true);
    try {
      await onSave(stagedFile);
      if (stagedPreview && stagedPreview.startsWith("blob:")) {
        URL.revokeObjectURL(stagedPreview);
      }
      setStagedFile(null);
      setStagedPreview(null);
    } finally {
      setIsSaving(false);
    }
  }

  const currentPreview = stagedPreview || value;

  return (
    <div className="space-y-4">
      {stagedFile && currentPreview ? (
        /* Staged New Preview with Confirmation Buttons */
        <div className="space-y-3">
          <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-foreground/30 bg-card">
            <Image
              src={currentPreview}
              alt="New Avatar Preview"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              unoptimized={currentPreview.startsWith("blob:")}
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleDiscardStaged}
              disabled={isSaving}
              aria-label={t("cancel")}
              className="absolute top-3 inset-e-3 bg-[#111111]/80 hover:bg-[#111111] dark:bg-[#ffffff]/80 dark:hover:bg-[#ffffff] text-white dark:text-[#111111] p-1.5 rounded-full transition-colors disabled:opacity-50 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleConfirmSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-5 py-2 text-xs font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>{t("uploadingImage")}</span>
                </>
              ) : (
                <>
                  <Check className="size-3.5" />
                  <span>{t("saveAvatar")}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDiscardStaged}
              disabled={isSaving}
              className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-default"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      ) : (
        /* Empty / Dropzone State */
        <label
          tabIndex={disabled || isSaving ? -1 : 0}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex flex-col items-center justify-center w-full h-40 border border-dashed rounded-2xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
            disabled || isSaving
              ? "cursor-not-allowed opacity-60 pointer-events-none"
              : "cursor-default",
            isDragging
              ? "border-foreground bg-muted/30"
              : "border-border bg-card hover:border-foreground/40"
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
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
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            disabled={disabled || isSaving}
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
