import { ITask } from "../models/task";
import { ITaskStatus } from "../models/taskStatus";

interface SerializedTaskStatus {
  id: string;
  name: string;
  title: string;
  description: string;
  color: string;
  next: string | null;
  prev: string | null;
}

export const taskStatusSerializer = (taskStatus: ITaskStatus): SerializedTaskStatus => {
  return {
    id: taskStatus._id.toString(),
    name: taskStatus.name,
    title: taskStatus.title,
    description: taskStatus.description,
    color: taskStatus.color,
    next: taskStatus.next,
    prev: taskStatus.prev,
  };
};

export const taskStatusesSerializer = (taskStatuses: ITaskStatus[]): SerializedTaskStatus[] => {
  return taskStatuses.map(taskStatusSerializer);
};
