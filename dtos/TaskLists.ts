export interface AddTaskListResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  displayIndex: number;
}

export interface EditTaskListResponse extends AddTaskListResponse {
  groupId: number;
}
