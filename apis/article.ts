import { fetchExtendedForm } from "@/apis/fetchExtended";

export async function postArticle(param: {
  title: string;
  content: string;
  image?: string;
}): Promise<{
  id: number;
  title: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  writer: { id: number; nickname: string };
  likeCount: number;
}> {
  const res = await fetchExtendedForm("/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });

  const data = await res.json();

  return data;
}
