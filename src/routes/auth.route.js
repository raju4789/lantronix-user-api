const express = require('express');
const { validate } = require('express-validation');

const { authoriseRequest } = require('../services/auth.service');

const { getStatus, registerUser, loginUser } = require('../controllers/auth.controller');

const { REGISTER, LOGIN } = require('../utils/validations');

const router = express.Router();

/**
 * Route to handle user login
 *  @middleware authoriseRequest
 *  @returns user authorisation status
 */
router.route('/status')
    .get(authoriseRequest, getStatus);

/**
 * Route to handle user registration
 *  @middleware express-validation
 *  @returns registration status
 */

router.route('/register')
    .post(validate(REGISTER, {}, {}), registerUser);

/**
 * Route to handle user login
 *  @middleware express-validation
 *  @returns login status
 */
router.route('/login')
    .post(validate(LOGIN, {}, {}), loginUser);


module.exports = router;




