/**
 * 
 *      Establishes a connection to the DB
 * 
 */

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database successfully.");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if the connection fails
  }
}

module.exports = { client, connectToDatabase };
