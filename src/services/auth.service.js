const jwt = require('jsonwebtoken');
const md5 = require('md5');

const NotFoundError = require('../errors/NotFoundError');
const UnAuthorisedUserError = require('../errors/UnAuthorisedUserError');

const { getUserByUserName } = require('./user.service');

const logger = require('../config/logger.config');

/**
 * authorises user request
 *  @param request
 *  @param next
 */

const authoriseRequest = (req, _, next) => {
    logger.info('authoriseRequest middleware called');

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
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

/**
 * authenticates user login credentials
 *  @param user
 *  @returns user along with access token
 */

const authenticateUser = async (user) => {
    logger.info('authenticateUser called');

    const dbUser = await getUserByUserName(user.username);
    if (!dbUser) {
        throw new NotFoundError('Username/Password is incorrect');
    }

    if (dbUser.password !== md5(user.password)) {
        throw new NotFoundError('Username/Password is incorrect');
    }

    const accessToken = generateAccessToken(user);

    delete dbUser.password;

    return {
        token: accessToken,
        user: dbUser
    };

};


/**
 * generates JWT token with specified expiry time
 *  @param user
 *  @returns user along with access token
 */
const generateAccessToken =
    (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

module.exports = { authoriseRequest, authenticateUser };

