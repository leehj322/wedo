import Link from "next/link";
import { useParams } from "next/navigation";

import { useUserGroups } from "@/hooks/querys/user";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/ui/navigation-menu";

export default function NavigationMenuGroups() {
  const { data: groups } = useUserGroups();
  const { teamid: teamId } = useParams();

  return (
    <NavigationMenu className={cn(teamId ?? "hidden")}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            <span className="lg-medium">
              {groups?.filter(({ id }) => id === Number(teamId))[0]?.name ??
                "temp"}
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {groups?.length &&
              groups.map(({ id, name }) => (
                <Link
                  key={`${name + id}notMobile`}
                  href={`/${id}`}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {name}
                  </NavigationMenuLink>
                </Link>
              ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
