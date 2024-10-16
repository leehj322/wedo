/* eslint-disable no-console */

"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export async function postSignInAction(formData: FormData) {
  let shouldRedirect = false;
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    shouldRedirect = true;
  } catch (error) {
    console.log({ error });
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.log("Invalid credentials.");
          break;
        default:
          console.log("Something went wrong.");
          break;
      }
    }
    console.log("unknown");
    return;
  }
  if (shouldRedirect) redirect("/");
}
