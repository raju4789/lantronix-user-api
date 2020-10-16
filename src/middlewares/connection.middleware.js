const logger = require('../config/logger.config');
const connectToDB = require('../config/db.config');

const DBConnectionError = require('../errors/DBConnectionError');

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
            next(new DBConnectionError("DB Connection failed"));
        }

        next();
    }
    catch (err) {
        next(new DBConnectionError("DB Connection failed"));
    }

};

module.exports = dbConnectionCheck;

