import UserModel from "../models/User";
import TokenModel from "../models/Token";
import CommentModel from "../models/Comment";

class AdminService {
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async addUser(user) {
    const newUser = new UserModel(user);
    const saveuser = await newUser.save();
    return saveuser;
  }

  // update user
  async updUser(bodyOfPost) {
    const user = await UserModel.findByIdAndUpdate(bodyOfPost._id, {
      $set: bodyOfPost,
    });
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
