import { Request, Response, Router } from "express";
import { body, query } from "express-validator";
import { handleValidationErrors } from "../utils/errorHandler";
import { hasRole, isAuthenticated } from "../middleware/authMiddleware";
import taskStatusController from "../controllers/taskStatusController";
import { Role } from "../models/User";

const router = Router();

router.get("/", isAuthenticated, taskStatusController.getAllTaskStatus);

router.post(
  "/",
  isAuthenticated,
  hasRole(Role.Admin),
  [
    body("name").isString().withMessage("Name must be an string"),
    body("description").optional().isString().withMessage("Description must be an string"),
  ],
  handleValidationErrors,
  taskStatusController.createTaskStatus
);

router.put(
  "/:id",
  isAuthenticated,
  hasRole(Role.Admin),
  [
    body("name").isString().withMessage("Name must be an string"),
    body("description").optional().isString().withMessage("Description must be an string"),
  ],
  handleValidationErrors,
  taskStatusController.updateTaskStatus
);

router.delete("/:id", isAuthenticated, hasRole(Role.Admin), taskStatusController.deleteTaskStatus);

export default router;
