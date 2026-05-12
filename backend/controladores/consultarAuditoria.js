const dbAuditoria = require("../config/dbAuditoria");

const consultarAuditoria = async (req, res) => {
  try {
    const { tipoActividad, fechaInicio, fechaFin } = req.query;
    const fechaInicioFormat =
      new Date(fechaInicio).toISOString().split("T")[0] + `T0000`;
    const fechaFinFormat =
      new Date(fechaFin).toISOString().split("T")[0] + `T23:59`;

    const query =
      "SELECT * FROM actividad_sistema WHERE tipo_actividad = ? AND fecha BETWEEN ? AND ?";

    const [results] = await dbAuditoria
      .promise()
      .query(query, [tipoActividad, fechaInicioFormat, fechaFinFormat]);

    if (results.length === 0) {
      return res.status(404).json({
        error: `No se encontraron registro de actividad en este rango de fecha`,
      });
    }

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { consultarAuditoria };
