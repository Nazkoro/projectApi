import { Router } from "express";
import { checkReq } from "../../middlewares/checkRequest";
import multiConversationController from "../../controllers/multi-conversations-controller";

// @ts-ignore
const multiConversationRouter = new Router();
multiConversationRouter.get(
  "/:userId",
  checkReq(multiConversationController.getConversationOfUser)
);
multiConversationRouter.get(
  "/find/:firstUserId/:secondUserId",
  checkReq(multiConversationController.getconversationIncludesOfTwoUserId)
);
multiConversationRouter.post(
  "/",
  checkReq(multiConversationController.addNewConversation)
);

export default multiConversationRouter;
