const { Router } = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user-controller");

const router = new Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
