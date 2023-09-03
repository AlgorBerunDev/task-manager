import TaskStatus, { ITaskStatus } from "../models/taskStatus";

interface ITaskStatusFilter {
  name?: string;
}

export default {
  async createTaskStatus(taskStatusData: ITaskStatus): Promise<ITaskStatus> {
    const taskStatus = new TaskStatus(taskStatusData);
    return await taskStatus.save();
  },

  async getTaskStatuses(filter?: ITaskStatusFilter): Promise<ITaskStatus[]> {
    const query: any = {};

    if (filter)
      for (const [key, value] of Object.entries(filter)) {
        if (value) {
          query[key] = value;
        }
      }

    return await TaskStatus.find(query).sort({ name: "asc" });
  },

  async updateTaskStatus(taskStatusId: string, taskStatusData: Partial<ITaskStatus>): Promise<ITaskStatus | null> {
    return await TaskStatus.findByIdAndUpdate(taskStatusId, taskStatusData, { new: true });
  },

  async deleteTaskStatus(taskStatusId: string): Promise<ITaskStatus | null> {
    return await TaskStatus.findByIdAndDelete(taskStatusId);
  },
};
