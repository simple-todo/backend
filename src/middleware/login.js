const Joi = require("joi");
const ResponseTemplate = require("../helpers/ResponseTemplate");

class LoginValidationMiddleware {
	constructor() {
		this.responseTemplate = new ResponseTemplate();
	}

	failedValidation(res, message) {
		this.responseTemplate.responseError(res, { message, status: 400 });
	}

	checkLoginInput(req, res, next) {
		try {
			// Body Contain
			const schema = Joi.object().keys({
				username: Joi.string().required(),
				password: Joi.string().required(),
			});
			const validateParams = Joi.validate(req.body, schema);

			!validateParams.error ? next() : this.failedValidation(res, validateParams.error.message);
		} catch (error) {
			this.failedValidation(res, "Failed validation");
			throw error;
		}
	}
}

module.exports = LoginValidationMiddleware;
