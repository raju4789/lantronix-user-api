const express = require('express');
const { validate } = require('express-validation');

const authoriseRequest = require('../middlewares/auth.middleware');
const dbConnectionCheck = require('../middlewares/connection.middleware');
const authController = require('../controllers/auth.controller');

const { REGISTER, LOGIN } = require('../utils/api.validations');

const router = express.Router();

/**
 * Route to handle user login
 *  @middleware authoriseRequest
 *  @returns user authorisation status
 */
router.route('/status')
    .get(authoriseRequest, authController.getStatus);

/**
 * Route to handle user registration
 *  @middleware express-validation
 *  @returns registration status
 */

router.route('/register')
    .post(validate(REGISTER, {}, {}), dbConnectionCheck, authController.registerUser);

/**
 * Route to handle user login
 *  @middleware express-validation
 *  @returns login status
 */
router.route('/login')
    .post(validate(LOGIN, {}, {}), dbConnectionCheck, authController.loginUser);


module.exports = router;




