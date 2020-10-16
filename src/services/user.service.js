const md5 = require('md5');

const logger = require('../config/logger.config');

const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');

const userRepo = require('../repos/user.repo');

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

        throw new UserAlreadyExistsError(`User already exists with username: ${username}`);
    }

    password = md5(password);
    user.password = password;

    return await userRepo.addUser(user);
};


module.exports = { createUser, getUserByUserName };

