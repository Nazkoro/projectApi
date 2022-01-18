import { Router } from "express";
import multerMiddleware from "../../middlewares/multter-middleware";
import { checkReq } from "../../middlewares/checkRequest";
import commentController from "../../controllers/comment-controller";

// @ts-ignore
const commentRouter = new Router();
commentRouter.get("/print", checkReq(commentController.getComments));
commentRouter.post(
  "/",
  multerMiddleware("file"),
  checkReq(commentController.createComment)
);

export default commentRouter;
