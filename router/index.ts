import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import postRouter from "./post";
import authRouter from "./auth";
import commentRouter from "./comment";
import userRouter from "./user";
import conversationRouter from "./conversation";
import messageRouter from "./messages";
import multiConversationRouter from "./multi-conversation";

// @ts-ignore
const router = new Router();

router.use("/auth", authRouter);
router.use("/posts", authMiddleware, postRouter);
router.use("/comment", authMiddleware, commentRouter);
router.use("/user", authMiddleware, userRouter);
router.use("/message", messageRouter);
router.use("/conversation", conversationRouter);
router.use("/multi-conversation", multiConversationRouter);

export default router;
