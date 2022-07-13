import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/User";
import PostModel from "../models/Post";

class AdminService {
  async getChartDashboard() {

    const users = await UserModel.aggregate([

      {
        $lookup: {
          from: PostModel.collection.name,
          localField: "username",
          foreignField: "username",
          as: "PostOnUser",
        },
      },

    ]);
    console.log("posts", users);
    return users;
  }

  async getAllUsersWithoutFilter() {
    const user = await UserModel.find();
    return user;
  }

  async getAllPosts() {
    const result = await PostModel.find()
      .populate("userId")
      .sort({ createdAt: -1 });
    return result;
  }

  async getAllUsers(pageOptions) {
    const user = await UserModel.find()
      .skip(pageOptions.page * pageOptions.PerPage)
      .limit(pageOptions.limit);
    return user;
  }

  async getFilterUsers(filter) {
    const user = await UserModel.find({ ...filter });
    return user;
  }

  async login(body) {
    // eslint-disable-next-line eqeqeq
    if (body.password == 1234) return true;
    return false;
  }

  async addUser(getUser) {
    const { email, username, year, password, country, city, jobs, position } =
      getUser;

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

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
    return user;
  }

  // update user
  async updUser(bodyOfPost) {
    bodyOfPost.password = await bcrypt.hash(bodyOfPost.password, 3);
    const user = await UserModel.findByIdAndUpdate(bodyOfPost._id, {
      $set: bodyOfPost,
    });
    return user;
  }

  // delete user
  async removeUser(id) {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  }
}
export default new AdminService();
