import adminService from "../service/admin-service";

class UserController {
  getUsers(req, res) {
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
      PerPage: parseInt(req.query.PerPage, 10) || 10,
    };
    return adminService.getAllUsers(pageOptions);
  }

  getPosts(req, res) {
    return adminService.getAllPosts();
  }

  getChartDashboardInfo(req, res) {
    return adminService.getChartDashboard();
  }

  getAlluser(req, res) {
    return adminService.getAllUsersWithoutFilter();
  }

  filteruser(req, res) {
    return adminService.getFilterUsers(req.body);
  }

  deleteUser(req, res) {
    console.log("ADMIN deleteUser ", req.params.id);
    return adminService.removeUser(req.params.id);
    // return res.status(403).json("You can delete only your account!");
  }

  updateUser(req, res, next) {
    return adminService.updUser(req.body);
  }

  createUser(req, res) {
    return adminService.addUser(req.body);
  }

  authUser(req, res) {
    return adminService.login(req.body);
  }
}
export default new UserController();
