import { Router } from "express";
import { isAuthenticated, hasRole, IRequestWithUser } from "../middleware/authMiddleware";
import { User } from "../models/user";
import { userSerializer, usersSerializer } from "../serializers/userSerializer";

const router = Router();

router.get("/", isAuthenticated, hasRole("admin"), async (_req, res) => {
  try {
    const users = await User.find();

    res.send(usersSerializer(users));
  } catch (err) {
    res.status(500).send("Error retrieving users");
  }
});

router.get("/profile", isAuthenticated, async (req: IRequestWithUser, res) => {
  try {
    const user = await User.findById(req.user?.id);

    res.json(userSerializer(user!));
  } catch (err) {
    res.status(500).send("Error retrieving users");
  }
});

export default router;
