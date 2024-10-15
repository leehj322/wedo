"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useUserGroups } from "@/hooks/querys/user";
import { cn } from "@/lib/utils";
import Burger from "@/public/svg/burger";
import { navigationMenuTriggerStyle } from "@/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";

export default function SheetGroups() {
  const { data: groups } = useUserGroups();
  const { teamid: teamId } = useParams();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Burger color="gray" />
      </SheetTrigger>
      <SheetContent side="left" className="w-1/2 px-2">
        <SheetHeader className="pl-4">
          <SheetTitle>그룹 목록</SheetTitle>
        </SheetHeader>
        <ul className="mt-10 flex flex-col gap-3">
          {groups?.length &&
            groups.map(({ id, name, image }) => (
              <Link
                key={`${name + id}mobile`}
                href={`/${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "2xl-medium m-0 flex h-full w-full justify-start gap-3 p-2 hover:bg-brand-secondary-light",
                  id === Number(teamId) && "bg-brand-header",
                )}
              >
                <Image
                  className="rounded-md"
                  width={32}
                  height={32}
                  src={image ?? ""}
                  alt="그룹 이미지"
                />
                <span className="lg-medium">{name}</span>
              </Link>
            ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
