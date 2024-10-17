"use client";

import { actionSignIn } from "@/apis/action";

export default function LoginPage() {
  return (
    <div>
      <form action={actionSignIn}>
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="email" defaultValue="" />
        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="text" defaultValue="" />
        <button type="submit">로그인</button>
        <button className="h-10 w-20 bg-gray-500">카카오 로그인</button>
      </form>
    </div>
  );
}
