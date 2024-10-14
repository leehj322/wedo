"use client";

import { useState } from "react";

import Link from "next/link";

import { useUserGroups } from "@/hooks/querys/user";
import Burger from "@/public/svg/burger";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";

export default function SheetGroups() {
  const { data: groups } = useUserGroups();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Burger color="gray" />
      </SheetTrigger>
      <SheetContent side="left">
        <ul className="mt-10">
          {groups?.length &&
            groups.map(({ id, name }) => (
              <Link
                key={`${name + id}mobile`}
                href={`/${id}`}
                onClick={() => setOpen(false)}
              >
                {name}
              </Link>
            ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
