const { MongoClient } = require('mongodb');

const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';

let db = null;

/**
 * connection logic to db
 *  @returns singleton db connection object
 */
const connectToDB = async () => {
    if (db) return db;
    const client = await MongoClient.connect(URL, { useNewUrlParser: true });
    db = client.db();
    return db;
};

module.exports = connectToDB;
