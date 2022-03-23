import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/User";

class AdminService {
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async addUser(getUser) {
    console.log("get user from admin", getUser);
    // const newUser = new UserModel(getUser);
    // const saveuser = await newUser.save();
    // return saveuser;

    // const { email, username, password } = getUser;

    const { email, username, year, password, country, city, jobs, position } =
      getUser;

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4(); // v34fa-asfasf-142saf-sa-asf

    const user = await UserModel.create({
      email,
      username,
      password: hashPassword,
      activationLink,
      year,
      country,
      city,
      jobs,
      position,
    });
    console.log("saver user from admin ", user);
    return user;
  }

  // update user
  async updUser(bodyOfPost) {
    console.log("update from admin", bodyOfPost);
    // eslint-disable-next-line no-param-reassign
    bodyOfPost.password = await bcrypt.hash(bodyOfPost.password, 3);
    const user = await UserModel.findByIdAndUpdate(bodyOfPost._id, {
      $set: bodyOfPost,
    });
    console.log("updated", user);
    // user.save()
    return user;
  }

  // delete user
  async removeUser(id) {
    await UserModel.findByIdAndDelete(id);
    return "Account has been deleted";
  }
}
export default new AdminService();
