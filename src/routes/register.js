const express = require("express");
const registerRouter = express.Router();

const RegisterValidationMiddleware = require("../middleware/register");
const RegisterController = require("../controllers/register");

const registerValidationMiddleware = new RegisterValidationMiddleware();
const registerController = new RegisterController();

registerRouter.post(
  "/register",
  registerValidationMiddleware.checkRegisterInput,
  (req, res) => registerController.addUser(req, res)
);

module.exports = registerRouter;
