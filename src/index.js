/**
 *  @author Raju MLN
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const errorHandler = require('./middlewares/error.middleware');

const logger = require('./config/logger.config');

const authRouter = require('./routes/auth.route');

const PORT = process.env.PORT || 7777;

const app = express();

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json());

app.listen(PORT, logger.info(`Server running, listening on port : ${PORT}`));

app.use('/user', authRouter);

app.use(errorHandler);

