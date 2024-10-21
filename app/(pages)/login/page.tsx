import Image from "next/image";
import Link from "next/link";

import Container from "@/@common/container/Container";
import LoginForm from "@/components/auth/login/LoginForm";
import GoogleIcon from "@/public/images/google.png";
import KakaoIcon from "@/public/images/kakao.png";
import { Separator } from "@/ui/separator";

export const GOOGLE_OAUTH_PARAMS = {
  client_id: process.env.GOOGLE_CLIENT_ID!,
  redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
  response_type: "code",
  scope: "openid profile email",
};

export const KAKAO_OAUTH_PARAMS = {
  client_id: process.env.KAKAO_CLIENT_ID!,
  redirect_uri: process.env.KAKAO_REDIRECT_URI!,
  response_type: "code",
  scope: "openid,profile_image,profile_nickname",
};

export default function LoginPage() {
  const google = new URLSearchParams(GOOGLE_OAUTH_PARAMS);
  const kakao = new URLSearchParams(KAKAO_OAUTH_PARAMS);

  return (
    <Container background="lightBeige">
      <div className="mx-auto mt-6 flex max-w-[460px] flex-col items-center justify-center pb-20 tab:mt-[100px] pc:mt-[140px]">
        <h1 className="2xl-medium pc:4xl-medium">로그인</h1>
        <LoginForm />
        <div className="relative mt-6 h-full w-full tab:mt-11">
          <Separator className="my-2 bg-brand-border" />
          <div className="lg-medium absolute left-1/2 right-1/2 top-0 z-10 flex w-[60px] -translate-x-1/2 items-center justify-center bg-primary-light">
            OR
          </div>
        </div>
        <div className="mt-4 flex w-full items-center gap-4">
          <span className="lg-medium grow">간편 회원가입하기</span>
          <Link
            className="flex items-center justify-center rounded-full border bg-white"
            href={`https://accounts.google.com/o/oauth2/v2/auth?${google}`}
          >
            <Image
              width={42}
              height={42}
              src={GoogleIcon}
              alt="login to google"
            />
          </Link>
          <Link
            className="flex items-center justify-center rounded-full border bg-yellow-300"
            href={`https://kauth.kakao.com/oauth/authorize?${kakao}`}
          >
            <Image
              width={42}
              height={42}
              src={KakaoIcon}
              alt="login to kakao"
            />
          </Link>
        </div>
      </div>
    </Container>
  );
}
