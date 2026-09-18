require("dotenv").config({ path: __dirname + "/../dbPassword.env" });
const fs = require("fs");
const path = require("path");

const mysql = require("mysql2");

// Configuración de la conexión a la base de datos única
const db = mysql.createConnection({
  host: "mysql-9788a4f-angel15laverde16-4aae.b.aivencloud.com",
  port: 21715,
  user: "avnadmin",
  password: process.env.PASSWORD,
  database: "cuentasdj",
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, "..", "ca.pem")),
    rejectUnauthorized: true,
  },
  debug: true,
});

// Conexión a la base de datos y manejo de errores
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  } else {
    console.log("conexion correcta");
  }
});

module.exports = db;
