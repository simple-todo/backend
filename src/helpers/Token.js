const jwt = require("jsonwebtoken");

class Token {
	constructor() {
		this.secretsKey = "todosKredivo";
	}

	generate(userProfile) {
		const { id, username, password, full_name } = userProfile;
		return jwt.sign({ id, username, password, full_name }, this.secretsKey, {
			expiresIn: "24h", // expires in 24 hours
		});
	}

	decode(token) {
		return jwt.verify(token, this.secretsKey);
	}
}

module.exports = Token;
