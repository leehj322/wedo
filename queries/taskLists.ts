import { useMutation } from "@tanstack/react-query";

import { addTaskList } from "@/apis/taskLists";

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
