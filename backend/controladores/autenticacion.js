const db = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../secretKey.env" });
const bcrypt = require("bcrypt");
const {
  CrearRegistroAuditoria,
} = require("../controladores/registroAuditoria");

// Función para manejar el inicio de sesión
const login = async (req, res) => {
  const { idUsuarios, contraseña } = req.body;

  const query = "SELECT * FROM usuarios WHERE BINARY idUsuarios = ?";

  // Consulta a la base de datos para verificar el usuario
  db.query(query, [idUsuarios], async (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al consultar la base de datos" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = results[0];

    // Verificación de la contraseña utilizando bcrypt
    const coincide = bcrypt.compareSync(contraseña, user.contraseña);

    if (!coincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generación del token JWT con el ID del usuario y su rol
    const token = jwt.sign(
      { idUsuarios: user.idUsuarios, rol: user.Rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    CrearRegistroAuditoria(
      "inicio_sesion",
      `Inicio de sesion para el usuario ${idUsuarios}`,
    );
    res.json({
      message: "Inicio de sesión exitoso",
      user: { idUsuarios: user.idUsuarios, rol: user.Rol },
      token: token,
    });
  });
};

module.exports = { login };
