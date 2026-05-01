const dbProduccion = require("../config/dbProduccion");
const {
  rindeUtilizado,
  kilosBacheT,
  griegoEntregadoT,
} = require("../logicaMat/logicaMat");

// funcion para crear un nuevo registro

const CrearRegistro = async (req, res) => {
  try {
    const {
      turno,
      fecha,
      proveedorR,
      loteR,
      canecas20,
      canecas60,
      cdRecibidas,
      caRecibidas,
      cdEntregadas,
      caEntregadas,
      listaBaches,
    } = req.body;

    if (
      !turno ||
      !fecha ||
      !proveedorR ||
      !loteR ||
      !canecas20 ||
      !canecas60 ||
      !cdRecibidas ||
      !caRecibidas ||
      !cdEntregadas ||
      !caEntregadas ||
      !listaBaches
    ) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    if (canecas20 < 0 || canecas60 < 0 || canecas20 + canecas60 === 0) {
      return res
        .status(400)
        .json({ error: "no se permiten valores menores que 0" });
    }

    const fechaFormat = new Date(fecha).toISOString().split("T")[0];

    // logica tabla produccion
    const numeroBaches = listaBaches.length;

    const numCanecasRUtil = rindeUtilizado(
      canecas60,
      canecas20,
      numeroBaches,
    ).canecasTotal;

    const litrosRUtil = Math.trunc(numCanecasRUtil * 57);

    let sumaBaches = 0;

    for (let x = 0; x < listaBaches.length; x++) {
      sumaBaches += listaBaches[x].canecas;
      const kilosBache = kilosBacheT(listaBaches[x].canecas);
      const { canecasEntregadas, kilosEntregados } = griegoEntregadoT(
        listaBaches[x].canecas,
        numeroBaches,
        numCanecasRUtil,
      );
      const kilosEntregado = Math.trunc(canecasEntregadas * 57);

      listaBaches[x].kilosBache = kilosBache;
      listaBaches[x].griegoEntregado = canecasEntregadas;
      listaBaches[x].kilosEntregado = kilosEntregado;
    }

    const kilosBachesGlobal = sumaBaches * 57;

    const query =
      "INSERT INTO produccion (turno, fecha_prod, proveedor_rinde, lote_rinde, num_canecas_rinde, litros_caneca_rinde, griego_inicio, agitado_inicio, suma_baches, kilos_baches_total, agitadas_final, descolgadas_final) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    const querySelectR =
      "SELECT turno, fecha_prod FROM produccion WHERE turno= ? AND fecha_prod= ?";

    const [results] = await dbProduccion
      .promise()
      .query(querySelectR, [turno, fechaFormat]);

    if (results.length > 0) {
      return res.status(400).json({
        error: `Ya se hizo el registro del dia ${fechaFormat} para el ${turno}`,
      });
    }

    const [result] = await dbProduccion
      .promise()
      .query(query, [
        turno,
        fechaFormat,
        proveedorR,
        loteR,
        numCanecasRUtil,
        litrosRUtil,
        cdRecibidas,
        caRecibidas,
        sumaBaches,
        kilosBachesGlobal,
        caEntregadas,
        cdEntregadas,
      ]);

    const idProduccion = result.insertId;

    const queryBaches =
      "INSERT INTO bache (proveedor, lote, canecas_bache, kilos_bache, griego_entregado, entregado_kilos, idProduccion) VALUES (?,?,?,?,?,?,?)";

    for (let bache of listaBaches) {
      await dbProduccion
        .promise()
        .query(queryBaches, [
          bache.proveedor,
          bache.lote,
          bache.canecas,
          bache.kilosBache,
          bache.griegoEntregado,
          bache.kilosEntregado,
          idProduccion,
        ]);
    }

    console.log(
      `Se realizo un registro nuevo: ${new Date().toLocaleString()} \n`,
    );

    return res.status(201).json({ message: "Registro creado exitosamente" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      sqlMessage: error.sqlMessage,
    });
  }
};

module.exports = { CrearRegistro };
