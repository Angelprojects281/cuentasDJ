import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";

function principalAdmin() {
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
          <p>Panel de administrador:</p>
          <a href="/adminUsuarios">
            <button id="consultarU" className="principales">
              consultar usuarios
            </button>
          </a>
          <a href="/adminRegistros">
            <button id="consultarR" className="principales">
              consultar registros
            </button>
          </a>

          <a href="/cambiarContraseña">
            <button id="cambiarC" className="principales">
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

export default principalAdmin;
