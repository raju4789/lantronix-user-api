const jwt = require('jsonwebtoken');

const logger = require('../config/logger.config');

const UnAuthorisedUserError = require('../errors/UnAuthorisedUserError');

/**
 * authorises user request
 *  @param request
 *  @param next
 */

const authoriseRequest = (req, _, next) => {
    logger.info('authoriseRequest middleware called');

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) {
        logger.error('Invalid request: Token is empty');
        throw new UnAuthorisedUserError('Token is empty');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) {
            logger.error(`Failed to verify token because of error :${err.message}`);
            throw new UnAuthorisedUserError(err.message);
        }
        next();
    });
};

module.exports = authoriseRequest;