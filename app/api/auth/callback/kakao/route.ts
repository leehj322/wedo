import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { postSignInKakao } from "@/apis/auth";

export async function GET(req: Request) {
  const newUrl = new URL(req.url as string);
  const code = newUrl.searchParams.get("code")!;
  const loginRes = await postSignInKakao({
    token: code,
    redirectUri: "http://localhost:3000/api/auth/callback/kakao",
  });
  const cookieStore = cookies();
  cookieStore.set("accessToken", loginRes.accessToken);
  cookieStore.set("refreshToken", loginRes.refreshToken);
  cookieStore.set("user", JSON.stringify(loginRes.user));
  redirect("/");
}
