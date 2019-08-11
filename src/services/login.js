const { sequelizeConnection } = require("../models/index");
const RegisterRepo = require("../repositories/register");

class LoginServices {
	constructor() {
		this.registerRepo = new RegisterRepo();
	}

	async addUser(newUserProfile) {
		const transaction = await sequelizeConnection.transaction();
		try {
			await this.registerRepo.addUser(newUserProfile, transaction);
			await transaction.commit(); // Save to database if all ORM command success

			return { message: "Success add new User" };
		} catch (error) {
			await transaction.rollback(); // Cancel all ORM success command if any error
			throw error;
		}
	}
}

module.exports = LoginServices;
