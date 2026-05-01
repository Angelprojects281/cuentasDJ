//funciones matematicas para produccion

function rindeUtilizado(rinde60, rinde20, numeroBaches) {
  let rindeTotal = rinde20 / 3 + rinde60;
  let canecasTotal = Math.trunc(rindeTotal);
  let litrosTotal = Math.trunc(canecasTotal * 57);
  return { canecasTotal, litrosTotal };
}

function kilosBacheT(canecasBache) {
  return Math.trunc(canecasBache * 57);
}

function griegoEntregadoT(canecasBache, numeroBaches, canecasTotal) {
  let canecasEntregadas = Math.trunc(
    canecasTotal / numeroBaches + canecasBache,
  );
  let kilosEntregados = Math.trunc(canecasEntregadas * 57);
  return { canecasEntregadas, kilosEntregados };
}

module.exports = { rindeUtilizado, kilosBacheT, griegoEntregadoT };
