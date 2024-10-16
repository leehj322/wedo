"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/@common/Button";
import { postSignInAction } from "@/apis/action";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function LoginPage() {
  const signInOAuth = (provider: "google" | "kakao") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div>
      <form action={postSignInAction}>
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="email" defaultValue="" />
        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="text" defaultValue="" />
        <button type="submit">로그인</button>
      </form>
      <Button onClick={() => signInOAuth("google")}>구글 로그인</Button>
    </div>
  );
}
