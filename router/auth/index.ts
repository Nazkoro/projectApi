import { Router } from "express";
import { body } from "express-validator";
import authController from "../../controllers/auth-controller";
import { checkReq } from "../../middlewares/checkRequest";
import authMiddleware from "../../middlewares/authMiddleware";

// @ts-ignore
const authRouter = new Router();
authRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  authController.registration
);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/email", authController.email);
// authRouter.post("/password", authController.password);
authRouter.get("/activate/:link", authController.activate);
authRouter.get("/refresh", authController.refresh);
authRouter.put(
  "/password",
  authMiddleware,
  checkReq(authController.updatePassword)
);

export default authRouter;
