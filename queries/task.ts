import { useQuery, useMutation } from "@tanstack/react-query";

import { addTask, getTask } from "@/apis/task";
import { AddTaskRequest } from "@/dtos/TaskDtos";

export function useAddTask() {
  return useMutation({
    mutationFn: ({
      teamid,
      tasklistid,
      request,
    }: {
      teamid: string;
      tasklistid: string;
      request: AddTaskRequest;
    }) => addTask({ teamid, tasklistid, request }),
  });
}

export function useGetTaskList(
  teamid: string,
  tasklistid: string,
  date: string | Date,
) {
  return useQuery({
    queryKey: ["taskList", teamid, tasklistid, date],
    queryFn: () => getTask({ teamid, tasklistid, date }),
  });
}
