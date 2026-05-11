import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";
import { mostrarAlerta } from "../reutilizables/alertas";

import { useState } from "react";

function ConsultarActividad() {
  const [tipoActividad, setTipoActividad] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const fechaActual =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  const handleConsultarActividades = () => {
    if (!tipoActividad || !fechaInicio || !fechaFin) {
      mostrarAlerta(
        "warning",
        "No se pudo realizar la consulta",
        "faltan campos requeridos",
      );
      return;
    }

    if (fechaInicio > fechaFin) {
      mostrarAlerta(
        "error",
        "Error al realizar la consulta",
        "la fecha de inicio no puede ser mayor a la fecha de fin",
      );
      return;
    }

    if (fechaActual < fechaInicio || fechaActual < fechaFin) {
      mostrarAlerta(
        "error",
        "Error al realizar la consulta",
        "asegurate que las fechas no sean mayores a la actual",
      );
      return;
    }
  };
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
          <label>
            Tipo de actividad:
            <select
              id="actividad"
              onChange={(e) => setTipoActividad(e.target.value)}
              value={tipoActividad}
            >
              <option value={""}>-- Seleccione el tipo de actividad</option>
              <option value={"inicio_sesion"}>Inicios de sesion</option>
              <option value={"cambio_contraseña"}>Cambios de contraseña</option>
              <option value={"nuevo_registro"}>Nuevos registros</option>
              <option value={"eliminar_registro"}>
                Eliminacion de registros
              </option>
              <option value={"nuevo_usuario"}>
                Creacion de nuevos usuarios
              </option>
              <option value={"eliminar_usuario"}>
                Eliminacion de usuarios
              </option>
            </select>
          </label>
          <label>
            Ingrese la Fecha de inicio:
            <input
              type="date"
              placeholder="Ingrese la fecha"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            ></input>
          </label>
          <label>
            Ingrese la Fecha de fin:
            <input
              type="date"
              placeholder="Ingrese la fecha"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            ></input>
          </label>

          <button
            id="consultar"
            className="principales"
            onClick={handleConsultarActividades}
          >
            consultar registro por fecha
          </button>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}

export default ConsultarActividad;
