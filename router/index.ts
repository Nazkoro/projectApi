import { Router } from "express";
import { body } from "express-validator";
import userController from "../controllers/user-controller";
import postController from "../controllers/post-controller";
import authController from "../controllers/auth-controller";
import authMiddleware from "../middlewares/authMiddleware";
import multerMiddleware from "../middlewares/multter-middleware";
import { checkReq } from "../middlewares/checkRequest";

// @ts-ignore
const router = new Router();

// router.post(
//   "/registration",
//   body("email").isEmail(),
//   body("password").isLength({ min: 3, max: 32 }),
//   userController.registration
// );
// router.post("/login", userController.login);
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  authController.registration
);
router.post("/login", authController.login);
router.get("/users", authMiddleware, checkReq(userController.getUsers));
router.get("/posts", authMiddleware, checkReq(postController.getPosts));
router.post(
  "/upload",
  authMiddleware,
  multerMiddleware("file"),
  checkReq(postController.createPost)
);
router.put("/post/:id", authMiddleware, checkReq(postController.updatePost));
//!	IMPORTANT !!!---add global hadler for postController!!!
// router.put("/post/:id", authMiddleware, handler(postController.updatePost));
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
export default router;
