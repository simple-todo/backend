// const bcrypt = require("../lib/bcrypt");
var bcrypt = require("bcryptjs");

class HashPassword {
	async createHash(password) {
		const roundSalt = 10;
		// return await bcrypt.hash(password, roundSalt); // hashed password
		return await bcrypt.hashSync(password, roundSalt);
	}

	async verifyHash(password, hash) {
		// return await bcrypt.compare(password, hash);
		return bcrypt.compareSync(password, hash);
	}
}

module.exports = HashPassword;
