import { TaskList } from "@/dtos/TaskLists";
import Kebab from "@/public/svg/kebab.svg";
import ProgressCircle from "@/public/svg/progress.svg";
import ProgressComplete from "@/public/svg/progress_complete.svg";
import { countDoneTaskList } from "@/utils/countDoneTask";

interface TeamTaskListCardProps {
  taskList: TaskList;
}

export default function TeamTaskListCard({ taskList }: TeamTaskListCardProps) {
  const doneTaskCount = countDoneTaskList(taskList);
  const totalTaskCount = taskList.tasks.length;

  // total task가 0이 아니고 완료된 작업이 전체 작업과 같은 경우
  const isCompletedTaskList =
    totalTaskCount && doneTaskCount === totalTaskCount;

  // 할 일 목록의 color 값을 바꿔주는 함수
  // 로직은 이후에 다른 방식으로 변경할 수 있을듯
  const taskListColorStylePicker = (id: number) => {
    const COLOR_LIST = ["#a855f7", "#3b82f6", "#5fe8ff", "#ec4899"];

    return { backgroundColor: COLOR_LIST[id % 4] };
  };

  return (
    <div className="relative flex">
      <div
        className="h-10 w-3 shrink-0 rounded-l-[10px]"
        style={taskListColorStylePicker(taskList.id)}
      />
      <div className="md-medium flex h-10 w-full min-w-0 items-center justify-between rounded-r-[10px] bg-dropDown-default pl-3 pr-2 text-default-light">
        <p className="truncate pr-2">{taskList.name}</p>
        <div className="flex shrink-0 items-center">
          <div className="flex h-[25px] items-center justify-between gap-1 rounded-full bg-brand-secondary-light px-2 py-1">
            {isCompletedTaskList ? <ProgressComplete /> : <ProgressCircle />}
            <div>{`${doneTaskCount}/${totalTaskCount}`}</div>
          </div>
          <Kebab width="16" height="16" />
        </div>
      </div>
    </div>
  );
}
