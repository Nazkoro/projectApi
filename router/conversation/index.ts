import { Router } from "express";
import { checkReq } from "../../middlewares/checkRequest";
import conversationController from "../../controllers/conversations-controller";

// @ts-ignore
const conversationRouter = new Router();
conversationRouter.delete(
  "/delete/:id",
  checkReq(conversationController.deleteConversation)
);
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

export default conversationRouter;
