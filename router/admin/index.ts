import { Router } from "express";
import adminController from "../../controllers/admin-controller";
import { checkReq } from "../../middlewares/checkRequest";

// @ts-ignore
const adminRouter = new Router();

adminRouter.get("/", checkReq(adminController.getUsers));
adminRouter.put("/update", checkReq(adminController.updateUser));
adminRouter.post("/create", checkReq(adminController.createUser));
adminRouter.delete("/:id", checkReq(adminController.deleteUser));

export default adminRouter;
