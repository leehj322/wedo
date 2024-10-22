"use client";

import { useState, useRef, ChangeEvent, MouseEvent } from "react";

import { cva } from "class-variance-authority";
import Image from "next/image";

import { cn } from "@/lib/utils";
import Plus from "@/public/svg/plus.svg";
import X from "@/public/svg/x.svg";

const variant = cva(["flex items-center justify-center", "size-full"], {
  variants: {
    Variant: {
      Create: "flex-col gap-y-3",
      Delete: "pointer-events-auto absolute left-0 top-0",
    },
  },
});

export default function ImagePreviewInput() {
  const [preview, setPreview] = useState<string | null>(null);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  };

  const handleDeleteImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    URL.revokeObjectURL(preview!);
    fileInput.current!.value = "";

    setPreview(null);
  };

  return (
    <label
      htmlFor="ImagePreviewImageInput"
      className={`md-medium flex size-fit flex-col gap-y-4 tab:lg-medium ${preview && "pointer-events-none"}`}
    >
      이미지
      <input
        type="file"
        accept="image/*"
        name="image"
        id="ImagePreviewImageInput"
        className="hidden"
        ref={fileInput}
        onChange={handleChangeImage}
      />
      <div className="relative size-40 overflow-hidden rounded-xl bg-input-default tab:size-60">
        {preview && <Image src={preview} alt="프리뷰 이미지" fill />}

        <button
          type="button"
          aria-label="프리뷰 생성/삭제"
          className={cn(variant({ Variant: preview ? "Delete" : "Create" }))}
          onClick={
            preview
              ? handleDeleteImage
              : () => {
                  fileInput.current!.click();
                }
          }
        >
          {preview ? (
            <X width={48} height={48} color="#CBD5E1" />
          ) : (
            <>
              <Plus width={48} height={48} color="#9CA3AF" />

              <p className="md-normal text-gray-400 tab:lg-normal">
                이미지 등록
              </p>
            </>
          )}
        </button>
      </div>
    </label>
  );
}
