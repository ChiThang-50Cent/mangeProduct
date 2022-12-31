const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = `mongodb+srv://chithang:%40%40~~~123lol@cluster0.smygs.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri);

const database = client.db('NTStore');

module.exports = database
