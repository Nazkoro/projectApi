import { Router } from "express";
import userController from "../../controllers/user-controller";
import multerMiddleware from "../../middlewares/multter-middleware";
import { checkReq } from "../../middlewares/checkRequest";

// @ts-ignore
const userRouter = new Router();

userRouter.get("/", checkReq(userController.getUsers));
userRouter.get("/recommindations", checkReq(userController.getRecommindations));
userRouter.get("/username/:username", checkReq(userController.getUserName));
userRouter.get(
  "/relocated/:username",
  checkReq(userController.getUserByUsername)
);
userRouter.get(
  "/find/:firstUserId/:secondUserId",
  checkReq(userController.getInfoUser)
);
userRouter.get("/online", checkReq(userController.getOnlineUsers));
userRouter.put("/follow", checkReq(userController.putFollowUser));
userRouter.put("/unfollow", checkReq(userController.putUnfollowUser));

userRouter.put(
  "/add-info",
  multerMiddleware("file"),
  checkReq(userController.updateUser)
);
userRouter.delete("/:id", checkReq(userController.deleteUser));
userRouter.get("/account", checkReq(userController.getUser));
userRouter.get("/chatUser", checkReq(userController.getUserChat));
userRouter.get("/friends", checkReq(userController.getMyFriends));
userRouter.get("/friends/:userId", checkReq(userController.getFriends));

export default userRouter;
