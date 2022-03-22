import adminService from "../service/admin-service";

class UserController {
  getUsers(req, res) {
    return adminService.getAllUsers();
  }

  deleteUser(req, res) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      return adminService.removeUser(req.params.id);
    }
    return res.status(403).json("You can delete only your account!");
  }

  updateUser(req, res, next) {
    return adminService.updUser(req.body);
  }

  createUser(req, res) {
    return adminService.addUser(req.body);
  }
}
export default new UserController();
