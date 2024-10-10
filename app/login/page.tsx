/* eslint-disable no-console */
import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export default async function LoginPage() {
  async function postSignIn(formData: FormData) {
    "use server";

    try {
      await signIn("credentials", formData);
    } catch (error) {
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
    }
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
