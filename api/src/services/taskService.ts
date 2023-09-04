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

  async updateTask(taskId: string, taskData: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(taskId, taskData, { new: false });
  },

  async deleteTask(taskId: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(taskId);
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

    // await Task.deleteMany();
    // const userIds = ["64f2b5381560dd93fc98208e", "64f2c581781717eaba1a5eb9", "64f4856c186ce900a0f536f2"];
    // const statuses = ["completed", "in progress"];

    // // Generate random date between 2020 and 2023
    // function getRandomDate(start: Date, end: Date) {
    //   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // }

    // // Generate 100 random tasks
    // for (let i = 0; i < 100; i++) {
    //   const task = new Task({
    //     title: `Task ${i + 1}`,
    //     description: `Description for Task ${i + 1}`,
    //     status: statuses[Math.floor(Math.random() * statuses.length)],
    //     createdBy: userIds[Math.floor(Math.random() * userIds.length)],
    //     completedAt: getRandomDate(new Date("2020-01-01"), new Date("2023-12-31")),
    //   });

    //   task
    //     .save()
    //     .then(value => {
    //       console.log(`Task saved successfully`, value);
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // }
    return result;
  },
};
