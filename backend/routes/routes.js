const express = require("express");
const router = express.Router();

//controlador
const { login } = require("../controladores/autenticacion");
const { cambiarcontrasena } = require("../controladores/cambioContraseña");
const {
  verificarCodigoCambiocontrasena,
} = require("../controladores/cambioContraseña");

// ruta login
router.post("/login", login);

// ruta cambiar contrasena
router.post("/cambiarcontrasena", cambiarcontrasena);

// ruta verificar codigo cambio contrasena
router.post("/verificarCodigo", verificarCodigoCambiocontrasena);

module.exports = router;
