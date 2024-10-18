import { Button } from "@/components/@common/Button";
import Input from "@/components/@common/Input";
import Container from "@/components/@common/container/Container";

export default function JoinTeamPage() {
  return (
    <Container background="lightBeige">
      <div className="mx-auto pt-[72px] tab:w-[460px] tab:pt-[100px] pc:pt-[140px]">
        <h1 className="2xl-medium mb-6 text-center text-default-light pc:4xl-medium tab:mb-20">
          팀 참여하기
        </h1>
        <label htmlFor="token">
          <h3 className="lg-medium mb-3 text-default-light">팀 링크</h3>
        </label>
        <Input id="token" placeholder="팀 토큰을 입력해주세요." />
        <Button className="mb-6 mt-10 w-full">참여하기</Button>
        <p className="lg-normal text-center text-default-light">
          공유받은 팀 토큰을 입력해 참여할 수 있어요.
        </p>
      </div>
    </Container>
  );
}
