import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

function cambiarContraseña() {
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
          <input type="text" id="usuarios" placeholder="usuario"></input>
          <input
            type="text"
            id="cActual"
            placeholder="contraseña actual"
          ></input>
          <input type="text" id="cNueva" placeholder="contraseña nueva"></input>
          <input
            type="text"
            id="confirmC"
            placeholder="confirmar contraseña"
          ></input>
          <a href="/confirmacion">
            <button id="aceptar" className="principales">
              aceptar
            </button>
          </a>
          <a href="/">
            <button id="cancelar" className="secundarios">
              cancelar
            </button>
          </a>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default cambiarContraseña;
