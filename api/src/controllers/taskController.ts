import { Response } from "express";
import { IRequestWithUser } from "../middleware/authMiddleware";
import taskService from "../services/taskService";
import userService from "../services/userService";
import { ITask } from "../models/task";

// Implement your controller methods using the services, e.g.:
export const getAllTasks = async (req: IRequestWithUser, res: Response) => {
  try {
    const tasks = await taskService.getTasksByUser(req.user?.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getTaskById = async (req: IRequestWithUser, res: Response) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createTask = async (req: IRequestWithUser, res: Response) => {
  try {
    const userId = req.user?.id;
    const taskData = { ...req.body, createdBy: userId };
    const task = await taskService.createTask(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

export const updateTask = async (req: IRequestWithUser, res: Response) => {
  try {
    const task: ITask | null = await taskService.updateTask(req.params.id, req.body);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteTask = async (req: IRequestWithUser, res: Response) => {
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
};
