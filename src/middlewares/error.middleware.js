const { ValidationError } = require('express-validation');

const errors = require('../errors/api.errors');
const errorModel = require('../errors/errorResponse');

/**
 * error handlind middleware
 * @param err
 * @param response
 * @returns error response
 */
const errorHandler = (err, req, res, next) => {

    let STATUS_CODE = err.HTTP_STATUS || 500;

    if (err instanceof ValidationError) {
        STATUS_CODE = 400;
        const apiValidationError = new errorModel.errorResponse(
            errors.invalid_input.withDetails(err.message));
        res.status(STATUS_CODE).send(apiValidationError);
        return;
    }
    res.status(STATUS_CODE).send(err);
};

module.exports = errorHandler;

