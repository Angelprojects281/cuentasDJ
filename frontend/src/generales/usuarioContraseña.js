import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function UsuarioContraseña() {
  const [idUsuarios, setidUsuarios] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
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
        alert(data.error || "Error al iniciar sesión");
        throw new Error(data.error || "Error al iniciar sesión");
      }
      console.log("Inicio de sesión exitoso:", data);

      localStorage.setItem("token", data.token);
      const decodedToken = jwtDecode(data.token);

      if (decodedToken.rol === "admin") {
        navigate("/principalAdmin");
      } else {
        navigate("/principalRegular");
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
          <button id="volver" onClick={() => window.history.back()}>
            volver
          </button>
        </header>
        <Header2 />

        <section id="content">
          <input
            type="text"
            id="usuario"
            placeholder="usuario"
            className="userInput"
            value={idUsuarios}
            onChange={(e) => setidUsuarios(e.target.value)}
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
          <a id="recuperacion" href="/cambiarContraseña">
            ¿olvidaste tu contraseña?
          </a>
          <p></p>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}
export default UsuarioContraseña;
