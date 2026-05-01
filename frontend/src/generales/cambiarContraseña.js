import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import { mostrarAlerta } from "../reutilizables/alertas";

// eliminar el token del local storage
function borrarToken() {
  localStorage.removeItem("token");
  window.history.back();
}

//manejo de cambio de contraseña
function CambiarContraseña() {
  const navigate = useNavigate();
  const [idUsuarios, setidUsuarios] = useState("");
  const [cNueva, setCNueva] = useState("");
  const [confirmC, setConfirmC] = useState("");
  const [codigo, setCVerificacion] = useState("");

  const [seSolicitoCodigo, setSeSolicitoCodigo] = useState(false);

  //evalua la seguridad de contraseña y envia la solicitud del codigo al backend
  const handleSolicitarCodigo = async () => {
    try {
      const resultadoSeguridad = await zxcvbn(cNueva);

      if (resultadoSeguridad.score < 3) {
        mostrarAlerta(
          "warning",
          "Contraseña insegura",
          "La contraseña debe contener al menos 8 caracteres incluyendo numeros y simbolos",
        );
        return;
      }

      const res = await fetch("http://localhost:4000/api/cambiarcontrasena", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuarios: idUsuarios,
          cNueva: cNueva,
          confirmC: confirmC,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarAlerta("error", "Error al enviar el codigo", data.error);
        return;
      }

      mostrarAlerta(
        "info",
        "Codigo enviado correctamente",
        "El codigo a sido enviado al correo de administracion.",
      );
      setSeSolicitoCodigo(true);
    } catch (error) {
      mostrarAlerta(
        "error",
        "Error al solicitar el codigo",
        "Hubo un error al solicitar el codigo, intente mas tarde",
      );
    }
  };

  //espera la confirmacion de codigo del backend y si la validacion es correcta informa para que se realice el cambio
  const handleCambiarContraseña = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/verificarCodigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuarios: idUsuarios,
          codigo: codigo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarAlerta("error", "Error al confirmar el codigo", data.error);
        return;
      }

      mostrarAlerta(
        "success",
        "Contraseña cambiada correctamente",
        "Ya puede iniciar sesion con su nueva contraseña",
      );
      navigate("/inicioSesion");
      localStorage.removeItem("token");
    } catch (error) {
      mostrarAlerta(
        "error",
        "Error al cambiar la contraseña",
        "hubo un error al cambiar la contraseña, intente mas tarde",
      );
    }
  };

  return (
    <div>
      <BotonTema />
      <div id="container">
        <header id="header1">
          <button id="volver" onClick={() => window.history.back()}>
            Volver
          </button>
        </header>
        <Header2 />
        <section id="content">
          <input
            type="text"
            id="usuarios"
            placeholder="usuario"
            value={idUsuarios}
            onChange={(e) => {
              setidUsuarios(e.target.value.trimStart());
              setSeSolicitoCodigo(false);
            }}
            onBlur={(e) => setidUsuarios(e.target.value.trim())}
          ></input>
          <input
            type="password"
            id="cNueva"
            placeholder="contraseña nueva"
            value={cNueva}
            onChange={(e) => setCNueva(e.target.value)}
          ></input>
          <input
            type="password"
            id="confirmC"
            placeholder="confirmar contraseña"
            value={confirmC}
            onChange={(e) => setConfirmC(e.target.value)}
          ></input>
          <input
            type="text"
            id="cVerificacion"
            placeholder="codigo de verificación"
            value={codigo}
            onChange={(e) => setCVerificacion(e.target.value)}
          ></input>

          <button
            id="enviar"
            className={`principales ${seSolicitoCodigo ? "botonDesabilitado" : ""}`}
            onClick={handleSolicitarCodigo}
            disabled={seSolicitoCodigo}
          >
            Solicitar codigo
          </button>

          <button
            id="aceptar"
            className="principales"
            onClick={handleCambiarContraseña}
          >
            Cambiar contraseña
          </button>

          <button
            id="cancelar"
            className="secundarios"
            onClick={() => {
              borrarToken();
              navigate("/inicioSesion");
            }}
          >
            cancelar
          </button>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default CambiarContraseña;
