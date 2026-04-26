import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";
import { Link, useNavigate } from "react-router-dom";

// pantalla principal del admin, redirige a las diferentes funciones
function principalAdmin() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/inicioSesion");
  };

  return (
    <div>
      <BotonTema />
      <div id="container">
        <header id="header1"></header>
        <Header2 />
        <section id="content">
          <p>Panel de administrador:</p>
          <Link to="/adminUsuarios">
            <button id="consultarU" className="principales">
              consultar usuarios
            </button>
          </Link>

          <Link to="/adminRegistros">
            <button id="consultarR" className="principales">
              consultar registros
            </button>
          </Link>

          <Link to="/cambiarContraseña">
            <button id="cambiarC" className="principales">
              cambiar contraseña
            </button>
          </Link>

          <button id="cerrarSesion" className="secundarios" onClick={logOut}>
            cerrar sesion
          </button>
        </section>
        <Footer />
      </div>

      <Github />
    </div>
  );
}

export default principalAdmin;
