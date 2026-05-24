//funciones matematicas para produccion

function rindeUtilizado(rinde60, rinde20, numeroBaches) {
  const rindeTotal = rinde20 / 3 + rinde60;
  const canecasTotal = Math.trunc(rindeTotal);
  const litrosTotal = Math.trunc(canecasTotal * 57);
  return { canecasTotal, litrosTotal };
}

function kilosBacheT(canecasBache) {
  return Math.trunc(canecasBache * 57);
}

function griegoEntregadoT(canecasBache, numeroBaches, canecasTotal) {
  const canecasEntregadas = Math.trunc(
    canecasTotal / numeroBaches + canecasBache,
  );
  const kilosEntregados = Math.trunc(canecasEntregadas * 57);
  return { canecasEntregadas, kilosEntregados };
}

module.exports = { rindeUtilizado, kilosBacheT, griegoEntregadoT };
