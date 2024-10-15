"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import useDeviceType from "@/hooks/useDeviceType";
import NavigationMenuGroups from "@/layout/groups/NavigationMenuGroups";
import SheetGroups from "@/layout/groups/SheetGroups";
import Logo from "@/public/images/logo.png";

export default function GroupsResponsive() {
  const [isMobile] = useDeviceType();

  return (
    <nav className="flex grow items-center gap-4 tab:gap-8 pc:gap-10">
      {isMobile && <SheetGroups />}
      <Link href="/">
        <Image width={65} height={32} src={Logo} alt="로고" />
      </Link>
      {!isMobile && (
        <>
          <NavigationMenuGroups />
          <span>
            <Link href="/boards">자유게시판</Link>
          </span>
        </>
      )}
    </nav>
  );
}
