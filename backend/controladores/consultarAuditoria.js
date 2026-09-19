const db = require("../config/db");

const consultarAuditoria = async (req, res) => {
  try {
    const { tipoActividad, fechaInicio, fechaFin } = req.query;
    const fechaInicioFormat = `${fechaInicio} 00:00:00`;
    const fechaFinFormat = `${fechaFin} 23:59:59`;

    const query =
      "SELECT idactividad_sistema, DATE_FORMAT(fecha, '%Y-%m-%d %H:%i:%s') AS fecha, tipo_actividad, detalles FROM actividad_sistema WHERE tipo_actividad = ? AND fecha BETWEEN ? AND ?";

    const [results] = await db
      .promise()
      .query(query, [tipoActividad, fechaInicioFormat, fechaFinFormat]);

    if (results.length === 0) {
      return res.status(404).json({
        error: `No se encontraron registro de actividad en este rango de fecha`,
      });
    }

    return res.json(results);
  } catch (_error) {
    return res.status(500).json({ error: _error.message });
  }
};

module.exports = { consultarAuditoria };
