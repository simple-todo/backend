const { sequelizeConnection } = require("../models/index");
const RegisterRepo = require("../repositories/register");

class RegisterServices {
	constructor() {
		this.registerRepo = new RegisterRepo();
	}

	async addUser(newUserProfile) {
		const transaction = await sequelizeConnection.transaction();
		try {
			const addUser = await this.registerRepo.addUser(newUserProfile, transaction);
			await transaction.commit(); // Save to database if all ORM command success

			return addUser;
		} catch (error) {
			await transaction.rollback(); // Cancel all ORM success command if any error
			throw error;
		}
	}
}

module.exports = RegisterServices;
