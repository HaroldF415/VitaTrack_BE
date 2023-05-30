const pgp = require("pg-promise")();

require("dotenv").config();

const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER } = process.env;

const cn = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      max: 30, // max number of clients in the pool
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USER,
    };

const db = pgp(cn);

module.exports = db;
