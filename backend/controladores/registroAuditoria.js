// funcion para crear un nuevo registro de auditoria

function CrearRegistroAuditoria(tipo_actividad, detalles) {
  const db = require("../config/db");
  const fechaActual = new Date();
  const query =
    "INSERT INTO actividad_sistema (fecha, tipo_actividad, detalles) VALUES (?,?,?)";

  db.query(query, [fechaActual, tipo_actividad, detalles], (err) => {
    if (err) {
      throw err;
    }
  });
}

module.exports = { CrearRegistroAuditoria };
