const db = require("../config/db");
const bcrypt = require("bcrypt");
const {
  CrearRegistroAuditoria,
} = require("../controladores/registroAuditoria");

// Función para manejar la creación de un nuevo usuario
const crearUsuario = async (req, res) => {
  const { idUsuarios, cNueva, Rol } = req.body;

  if (!idUsuarios || !cNueva || !Rol) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  const query = "SELECT * FROM usuarios WHERE BINARY idUsuarios = ?";

  db.query(query, [idUsuarios], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al consultar la base de datos" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Hash de la contraseña antes de almacenarla en la base de datos
    const cHash = bcrypt.hashSync(cNueva, 10);

    const queryInsert =
      "INSERT INTO usuarios (idUsuarios, contraseña, Rol, codigo_verificacion, codigo_expiracion, nueva_contraseña) VALUES (?, ?, ?, NULL, NULL, NULL)";

    db.query(queryInsert, [idUsuarios, cHash, Rol], (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al insertar el usuario en la base de datos" });
      }
      CrearRegistroAuditoria(
        "nuevo_usuario",
        `se creo un nuevo usuario con nombre ${idUsuarios} y con rol ${Rol}`,
      );
      return res.json({ message: "Usuario creado exitosamente" });
    });
  });
};

module.exports = { crearUsuario };
