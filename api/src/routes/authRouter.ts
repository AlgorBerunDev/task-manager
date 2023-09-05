import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { IUser, Role, User } from "../models/User";
import { generateToken } from "../middleware/authMiddleware";
import { handleValidationErrors } from "../utils/errorHandler";
import { userSerializer } from "../serializers/userSerializer";

const router = Router();

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("roles")
      .isArray({ min: 1 })
      .withMessage("At least one role is required")
      .custom((roles: string[]) => {
        return roles.every((role: string) => {
          return Object.values(Role as any).includes(role);
        });
      })
      .withMessage("Invalid roles provided"),
  ],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    const { username, password, roles } = req.body;

    let user: IUser | null;
    try {
      user = await User.findOne({ username });
      if (user) return res.status(400).send("User already exists.");

      user = new User({ username, password, roles });
      await user.save();

      const token = generateToken(user);
      res.header("Authorization", `Bearer ${token}`).send({ user: userSerializer(user), token });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error registering user");
    }
  }
);

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).send("Invalid username or password.");

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).send("Invalid username or password.");

      const token = generateToken(user);

      res.header("Authorization", `Bearer ${token}`).send({ user: userSerializer(user), token });
    } catch (err) {
      res.status(500).send("Error logging in");
    }
  }
);

export default router;
