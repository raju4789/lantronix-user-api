const md5 = require('md5');

const logger = require('../config/logger.config');

const userRepo = require('../repos/user.repo');

const errors = require('../errors/api.errors');
const errorModel = require('../errors/errorResponse');

const getUserByUserName = async (username) => {
    return await userRepo.getDBUser(username);
};

/**
 * creates user
 * @param user object
 * @returns inserted user
 * @throws UserAlreadyExistsError
 */
const createUser = async (user) => {
    let { password } = user;
    const { username } = user;

    logger.info(`createUser called for username : ${username}`);

    const dbUser = await userRepo.getDBUser(username);

    if (dbUser) {
        logger.error(`User already exists for username : ${username}`);
        const error =
            new errorModel.errorResponse(
                errors.invalid_input.withDetails(`User with username : ${username} is already created`));
        throw error;
    }

    password = md5(password);
    user.password = password;

    return await userRepo.addUser(user);
};


module.exports = { createUser, getUserByUserName };

