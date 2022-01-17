import { Router } from "express";
import { body } from "express-validator";
import userController from "../controllers/user-controller";
import postController from "../controllers/post-controller";
import authMiddleware from "../middlewares/authMiddleware";
import multerMiddleware from "../middlewares/multer-middleware";

// @ts-ignore
const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/posts", authMiddleware, postController.getPosts);
router.post(
  "/upload",
  authMiddleware,
  multerMiddleware("file"),
  postController.createPost
);
router.put("/post/:id", authMiddleware, postController.updatePost);
//!	IMPORTANT !!!---add global hadler for postController!!!
// router.put("/post/:id", authMiddleware, handler(postController.updatePost));
router.delete("/post/:id", authMiddleware, postController.deletePost);
// router.put("/:id/like", authMiddleware, postController.likedPost);
router.put("/like", authMiddleware, postController.likedPost);
router.get("/:id", authMiddleware, postController.getPost);
router.get(
  "/timeline/:userId",
  authMiddleware,
  postController.getTimelinePosts
);
router.get(
  "/profile/:username",
  authMiddleware,
  postController.getUserAllPosts
);
export default router;
