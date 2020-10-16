const md5 = require('md5');
const jwt = require("jsonwebtoken");

const NotFoundError = require('../errors/NotFoundError');

const userRepo = require('../repos/user.repo');

const logger = require('../config/logger.config');

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET || "secret";


/**
 * authenticates user login credentials
 *  @param user
 *  @returns user along with access token
 */

const authenticateUser = async (user) => {
    logger.info('authenticateUser called');

    const dbUser = await userRepo.getDBUser(user.username);
    if (!dbUser) {
        throw new NotFoundError('Username/Password is incorrect');
    }

    if (dbUser.password !== md5(user.password)) {
        throw new NotFoundError('Username/Password is incorrect');
    }

    const accessToken = generateAccessToken(user);

    if (!accessToken) {
        throw new Error("Failed to generate access token");
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

