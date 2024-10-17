import Link from "next/link";

import { actionSignIn } from "@/apis/action";

export default function LoginPage() {
  const googleParams = {
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `http://localhost:3000/api/auth/callback/google`,
    response_type: "code",
    scope: "openid profile email",
  };
  const google = new URLSearchParams(googleParams);

  return (
    <div>
      <form action={actionSignIn}>
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="email" defaultValue="" />
        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="text" defaultValue="" />
        <button type="submit">로그인</button>
        <Link
          className="w-30 h-10 bg-gray-500"
          href={`https://accounts.google.com/o/oauth2/auth?${google}`}
        >
          구글 로그인
        </Link>
      </form>
    </div>
  );
}
