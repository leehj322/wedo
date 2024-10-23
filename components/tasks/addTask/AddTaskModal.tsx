import { useState, FormEvent, ChangeEvent } from "react";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Button } from "@/components/@common/Button";
import Input from "@/components/@common/Input";
import Textarea from "@/components/@common/Textarea";
import Modal from "@/components/@common/modal/Modal";
import { useToast } from "@/hooks/useToast";
import { useAddTask } from "@/queries/task";

import SelectCycleDropDown from "./SelectCycleDropDown";
import SelectWeekDays from "./SelectWeekDays";

type FrequencyType = "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";

interface AddTaskFormValue {
  name: string;
  description: string;
  startDate: string;
  frequencyType: string;
  monthDay?: number;
  weekDays?: number[];
}
const today = new Date();

const INITAIL_ADDTASK_FORM_VALUE: AddTaskFormValue = {
  name: "",
  description: "",
  startDate: today.toISOString().split("T")[0],
  frequencyType: "",
};

function getFrequencyType(btnType: string): string {
  switch (btnType) {
    case "ONCE":
      return "한 번";
    case "DAILY":
      return "매일";
    case "WEEKLY":
      return "주 반복";
    case "MONTHLY":
      return "일 반복";
    default:
      return btnType;
  }
}

export default function AddTaskModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { teamid, tasklistid }: { teamid: string; tasklistid: string } =
    useParams();
  const [addTaskForm, setAddTaskForm] = useState(INITAIL_ADDTASK_FORM_VALUE);
  const [cycleLabel, setCycleLabel] = useState("반복 없음");
  const { mutate: addTask } = useAddTask();

  const handleChangeType = (btnType: FrequencyType) => {
    setAddTaskForm((prevForm) => ({
      ...prevForm,
      frequencyType: btnType,
    }));
    setCycleLabel(btnType);
  };
  const FREQUENCY_TYPE = [
    {
      btnLabel: "한 번",
      btnType: "ONCE",
      btnFn: () => handleChangeType("ONCE"),
    },
    {
      btnLabel: "매일",
      btnType: "DAILY",
      btnFn: () => handleChangeType("DAILY"),
    },
    {
      btnLabel: "주 반복",
      btnType: "WEEKLY",
      btnFn: () => handleChangeType("WEEKLY"),
    },
    {
      btnLabel: "일 반복",
      btnType: "MONTHLY",
      btnFn: () => handleChangeType("MONTHLY"),
    },
  ];

  const handleAddTaskChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setAddTaskForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    if (type === "date") {
      const day = dayjs(value).format("DD");
      setAddTaskForm((prevValue) => ({
        ...prevValue,
        [name]: value,
        monthDay: Number(day),
      }));
    }
  };

  const handleChangeWeekDays = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAddTaskForm((prevValue) => {
      const currentWeekDays = prevValue.weekDays || [];
      const updatedWeekDays = currentWeekDays?.includes(value)
        ? currentWeekDays.filter((day) => day !== value)
        : [...currentWeekDays, value];

      return {
        ...prevValue,
        weekDays: updatedWeekDays,
      };
    });
  };

  const handleAddTaskSubmit = (e: FormEvent) => {
    e.preventDefault();
    let requestData: Omit<AddTaskFormValue, "weekDays" | "monthDay">;
    switch (addTaskForm.frequencyType) {
      case "WEEKLY": {
        const { monthDay, ...data } = addTaskForm;
        requestData = data;
        break;
      }
      case "MONTHLY": {
        const { weekDays, ...data } = addTaskForm;
        requestData = data;
        break;
      }
      default: {
        const { weekDays, monthDay, ...data } = addTaskForm;
        requestData = data;
        break;
      }
    }
    addTask(
      { teamid, tasklistid, request: requestData },
      {
        onError: (error) => {
          (() => toast({ variant: "danger", title: error.message }))();
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["taskList", teamid, tasklistid],
          });
          onOpenChange();
        },
      },
    );
  };

  return (
    <Modal
      type="modal"
      trigger={isOpen}
      onOpenChange={onOpenChange}
      title="할 일 만들기"
      contentClassName="px-[24px] py-[32px]"
      description={
        <p>
          할 일은 실제로 행동 가능한 작업 중심으로 <br /> 작성해주시면 좋습니다.
        </p>
      }
    >
      <form onSubmit={handleAddTaskSubmit} className="w-full text-left">
        <div className="mb-[32px]">
          <div className="mb-[24px]">
            <label className="mb-[16px] block" htmlFor="name" id="name">
              할 일 제목
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="할 일 제목을 입력해주세요."
              value={addTaskForm?.name ?? ""}
              onChange={handleAddTaskChange}
            />
          </div>
          <div className="mb-[24px]">
            <label className="mb-[16px] block" htmlFor="startDate" id="date">
              시작 날짜 및 시간
            </label>
            <Input
              id="startDate"
              type="date"
              name="startDate"
              placeholder="날짜를 선택해주세요."
              value={addTaskForm?.startDate ?? ""}
              onChange={handleAddTaskChange}
            />
          </div>
          <div className="mb-[24px]">
            <label
              className="mb-[16px] block"
              htmlFor="frequencyType"
              id="frequencyType"
            >
              반복 설정
            </label>
            <SelectCycleDropDown menuList={FREQUENCY_TYPE}>
              <div>
                <span className="flex w-[109px] items-center justify-between rounded-xl bg-input-default px-[12px] py-[10px] text-sm text-placeHolder">
                  {getFrequencyType(cycleLabel)}
                  <Image
                    width={24}
                    height={24}
                    src="/images/toggle.png"
                    alt="토글 버튼"
                  />
                </span>
              </div>
            </SelectCycleDropDown>
          </div>
          {addTaskForm.frequencyType === "WEEKLY" && (
            <SelectWeekDays onChangeWeekDays={handleChangeWeekDays} />
          )}
          <div>
            <label
              className="mb-[16px] block"
              htmlFor="description"
              id="description"
            >
              할 일 메모
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="메모를 입력해주세요."
              onChange={handleAddTaskChange}
            />
          </div>
        </div>
        <Button className="w-full" variant="default">
          만들기
        </Button>
      </form>
    </Modal>
  );
}
