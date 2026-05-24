const mysql = require("mysql2");

// Configuración de la conexión a la base de datos de auditoria
const dbAuditoria = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sqlCuentasdj",
  database: "auditoria",
  timezone: `local`,
});

// Conexión a la base de datos y manejo de errores
dbAuditoria.connect((err) => {
  if (err) {
    return;
  }
});

module.exports = dbAuditoria;
