"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { postSignIn } from "./auth";

export async function actionSignIn(formData: FormData) {
  const cookieStore = cookies();
  let shouldRedirect = false;
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await postSignIn({ email, password });
    cookieStore.set("accessToken", res.accessToken);
    cookieStore.set("refreshToken", res.refreshToken);
    shouldRedirect = true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
  }
  if (shouldRedirect) {
    redirect("/");
  }
}

export const actionGoogleSignIn = async () => {
  const googleParams = {
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `http://localhost:3000/api/auth/callback/google`,
    response_type: "code",
    scope: "openid profile email",
  };
  const params = new URLSearchParams(googleParams);
  redirect(`https://accounts.google.com/o/oauth2/auth?${params}`);
};
