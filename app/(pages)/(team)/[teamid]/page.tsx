import { getUser } from "@/apis/user";

export default async function TeamPage() {
  const res = await getUser();
  const hasTeam = res.memberships.length !== 0;

  return hasTeam ? (
    <div className="pt-[84px]">팀있음</div>
  ) : (
    <div className="pt-[84px]">팀없음</div>
  );
}
