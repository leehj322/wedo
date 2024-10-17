import { PropsWithChildren } from "react";

import HeaderLayout from "@/components/layout/HeaderLayout";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <HeaderLayout />
      <main>{children}</main>
    </>
  );
}
