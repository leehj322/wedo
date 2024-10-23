import Image from "next/image";

import { TasksResponse } from "@/dtos/TaskDtos";
import { formatToKorDate } from "@/utils/convertDate";

interface TaskListProps {
  task: TasksResponse;
}

function getFrequencyType(frequency: string): string {
  switch (frequency) {
    case "ONCE":
      return "반복 없음";
    case "DAILY":
      return "매일 반복";
    case "WEEKLY":
      return "주 반복";
    case "MONTHLY":
      return "일 반복";
    default:
      return frequency;
  }
}

export default function TaskList({ task }: TaskListProps) {
  return (
    <article className="flex w-full flex-col gap-2.5 rounded-xl bg-dropDown-default px-3.5 py-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Image
            width={24}
            height={24}
            src="/images/checkbox.png"
            alt="체크박스"
          />
          <h2 className="text-md">{task.name}</h2>
        </div>
        <div className="flex items-center gap-0.5">
          <Image
            width={16}
            height={16}
            src="/images/comment.png"
            alt="댓글 아이콘"
          />
          {task.commentCount > 0 ? (
            <p className="text-xs">{task.commentCount}</p>
          ) : (
            <p className="text-xs">댓글이 없습니다.</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Image
            width={16}
            height={16}
            src="/images/icon_calendar.png"
            alt="달력 아이콘"
          />
          <p className="text-xs">{formatToKorDate(task.date)}</p>
        </div>
        <span className="block h-[9px] w-[1px] bg-primary-dark" />
        <div className="flex items-center gap-1.5">
          <Image
            width={16}
            height={16}
            src="/images/icon_repeat.png"
            alt="반복 아이콘"
          />
          <p className="text-xs">{getFrequencyType(task.frequency)}</p>
        </div>
      </div>
    </article>
  );
}
