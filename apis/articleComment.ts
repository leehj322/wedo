import { fetchExtendedForm } from "@/apis/fetchExtended";

export async function postArticleComment(
  articleId: number,
  param: {
    content: string;
  },
): Promise<{
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
}> {
  const res = await fetchExtendedForm(`/articles/${articleId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });

  const data = await res.json();

  return data;
}
