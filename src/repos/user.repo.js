const connectToDB = require('../config/db.config');
const logger = require('../config/logger.config');

/**
 * gets user by username
 * @param username
 * @returns user
 */
const getDBUser = async (username) => {
    logger.info(`getDBUser called for username : ${username}`);

    const db = await connectToDB();

    if (!db) {
        logger.error("DB connection failed");
        throw new Error("DB connection failed");
    }

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
const addUser = async (user) => {
    logger.info(`addUser called for username : ${user.username}`);

    const db = await connectToDB();

    if (!db) {
        logger.error("DB connection failed");
        throw new Error("DB connection failed");
    }

    const collection = db.collection('user');

    await collection.insertOne(user);
};

module.exports = { getDBUser, addUser };