import Container from "@/components/@common/container/Container";

import NoTeamActions from "./NoTeamActions";
import NoTeamImage from "./NoTeamImage";

export default function NoTeam() {
  return (
    <Container background="lightBeige">
      <div className="pb-[100px] pt-[186px] tab:pt-[272px] pc:pt-[212px]">
        <NoTeamImage />
        <div className="lg-medium mb-12 mt-12 flex flex-col gap-1 text-center text-default-dark tab:mb-20">
          <p>아직 소속된 팀이 없습니다</p>
          <p>팀을 생성하거나 팀에 참여해보세요.</p>
        </div>
        <NoTeamActions />
      </div>
    </Container>
  );
}
