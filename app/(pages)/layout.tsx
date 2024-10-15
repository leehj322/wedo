import { PropsWithChildren } from "react";

import HeaderLayout from "@/components/layout/HeaderLayout";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <HeaderLayout />
      <div className="pt-[70px]">{children}</div>
    </div>
  );
}
