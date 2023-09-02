import Task, { ITask } from "../models/task";

export default {
  async createTask(taskData: ITask): Promise<ITask> {
    const task = new Task(taskData);
    return await task.save();
  },

  async getTasksByUser(userId: string): Promise<ITask[]> {
    return await Task.find({ createdBy: userId });
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
