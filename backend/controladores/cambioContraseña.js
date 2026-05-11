const db = require("../config/db");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: __dirname + "/../contrasena.env" });
const bcrypt = require("bcrypt");
const {
  CrearRegistroAuditoria,
} = require("../controladores/registroAuditoria");

// Función para generar un código de verificación aleatorio de 4 dígitos
function generarCodigo() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Función para calcular la fecha de expiración del código (15 minutos a partir de ahora)
function calcularTiempoExpiracion() {
  const ahora = new Date();
  ahora.setMinutes(ahora.getMinutes() + 15);
  return ahora;
}

// Configuración del transporte de correo utilizando nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.correo,
    pass: process.env.contrasena,
  },
});

// Función para enviar el correo con el código de verificación
async function enviarCorreo(codigo, idUsuarios, Rol) {
  const mailOptions = {
    from: process.env.correo,
    to: process.env.correo,
    subject: "Código de verificación para cambio de contraseña",
    html: `<p>Tu código de verificación para el usuario <b>${idUsuarios}</b> con rol <b>${Rol}</b> es: <b>${codigo}</b>. Este código es válido por 15 minutos.</p>`,
  };

  return transporter.sendMail(mailOptions);
}

// Función para manejar la solicitud de cambio de contraseña
const cambiarcontrasena = async (req, res) => {
  const { idUsuarios, cNueva, confirmC } = req.body;

  if (!idUsuarios || !cNueva || !confirmC) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  if (cNueva !== confirmC) {
    return res.status(400).json({ error: "Las contraseñas no coinciden" });
  }

  const query = "SELECT * FROM usuarios WHERE BINARY idUsuarios = ?";

  db.query(query, [idUsuarios], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al consultar la base de datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = results[0];
    const codigo = generarCodigo();
    const expiracion = calcularTiempoExpiracion();

    const updateQuery =
      "UPDATE usuarios SET codigo_verificacion = ?, codigo_expiracion = ?, nueva_contraseña = ? WHERE idUsuarios = ?";

    const cNuevaHash = bcrypt.hashSync(cNueva, 10);

    db.query(
      updateQuery,
      [codigo, expiracion, cNuevaHash, idUsuarios],
      async (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al actualizar el código de verificación" });
        }

        try {
          await enviarCorreo(codigo, user.idUsuarios, user.Rol);
          CrearRegistroAuditoria(
            "codigo_verificacion",
            `se envio un codigo de verificacion para el usuarios ${idUsuarios}`,
          );
          return res.json({
            message: "Código de verificación enviado al correo",
          });
        } catch (mailError) {
          return res.status(500).json({ error: "Error al enviar el correo" });
        }
      },
    );
  });
};

// Función para manejar la verificación del código de cambio de contraseña
const verificarCodigoCambiocontrasena = (req, res) => {
  const { idUsuarios, codigo } = req.body;

  if (!idUsuarios || !codigo) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  const query = "SELECT * FROM usuarios WHERE BINARY idUsuarios = ?";

  db.query(query, [idUsuarios], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al consultar la base de datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = results[0];
    const ahora = new Date();
    const query1 =
      "UPDATE usuarios SET codigo_verificacion = NULL, codigo_expiracion = NULL, nueva_contraseña = NULL WHERE idUsuarios = ?";

    const query2 =
      "UPDATE usuarios SET contraseña = ?, codigo_verificacion = NULL, nueva_contraseña = NULL, codigo_expiracion = NULL WHERE idUsuarios = ?";

    if (user.codigo_verificacion !== codigo) {
      return res
        .status(400)
        .json({ error: "Código de verificación incorrecto" });
    }

    if (ahora > user.codigo_expiracion) {
      return db.query(query1, [idUsuarios], (err) => {
        if (err) {
          return res
            .status(400)
            .json({ error: "Error al limpiar el codigo expirado" });
        }

        return res
          .status(400)
          .json({ error: "Código de verificación expirado" });
      });
    }

    db.query(query2, [user.nueva_contraseña, idUsuarios], (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al actualizar la contraseña" });
      }
      CrearRegistroAuditoria(
        "cambio_contraseña",
        `contraseña cambiada para el usuario ${idUsuarios}`,
      );
      return res.json({ message: "contraseña actualizada correctamente" });
    });
  });
};

module.exports = { cambiarcontrasena, verificarCodigoCambiocontrasena };
