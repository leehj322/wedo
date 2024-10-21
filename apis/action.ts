"use server";

import { cookies } from "next/headers";

import { postSignIn } from "./auth";

export type LoginState = {
  status: string;
  message?: string;
  error?: unknown;
};

export async function actionSignIn(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const cookieStore = cookies();
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await postSignIn({ email, password });
    cookieStore.set("accessToken", res.accessToken);
    cookieStore.set("refreshToken", res.refreshToken);
  } catch (error) {
    if (error instanceof Error)
      return { status: "API_ERROR", message: error.message };
    throw new Error("unknown");
  }
  return { status: "SUCCESS" };
}
