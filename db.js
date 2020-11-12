const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "1323",
  database: "todo_database",
  port: 5432,
});

module.exports = pool;
