import { Request, Response, Router } from "express";
import { body, query } from "express-validator";
import { handleValidationErrors } from "../utils/errorHandler";
import { SortDirection } from "../services/taskService";
import taskController from "../controllers/taskController";
import { hasRole, isAuthenticated } from "../middleware/authMiddleware";
import { Role } from "../models/user";
import taskStatusService from "../services/taskStatusService";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  hasRole(Role.Admin, Role.Employee),
  [
    query("page").optional().isInt().withMessage("Page must be an integer"),
    query("limit").optional().isInt().withMessage("Limit must be an integer"),
    query("sortBy").optional().isString().withMessage("SortBy must be a string"),
    query("orderBy").optional().isIn(Object.keys(SortDirection)).withMessage("OrderBy must be ASC or DESC"),
    query("status").optional().isString().withMessage("Status must be a string"),
  ],
  handleValidationErrors,
  taskController.getAllTasks
);

router.post(
  "/",
  isAuthenticated,
  hasRole(Role.Admin, Role.Employee),
  [
    body("title").isString().withMessage("Title must be an string"),
    body("description").isString().withMessage("Description must be an string"),
    body("status")
      .isString()
      .withMessage("Status is required")
      .custom(async (status: string) => {
        const statuses = await taskStatusService.getTaskStatuses({ name: status });
        const isExist = statuses.length > 0;

        if (!isExist) return Promise.reject();
      })
      .withMessage("Invalid status provided"),
  ],
  handleValidationErrors,
  taskController.createTask
);

router.put(
  "/:id",
  isAuthenticated,
  hasRole(Role.Admin, Role.Employee),
  [
    body("title").isString().withMessage("Title must be an string"),
    body("description").isString().withMessage("Description must be an string"),
    body("status").isString().withMessage("Status must be an string"),
  ],
  handleValidationErrors,
  taskController.updateTask
);

router.get("/:id", isAuthenticated, hasRole(Role.Admin, Role.Employee), taskController.getTaskById);
router.delete("/:id", isAuthenticated, hasRole(Role.Admin, Role.Employee), taskController.deleteTask);

export default router;
