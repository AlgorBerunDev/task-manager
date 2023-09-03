import { Request, Response, Router } from "express";
import { body, query } from "express-validator";
import { handleValidationErrors } from "../utils/errorHandler";
import { SortDirection } from "../services/taskService";
import taskController from "../controllers/taskController";
import { hasRole, isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  hasRole("employee"),
  [
    query("page").optional().isInt().withMessage("Page must be an integer"),
    query("limit").optional().isInt().withMessage("Limit must be an integer"),
    query("sortBy").optional().isString().withMessage("SortBy must be a string"),
    query("orderBy")
      .optional()
      .isIn([SortDirection.ASC, SortDirection.DESC])
      .withMessage("OrderBy must be ASC or DESC"),
    query("status").optional().isString().withMessage("Status must be a string"),
    query("priority").optional().isString().withMessage("Priority must be a string"),
    query("assignedTo").optional().isString().withMessage("AssignedTo must be a string"),
  ],
  handleValidationErrors,
  taskController.getAllTasks
);

router.post(
  "/",
  isAuthenticated,
  hasRole("employee", "admin"),
  [
    body("title").isString().withMessage("Title must be an string"),
    body("description").isString().withMessage("Description must be an string"),
    body("status").isString().withMessage("Status must be an string"),
  ],
  handleValidationErrors,
  taskController.createTask
);
export default router;
