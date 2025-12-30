const { Pool } = require("pg");

// Pool manages a set of DB connections for you.
// We read DATABASE_URL from environment variables.
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Check your .env file.");
} 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;