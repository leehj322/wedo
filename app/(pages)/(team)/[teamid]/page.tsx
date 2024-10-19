import { getTeamMember } from "@/apis/group";
import { getUser } from "@/apis/user";
import NoTeam from "@/components/team/no_team/NoTeam";
import WithTeam from "@/components/team/with_team/WithTeam";

export default async function TeamPage({
  params,
}: {
  params: { teamid: string };
}) {
  const res = await getUser();
  const hasTeam = res.memberships.length !== 0;

  if (!hasTeam) return <NoTeam />;

  const userId = res.id;
  const groupId = Number(params.teamid);
  // url로 본인이 member가 아닌 team에 접근하는 경우는 고려 안함
  // 이후에 별도의 ui를 통해서 처리해야할 필요가 있음
  // ex. 해당 url의 팀 아이디가 잘못된 경우 팀 선택 목록을 띄워주기
  const { role } = await getTeamMember({ groupId, memberUserId: userId });
  const isAdmin = role === "ADMIN";

  return <WithTeam isAdmin={isAdmin} groupId={groupId} />;
}
