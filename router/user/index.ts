import { Router } from "express";
import userController from "../../controllers/user-controller";
import multerMiddleware from "../../middlewares/multter-middleware";
import { checkReq } from "../../middlewares/checkRequest";

// @ts-ignore
const userRouter = new Router();

userRouter.get("/", checkReq(userController.getUsers));
userRouter.get("/online", checkReq(userController.getOnlineUsers));
userRouter.put("/follow", checkReq(userController.putFollowUser));
userRouter.put("/unfollow", checkReq(userController.putUnfollowUser));
// userRouter.put("/:id", checkReq(userController.updateUser));
userRouter.put("/add-info", checkReq(userController.updateUser));
userRouter.delete("/:id", checkReq(userController.deleteUser));
userRouter.get("/account", checkReq(userController.getUser));
userRouter.get("/friends/:userId", checkReq(userController.getFriends));
// userRouter.put("/:id/follow", checkReq(userController.putFollowUser));
// userRouter.put("/:id/unfollow", checkReq(userController.putUnfollowUser));

export default userRouter;
