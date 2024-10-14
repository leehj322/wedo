import localFont from "next/font/local";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";
import Providers from "./providers";

import type { Metadata } from "next";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "WeDo",
  description: "WeDo - 팀과 함께 하는 협업",
};

export default function RootLayout({
  children,
  params: { session },
}: Readonly<{
  children: React.ReactNode;
  params: { session: Session };
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
