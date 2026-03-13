const mysql = require("mysql2/promise");

let connection;

async function initDatabase() {
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "web_app",
      password: "root"
    });
    console.log("Database connected successfully");
    return connection;
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

function getConnection() {
  return connection;
}

module.exports = { initDatabase, getConnection };
