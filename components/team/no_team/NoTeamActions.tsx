import Link from "next/link";

import { Button } from "@/components/@common/Button";

export default function NoTeamActions() {
  return (
    <div className="mx-auto flex w-[186px] flex-col gap-4">
      <Button asChild>
        <Link href="/addteam">팀 생성하기</Link>
      </Button>
      <Button variant="outline" className="border-2">
        <Link href="/jointeam">팀 참여하기</Link>
      </Button>
    </div>
  );
}
