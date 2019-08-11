const RegisterServices = require("../services/register");
const ResponseTemplate = require("../helpers/ResponseTemplate");
const HashPassword = require("../helpers/HashPassword");

class RegisterController {
	constructor() {
		this.responseTemplate = new ResponseTemplate();
		this.registerServices = new RegisterServices();
		this.hashPassword = new HashPassword();
	}

	userAlreadyRegistered(data) {
		const registered = data[1] === false ? true : false;
		let message = "Success registered User";
		let success = true;

		if (registered) {
			message = "Failed register, Username already registed";
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
				password: await this.hashPassword.createHash(password),
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
