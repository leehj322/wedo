import Image from "next/image";

export default function NoTeamImage() {
  return (
    <div className="mx-auto px-1 tab:px-[88px] pc:h-[252px] pc:w-[810px] pc:px-0">
      <div className="relative pb-[31%]">
        <Image fill src="/images/no_team.png" alt="팀 없음 이미지" />
      </div>
    </div>
  );
}
