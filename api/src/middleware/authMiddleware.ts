// src/middleware/auth.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser, User } from "../models/user";

export interface IRequestWithUser extends Request {
  user?: IUser;
}

export const isAuthenticated = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { _id: string };
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).send("Access denied.");

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

export const hasRole = (...roleNames: string[]) => {
  return async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const role = user.roles.find(roleItem => roleNames.includes(roleItem));
      if (!role) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      console.error("Error checking user roles:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export const generateToken = (user: IUser): string => {
  return jwt.sign({ _id: user._id }, process.env.SECRET_KEY as string);
};
