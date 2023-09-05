import { ITask } from "../models/task";

interface SerializedTask {
  id: string;
  title: string;
  description: string;
  status: string;
  createdBy: string;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  next: string | null;
  prev: string | null;
}

export const taskSerializer = (task: ITask | null): SerializedTask | null => {
  if (!task) return null;
  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    status: task.status,
    createdBy: task.createdBy,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    completedAt: task.completedAt,
    next: task.next,
    prev: task.prev,
  };
};

export const tasksSerializer = (tasks: ITask[]): (SerializedTask | null)[] => {
  return tasks.map(taskSerializer);
};
