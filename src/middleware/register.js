const Joi = require("joi");
const ResponseTemplate = require("../helpers/ResponseTemplate");

class RegisterValidationMiddleware {
  constructor() {
    this.responseTemplate = new ResponseTemplate();
  }

  checkRegisterInput(req, res, next) {
    const failedValidation = message =>
      this.responseTemplate.responseError(res, { message, status: 400 });

    try {
      // Body Contain
      const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        full_name: Joi.string().required()
      });
      const validateParams = Joi.validate(req.body, schema);

      !validateParams.error
        ? next()
        : failedValidation(validateParams.error.message);
    } catch (error) {
      failedValidation("Failed validation");
      throw error;
    }
  }
}

module.exports = RegisterValidationMiddleware;
