const db = require("../config/db");
const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

const listarUsuarios = async (req, res) => {
  const query = "SELECT idUsuarios, Rol FROM usuarios ORDER BY idUsuarios ASC";

  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al consultar la base de datos" });
    }
    return res.json(results);
  });
};

const eliminarUsuario = async (req, res) => {
  const { idUsuarios } = req.params;

  if (!idUsuarios) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  if (req.user.idUsuarios === idUsuarios) {
    return res.status(400).json({ error: "No puedes eliminarte a ti mismo" });
  }

  const query = "DELETE FROM usuarios WHERE BINARY idUsuarios = ?";

  db.query(query, [idUsuarios], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al consultar la base de datos" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json({ message: "Usuario eliminado exitosamente" });
  });
};

module.exports = { listarUsuarios, eliminarUsuario, verificarToken };
