const Joi = require("joi");
const ResponseTemplate = require("../helpers/ResponseTemplate");

class RegisterValidationMiddleware {
	constructor() {
		this.responseTemplate = new ResponseTemplate();
	}

	failedValidation(res, message) {
		this.responseTemplate.responseError(res, { message, status: 400 });
	}

	checkRegisterInput(req, res, next) {
		try {
			// Body Contain
			const schema = Joi.object().keys({
				username: Joi.string().required(),
				password: Joi.string().required(),
				full_name: Joi.string().required(),
			});
			const validateParams = Joi.validate(req.body, schema);

			!validateParams.error ? next() : this.failedValidation(res, validateParams.error.message);
		} catch (error) {
			this.failedValidation(res, "Failed validation");
			throw error;
		}
	}
}

module.exports = RegisterValidationMiddleware;
