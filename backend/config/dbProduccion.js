const mysql = require("mysql2");

// Configuración de la conexión a la base de datos de produccion
const dbProduccion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sqlCuentasdj",
  database: "cuentasdj",
  timezone: `local`,
});

// Conexión a la base de datos y manejo de errores
dbProduccion.connect((err) => {
  if (err) {
    return;
  }
});

module.exports = dbProduccion;
