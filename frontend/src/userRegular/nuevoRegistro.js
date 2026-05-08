//pendiente por configurar
import { useState } from "react";
import {
  BotonTema,
  Header2,
  Footer,
  Github,
} from "../reutilizables/componentes";

import { mostrarAlerta, mostrarConfirmacion } from "../reutilizables/alertas";

function NuevoRegistro() {
  const [turno, setturno] = useState("");
  const [fecha, setfecha] = useState("");
  const [proveedorR, setproveedorR] = useState("");
  const [loteR, setloteR] = useState(0);
  const [canecas20, setcanecas20] = useState(0);
  const [canecas60, setcanecas60] = useState(0);
  const [cdRecibidas, setcdRecibidas] = useState(0);
  const [caRecibidas, setcaRecibidas] = useState(0);
  const [cdEntregadas, setcdEntregadas] = useState(0);
  const [caEntregadas, setcaEntregadas] = useState(0);
  const [listaBaches, setlistaBaches] = useState([]);
  const [proveedor, setproveedor] = useState("");
  const [lote, setlote] = useState(0);
  const [canecas, setcanecas] = useState(0);

  const handleRegistrarBache = () => {
    if (proveedor === "vacio" || !lote || !canecas) {
      mostrarAlerta(
        "warning",
        "No se puede registrar la informacion",
        "faltan campos requeridos",
      );
      return;
    }
    const nuevoBache = { proveedor, lote, canecas };
    setlistaBaches([...listaBaches, nuevoBache]);
    setproveedor("vacio");
    setlote(0);
    setcanecas(0);
  };

  const handleEliminarBache = () => {
    const copiaBaches = [...listaBaches];
    copiaBaches.pop();
    setlistaBaches(copiaBaches);
  };

  const HacerRegistro = async () => {
    try {
      if (
        !turno ||
        !fecha ||
        !proveedorR ||
        !loteR ||
        !cdRecibidas ||
        !caRecibidas ||
        !cdEntregadas ||
        !caEntregadas ||
        listaBaches.length === 0
      ) {
        mostrarAlerta(
          "warning",
          "Error al hacer el registro",
          "faltan campos requeridos",
        );
        return;
      }

      const result = await mostrarConfirmacion(
        "question",
        "¿quieres enviar este registro?",
        "verifica la informacion nuevamente si es necesario",
      );

      if (!result.isConfirmed) {
        return;
      }

      const res = await fetch("http://localhost:4000/api/crearRegistro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          turno: turno,
          fecha: fecha,
          proveedorR: proveedorR,
          loteR: loteR,
          canecas20: canecas20,
          canecas60: canecas60,
          cdRecibidas: cdRecibidas,
          caRecibidas: caRecibidas,
          cdEntregadas: cdEntregadas,
          caEntregadas: caEntregadas,
          listaBaches: listaBaches,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarAlerta("error", "Error al guardar el registro", data.error);
        return;
      }
      mostrarAlerta(
        "success",
        "Registro creado correctamente",
        "el registro se guardo exitosamente",
      );
      setturno("");
      setfecha("");
      setproveedorR("");
      setloteR(0);
      setcanecas20(0);
      setcanecas60(0);
      setcdRecibidas(0);
      setcaRecibidas(0);
      setcdEntregadas(0);
      setcaEntregadas(0);
      setlistaBaches([]);
    } catch (error) {
      mostrarAlerta("Algo salio mal, intente mas tarde");
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
          <label>
            Turno:
            <select
              id="turno"
              onChange={(e) => setturno(e.target.value)}
              value={turno}
            >
              <option value={""}>-- seleccione su turno</option>
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
          <label>
            Proveedor de rinde:
            <input
              type="text"
              id="proveedorRinde"
              placeholder="Proveedor de rinde"
              value={proveedorR}
              onChange={(e) => setproveedorR(e.target.value)}
            ></input>
          </label>
          <label>
            Lote del rinde:
            <input
              type="number"
              id="loteRinde"
              placeholder="Lote del Rinde"
              value={loteR === 0 ? "" : loteR}
              onChange={(e) => setloteR(Number(e.target.value))}
            ></input>
          </label>
          <label>
            Numero de canecas de 20L:
            <input
              type="number"
              id="canecas20"
              placeholder="Canecas de Rinde 20L"
              value={canecas20 === 0 ? "" : canecas20}
              onChange={(e) => setcanecas20(Number(e.target.value))}
            ></input>
          </label>
          <label>
            Numero de canecas de 60L:
            <input
              type="number"
              id="canecas60"
              placeholder="Canecas de Rinde 60L"
              value={canecas60 === 0 ? "" : canecas60}
              onChange={(e) => setcanecas60(Number(e.target.value))}
            ></input>
          </label>
          <label>
            Canecas descolgadas recibidas:
            <input
              type="number"
              id="canecasInicioD"
              placeholder="Canecas descogadas recibidas"
              value={cdRecibidas === 0 ? "" : cdRecibidas}
              onChange={(e) => setcdRecibidas(Number(e.target.value))}
            ></input>
          </label>
          <label>
            Canecas agitadas recibidas:
            <input
              type="number"
              id="agitadasInicio"
              placeholder="canecas agitadas recibidas"
              value={caRecibidas === 0 ? "" : caRecibidas}
              onChange={(e) => setcaRecibidas(Number(e.target.value))}
            ></input>
          </label>
          <label>
            Canecas descolgadas entregadas:
            <input
              type="number"
              id="canecasFinalD"
              placeholder="Canecas entregadas al otro turno"
              value={cdEntregadas === 0 ? "" : cdEntregadas}
              onChange={(e) => setcdEntregadas(Number(e.target.value))}
            ></input>
          </label>
          <label>
            Canecas agitadas entregadas:
            <input
              type="number"
              id="agitadasFinal"
              placeholder="Canecas entregadas al otro turno"
              value={caEntregadas === 0 ? "" : caEntregadas}
              onChange={(e) => setcaEntregadas(Number(e.target.value))}
            ></input>
          </label>

          <section id="registroBaches">
            <p>Ingrese los datos de cada bache:</p>

            <select
              id="proveedorBache"
              onChange={(e) => setproveedor(e.target.value)}
              value={proveedor}
            >
              <option value={"vacio"}>-- seleccione proveedor</option>
              <option value={"RR"}>RR</option>
              <option value={"SBQ"}>SBQ</option>
              <option value={"STA"}>STA</option>
              <option value={"SMJ"}>SMJ</option>
              <option value={"SM"}>SM</option>
              <option value={"CHT"}>CHT</option>
            </select>
            <label>
              Lote del bache:
              <input
                type="number"
                id="loteBache"
                placeholder="Lote del bache"
                value={lote === 0 ? "" : lote}
                onChange={(e) => setlote(Number(e.target.value))}
              ></input>
            </label>
            <label>
              Numero de canecas del bache:
              <input
                type="number"
                id="canecasBache"
                placeholder="Canecas del bache"
                value={canecas === 0 ? "" : canecas}
                onChange={(e) => setcanecas(Number(e.target.value))}
              ></input>
            </label>
            <button
              id="añadir"
              className="principales"
              onClick={handleRegistrarBache}
            >
              añadir
            </button>
            <button
              id="eliminarBache"
              className="secundarios"
              onClick={handleEliminarBache}
            >
              Eliminar ultimo bache
            </button>
            {listaBaches.length > 0 && <h4>lista de baches: </h4>}
            <ul className="listas">
              {listaBaches.map((bache, index) => (
                <li key={index}>
                  Proveedor: {bache.proveedor}
                  <br />
                  Lote: {bache.lote}
                  <br />
                  Numero de canecas: {bache.canecas}
                  {""}
                </li>
              ))}
            </ul>
          </section>
          <button
            id="registrar"
            className="principales"
            onClick={HacerRegistro}
          >
            registrar informacion
          </button>
        </section>
        <Footer />
      </div>
      <Github />
    </div>
  );
}
export default NuevoRegistro;
