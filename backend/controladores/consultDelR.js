const dbProduccion = require("../config/dbProduccion");
const {
  CrearRegistroAuditoria,
} = require("../controladores/registroAuditoria");

// selecciona la tabla de produccion y los registros de los baches relacionados
const consultarRegistro = async (req, res) => {
  try {
    const { turno, fecha } = req.query;
    const fechaFormat = new Date(fecha).toISOString().split("T")[0];
    const queryProduccion =
      "SELECT * FROM produccion WHERE turno= ? AND fecha_prod= ? ";

    const [results] = await dbProduccion
      .promise()
      .query(queryProduccion, [turno, fechaFormat]);

    if (results.length === 0) {
      return res.status(404).json({
        error: `No se encontraron registro para el dia ${fechaFormat} en el ${turno}`,
      });
    }

    const forenKey = results[0].idProduccion;

    const queryBaches = "SELECT * FROM bache WHERE idProduccion = ?";

    const [resultsB] = await dbProduccion
      .promise()
      .query(queryBaches, [forenKey]);

    return res.json({ results, resultsB });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// elimina todos los registros de baches y produccion
const eliminarReg = async (req, res) => {
  try {
    const { idProduccion } = req.params;

    const queryDelBch = "DELETE FROM bache WHERE idProduccion = ?";

    const [results] = await dbProduccion
      .promise()
      .query(queryDelBch, [idProduccion]);

    const queryDelProd = " DELETE FROM produccion WHERE idProduccion = ?";

    const [results2] = await dbProduccion
      .promise()
      .query(queryDelProd, [idProduccion]);

    CrearRegistroAuditoria(
      "eliminar_registro",
      "se realizo la eliminacion de un registro",
    );

    return res
      .status(201)
      .json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { consultarRegistro, eliminarReg };
