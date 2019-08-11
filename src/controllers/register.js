const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const RegisterServices = require("../services/register");
const ResponseTemplate = require("../helpers/ResponseTemplate");

class RegisterController {
	constructor() {
		this.responseTemplate = new ResponseTemplate();
		this.registerServices = new RegisterServices();
	}

	userAlreadyRegistered(data) {
		const registered = data[1] === false ? true : false;
		const message = "Success registered User";
		const success = true;

		if (registered) {
			message = "Failed register, User already registed";
			success = false;
		}

		return {
			success,
			message,
		};
	}

	async addUser(req, res) {
		try {
			const { username, password, full_name } = req.body;
			const newUserProfile = {
				username,
				password: await bcrypt.hash(password, 10), // hashed password
				full_name,
			};

			const insertNewUser = await this.registerServices.addUser(newUserProfile);
			const checkUserAlreadyRegistered = this.userAlreadyRegistered(insertNewUser);

			this.responseTemplate.responseSuccess(res, checkUserAlreadyRegistered);
		} catch (error) {
			this.responseTemplate.responseError(res, error);
		}
	}
}

module.exports = RegisterController;
