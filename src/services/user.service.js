const md5 = require('md5');

const connectToDB = require('../config/db.config');

const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');

const logger = require('../config/logger.config');

/**
 * gets user by username
 * @param username
 * @returns user
 */
const getUserByUserName = async (username) => {
    logger.info(`getUserByUserName called for username : ${username}`);

    const db = await connectToDB();
    const collection = db.collection('user');
    const user = await collection.findOne({ username });
    return user;
};

/**
 * creates user
 * @param user object
 * @returns inserted user
 * @throws UserAlreadyExistsError
 */
const createUser = async (user) => {
    let { username, password, email, firstname, lastname } = user;

    logger.info(`createUser called for username : ${username}`);


    const db = await connectToDB();
    const collection = db.collection('user');

    const dbUser = await collection.findOne({ username });

    if (dbUser) {
        logger.error(`user already exists for username : ${username}`);

        throw new UserAlreadyExistsError(`User already exists with username: ${username}`);
    }

    password = md5(password);
    await collection.insertOne({ username, password, email, firstname, lastname });
};


module.exports = { getUserByUserName, createUser };

