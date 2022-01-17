import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/User";
import mailService from "./mail-service";

import UserDto from "../dtos/user-dto";
import ApiError from "../exceptions/api-error";

class UserService {
  async getAllUsers() {
    const users = await UserModel.find();
    console.log(users);
    return users;
  }
}
export default new UserService();
