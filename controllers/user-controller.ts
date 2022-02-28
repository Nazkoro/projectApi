import userService from "../service/user-service";

class UserController {
  getUsers(req, res) {
    return userService.getAllUsers();
  }

  getOnlineUsers(req, res) {
    return userService.getOnlineAllUsers();
  }

  deleteUser(req, res) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      return userService.removeUser(req.params.id);
    }
    return res.status(403).json("You can delete only your account!");
  }

  getUser(req, res) {
    req.query.userId = req.user.id;
    return userService.printUser(req.query.userId);
  }

  getUserChat(req, res) {
    return userService.printChatUser(req.query.userId, req.query.username);
  }

  getFriends(req, res) {
    return userService.printFriends(req.params.userId);
  }

  getMyFriends(req, res) {
    return userService.printMyFriends(req.user.id);
  }

  putFollowUser(req, res) {
    req.body.userId = req.user.id;
    if (req.body.userId !== req.body.id) {
      return userService.followUser(req.body.id, req.body.userId);
    }
    res.status(403).json("you cant follow yourself");
  }

  putUnfollowUser(req, res) {
    if (req.body.userId !== req.params.id) {
      return userService.unfollowUser(req.params.id, req.body.userId);
    }
    res.status(403).json("you cant unfollow yourself");
  }

  async updateUser(req, res, next) {
    req.body.coverPicture = req.file.filename;
    const user = await userService.updUser(req.user.id, req.body);
    return user;

    return res.status(403).json("You can update only your account!");
  }
}
export default new UserController();
