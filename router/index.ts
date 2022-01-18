import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import postRouter from "./post";
import authRouter from "./auth";
import commentRouter from "./comment";
import userRouter from "./user";

// @ts-ignore
const router = new Router();

router.use("/auth", authRouter);
router.use("/posts", authMiddleware, postRouter);
router.use("/comment", authMiddleware, commentRouter);
router.use("/user", authMiddleware, userRouter);

export default router;
