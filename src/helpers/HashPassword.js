const bcrypt = require("bcryptjs");

class HashPassword {
	async createHash(password) {
		const roundSalt = 10;
		return await bcrypt.hashSync(password, roundSalt);
	}

	async verifyHash(password, hash) {
		return bcrypt.compareSync(password, hash);
	}
}

module.exports = HashPassword;
