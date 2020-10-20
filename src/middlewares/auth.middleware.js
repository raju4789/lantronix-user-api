const jwt = require('jsonwebtoken');

const logger = require('../config/logger.config');

const errors = require('../errors/api.errors');
const errorModel = require('../errors/errorResponse');

/**
 * authorises user request
 *  @param req
 *  @param next
 */

const authoriseRequest = (req, _, next) => {
    logger.info('authoriseRequest middleware called');

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) {
        logger.error('Invalid request: Token is empty');
        const error = new errorModel.errorResponse(
            errors.invalid_key.withDetails('Token is empty'));
        next(error);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) {
            logger.error(`Failed to verify token because of error :${err.message}`);
            const error = new errorModel.errorResponse(
                errors.invalid_key.withDetails(err.message));
            next(error);
        }
        next();
    });
};

module.exports = authoriseRequest;

