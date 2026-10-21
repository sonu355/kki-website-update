
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const options = {
  maxPoolSize: 5,
  serverSelectionTimeoutMS: 10000,
};

let clientPromise;

function getClientPromise() {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing. Check your .env.local file."
    );
  }

  if (process.env.NODE_ENV === "development") {
    if (!globalThis._kkiMongoClientPromise) {
      const client = new MongoClient(uri, options);
      globalThis._kkiMongoClientPromise = client.connect();
    }

    return globalThis._kkiMongoClientPromise;
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getDatabase() {
  const client = await getClientPromise();

  return client.db(process.env.MONGODB_DB || "kki");
}
