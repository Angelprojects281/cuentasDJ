import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

function Buscar() {
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
          <p>Ingrese los parametros de busqueda a continuacion:</p>
          <input
            type="text"
            name="busqueda"
            id="busqueda"
            placeholder="parametros de busqueda"
            className="userInput"
          ></input>
          <a href="/confirmacion">
            <button id="buscar" className="principales">
              buscar
            </button>
          </a>
          <button
            id="cancelar"
            className="secundarios"
            onClick={() => window.history.back()}
          >
            cancelar
          </button>
        </section>
      </div>
    </div>
  );
}

export default Buscar;
