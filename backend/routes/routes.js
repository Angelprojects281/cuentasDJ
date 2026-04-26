const express = require("express");
const router = express.Router();

//controlador
const { login } = require("../controladores/autenticacion");
const { cambiarcontrasena } = require("../controladores/cambioContraseña");
const {
  verificarCodigoCambiocontrasena,
} = require("../controladores/cambioContraseña");
const { crearUsuario } = require("../controladores/crearUsuario");
const {
  listarUsuarios,
  eliminarUsuario,
  verificarToken,
} = require("../controladores/gestionUsuarios");

// ruta login
router.post("/login", login);

// ruta cambiar contrasena
router.post("/cambiarcontrasena", cambiarcontrasena);

// ruta verificar codigo cambio contrasena
router.post("/verificarCodigo", verificarCodigoCambiocontrasena);

//ruta crear nuevo usuario
router.post("/crearUsuario", crearUsuario);

//ruta listar usuarios
router.get("/listarUsuarios", listarUsuarios);

//ruta eliminar usuario
router.delete("/usuario/:idUsuarios", verificarToken, eliminarUsuario);

module.exports = router;
