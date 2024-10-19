import { ImageUploadResponse } from "@/dtos/ImageDtos";

import { fetchExtendedForm } from "./fetchExtended";

export async function uploadImage(
  imageFile: File,
): Promise<ImageUploadResponse> {
  const { size } = imageFile;

  if (size / (1024 * 1024) >= 10) {
    throw new Error("이미지 파일의 용량이 10MB를 넘을 수 없습니다.");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await fetchExtendedForm(
    `${process.env.NEXT_PUBLIC_BASE_URL}/8-7/images/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}
