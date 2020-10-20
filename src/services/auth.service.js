const md5 = require('md5');
const jwt = require('jsonwebtoken');

const errors = require('../errors/api.errors');
const errorModel = require('../errors/errorResponse');

const userRepo = require('../repos/user.repo');

const logger = require('../config/logger.config');

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET || 'secret';


/**
 * authenticates user login credentials
 *  @param user
 *  @returns user along with access token
 */

const authenticateUser = async (user) => {
    logger.info('authenticateUser called');

    const dbUser = await userRepo.getDBUser(user.username);

    let error =
        new errorModel.errorResponse(errors.not_found.withDetails('Username/Password is incorrect'));

    if (!dbUser) {
        throw error;
    }

    if (dbUser.password !== md5(user.password)) {
        throw error;
    }

    let accessToken = null;
    try {
        accessToken = generateAccessToken(user);
        if (!accessToken) {
            throw new Error();
        }
    } catch (_) {
        const err = new errorModel.errorResponse(errors.could_not_get_access_token.withDetails(''));
        throw err;
    }

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
    (user) => jwt.sign(user, ACCESS_TOKEN, { expiresIn: '10m' });

module.exports = { authenticateUser };

