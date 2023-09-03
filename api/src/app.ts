import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import authRoutes from "./routes/authRouter";
import userRoutes from "./routes/userRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("combined"));

mongoose.connect(process.env.MONGO_URL as string);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
