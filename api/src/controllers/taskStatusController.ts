import { Response } from "express";
import { IRequestWithUser } from "../middleware/authMiddleware";
import taskStatusService from "../services/taskStatusService";
import { ITaskStatus } from "../models/taskStatus";
import { taskStatusSerializer, taskStatusesSerializer } from "../serializers/taskStatusSerializer";

export default {
  getAllTaskStatus: async (req: IRequestWithUser, res: Response) => {
    try {
      const taskStatuses = await taskStatusService.getTaskStatuses();
      res.json(taskStatusesSerializer(taskStatuses));
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  createTaskStatus: async (req: IRequestWithUser, res: Response) => {
    try {
      const taskStatus = await taskStatusService.createTaskStatus(req.body);
      res.status(201).json(taskStatusSerializer(taskStatus));
    } catch (error) {
      res.status(500).json({ message: "Error creating task", error });
    }
  },

  updateTaskStatus: async (req: IRequestWithUser, res: Response) => {
    try {
      const taskStatus: ITaskStatus | null = await taskStatusService.updateTaskStatus(req.params.id, req.body);

      if (!taskStatus) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.json(taskStatusSerializer(taskStatus));
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  deleteTaskStatus: async (req: IRequestWithUser, res: Response) => {
    try {
      const taskStatus = await taskStatusService.deleteTaskStatus(req.params.id);
      if (!taskStatus) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
