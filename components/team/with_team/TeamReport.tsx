import Image from "next/image";

export default function TeamReport() {
  return (
    <>
      <h2 className="mb-4 text-[18px]/[19px] font-semibold text-default-light">
        리포트
      </h2>
      <div className="flex h-[224px] items-center justify-between rounded-[20px] bg-dropDown-default px-6 py-4">
        <div className="flex gap-11">
          <div>리포트 그래프</div>
          <div>
            <div className="md-medium text-default-light">
              오늘의
              <br />
              진행 상황
            </div>
            <div className="4xl-bold text-brand-active">25%</div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex w-[142px] items-center justify-between rounded-xl bg-brand-secondary-light px-4 py-4 tab:w-[280px] pc:w-[400px]">
            <div>
              <div className="xs-medium mb-1 text-default-light tab:md-medium">
                오늘의 할 일
              </div>
              <div className="2xl-bold text-default-light">20개</div>
            </div>
            <Image
              width={44}
              height={44}
              src="/images/team_page_default_user_pfp.png"
              alt="오늘의 할 일"
            />
          </div>
          <div className="flex w-[142px] items-center justify-between rounded-xl bg-brand-secondary-light px-4 py-4 tab:w-[280px] pc:w-[400px]">
            <div>
              <div className="xs-medium mb-1 text-default-light tab:md-medium">
                한 일
              </div>
              <div className="2xl-bold text-default-light">5개</div>
            </div>
            <Image
              width={44}
              height={44}
              src="/images/team_page_done.png"
              alt="한 일"
            />
          </div>
        </div>
      </div>
    </>
  );
}
