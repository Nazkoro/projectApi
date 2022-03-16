import { Router } from "express";
import { checkReq } from "../../middlewares/checkRequest";
import conversationController from "../../controllers/conversations-controller";
import postController from "../../controllers/post-controller";
import postRouter from "../post";

// @ts-ignore
const conversationRouter = new Router();
conversationRouter.get(
  "/:userId",
  checkReq(conversationController.getConversationOfUser)
);
conversationRouter.get(
  "/find/:firstUserId/:secondUserId",
  checkReq(conversationController.getconversationIncludesOfTwoUserId)
);
conversationRouter.post(
  "/",
  checkReq(conversationController.addNewConversation)
);
conversationRouter.delete(
  "/delete/:id",
  checkReq(conversationController.deleteConversation)
);

export default conversationRouter;
