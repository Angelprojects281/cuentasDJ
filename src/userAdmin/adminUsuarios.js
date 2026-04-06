import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";

function adminUsuarios() {
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
          <h4>lista de usuarios: </h4>
          <ul className="listas">
            <li className="user">usuario 1</li>
            <li className="user">usuario 2</li>
            <li className="user">demas lista de usuarios</li>
          </ul>
          <a href="/nuevoUsuario">
            <button id="nuevoUser" className="principales">
              nuevo usuario
            </button>
          </a>
          <a href="/nuevoUsuario">
            <button id="editUser" className="principales">
              editar usuario
            </button>
          </a>
          <a href="/buscar">
            <button id="delUser" className="secundarios">
              eliminar usuario
            </button>
          </a>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default adminUsuarios;
