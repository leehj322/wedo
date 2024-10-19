import Kebab from "@/public/svg/kebab.svg";
import ProgressCircle from "@/public/svg/progress.svg";

const TODO_LIST = [
  { name: "법인 설립" },
  { name: "변경 등기" },
  { name: "정기 주총" },
  { name: "법인 확인" },
];

interface TeamTodoListProps {
  isAdmin: boolean;
}

export default function TeamTodoList({ isAdmin }: TeamTodoListProps) {
  return (
    <>
      <h2 className="mb-4 flex items-center justify-between pc:mb-5">
        <div className="text-[18px]/[19px] font-semibold text-default-light">
          할 일 목록
          <span className="lg-normal ml-2 text-default-light opacity-80">
            (4개)
          </span>
        </div>
        {isAdmin && (
          <button className="md-medium text-brand-active">
            + 새로운 목록 추가하기
          </button>
        )}
      </h2>
      <div className="flex flex-col gap-4">
        {TODO_LIST.map((todo) => (
          <div key={todo.name} className="relative flex">
            <div className="h-10 w-3 shrink-0 rounded-l-[10px] bg-[#a855f7]" />
            <div className="md-medium flex h-10 w-full min-w-0 items-center justify-between rounded-r-[10px] bg-dropDown-default pl-3 pr-2 text-default-light">
              <p className="truncate pr-2">{todo.name}</p>
              <div className="flex shrink-0 items-center">
                <div className="flex h-[25px] items-center justify-between gap-1 rounded-full bg-brand-secondary-light px-2 py-1">
                  <ProgressCircle />
                  <div>3/5</div>
                </div>
                <Kebab width="16" height="16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
