import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

function UsuarioContraseña() {
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
            type="text"
            id="usuario"
            placeholder="usuario"
            class="userInput"
          ></input>
          <input
            type="text"
            id="contraseña"
            placeholder="contraseña"
            class="userInput"
          ></input>
          <button id="iniciarSesion" className="principales">
            iniciar sesion
          </button>
          <a id="recuperacion" href="/cambiarContraseña">
            ¿olvidaste tu contraseña?
          </a>
          <p></p>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default UsuarioContraseña;
