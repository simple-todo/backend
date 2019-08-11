const { users } = require("../models/index");

class LoginRepo {
	async findByUsername(username, transaction) {
		return users.findOne({ where: { username }, raw: true, logging: false, transaction });
	}
}

module.exports = LoginRepo;
