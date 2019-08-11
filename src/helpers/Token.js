const jwt = require("jsonwebtoken");

class Token {
	constructor() {
		this.secretsKey = "todosKredivo";
	}

	generate(userProfile) {
		const { username, password, full_name } = userProfile;
		return jwt.sign({ username, password, full_name }, this.secretsKey, {
			expiresIn: "24h", // expires in 24 hours
		});
	}
}

module.exports = Token;
