// funcion para crear un nuevo registro de auditoria

function CrearRegistroAuditoria(tipo_actividad, detalles) {
  const db = require("../config/db");
  const partesFecha = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const obtenerParte = (tipo) =>
    partesFecha.find((parte) => parte.type === tipo).value;
  const fechaActual = `${obtenerParte("year")}-${obtenerParte("month")}-${obtenerParte("day")} ${obtenerParte("hour")}:${obtenerParte("minute")}:${obtenerParte("second")}`;
  const query =
    "INSERT INTO actividad_sistema (fecha, tipo_actividad, detalles) VALUES (?,?,?)";

  db.query(query, [fechaActual, tipo_actividad, detalles], (err) => {
    if (err) {
      throw err;
    }
  });
}

module.exports = { CrearRegistroAuditoria };
