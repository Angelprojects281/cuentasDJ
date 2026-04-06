import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

function PrincipalRegular() {
  return (
    <div>
      <BotonTema />
      <div id="container">
        <header id="header1"></header>
        <Header2 />
        <section id="content">
          <p>Panel de usuario regular:</p>
          <a href="/nuevoRegistro">
            <button id="nuevoRegistro" className="principales">
              nuevo registro
            </button>
          </a>
          <a href="/cambiarContraseña">
            <button id="cambiarContraseña" className="principales">
              cambiar contraseña
            </button>
          </a>
          <a href="/">
            <button id="cerrarSesion" className="secundarios">
              cerrar sesion
            </button>
          </a>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default PrincipalRegular;
