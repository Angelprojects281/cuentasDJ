import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";

function nuevoUsuario() {
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
          <p>Ingrese los datos del usuario:</p>
          <p>Rol:</p>
          <select name="rol" id="rol">
            <option value="vacio"></option>
            <option value="administrador">administrador</option>
            <option value="regular">regular</option>
          </select>

          <input
            type="text"
            name="usuario"
            id="usuario"
            placeholder="usuario"
            className="userInput"
          ></input>
          <input
            type="text"
            name="contraseña"
            id="contraseña"
            className="userInput"
            placeholder="contraseña"
          ></input>
          <a href="/confirmacion">
            <button id="nuevoUser" className="principales">
              confirmar
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
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default nuevoUsuario;
