import { validationResult } from "express-validator";
import userService from "../service/user-service";
import ApiErrors from "../exceptions/api-error";

class UserController {
  getUsers(req, res) {
    return userService.getAllUsers();
  }
}
export default new UserController();
