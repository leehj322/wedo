"use client";

import dayjs from "dayjs";

import TaskList from "@/components/tasks/tasksList/TaskList";
import { useGetTaskList } from "@/queries/task";

export default function TasksPage({
  params,
  searchParams,
}: {
  params: { teamid: string; tasklistid: string };
  searchParams: { date: string };
}) {
  const { teamid, tasklistid } = params;
  const { date } = searchParams;
  const today = dayjs().format("YYYY-MM-DD");
  const datePrams = date || today;

  const { data, isLoading, isError, error } = useGetTaskList(
    teamid,
    tasklistid,
    datePrams,
  );

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      {data && data.length > 0 ? (
        data.map((task) => <TaskList key={task.id} task={task} />)
      ) : (
        <p className="flex h-full items-center justify-center pt-40 text-center">
          아직 할 일이 없습니다. <br /> 할 일을 추가해보세요.
        </p>
      )}
    </div>
  );
}
