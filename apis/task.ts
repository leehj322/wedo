import { AddTaskRequest, TasksResponseArray } from "@/dtos/TaskDtos";

import fetchExtended from "./fetchExtended";

export async function addTask({
  teamid,
  tasklistid,
  request,
}: {
  teamid: string;
  tasklistid: string;
  request: AddTaskRequest;
}) {
  const body = {
    name: request.name,
    description: request.description,
    startDate: new Date(request.startDate),
    frequencyType: request.frequencyType,
    monthDay: request.monthDay,
    weekDays: request.weekDays,
  };
  const res = await fetchExtended(
    `/groups/${teamid}/task-lists/${tasklistid}/tasks`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function getTask({
  teamid,
  tasklistid,
  date,
}: {
  teamid: string;
  tasklistid: string;
  date: string | Date;
}): Promise<TasksResponseArray> {
  const res = await fetchExtended(
    `/groups/${teamid}/task-lists/${tasklistid}/tasks?date=${date}`,
    {
      cache: "no-store",
    },
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
  return json;
}
