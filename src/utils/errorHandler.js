const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');
const NotFoundError = require('../errors/NotFoundError');
const UnAuthorisedUserError = require('../errors/UnAuthorisedUserError');

const { ValidationError } = require('express-validation');

const logger = require('../config/logger.config');

/**
 * error handlind middleware
 * @param err
 * @param response
 * @returns error response
 */
const errorHandler = (err, req, res, next) => {

    logger.info('errorHandler middleware called');

    let STATUS_CODE = 500;
    let ERR_MSG = err.message;

    if (err instanceof ValidationError) {
        STATUS_CODE = 500;
        ERR_MSG = err.message;
    } else if (err instanceof UserAlreadyExistsError) {
        STATUS_CODE = 400;
        ERR_MSG = err.message;
    } else if (err instanceof NotFoundError) {
        STATUS_CODE = 400;
        ERR_MSG = err.message;
    } else if (err instanceof UnAuthorisedUserError) {
        STATUS_CODE = 403;
        ERR_MSG = err.message;
    }

    const error = {
        status: STATUS_CODE,
        message: ERR_MSG
    };

    res.status(STATUS_CODE).send(error);
};

module.exports = errorHandler;

