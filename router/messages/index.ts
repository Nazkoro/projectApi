import { Router } from "express";
import { checkReq } from "../../middlewares/checkRequest";
import messagesController from "../../controllers/messages-controller";

// @ts-ignore
const messageRouter = new Router();

messageRouter.get("/:conversationId", checkReq(messagesController.getMessages));

messageRouter.post("/", checkReq(messagesController.postMessage));

export default messageRouter;
