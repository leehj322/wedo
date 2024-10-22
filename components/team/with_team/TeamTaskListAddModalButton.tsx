import { useState, ChangeEvent, MouseEvent } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/@common/Button";
import Input from "@/@common/Input";
import Modal from "@/@common/modal/Modal";
import { useToast } from "@/hooks/useToast";
import { useAddTaskList } from "@/queries/taskLists";

interface TeamTaskListAddModalButtonProps {
  groupId: number;
}

export default function TeamTaskListAddModalButton({
  groupId,
}: TeamTaskListAddModalButtonProps) {
  const queryClient = useQueryClient();

  const [taskListNameValue, setTaskListNameValue] = useState("");
  const [taskListNameInputErrorMessage, setTaskListNameInputErrorMessage] =
    useState("");

  const { mutate: addTaskList } = useAddTaskList();

  const { toast } = useToast();

  // taskList name input change handler
  const handleTaskListNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (taskListNameInputErrorMessage) {
      setTaskListNameInputErrorMessage("");
    }

    setTaskListNameValue(e.target.value);
  };

  // taskList add button을 클릭했을 때 실행되는 핸들러
  // 1. input이 비어있으면 api 요청 x + error message
  // 2. input이 있으면 api 요청을 하고 error message
  // 3. 추가 요청 성공시 inputValue제거, toast띄우기, refetch를 통해 목록 최신화
  const handleAddTaskListButton = (e: MouseEvent) => {
    if (!taskListNameValue) {
      e.stopPropagation();
      setTaskListNameInputErrorMessage("할 일 목록 이름을 작성해주세요.");
      return;
    }

    addTaskList(
      { groupId, taskListName: taskListNameValue },
      {
        onError: (error) => {
          e.stopPropagation();
          setTaskListNameInputErrorMessage(error.message);
        },
        onSuccess: () => {
          setTaskListNameValue("");
          (() =>
            toast({
              title: `할 일 목록 "${taskListNameValue}"를 추가했습니다!`,
            }))();
          queryClient.invalidateQueries({ queryKey: ["team", groupId] });
        },
      },
    );
  };

  return (
    <Modal
      type="modal"
      trigger={
        <button className="md-medium text-brand-active">
          + 새로운 목록 추가하기
        </button>
      }
      title="할 일 목록"
      description="새로운 할 일을 추가합니다."
      footer={
        <Button className="flex-1" onClick={handleAddTaskListButton}>
          추가하기
        </Button>
      }
    >
      <Input
        placeholder="할 일 제목을 입력해주세요."
        value={taskListNameValue}
        onChange={handleTaskListNameInputChange}
        Error={!!taskListNameInputErrorMessage}
        ErrorMessage={taskListNameInputErrorMessage}
      />
    </Modal>
  );
}
