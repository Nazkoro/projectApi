import { Router } from "express";
import { body } from "express-validator";
import userController from "../controllers/user-controller";
import postController from "../controllers/post-controller";
import authMiddleware from "../middlewares/authMiddleware";

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
export default router;
