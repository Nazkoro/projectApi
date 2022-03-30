import { Router } from "express";
import adminController from "../../controllers/admin-controller";
import { checkReq } from "../../middlewares/checkRequest";

// @ts-ignore
const adminRouter = new Router();

adminRouter.get("/all", checkReq(adminController.getAlluser));
adminRouter.get("/", checkReq(adminController.getUsers));
adminRouter.put("/update", checkReq(adminController.updateUser));
adminRouter.post("/create", checkReq(adminController.createUser));
adminRouter.post("/auth", checkReq(adminController.authUser));
adminRouter.post("/filter", checkReq(adminController.filteruser));
adminRouter.delete("/:id", checkReq(adminController.deleteUser));

export default adminRouter;
