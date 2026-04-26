import {
  BotonTema,
  Footer,
  Header2,
  Github,
} from "../reutilizables/componentes";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//maneja la eliminacion de usuarios
function BuscarEliminar() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  //valida la autorizacion del token y lista los usuarios
  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/listarUsuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  //selecciona el usuario y pide la confirmacion, y envia el usuario al backend para ser eliminado
  const handleEliminarUsuario = async () => {
    if (!usuarioSeleccionado) {
      alert("Por favor, selecciona un usuario para eliminar.");
      return;
    }

    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar al usuario ${usuarioSeleccionado}?`,
    );
    if (!confirmacion) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:4000/api/usuario/${usuarioSeleccionado}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al eliminar el usuario");
        return;
      }

      alert("Usuario eliminado exitosamente");
      navigate("/principalAdmin");
    } catch (error) {
      alert("Error al eliminar el usuario: error de conexión con el servidor");
    }
  };

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
          <p>Seleccione el usuario a eliminar:</p>
          <select
            id="selectUsuario"
            onChange={(e) => setUsuarioSeleccionado(e.target.value)}
          >
            {/*mapeo para listar los usuarios de la base de datos*/}
            <option value="">-- Seleccione un usuario --</option>
            {usuarios.map((usuario, index) => (
              <option key={usuario.idUsuarios} value={usuario.idUsuarios}>
                {index + 1}. {usuario.idUsuarios} - {usuario.Rol}
              </option>
            ))}
          </select>

          <button
            id="eliminar"
            className="principales"
            onClick={handleEliminarUsuario}
          >
            eliminar
          </button>
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
export default BuscarEliminar;
