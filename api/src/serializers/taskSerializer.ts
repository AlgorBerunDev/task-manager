import { ITask } from "../models/task";

interface SerializedTask {
  id: string;
  title: string;
  description: string;
  status: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export const taskSerializer = (task: ITask): SerializedTask => {
  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    status: task.description,
    createdBy: task.createdBy,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
};

export const tasksSerializer = (tasks: ITask[]): SerializedTask[] => {
  return tasks.map(taskSerializer);
};
