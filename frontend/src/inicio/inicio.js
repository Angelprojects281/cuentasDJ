import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

function Inicio() {
  return (
    <div>
      <BotonTema />
      <div id="container">
        <header id="header1"></header>
        <Header2 />

        <section id="content">
          <p>
            Bienvenido al sistema de Cuentas DJ, de click al boton para iniciar
            sesion⬇️:
          </p>

          <a href="/inicioSesion">
            <button id="sesion" className="principales">
              iniciar sesion
            </button>
          </a>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default Inicio;
