const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const RegisterServices = require("../services/register");
const ResponseTemplate = require("../helpers/ResponseTemplate");

// buat login nanti
// let token = jwt.sign({ username, password, full_name }, "todosKredivo", {
//   expiresIn: "24h" // expires in 24 hours
// });

class LoginController {
	constructor() {
		this.responseTemplate = new ResponseTemplate();
		this.registerServices = new RegisterServices();
	}

	async addUser(req, res, next) {
		try {
			const { username, password, full_name } = req.body;
			const newUserProfile = {
				username,
				password: await bcrypt.hash(password, 10), // hashed password
				full_name,
			};

			const insertNewUser = await this.registerServices.addUser(newUserProfile);
			const checkUserAlreadyRegistered = this.userAlreadyRegistered(insertNewUser);
			console.log("checkUserAlreadyRegistered: ", checkUserAlreadyRegistered);

			// this.responseTemplate.responseSuccess(res, checkUserAlreadyRegistered);
		} catch (error) {
			this.responseTemplate.responseError(res, error);
		}
	}
}

module.exports = LoginController;
