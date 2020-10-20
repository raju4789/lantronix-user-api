const logger = require('../config/logger.config');
const connectToDB = require('../config/db.config');

const errors = require('../errors/api.errors');
const errorModel = require('../errors/errorResponse');

/**
 * authorises user request
 *  @param request
 *  @param next
 */

const dbConnectionCheck = (req, _, next) => {
    logger.info('dbConnectionCheck middleware called');
    try {
        const db = connectToDB();

        if (!db) {
            const error = new errorModel.errorResponse(
                errors.internal_error.withDetails('Our experts are looking into it.'));
            next(error);
        }

        next();
    }
    catch (err) {
        const error = new errorModel.errorResponse(
            errors.internal_error.withDetails('Our experts are looking into it.'));
        next(error);
    }

};

module.exports = dbConnectionCheck;

