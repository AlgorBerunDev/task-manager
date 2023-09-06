import Task, { ITask } from "../models/task";
import { TimePeriodValue, getFormatDateByTimePeriod } from "../utils/date/timePeriod";
import userService from "./userService";

export interface TaskFilter {
  status?: string;
}

export enum SortDirection {
  ASC = 1,
  DESC = -1,
}

interface ICompletedTaskMetricsFilter {
  userIds: string[];
  startDate: Date;
  endDate: Date;
  timePeriod: TimePeriodValue;
}

export default {
  async createTask(taskData: ITask): Promise<{ savedTask: ITask; updatedTask: ITask | null }> {
    const firstTask = await Task.findOne({ prev: null, status: taskData.status, createdBy: taskData.createdBy });
    const task = new Task({ ...taskData, next: firstTask?._id.toString() });
    const savedTask = await task.save();
    const updatedFirstTask = await Task.findByIdAndUpdate(
      firstTask?._id,
      { prev: savedTask._id.toString() },
      { new: true }
    );
    return { savedTask, updatedTask: updatedFirstTask };
  },

  async getAllTask(userId: string, createdBy?: string | null, search: string = "") {
    const isAdmin = await userService.hasRole(userId, "Admin");
    const query: any = createdBy ? { createdBy } : {};

    if (search) {
      query["$or"] = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
    }

    return await Task.find(query);
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

  async getTasksByUserCount(userId: string, filter: TaskFilter = {}, search: string = ""): Promise<number> {
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

    return await Task.count(query);
  },

  async getTaskById(taskId: string): Promise<ITask | null> {
    return await Task.findById(taskId);
  },

  async updateTask(taskId: string, taskData: Partial<ITask>): Promise<ITask[]> {
    const currentTask = await Task.findById(taskId);

    if (currentTask?.status === taskData.status) {
      const result = (await Task.findByIdAndUpdate(taskId, taskData, { new: false })) as unknown as ITask;
      return [result];
    }

    const updatedTasks = [];

    if (currentTask?.prev) {
      const updatePrevTask = (await Task.findByIdAndUpdate(currentTask?.prev, {
        next: currentTask.next,
      })) as unknown as ITask;
      updatedTasks.push(updatePrevTask);
    }

    if (currentTask?.next) {
      const updatedNextTask = (await Task.findByIdAndUpdate(currentTask?.next, {
        prev: currentTask.prev,
      })) as unknown as ITask;
      updatedTasks.push(updatedNextTask);
    }

    const currentFirstTask = await Task.findOne({ prev: null, status: taskData.status });
    if (currentFirstTask) {
      const updatedFirstTask = (await Task.findByIdAndUpdate(
        currentFirstTask._id.toString(),
        {
          prev: currentTask?._id.toString(),
        },
        { new: true }
      )) as unknown as ITask;
      updatedTasks.push(updatedFirstTask);
    }

    const updatedCurrentTask = (await Task.findByIdAndUpdate(currentTask?._id.toString(), {
      ...taskData,
      prev: null,
      next: currentFirstTask?._id.toString() || null,
    })) as unknown as ITask;

    updatedTasks.push(updatedCurrentTask);

    return updatedTasks;
  },

  async deleteTask(taskId: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(taskId);
  },

  async moveTask(
    moveTaskId: string,
    status: string,
    newPrevTaskId: string | null,
    newNextTaskId: string | null
  ): Promise<ITask[]> {
    const currentTask = await Task.findById(moveTaskId);

    const updatedOldPrevTask = await Task.findByIdAndUpdate(
      currentTask?.prev,
      { next: currentTask?.next },
      { new: true }
    );
    const updatedOldNextTask = await Task.findByIdAndUpdate(
      currentTask?.next,
      { prev: currentTask?.prev },
      { new: true }
    );
    const updatedPrevTask = await Task.findByIdAndUpdate(newPrevTaskId, { next: moveTaskId }, { new: true });
    const updatedNextTask = await Task.findByIdAndUpdate(newNextTaskId, { prev: moveTaskId }, { new: true });

    const updatedCurrentTask = await Task.findByIdAndUpdate(
      moveTaskId,
      {
        next: newNextTaskId || null,
        prev: newPrevTaskId || null,
        status,
      },
      { new: true }
    );

    const result = await Task.find({
      _id: {
        $in: [
          updatedCurrentTask?._id.toString(),
          updatedOldPrevTask?._id.toString(),
          updatedOldNextTask?._id.toString(),
          updatedPrevTask?._id.toString(),
          updatedNextTask?._id.toString(),
        ],
      },
    });

    return result;
  },

  async completedTaskMetrics({ userIds, startDate, endDate, timePeriod }: ICompletedTaskMetricsFilter) {
    const format = getFormatDateByTimePeriod(timePeriod);
    let t = await Task.aggregate([
      {
        $match: {
          completedAt: { $gte: startDate, $lte: endDate },
        },
      },
    ]);

    const result = await Task.aggregate([
      {
        $match: {
          completedAt: { $gte: startDate, $lte: endDate },
          createdBy: { $in: userIds },
        },
      },
      {
        $group: {
          _id: { userId: "$createdBy", date: { $dateToString: { format, date: "$completedAt" } } },
          completedCount: { $count: {} },
        },
      },
      // {
      //   $group: {
      //     _id: "$_id.userId",
      //     tasks: {
      //       $push: {
      //         date: "$_id.date",
      //         completedCount: "$completedCount",
      //       },
      //     },
      //   },
      // },
    ]);
    return result;
  },
};
