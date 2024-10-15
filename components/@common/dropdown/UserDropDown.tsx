import { ReactNode } from "react";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown";

interface MyMenuDropDown {
  children: ReactNode;
  onLogoutHandler: () => void;
}

export default function UserDropDown({
  children,
  onLogoutHandler,
}: MyMenuDropDown) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>{children}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[120px] rounded-xl border border-dropDown-border bg-dropDown-secondary p-0 pc:min-w-[135px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <Link
              href="/history"
              className="inline-block w-full py-3 text-center text-md duration-300 hover:bg-dropDown-default pc:text-lg"
            >
              마이 히스토리
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Link
              href="/mypage"
              className="inline-block w-full py-3 text-center text-md duration-300 hover:bg-dropDown-default pc:text-lg"
            >
              계정 설정
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Link
              href="/team/join"
              className="inline-block w-full py-3 text-center text-md duration-300 hover:bg-dropDown-default pc:text-lg"
            >
              팀 참여
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0" onClick={onLogoutHandler}>
            <button className="w-full py-3 text-md duration-300 hover:bg-dropDown-default pc:text-lg">
              로그아웃
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
