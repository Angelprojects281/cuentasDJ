import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

//pagina de bienvenida
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div>
      <BotonTema />
      <div id="container">
        <header id="header1"></header>
        <Header2 />

        <section id="content">
          <p>
            Bienvenido al sistema de Cuentas DJ. Haz clic en el botón para
            iniciar sesión ⬇️:
          </p>

          <Link to="/inicioSesion">
            <button id="sesion" className="principales">
              Iniciar sesión
            </button>
          </Link>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default Inicio;
