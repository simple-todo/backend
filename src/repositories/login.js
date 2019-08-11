const { users } = require("../models/index");

class LoginRepo {
	// async addUser(newUserProfile, transaction) {
	// 	return users.findOrCreate({
	// 		where: { username: newUserProfile.username },
	// 		defaults: newUserProfile,
	// 		raw: true,
	// 		logging: false,
	// 		transaction,
	// 	});
	// }
	async findByUsername(username, transaction) {
		return users.findOne({ where: { username }, raw: true, logging: false, transaction });
	}
}

module.exports = LoginRepo;
