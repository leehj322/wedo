export interface AddTaskRequest {
  name: string;
  description: string;
  startDate: string | Date;
  frequencyType: string;
  monthDay?: number;
  weekDays?: number[];
}

export interface TasksResponse {
  doneBy?: {
    user?: {
      image: string;
      nickname: string;
      id: number;
    };
  };
  writer?: {
    image: string | null;
    nickname: string;
    id: number;
  };
  displayIndex: number;
  commentCount: number;
  deletedAt: Date | null;
  recurringId: number;
  frequency: string;
  updatedAt: Date;
  doneAt: Date | null;
  date: Date;
  description: string;
  name: string;
  id: number;
}

export type TasksResponseArray = TasksResponse[];
