const { MongoClient } = require('mongodb');
const DBConnectionError = require('../errors/DBConnectionError');

const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';

let db = null;

/**
 * connection logic to db
 *  @returns singleton db connection object
 */
const connectToDB = async () => {
    try {
        if (db) return db;
        const client = await MongoClient.connect(URL, { useNewUrlParser: true });
        db = client.db();
        return db;
    }
    catch (err) {
        throw new DBConnectionError("DB Connection failed");
    }

};

module.exports = connectToDB;
