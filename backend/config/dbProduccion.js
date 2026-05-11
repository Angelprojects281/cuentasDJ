const mysql = require("mysql2");

// Configuración de la conexión a la base de datos de produccion
const dbProduccion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sqlCuentasdj",
  database: "cuentasdj",
});

// Conexión a la base de datos y manejo de errores
dbProduccion.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos de produccion establecida");
});

module.exports = dbProduccion;
