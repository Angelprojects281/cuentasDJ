import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

function PrincipalRegular() {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/inicioSesion";
  };
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

          <button id="cerrarSesion" className="secundarios" onClick={logOut}>
            cerrar sesion
          </button>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default PrincipalRegular;
