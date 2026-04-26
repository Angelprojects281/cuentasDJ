//pendiente por configurar
import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";

import { Link } from "react-router-dom";

function adminRegistros() {
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
          <h4>lista de registros: </h4>
          <ul className="listas">
            <li className="registro">registro 1</li>
            <li className="registro">registro 2</li>
            <li className="registro">demas lista de registros</li>
          </ul>
          <Link to="/consultarRegistro">
            <button id="consultar" className="principales">
              consultar registro por fecha
            </button>
          </Link>
          <Link to="/nuevoRegistro">
            <button id="editar" className="principales">
              editar registro
            </button>
          </Link>
          <Link to="/borrarRegistro">
            <button id="borrar" className="secundarios">
              borrar registro
            </button>
          </Link>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default adminRegistros;
