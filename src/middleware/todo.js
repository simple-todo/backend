const Joi = require("joi");
const ResponseTemplate = require("../helpers/ResponseTemplate");
const Token = require("../helpers/Token");

class TodoValidationMiddleware {
	constructor() {
		this.responseTemplate = new ResponseTemplate();
		this.token = new Token();
	}

	failedValidation(res, message) {
		this.responseTemplate.responseError(res, { message, status: 400 });
	}

	checkToken(token) {
		return this.token.decode(token);
	}

	checkTodoPostInput(req, res, next) {
		try {
			const schema = Joi.object()
				.keys({
					authorization: Joi.string().required(),
					task: Joi.string().required(),
				})
				.unknown(true);

			const passedParams = Joi.validate({ ...req.headers, ...req.body }, schema);
			this.checkToken(req.headers.authorization); // Check user send invalid token or not

			!passedParams.error ? next() : this.failedValidation(res, passedParams.error.message);
		} catch (error) {
			this.failedValidation(res, "Failed validation");
			throw error;
		}
	}

	checkTodoGetInput(req, res, next) {
		try {
			const schema = Joi.object()
				.keys({
					authorization: Joi.string().required(),
				})
				.unknown(true);

			const passedParams = Joi.validate({ ...req.headers }, schema);
			this.checkToken(req.headers.authorization); // Check user send invalid token or not

			!passedParams.error ? next() : this.failedValidation(res, passedParams.error.message);
		} catch (error) {
			this.failedValidation(res, "Failed validation");
			throw error;
		}
	}

	checkTodoId(req, res, next) {
		try {
			const schema = Joi.object()
				.keys({
					authorization: Joi.string().required(),
					todo_id: Joi.string().required(),
				})
				.unknown(true);

			const passedParams = Joi.validate({ ...req.headers, ...req.body }, schema);
			this.checkToken(req.headers.authorization); // Check user send invalid token or not

			!passedParams.error ? next() : this.failedValidation(res, passedParams.error.message);
		} catch (error) {
			this.failedValidation(res, "Failed validation");
			throw error;
		}
	}
}

module.exports = TodoValidationMiddleware;
