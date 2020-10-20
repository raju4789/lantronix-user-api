const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

//const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';

const errors = require('../errors/api.errors');
const errorModel = require('../errors/errorResponse');

let db = null;

/**
 * connection logic to db
 *  @returns singleton db connection object
 */
const connectToDB = async () => {
    try {
        if (db) return db;
        let url = await new MongoMemoryServer().getUri();
        const client = await MongoClient.connect(url, { useNewUrlParser: true });
        db = client.db();
        return db;
    } catch (err) {

        const error = new errorModel.errorResponse(
            errors.internal_error.withDetails('Our experts are looking into it.'));
        throw error;
    }

};

module.exports = connectToDB;
