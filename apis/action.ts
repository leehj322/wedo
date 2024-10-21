"use server";

import { cookies } from "next/headers";

import { postSignIn, postSignUp } from "./auth";

export type State = {
  status: string;
  message?: string;
  error?: unknown;
};

export async function actionSignUp(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const cookieStore = cookies();
  try {
    const email = formData.get("email") as string;
    const nickname = formData.get("nickname") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("passwordConfirmation") as string;
    const res = await postSignUp({
      email,
      nickname,
      password,
      passwordConfirmation,
    });
    cookieStore.set("accessToken", res.accessToken);
    cookieStore.set("refreshToken", res.refreshToken);
  } catch (error) {
    if (error instanceof Error)
      return { status: "API_ERROR", message: error.message };
    throw new Error("unknown");
  }
  return { status: "SUCCESS" };
}

export async function actionSignIn(
  prevState: State,
  formData: FormData,
): Promise<State> {
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
