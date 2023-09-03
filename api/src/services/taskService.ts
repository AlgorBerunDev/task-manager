import Task, { ITask } from "../models/task";
import userService from "./userService";

export interface TaskFilter {
  status?: string;
}

export enum SortDirection {
  ASC = 1,
  DESC = -1,
}

export default {
  async createTask(taskData: ITask): Promise<ITask> {
    const task = new Task(taskData);
    return await task.save();
  },

  async getTasksByUser(
    userId: string,
    page: number,
    limit: number,
    sortBy: string,
    orderBy: string = "ASC",
    filter: TaskFilter = {},
    search: string = ""
  ): Promise<ITask[]> {
    const isAdmin = await userService.hasRole(userId, "Admin");
    const query: any = isAdmin ? {} : { createdBy: userId };

    for (const [key, value] of Object.entries(filter)) {
      if (value) {
        query[key] = value;
      }
    }

    if (search) {
      query["$or"] = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
    }

    const sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy] = orderBy === "ASC" ? SortDirection.ASC : SortDirection.DESC;
    }

    return await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortOptions);
  },

  async getTaskById(taskId: string): Promise<ITask | null> {
    return await Task.findById(taskId);
  },

  async updateTask(taskId: string, taskData: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(taskId, taskData, { new: false });
  },

  async deleteTask(taskId: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(taskId);
  },
};
