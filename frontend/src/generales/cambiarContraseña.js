import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";

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
        alert(
          "La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.",
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
        alert(data.error || "Error al solicitar el código");
        return;
      }

      alert("Código de verificación enviado al correo de administración");
      setSeSolicitoCodigo(true);
    } catch (error) {
      alert("Error al solicitar el código: " + error.message);
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
        alert(data.error || "Error al verificar el código");
        return;
      }

      alert("Contraseña cambiada exitosamente");
      navigate("/inicioSesion");
      localStorage.removeItem("token");
    } catch (error) {
      alert("Error al cambiar la contraseña: " + error.message);
    }
  };

  return (
    <div>
      <BotonTema />
      <div id="container">
        <header id="header1">
          <button id="volver" onClick={borrarToken}>
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
