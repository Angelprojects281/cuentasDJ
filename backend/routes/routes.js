const express = require("express");
const router = express.Router();

// tu controlador real
const { login } = require("../controladores/autenticacion");

// ruta login
router.post("/login", login);

module.exports = router;
