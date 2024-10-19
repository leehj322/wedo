import Container from "@/components/@common/container/Container";

interface WithTeamProps {
  isAdmin: boolean;
  groupId: number;
}

export default function WithTeam({ isAdmin, groupId }: WithTeamProps) {
  return (
    <Container background="white">{isAdmin && <div>{groupId}</div>}</Container>
  );
}
