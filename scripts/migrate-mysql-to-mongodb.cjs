
const { loadEnvConfig } = require("@next/env");
const mysql = require("mysql2/promise");
const { MongoClient } = require("mongodb");

// Load existing Next.js .env.local settings
loadEnvConfig(process.cwd());

const TABLES = [
  "category",
  "product",
  "blog",
  "career_application",
  "contact_message",
  "homepage_image",
  "testimonial",
];

function convertDates(row) {
  const result = { ...row };

  for (const field of ["createdAt", "updatedAt"]) {
    if (!result[field]) continue;

    const value = result[field];

    // MySQL DATETIME has no timezone.
    // Preserve its wall-clock value by interpreting it as UTC.
    const date = new Date(
      typeof value === "string"
        ? value.replace(" ", "T") + "Z"
        : value
    );

    if (!Number.isNaN(date.getTime())) {
      result[field] = date;
    }
  }

  return result;
}

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI missing in .env.local");
  }

  const mysqlConnection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "kki",
    dateStrings: true,
  });

  const mongoClient = new MongoClient(
    process.env.MONGODB_URI,
    { maxPoolSize: 5 }
  );

  try {
    await mongoClient.connect();

    const mongoDB = mongoClient.db(
      process.env.MONGODB_DB || "kki"
    );

    console.log("Connected to MySQL and MongoDB Atlas");
    console.log("--------------------------------------");

    for (const table of TABLES) {
      const [rows] = await mysqlConnection.query(
        `SELECT * FROM \`${table}\``
      );

      const collection = mongoDB.collection(table);

      // Create collection even when MySQL table is empty.
      const existingCollections =
        await mongoDB.listCollections(
          { name: table },
          { nameOnly: true }
        ).toArray();

      if (existingCollections.length === 0) {
        await mongoDB.createCollection(table);
      }

      if (rows.length > 0) {
        const documents = rows.map((row) => {
          const document = convertDates(row);

          // Keep MySQL ID as both _id and id.
          document._id = row.id;

          // Convert MySQL boolean-style field.
          if (table === "product") {
            document.featured = Boolean(row.featured);
          }

          return document;
        });

        const operations = documents.map((document) => ({
          replaceOne: {
            filter: { _id: document._id },
            replacement: document,
            upsert: true,
          },
        }));

        await collection.bulkWrite(operations, {
          ordered: true,
        });
      }

      // Website lookup indexes.
      if (
        ["product", "category", "blog"].includes(table)
      ) {
        await collection.createIndex(
          { slug: 1 },
          { unique: true }
        );
      }

      const mongoCount =
        await collection.countDocuments();

      console.log(
        `${table}: MySQL=${rows.length}, MongoDB=${mongoCount}`
      );

      if (mongoCount !== rows.length) {
        throw new Error(
          `Record count mismatch in ${table}`
        );
      }
    }

    // Verify all product/category references.
    const categories = await mongoDB
      .collection("category")
      .find({}, { projection: { id: 1 } })
      .toArray();

    const categoryIds = new Set(
      categories.map((item) => item.id)
    );

    const products = await mongoDB
      .collection("product")
      .find({}, { projection: { name: 1, categoryId: 1 } })
      .toArray();

    const missingCategories = products.filter(
      (product) =>
        product.categoryId !== null &&
        product.categoryId !== undefined &&
        !categoryIds.has(product.categoryId)
    );

    if (missingCategories.length > 0) {
      console.warn(
        "Products with missing category references:",
        missingCategories
      );
      throw new Error(
        "Category reference verification failed"
      );
    }

    console.log("--------------------------------------");
    console.log("MIGRATION COMPLETED SUCCESSFULLY");
    console.log("All record counts verified.");
    console.log("Product/category references verified.");
    console.log("Original MySQL database unchanged.");
  } finally {
    await mysqlConnection.end();
    await mongoClient.close();
  }
}

main().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exitCode = 1;
});
