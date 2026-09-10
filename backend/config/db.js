const mysql = require("mysql2");

// Configuración de la conexión a la base de datos única
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sqlCuentasdj",
  database: "cuentasdj",
  timezone: `local`,
});

// Conexión a la base de datos y manejo de errores
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
});

module.exports = db;
