const mysql = require("mysql2");

// Configuración de la conexión a la base de datos de auditoria
const dbAuditoria = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sqlCuentasdj",
  database: "auditoria",
});

// Conexión a la base de datos y manejo de errores
dbAuditoria.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos de auditoria establecida");
});

module.exports = dbAuditoria;
