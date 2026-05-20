import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

import { Link, useNavigate } from "react-router-dom";

// menu principal del usuario auditor
function PrincipalAuditor() {
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
          <p>Panel de usuario auditor:</p>
          <Link to="/consultarActividad">
            <button id="nuevoRegistro" className="principales">
              Consultar registros de actividades
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

export default PrincipalAuditor;
