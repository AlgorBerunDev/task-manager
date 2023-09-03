import { Router } from "express";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware";
import { User } from "../models/user";
import { usersSerializer } from "../serializers/userSerializer";

const router = Router();

router.get("/", isAuthenticated, hasRole("admin"), async (_req, res) => {
  try {
    const users = await User.find();
    res.send(usersSerializer(users));
  } catch (err) {
    res.status(500).send("Error retrieving users");
  }
});

export default router;
