import Sawtooth from "@/public/svg/sawtooth.svg";

interface TeamTitleProps {
  isAdmin: boolean;
  groupId: number;
}

export default function TeamTitle({ isAdmin, groupId }: TeamTitleProps) {
  return (
    <div className="xl-bold flex h-[64px] justify-between rounded-xl bg-dropDown-default px-6 py-5 text-default-light">
      경영관리팀 {groupId}
      {isAdmin && <Sawtooth />}
    </div>
  );
}
