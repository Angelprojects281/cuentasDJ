import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import { mostrarAlerta } from "../reutilizables/alertas";

//gestion para agregar usuarios
function NuevoUsuario() {
  const navigate = useNavigate();
  const [idUsuarios, setidUsuarios] = useState("");
  const [cNueva, setCNueva] = useState("");
  const [Rol, setRol] = useState("vacio");

  //validaciones generales, validaciones de seguridad de la contraseña y validacion hacia el backend
  const handleCrearUsuario = async () => {
    try {
      if (!idUsuarios || !cNueva) {
        mostrarAlerta(
          "warning",
          "No se pudo crear el usuario",
          "faltan campos requeridos",
        );
        return;
      }
      const resultadoSeguridad = await zxcvbn(cNueva);

      if (resultadoSeguridad.score < 3) {
        mostrarAlerta(
          "warning",
          "Contraseña insegura",
          "La contraseña debe tener minimo 8 caracteres incluyendo numeros y simbolos",
        );
        return;
      }

      if (Rol === "vacio") {
        mostrarAlerta(
          "warning",
          "No se pudo crear el usuario",
          "Seleccione un rol para el usuario",
        );
        return;
      }

      const res = await fetch("http://localhost:4000/api/crearUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuarios: idUsuarios,
          cNueva: cNueva,
          Rol: Rol,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarAlerta("error", "Error al crear el usuario", data.error);
        return;
      }

      mostrarAlerta(
        "succes",
        "Usuario creado correctamente",
        "ya puede iniciar sesion con el nuevo usuario",
      );
      navigate("/principalAdmin");
    } catch (error) {
      mostrarAlerta("error", "Algo salio mal", "intente de nuevo mas tarde");
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
          <p>Ingrese los datos del usuario:</p>
          <p>Rol:</p>
          <select name="rol" id="rol" onChange={(e) => setRol(e.target.value)}>
            <option value="vacio">selecciona un rol</option>
            <option value="admin">administrador</option>
            <option value="regular">regular</option>
          </select>

          <input
            type="text"
            name="usuario"
            id="usuario"
            placeholder="usuario"
            className="userInput"
            value={idUsuarios}
            onChange={(e) => setidUsuarios(e.target.value.trimStart())}
            onBlur={(e) => setidUsuarios(e.target.value.trim())}
          ></input>
          <input
            type="password"
            name="contraseña"
            id="contraseña"
            className="userInput"
            placeholder="contraseña"
            onChange={(e) => setCNueva(e.target.value)}
          ></input>

          <button
            id="nuevoUser"
            className="principales"
            onClick={handleCrearUsuario}
          >
            confirmar
          </button>

          <button
            id="cancelar"
            className="secundarios"
            onClick={() => window.history.back()}
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

export default NuevoUsuario;
