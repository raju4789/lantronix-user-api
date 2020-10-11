const logger = require('../config/logger.config');

const { authenticateUser } = require('../services/auth.service');
const { createUser } = require('../services/user.service');

const getStatus = (_, res, next) => {
    try {
        logger.info('live long and prosper');
        res.status(200).send({ message: 'live long and prosper' });
    } catch (err) {
        logger.error(`Status call failed because of error: ${err.message}`);
        next(err);
    }
};

const registerUser = async (req, res, next) => {
    try {
        await createUser(req.body);
        logger.info(`Successfully create user with username: ${req.body.username}`);
        res.status(200)
            .send({ message: 'A verification mail has been sent to your registered mail.' });
    } catch (err) {
        logger.error(`Failed to create user with username: ${req.body.username} because of Error: ${err.message}`);
        next(err);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const authenticatedUser = await authenticateUser(req.body);
        logger.info('Login successfull');
        res.status(200).send(authenticatedUser);
    } catch (err) {
        logger.error(`Failed to login because of error: ${err.message}`);
        next(err);
    }
};

module.exports = { getStatus, registerUser, loginUser };

