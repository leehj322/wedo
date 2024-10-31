"use server";

import { revalidatePath } from "next/cache";

import { postArticleLike, deleteArticleLike } from "@/apis/article";

export default async function actionPatchLike(
  articleId: number,
  isLike: boolean,
) {
  switch (isLike) {
    case true:
      await postArticleLike(articleId);

      break;

    case false:
      await deleteArticleLike(articleId);

      break;

    // no default
  }

  revalidatePath("/", "layout");
}