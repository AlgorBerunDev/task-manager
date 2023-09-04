import { Response } from "express";
import { IRequestWithUser } from "../middleware/authMiddleware";
import taskService, { SortDirection, TaskFilter } from "../services/taskService";
import userService from "../services/userService";
import { ITask } from "../models/task";
import { taskSerializer, tasksSerializer } from "../serializers/taskSerializer";
import { TimePeriod, TimePeriodValue } from "../utils/date/timePeriod";

export default {
  getAllTasks: async (req: IRequestWithUser, res: Response) => {
    try {
      const userId = req.user?.id;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const sortBy = (req.query.sortBy || "_id") as string;
      const orderBy = (req.query.orderBy || "ASC") as string;
      const filter: TaskFilter = {
        status: req.query.status as string | undefined,
      };
      const search = req.query.search ? String(req.query.search) : "";

      const tasks = await taskService.getTasksByUser(userId, page, limit, sortBy, orderBy, filter, search);
      res.json(tasksSerializer(tasks));
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getTaskById: async (req: IRequestWithUser, res: Response) => {
    try {
      const task = await taskService.getTaskById(req.params.id);

      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.json(taskSerializer(task));
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  createTask: async (req: IRequestWithUser, res: Response) => {
    try {
      const userId = req.user?.id;
      const taskData = { ...req.body, createdBy: userId };
      const task = await taskService.createTask(taskData);
      res.status(201).json(taskSerializer(task));
    } catch (error) {
      res.status(500).json({ message: "Error creating task", error });
    }
  },

  updateTask: async (req: IRequestWithUser, res: Response) => {
    try {
      const task: ITask | null = await taskService.updateTask(req.params.id, req.body);

      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.json(taskSerializer(task));
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  deleteTask: async (req: IRequestWithUser, res: Response) => {
    try {
      const task = await taskService.deleteTask(req.params.id);
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  async completedTaskMetrics(req: IRequestWithUser, res: Response) {
    try {
      const userIds = req.query.userIds as unknown as string[];
      const startDate = new Date(req.query.startDate as string);
      const endDate = new Date(req.query.endDate as string);
      const timePeriod = req.query.timePeriod as TimePeriodValue;

      const completedTaskMetrics = await taskService.completedTaskMetrics({ userIds, startDate, endDate, timePeriod });
      res.json(completedTaskMetrics);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
