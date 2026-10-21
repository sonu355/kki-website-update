
const { loadEnvConfig } = require("@next/env");
const { MongoClient } = require("mongodb");

loadEnvConfig(process.cwd());

async function testConnection() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  try {
    await client.connect();

    const db = client.db(process.env.MONGODB_DB || "kki");

    await db.command({ ping: 1 });

    console.log("MongoDB Atlas connection successful!");
    console.log("Database:", db.databaseName);
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

testConnection();
