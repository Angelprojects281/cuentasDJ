import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

import { useState } from "react";

function borrarToken() {
  localStorage.removeItem("token");
  window.history.back();
}

function CambiarContraseña() {
  const [idUsuarios, setUsuario] = useState("");
  const [cNueva, setCNueva] = useState("");
  const [confirmC, setConfirmC] = useState("");
  const [codigo, setCVerificacion] = useState("");

  const handleSolicitarCodigo = async () => {
    try {
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

      alert("Código de verificación enviado a tu correo electrónico");
    } catch (error) {
      alert("Error al solicitar el código: " + error.message);
    }
  };

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
      window.location.href = "/inicioSesion";
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
            onChange={(e) => setUsuario(e.target.value)}
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
            className="principales"
            onClick={handleSolicitarCodigo}
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

          <a href="/" onClick={borrarToken}>
            <button id="cancelar" className="secundarios">
              cancelar
            </button>
          </a>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default CambiarContraseña;
