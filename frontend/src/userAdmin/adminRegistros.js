//pendiente por configurar
import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";

import { useState } from "react";
import { mostrarAlerta, mostrarConfirmacion } from "../reutilizables/alertas";

function AdminRegistros() {
  const [turno, setturno] = useState("");
  const [fecha, setfecha] = useState("");
  const [produccion, setproduccion] = useState(null);
  const [baches, setbaches] = useState([]);
  const [mostrarBaches, setmostrarBaches] = useState(null);

  const handleConsultarRegistro = async () => {
    try {
      if (!turno || !fecha) {
        mostrarAlerta(
          "warning",
          "Error al consultar",
          "faltan campos requeridos",
        );
        return;
      }
      const res = await fetch(
        `http://localhost:4000/api/consultarRegistro?turno=${turno}&fecha=${fecha}`,
        {
          method: "GET",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        mostrarAlerta("error", "Error al obtener registros", data.error);
        setproduccion(null);
        setbaches([]);
        return;
      }
      const { results, resultsB } = data;

      if (!results || results.length === 0) {
        mostrarAlerta("error", "No se encontraron registros");
        setproduccion(null);
        setbaches([]);
        return;
      }
      setproduccion(results[0]);
      setbaches(resultsB);
    } catch (error) {
      mostrarAlerta(
        "error",
        "Algo salio mal",
        "fallo en la conexion, intente mas tarde",
      );
    }
  };

  const handleEliminarR = async () => {
    if (!produccion) {
      mostrarAlerta(
        "info",
        "No se encontraron registros",
        "no se ha cargado ningun registro",
      );
      return;
    }

    const result = await mostrarConfirmacion(
      "question",
      "¿Quieres eliminar este registro?",
      "verifica la informacion nuevamente si es necesario",
    );

    if (!result.isConfirmed) {
      return;
    }

    const idProduccion = produccion.idProduccion;
    const res = await fetch(
      `http://localhost:4000/api/eliminarRegistro/${idProduccion}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      mostrarAlerta("error", "Error a eliminar registro", data.error);
      return;
    }

    mostrarAlerta(
      "confirm",
      "Registro eliminado correctamente",
      "se realizo la eliminacion del registro",
    );
    setturno("");
    setfecha("");
    setproduccion(null);
    setbaches([]);
  };

  const handleMostrarBaches = async () => {
    if (mostrarBaches === null) {
      setmostrarBaches("0");
    } else {
      setmostrarBaches(null);
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
            Turno:
            <select
              id="turno"
              onChange={(e) => setturno(e.target.value)}
              value={turno}
            >
              <option value={""}>-- Seleccione el turno</option>
              <option value={"Turno 1"}>Turno 1</option>
              <option value={"Turno 2"}>Turno 2</option>
            </select>
          </label>
          <label>
            Ingrese la Fecha:
            <input
              type="date"
              placeholder="Ingrese la fecha"
              value={fecha}
              onChange={(e) => setfecha(e.target.value)}
            ></input>
          </label>

          <button
            id="consultar"
            className="principales"
            onClick={handleConsultarRegistro}
          >
            consultar registro por fecha
          </button>
          {produccion && (
            <section id="detallesProduccion">
              <h4>Detalles de produccion:</h4>
              <table id="detallesProduccionT">
                <tbody>
                  <tr>
                    <th>Turno</th>
                    <td>{produccion.turno}</td>
                  </tr>
                  <tr>
                    <th>Fecha</th>
                    <td>
                      {new Date(produccion.fecha_prod).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <th>Proveedor de rinde</th>
                    <td>{produccion.proveedor_rinde}</td>
                  </tr>
                  <tr>
                    <th>Lote del rinde</th>
                    <td>{produccion.lote_rinde}</td>
                  </tr>
                  <tr>
                    <th>Canecas de rinde utilizadas</th>
                    <td>{produccion.num_canecas_rinde}</td>
                  </tr>
                  <tr>
                    <th>Litros de rinde utilizados</th>
                    <td>{produccion.litros_caneca_rinde}</td>
                  </tr>
                  <tr>
                    <th>Griego descolgado recibido</th>
                    <td>{produccion.griego_inicio}</td>
                  </tr>
                  <tr>
                    <th>Griego agitado recibido</th>
                    <td>{produccion.agitado_inicio}</td>
                  </tr>
                  <tr>
                    <th>Canecas de griego gastadas:</th>
                    <td>{produccion.suma_baches}</td>
                  </tr>
                  <tr>
                    <th>Kilos de griego gastados:</th>
                    <td>{produccion.kilos_baches_total}</td>
                  </tr>
                  <tr>
                    <th>Canecas agitadas entregadas:</th>
                    <td>{produccion.agitadas_final}</td>
                  </tr>
                  <tr>
                    <th>Canecas descolgadas entregadas:</th>
                    <td>{produccion.descolgadas_final}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          )}
          {produccion && (
            <button
              id="mostrarBaches"
              className="principales"
              onClick={handleMostrarBaches}
            >
              Mostrar baches registrados ⬇️
            </button>
          )}
          {mostrarBaches && (
            <section id="detallesBaches">
              <h4>Lista de baches: </h4>
              {baches.length > 0 ? (
                <ul className="listas">
                  {baches.map((bache) => (
                    <li key={bache.idBache}>
                      <p className="fila">
                        <strong>Proveedor:</strong>
                        <span>{bache.proveedor}</span>
                      </p>
                      <p className="fila">
                        <strong>Lote:</strong>
                        <span>{bache.lote}</span>
                      </p>
                      <p className="fila">
                        <strong>Canecas:</strong>
                        <span>{bache.canecas_bache}</span>
                      </p>
                      <p className="fila">
                        <strong>Kilos totales:</strong>
                        <span>{bache.kilos_bache}</span>
                      </p>
                      <p className="fila">
                        <strong>Grego entregado a planta:</strong>
                        <span>{bache.griego_entregado}</span>
                      </p>
                      <p className="fila">
                        <strong>Kilos entregados:</strong>
                        <span>{bache.entregado_kilos}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                "NO HAY BACHES REGISTRADOS"
              )}
            </section>
          )}
          {produccion && (
            <button
              id="borrar"
              className="secundarios"
              onClick={handleEliminarR}
            >
              borrar registro
            </button>
          )}
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}
export default AdminRegistros;
