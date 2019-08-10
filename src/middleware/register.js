const Joi = require("joi");
const ResponseTemplate = require("../helpers/ResponseTemplate");

const responseTemplate = new ResponseTemplate();

class RegisterValidationMiddleware {
  checkRegisterInput(req, res, next) {
    const failedValidation = message =>
      responseTemplate.responseError(res, { message, status: 400 });

    try {
      const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        full_name: Joi.string().required()
      });
      const passedParams = Joi.validate(req.body, schema);

      !passedParams.error
        ? next()
        : failedValidation(passedParams.error.message);
    } catch (error) {
      failedValidation("Failed validation");
      throw error;
    }
  }
}

module.exports = RegisterValidationMiddleware;
