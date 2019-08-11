const bcrypt = require("bcrypt");

class HashPassword {
	async createHash(password) {
		const roundSalt = 10;
		return await bcrypt.hash(password, roundSalt); // hashed password
	}

	async verifyHast(password, hash) {
		return await bcrypt.compare(password, hash);
	}
}

module.exports = HashPassword;
