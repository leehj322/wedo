"use client";

import { useGetTeam } from "@/queries/group";

import TeamTaskListCard from "./TeamTaskListCard";

interface TeamTodoListProps {
  isAdmin: boolean;
  groupId: number;
}

export default function TeamTodoList({ isAdmin, groupId }: TeamTodoListProps) {
  const { data } = useGetTeam(groupId);

  const taskLists = data?.taskLists || [];
  const numberOfTaskLists = taskLists.length;

  return (
    <>
      <h2 className="mb-4 flex items-center justify-between pc:mb-5">
        <div className="text-[18px]/[19px] font-semibold text-default-light">
          할 일 목록
          <span className="lg-normal ml-2 text-default-light opacity-80">
            {`(${numberOfTaskLists}개)`}
          </span>
        </div>
        {isAdmin && (
          <button className="md-medium text-brand-active">
            + 새로운 목록 추가하기
          </button>
        )}
      </h2>
      {numberOfTaskLists ? (
        <div className="flex flex-col gap-4">
          {taskLists.map((taskList) => (
            <TeamTaskListCard key={taskList.id} taskList={taskList} />
          ))}
        </div>
      ) : (
        <div className="md-medium flex h-32 items-center justify-center text-default-light">
          아직 할 일 목록이 없습니다.
        </div>
      )}
    </>
  );
}
