const express = require("express");

// const RegisterValidationMiddleware = require("../middleware/register");
// const RegisterController = require("../controllers/register");

class LoginRouter {
	constructor() {
		// this.registerValidationMiddleware = new RegisterValidationMiddleware();
		// this.registerController = new RegisterController();
		this.registerRouter = express.Router();
	}

	route() {
		this.registerRouter.post(
			"/login",
			// (req, res, next) => this.registerValidationMiddleware.checkRegisterInput(req, res, next),
			// (req, res) => this.registerController.addUser(req, res),
			(req, res) => {
				res.json(req.body);
			},
		);

		return this.registerRouter;
	}
}

module.exports = LoginRouter;
