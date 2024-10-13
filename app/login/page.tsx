/* eslint-disable no-console */
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export default async function LoginPage() {
  async function postSignIn(formData: FormData) {
    "use server";

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

  return (
    <div>
      <form action={postSignIn}>
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="email" defaultValue="" />
        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="text" defaultValue="" />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
