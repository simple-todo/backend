const express = require("express");

const LoginValidationMiddleware = require("../middleware/login");
const LoginController = require("../controllers/login");

class LoginRouter {
	constructor() {
		this.loginValidationMiddleware = new LoginValidationMiddleware();
		this.loginController = new LoginController();
		this.loginRoute = express.Router();
	}

	route() {
		this.loginRoute.post(
			"/login",
			(req, res, next) => this.loginValidationMiddleware.checkLoginInput(req, res, next),
			(req, res) => this.loginController.login(req, res),
		);

		return this.loginRoute;
	}
}

module.exports = LoginRouter;
