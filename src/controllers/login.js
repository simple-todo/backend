const LoginServices = require("../services/login");
const ResponseTemplate = require("../helpers/ResponseTemplate");
const HashPassword = require("../helpers/HashPassword");
const Token = require("../helpers/Token");

class LoginController {
	constructor() {
		this.responseTemplate = new ResponseTemplate();
		this.loginServices = new LoginServices();
		this.hashPassword = new HashPassword();
		this.token = new Token();
	}

	checkRegistered(res, user) {
		if (user === null) {
			let message = "Username not found";
			let success = false;
			this.responseTemplate.responseSuccess(res, { success, message });
		}
	}

	async checkPassword(res, password, hashPassword) {
		const correctPassword = await this.hashPassword.verifyHast(password, hashPassword);
		if (correctPassword === false) {
			let message = "Wrong password";
			let success = false;

			console.log("correctPassword: ", correctPassword);
			this.responseTemplate.responseSuccess(res, { success, message });
			res.json({ message: "Wrong password" });
		}
	}

	successLogin(res, user, token) {
		const message = "Success login";
		const success = true;
		this.responseTemplate.responseSuccess(res, { success, message, user, token });
	}

	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await this.loginServices.findByUsername(username);

			// If user not registered or wrong password, the process stop until here
			this.checkRegistered(res, user);
			await this.checkPassword(res, password, user.password);
			const userToken = this.token.generate(user);

			this.successLogin(res, user, userToken);
		} catch (error) {
			this.responseTemplate.responseError(res, error);
		}
	}
}

module.exports = LoginController;
