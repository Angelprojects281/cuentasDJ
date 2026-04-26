import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/listarUsuarios");

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al obtener usuarios");
      }
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };
  useEffect(() => {
    obtenerUsuarios();
  }, []);

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
          <ul className="listas" id="listaUsuarios">
            {usuarios.map((usuarios, index) => (
              <li key={usuarios.idUsuarios} value={usuarios.idUsuarios}>
                {usuarios.idUsuarios} - {usuarios.Rol}
              </li>
            ))}
          </ul>
          <Link to="/nuevoUsuario">
            <button id="nuevoUser" className="principales">
              nuevo usuario
            </button>
          </Link>
          <Link to="/eliminarUsuario">
            <button id="delUser" className="secundarios">
              eliminar usuario
            </button>
          </Link>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default AdminUsuarios;
