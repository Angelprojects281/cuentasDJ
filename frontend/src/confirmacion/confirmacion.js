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
          <h4>confirma los cambios realizados:</h4>
          <ul class="listas">
            <li id="elemto1" class="cambio">
              info 1
            </li>
            <li id="elemto2" class="cambio">
              info 2
            </li>
            <li id="elemto3" class="cambio">
              lista de demas cambios realizados
            </li>
          </ul>

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
