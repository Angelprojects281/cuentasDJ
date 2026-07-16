import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";
import { Link, useNavigate } from "react-router-dom";

// pantalla principal del admin, redirige a las diferentes funciones
function PrincipalAdmin() {
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
              Consultar usuarios
            </button>
          </Link>

          <Link to="/adminRegistros">
            <button id="consultarR" className="principales">
              Consultar registros
            </button>
          </Link>

          <Link to="/cambiarContraseña">
            <button id="cambiarC" className="principales">
              Cambiar contraseña
            </button>
          </Link>

          <button id="cerrarSesion" className="secundarios" onClick={logOut}>
            Cerrar sesión
          </button>
        </section>
        <Footer />
      </div>

      <Github />
    </div>
  );
}

export default PrincipalAdmin;
