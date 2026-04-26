import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

import { Link, useNavigate } from "react-router-dom";

// menu principal del usuario regular
function PrincipalRegular() {
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
          <p>Panel de usuario regular:</p>
          <Link to="/nuevoRegistro">
            <button id="nuevoRegistro" className="principales">
              nuevo registro
            </button>
          </Link>
          <Link to="/cambiarContraseña">
            <button id="cambiarContraseña" className="principales">
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

export default PrincipalRegular;
