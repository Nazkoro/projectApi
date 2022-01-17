import { Router } from "express";
import { body } from "express-validator";
import userController from "../controllers/user-controller";
import postController from "../controllers/post-controller";
import authController from "../controllers/auth-controller";
import authMiddleware from "../middlewares/authMiddleware";
import multerMiddleware from "../middlewares/multter-middleware";
import { checkReq } from "../middlewares/checkRequest";
import commentController from "../controllers/comment-controller";

// @ts-ignore
const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  authController.registration
);
router.post("/login", authController.login);
router.get("/activate/:link", authController.activate);
router.get("/refresh", authController.refresh);
router.get("/users", authMiddleware, checkReq(userController.getUsers));

router.put("/user/:id", authMiddleware, checkReq(userController.updateUser));
router.delete("/user/:id", authMiddleware, checkReq(userController.deleteUser));
router.get("/", authMiddleware, checkReq(userController.getUser));
router.get(
  "/friends/:userId",
  authMiddleware,
  checkReq(userController.getFriends)
);
router.put(
  "/:id/follow",
  authMiddleware,
  checkReq(userController.putFollowUser)
);
router.put(
  "/:id/unfollow",
  authMiddleware,
  checkReq(userController.putUnfollowUser)
);

router.get("/posts", authMiddleware, checkReq(postController.getPosts));
router.post(
  "/upload",
  authMiddleware,
  multerMiddleware("file"),
  checkReq(postController.createPost)
);
router.put("/post/:id", authMiddleware, checkReq(postController.updatePost));
router.delete("/post/:id", authMiddleware, checkReq(postController.deletePost));
// router.put("/:id/like", authMiddleware, postController.likedPost);
router.put("/like", authMiddleware, checkReq(postController.likedPost));
router.get("/:id", authMiddleware, checkReq(postController.getPost));
router.get(
  "/timeline/:userId",
  authMiddleware,
  checkReq(postController.getTimelinePosts)
);
router.get(
  "/profile/:username",
  authMiddleware,
  checkReq(postController.getUserAllPosts)
);

router.get(
  "/printcomment",
  authMiddleware,
  checkReq(commentController.getComments)
);
router.post(
  "/comment",
  authMiddleware,
  multerMiddleware("file"),
  checkReq(commentController.createComment)
);
export default router;
