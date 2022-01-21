import { Router } from "express";
import multerMiddleware from "../../middlewares/multter-middleware";
import { checkReq } from "../../middlewares/checkRequest";
import commentController from "../../controllers/comment-controller";
import postRouter from "../post";

// @ts-ignore
const commentRouter = new Router();
commentRouter.get("/print", checkReq(commentController.getComments));
commentRouter.get(
  "/for-this-post/:id",
  checkReq(commentController.geAllCommentForPost)
);
commentRouter.post(
  "/",
  multerMiddleware("file"),
  checkReq(commentController.createComment)
);
commentRouter.post("/create", checkReq(commentController.createTextComment));
commentRouter.put("/:id", checkReq(commentController.updateComment));
commentRouter.delete("/:id", checkReq(commentController.deleteComment));
// commentRouter.put("/:id/like", authMiddleware, postController.likedPost);
commentRouter.put("/like", checkReq(commentController.likedComment));
commentRouter.get(
  "/timeline/:userId",
  checkReq(commentController.getTimelineComment)
);
commentRouter.get(
  "/profile/:username",
  checkReq(commentController.getUserAllComment)
);

commentRouter.get("/:id", checkReq(commentController.getComment));

export default commentRouter;
