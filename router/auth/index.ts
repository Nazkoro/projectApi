import { Router } from "express";
import { body } from "express-validator";
import authController from "../../controllers/auth-controller";

// @ts-ignore
const authRouter = new Router();
authRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  authController.registration
);
authRouter.post("/login", authController.login);
authRouter.get("/activate/:link", authController.activate);
authRouter.get("/refresh", authController.refresh);

export default authRouter;
