import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";

function nuevoRegistro() {
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
          <input
            type="number"
            id="griegoDescolgado"
            placeholder="griego descolgado"
          ></input>
          <input
            type="number"
            id="griegoAgitado"
            placeholder="griego agitado"
          ></input>
          <input
            type="number"
            id="sumCanecas"
            placeholder="suma de canecas de baches manejados"
          ></input>
          <input type="number" id="cRinde" placeholder="canecas rinde"></input>
          <input
            type="number"
            id="cFinal"
            placeholder="canecas agitadas final"
          ></input>
          <input
            type="number"
            id="rFinal"
            placeholder="canecas de rinde final"
          ></input>
          <input
            type="number"
            id="bachesUtilizados"
            placeholder="numero de baches utilizados"
          ></input>
          <ul className="listas">
            <h4>lista de baches: </h4>
            <li className="bache">bache 1</li>
            <li className="bache">bache 2</li>
            <li className="bache">etc...</li>

            <input
              type="text"
              id="bacheNuevo"
              placeholder="añadir nuevo bache a la lista"
            ></input>
            <button id="añadir" className="principales">
              añadir
            </button>
          </ul>
          <a href="/confirmacion">
            <button id="registrar" className="principales">
              registrar informacion
            </button>
          </a>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default nuevoRegistro;
