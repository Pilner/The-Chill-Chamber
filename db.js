const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // rejectUnauthorized: false // REMOVE THIS IN PRODUCTION
  }
});

module.exports = pool;
