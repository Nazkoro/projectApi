import { Router } from "express";
import postController from "../../controllers/post-controller";
import { checkReq } from "../../middlewares/checkRequest";
import multerMiddleware from "../../middlewares/multter-middleware";

// @ts-ignore
const postRouter = new Router();

postRouter.get("/", checkReq(postController.getPosts));
postRouter.post(
  "/upload",
  multerMiddleware("file"),
  checkReq(postController.createPost)
);
postRouter.put("/:id", checkReq(postController.updatePost));
postRouter.delete("/:id", checkReq(postController.deletePost));
// router.put("/:id/like", authMiddleware, postController.likedPost);
postRouter.put("/like", checkReq(postController.likedPost));
postRouter.get("/timeline/:userId", checkReq(postController.getTimelinePosts));
postRouter.get("/profile/:username", checkReq(postController.getUserAllPosts));
postRouter.get("/:id", checkReq(postController.getPost));

export default postRouter;
