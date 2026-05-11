// funcion para crear un nuevo registro de auditoria

function CrearRegistroAuditoria(tipo_actividad, detalles) {
  const dbAuditoria = require("../config/dbAuditoria");
  const fechaActual = new Date().toISOString().replace(`T`, ` `).slice(0, 19);
  const query =
    "INSERT INTO auditoria.actividad_sistema (fecha, tipo_actividad, detalles) VALUES (?,?,?)";

  dbAuditoria.query(query, [fechaActual, tipo_actividad, detalles], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al insertar en la base de datos" });
    }
  });
}

module.exports = { CrearRegistroAuditoria };
