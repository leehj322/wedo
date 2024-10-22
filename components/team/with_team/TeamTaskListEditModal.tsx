import { useState, ChangeEvent, MouseEvent } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/@common/Button";
import Input from "@/@common/Input";
import Modal from "@/@common/modal/Modal";
import { useEditTaskList } from "@/queries/taskLists";

interface TeamTaskListEditModalProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  groupId: number;
  taskListId: number;
  currentName: string;
}

export default function TeamTaskListEditModal({
  isOpen,
  toggleIsOpen,
  groupId,
  taskListId,
  currentName,
}: TeamTaskListEditModalProps) {
  const queryClient = useQueryClient();

  const [taskListNameValue, setTaskListNameValue] = useState(currentName);
  const [taskListNameInputErrorMessage, setTaskListNameInputErrorMessage] =
    useState("");

  const { mutate: editTaskList } = useEditTaskList();

  // 이름 수정하기 모달 input change 핸들러
  const handleChangeTaskListNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!taskListNameInputErrorMessage) {
      setTaskListNameInputErrorMessage("");
    }

    setTaskListNameValue(e.target.value);
  };

  // 수정하기 모달 수정하기 버튼 클릭 핸들러
  // 1. 이전과 이름이 동일한지 체크하고 error message 출력, api 요청 x
  // 2. api 요청 후 error가 발생하면 error message를 set
  // 3. 성공하면 팀 페이지의 task list 최신화를 위해 invalidate queries
  const handleTaskListNameEditButtonClick = (e: MouseEvent) => {
    if (taskListNameValue === currentName) {
      e.stopPropagation();
      setTaskListNameInputErrorMessage("팀 이름이 이전과 동일합니다.");
      return;
    }

    editTaskList(
      { groupId, taskListId, taskListName: taskListNameValue },
      {
        onError: (error) => {
          e.stopPropagation();
          setTaskListNameInputErrorMessage(error.message);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["team", groupId] });
        },
      },
    );
  };

  return (
    <Modal
      type="modal"
      trigger={isOpen}
      onOpenChange={toggleIsOpen}
      hasCrossCloseIcon
      title="팀 이름"
      footer={
        <Button className="flex-1" onClick={handleTaskListNameEditButtonClick}>
          수정 하기
        </Button>
      }
    >
      <Input
        placeholder="할 일 목록 이름을 작성해주세요."
        onChange={handleChangeTaskListNameInput}
        defaultValue={currentName}
        value={taskListNameValue}
      />
    </Modal>
  );
}
