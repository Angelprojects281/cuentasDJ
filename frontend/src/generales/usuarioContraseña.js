import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { mostrarAlerta } from "../reutilizables/alertas";

//gestiona el inicio de sesion
function UsuarioContraseña() {
  const [idUsuarios, setidUsuarios] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  // realiza validaciones previas, guarda el token en local y redirige a la pagina correspondiente
  const handleLogin = async (e) => {
    try {
      if (!idUsuarios || !contraseña) {
        mostrarAlerta(
          "error",
          "Error al iniciar sesion",
          "Debes ingresar todos los datos requeridos",
        );
        return;
      }
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idUsuarios, contraseña }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        mostrarAlerta("error", "Error al iniciar sesion", data.error);
        throw new Error(data.error || "Error al iniciar sesión");
      }
      console.log("Inicio de sesión exitoso:", data);

      localStorage.setItem("token", data.token);
      const decodedToken = jwtDecode(data.token);

      if (decodedToken.rol === "admin") {
        navigate({ replace: true, pathname: "/principalAdmin" });
      } else if (decodedToken.rol === "regular") {
        navigate({ replace: true, pathname: "/principalRegular" });
      } else {
        navigate({ replace: true, pathname: "/principalAuditor" });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <BotonTema />
      <div id="container">
        <header id="header1">
          <Link to="/">
            <button id="volver">volver</button>
          </Link>
        </header>
        <Header2 />

        <section id="content">
          <input
            type="text"
            id="usuario"
            placeholder="usuario"
            className="userInput"
            value={idUsuarios}
            onChange={(e) => setidUsuarios(e.target.value.trimStart())}
            onBlur={(e) => setidUsuarios(e.target.value.trim())}
          ></input>
          <input
            type="password"
            id="contraseña"
            placeholder="contraseña"
            className="userInput"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          ></input>
          <button
            id="iniciarSesion"
            className="principales"
            onClick={handleLogin}
          >
            iniciar sesion
          </button>
          <Link to="/cambiarContraseña" id="recuperacion">
            ¿olvidaste tu contraseña?
          </Link>
          <p></p>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}
export default UsuarioContraseña;
