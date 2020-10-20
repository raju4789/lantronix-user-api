const { Joi } = require('express-validation');

/**
 * Login request validations
 */
const LOGIN = {
    body: Joi.object({
        username: Joi.string()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required()
    }),
};

/**
 * Register request validations
 */

const REGISTER = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .optional(),
        username: Joi.string()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
        firstname: Joi.string()
            .optional(),
        lastname: Joi.string()
            .optional()
    }),
};

module.exports = { LOGIN, REGISTER };

