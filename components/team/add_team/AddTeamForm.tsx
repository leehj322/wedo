import Image from "next/image";

import { Button } from "@/components/@common/Button";
import Input from "@/components/@common/Input";

export default function AddTeamForm() {
  return (
    <form>
      <div className="pc:text-center">
        <label
          htmlFor="teamPfp"
          className="inline-block cursor-pointer pc:mx-auto"
        >
          <h3 className="lg-medium text-default-light pc:hidden">팀 프로필</h3>
          <div className="relative mb-6 mt-3 h-[64px] w-[64px] pc:h-[147px] pc:w-[147px]">
            <Image
              fill
              src="/images/team_pfp_register.png"
              alt="팀 이미지 등록"
            />
          </div>
        </label>
      </div>
      <input id="teamPfp" type="file" className="hidden" />
      <label htmlFor="token">
        <h3 className="lg-medium text-default-light">팀 이름</h3>
      </label>
      <Input
        id="token"
        placeholder="팀 이름을 입력해주세요."
        className="mt-3"
      />
      <Button className="mb-6 mt-6 w-full" type="submit">
        생성하기
      </Button>
    </form>
  );
}
