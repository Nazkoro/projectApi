import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import userService from "../service/user-service";
import ApiErrors from "../exceptions/api-error";

class UserController {
  getUsers(req, res) {
    return userService.getAllUsers();
  }

  getOnlineUsers(req, res) {
    return userService.getOnlineAllUsers();
  }

  // delete user
  deleteUser(req, res) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      return userService.removeUser(req.params.id);
    }
    return res.status(403).json("You can delete only your account!");
  }

  // get a user
  getUser(req, res) {
    req.query.userId = req.user.id;
    return userService.printUser(req.query.userId);
    // return userService.printUser(req.query.userId, req.query.username);
  }

  // get friends
  getFriends(req, res) {
    return userService.printFriends(req.params.userId);
  }

  getMyFriends(req, res) {
    return userService.printMyFriends(req.user.id);
  }

  // follow a user

  putFollowUser(req, res) {
    req.body.userId = req.user.id;
    if (req.body.userId !== req.body.id) {
      return userService.followUser(req.body.id, req.body.userId);
    }
    res.status(403).json("you cant follow yourself");
  }

  // unfollow a user

  putUnfollowUser(req, res) {
    if (req.body.userId !== req.params.id) {
      return userService.unfollowUser(req.params.id, req.body.userId);
    }
    res.status(403).json("you cant unfollow yourself");
  }

  // update user
  async updateUser(req, res, next) {
    console.log(req.body);
    req.body.coverPicture = req.file.filename;
    const user = await userService.updUser(req.user.id, req.body);
    return user;
    console.log(1);

    // return res.status(500).json(err);

    return res.status(403).json("You can update only your account!");
  }
}
export default new UserController();
