"use client";

import Image from "next/image";

import { Member } from "@/dtos/GroupDtos";
import Kebab from "@/public/svg/kebab.svg";
import { useGetTeam } from "@/queries/group";

interface CardProps {
  member: Member;
}

function MobileMemberCard({ member }: CardProps) {
  return (
    <div className="flex h-[68px] items-center justify-between rounded-2xl bg-brand-secondary-light px-6 py-3 tab:h-[73px]">
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2">
          <Image
            width={24}
            height={24}
            src={
              member.userImage
                ? member.userImage
                : "/images/team_page_default_user_pfp.png"
            }
            alt="유저 프로필 이미지"
          />
          <div className="md-medium truncate text-default-light">
            {member.userName}
          </div>
        </div>
        <div className="md-medium truncate text-subText">
          {member.userEmail}
        </div>
      </div>
      <Kebab className="shrink-0" width="16" height="16" />
    </div>
  );
}

function PcMemberCard({ member }: CardProps) {
  return (
    <div className="flex h-[68px] items-center justify-between rounded-2xl bg-brand-secondary-light px-6 py-3 tab:h-[73px]">
      <div className="flex min-w-0 gap-3">
        <Image
          width={32}
          height={32}
          src={
            member.userImage
              ? member.userImage
              : "/images/team_page_default_user_pfp.png"
          }
          alt="유저 프로필 이미지"
        />
        <div className="min-w-0">
          <div className="md-medium truncate text-default-light">
            {member.userName}
          </div>
          <div className="md-medium truncate text-subText">
            {member.userEmail}
          </div>
        </div>
      </div>
      <Kebab className="shrink-0" width="16" height="16" />
    </div>
  );
}

interface TeamMemberListProps {
  isAdmin: boolean;
  groupId: number;
}

export default function TeamMemberList({
  isAdmin,
  groupId,
}: TeamMemberListProps) {
  const { data } = useGetTeam(groupId);

  const teamMembers = data?.members || [];
  const numberOfMembers = teamMembers.length;

  return (
    <>
      <h2 className="mb-4 flex items-center justify-between pc:mb-5">
        <div className="text-[18px]/[19px] font-semibold text-default-light">
          멤버
          <span className="lg-normal ml-2 text-default-light opacity-80">
            {`(${numberOfMembers}명)`}
          </span>
        </div>
        {isAdmin && (
          <button className="md-medium text-brand-active">
            + 새로운 멤버 초대하기
          </button>
        )}
      </h2>
      <div className="pc-and-tablet-grid hidden grid-cols-3 gap-6 tab:grid">
        {teamMembers.map((member) => (
          <PcMemberCard key={member.userEmail} member={member} />
        ))}
      </div>
      <div className="mobile-grid grid grid-cols-2 gap-6 tab:hidden">
        {teamMembers.map((member) => (
          <MobileMemberCard key={member.userEmail} member={member} />
        ))}
      </div>
    </>
  );
}
