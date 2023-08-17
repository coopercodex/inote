const Pool = require('pg').Pool;
require("dotenv").config();
// const Pool = require('pg').Pool;

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  ssl: { sslmode: 'require', rejectUnauthorized: false }
}

const proConfig = {
  connectionString: process.env.PG_HOST,
  ssl: { sslmode: 'require', rejectUnauthorized: false },
};

const pool = new Pool (process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = pool;