import { getUser } from "@/apis/user";
import NoTeam from "@/components/team/no_team/NoTeam";

export default async function TeamPage() {
  const res = await getUser();
  const hasTeam = res.memberships.length !== 0;

  return hasTeam ? <div className="pt-[84px]">팀있음</div> : <NoTeam />;
}
