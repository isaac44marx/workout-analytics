const pool = require("./pool");

// Small helper so all queries are in one place.

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = { query };