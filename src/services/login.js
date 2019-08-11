const { sequelizeConnection } = require("../models/index");
const LoginRepo = require("../repositories/login");

class LoginServices {
	constructor() {
		this.loginRepo = new LoginRepo();
	}

	async findByUsername(username) {
		const transaction = await sequelizeConnection.transaction();
		try {
			return await this.loginRepo.findByUsername(username, transaction);
		} catch (error) {
			throw error;
		}
	}
}

module.exports = LoginServices;
