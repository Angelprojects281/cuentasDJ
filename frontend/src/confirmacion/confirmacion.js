//pantalla en espera de ser utilizada
import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

function confirmacion() {
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
          <h4>Confirma los cambios realizados:</h4>
          <p className="registroCambios" id="registroCambios"></p>

          <button id="confirmar" class="principales confirmacion">
            confirmar cambios
          </button>
          <button id="cancelar" class="secundarios confirmacion">
            cancelar
          </button>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default confirmacion;
