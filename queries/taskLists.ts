import { useMutation } from "@tanstack/react-query";

import { addTaskList, delTaskList } from "@/apis/taskLists";

export function useAddTaskList() {
  return useMutation({
    mutationFn: ({
      groupId,
      taskListName,
    }: {
      groupId: number;
      taskListName: string;
    }) => addTaskList({ groupId, taskListName }),
  });
}

export function useDelTaskList() {
  return useMutation({
    mutationFn: ({
      groupId,
      taskListId,
    }: {
      groupId: number;
      taskListId: number;
    }) => delTaskList({ groupId, taskListId }),
  });
}
