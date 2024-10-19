import Image from "next/image";

import Kebab from "@/public/svg/kebab.svg";

const USER_INFO = [
  {
    userImage: null,
    userName: "강미희",
    userEmail: "Mihee123123123@naver.com",
  },
  { userImage: null, userName: "강미희", userEmail: "Mihee@naver.com" },
  { userImage: null, userName: "강미희", userEmail: "Mihee@naver.com" },
  { userImage: null, userName: "강미희", userEmail: "Mihee@naver.com" },
  { userImage: null, userName: "강미희", userEmail: "Mihee@naver.com" },
  { userImage: null, userName: "강미희", userEmail: "Mihee@naver.com" },
];

interface TeamMemberListProps {
  isAdmin: boolean;
}

export default function TeamMemberList({ isAdmin }: TeamMemberListProps) {
  return (
    <>
      <h2 className="mb-4 flex items-center justify-between pc:mb-5">
        <div className="text-[18px]/[19px] font-semibold text-default-light">
          멤버
          <span className="lg-normal ml-2 text-default-light opacity-80">
            (6명)
          </span>
        </div>
        {isAdmin && (
          <button className="md-medium text-brand-active">
            + 새로운 멤버 초대하기
          </button>
        )}
      </h2>
      <div className="not-mobile-grid hidden grid-cols-3 gap-6 tab:grid">
        {USER_INFO.map((user) => (
          <div
            key={user.userEmail}
            className="flex h-[68px] items-center justify-between rounded-2xl bg-brand-secondary-light px-6 py-3 tab:h-[73px]"
          >
            <div className="flex min-w-0 gap-3">
              <Image
                width={32}
                height={32}
                src={
                  user.userImage
                    ? user.userImage
                    : "/images/team_page_default_user_pfp.png"
                }
                alt="유저 프로필 이미지"
              />
              <div className="min-w-0">
                <div className="md-medium truncate text-default-light">
                  {user.userName}
                </div>
                <div className="md-medium truncate text-subText">
                  {user.userEmail}
                </div>
              </div>
            </div>
            <Kebab className="shrink-0" width="16" height="16" />
          </div>
        ))}
      </div>
      <div className="mobile-grid grid grid-cols-2 gap-6 tab:hidden">
        {USER_INFO.map((user) => (
          <div
            key={user.userEmail}
            className="flex h-[68px] items-center justify-between rounded-2xl bg-brand-secondary-light px-6 py-3 tab:h-[73px]"
          >
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <Image
                  width={24}
                  height={24}
                  src={
                    user.userImage
                      ? user.userImage
                      : "/images/team_page_default_user_pfp.png"
                  }
                  alt="유저 프로필 이미지"
                />
                <div className="md-medium truncate text-default-light">
                  {user.userName}
                </div>
              </div>
              <div className="md-medium truncate text-subText">
                {user.userEmail}
              </div>
            </div>
            <Kebab className="shrink-0" width="16" height="16" />
          </div>
        ))}
      </div>
    </>
  );
}
