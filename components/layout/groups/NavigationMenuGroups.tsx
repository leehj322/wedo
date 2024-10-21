"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/@common/dropdown/NavigationMenu";
import { Button } from "@/components/@common/Button";
import { UserGroupsResponse } from "@/dtos/UserDtos";
import { cn } from "@/lib/utils";

export default function NavigationMenuGroups({
  groups,
}: {
  groups: UserGroupsResponse[];
}) {
  const { teamid: teamId } = useParams();

  const foundGroupName =
    Array.isArray(groups) &&
    groups.find(({ id }) => id === Number(teamId))?.name;

  return (
    <NavigationMenu
      className={cn("h-[32px]", Number.isNaN(Number(teamId)) && "hidden")}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          {foundGroupName && (
            <NavigationMenuTrigger className="bg-transparent">
              <span className="lg-medium">{foundGroupName}</span>
            </NavigationMenuTrigger>
          )}
          <NavigationMenuContent className="flex flex-col gap-2 bg-primary-light p-4">
            {groups &&
              groups.map(({ id, name, image }) => (
                <Link
                  key={`${name + id}notMobile`}
                  href={`/${id}`}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "2xl-medium m-0 flex h-full w-[186px] justify-start gap-3 bg-transparent p-2 hover:bg-brand-secondary-light",
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
                  </NavigationMenuLink>
                </Link>
              ))}
            <Link href="/addteam">
              <Button
                variant="outlinedSecondary"
                className="mt-3 w-full border-0 text-[#222222] shadow-[rgb(0,0,0,0.1)_0px_3px_10px_1px]"
              >
                팀 추가하기
              </Button>
            </Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport className="border-0 bg-primary-light" />
    </NavigationMenu>
  );
}
