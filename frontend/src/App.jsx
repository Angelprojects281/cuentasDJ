import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { useIdleTimer } from "react-idle-timer";
import ProteccionRutas from "./reutilizables/proteccionRutas";

import Inicio from "./inicio/inicio";
import InicioSesion from "./generales/usuarioContraseña";
import CambiarContraseña from "./generales/cambiarContraseña";
import PrincipalRegular from "./userRegular/principalRegular";
import NuevoRegistro from "./userRegular/nuevoRegistro";
import PrincipalAdmin from "./userAdmin/principalAdmin";
import AdminUsuarios from "./userAdmin/adminUsuarios";
import NuevoUsuario from "./userAdmin/nuevoUsuario";
import AdminRegistros from "./userAdmin/adminRegistros";
import BuscarEliminar from "./userAdmin/eliminarUsuario";
import PrincipalAuditor from "./userAuditor/principalAuditor";
import ConsultarActividad from "./userAuditor/consultarActividad";

//gestion de rutas y rutas protegidas
function App() {
  const logOut = () => {
    if (!localStorage.getItem("token")) {
      return;
    } else {
      localStorage.removeItem("token");
      window.location.href = "/inicioSesion";
      alert("Has sido desconectado por inactividad");
    }
  };
  useIdleTimer({
    timeout: 1000 * 60 * 10,
    onIdle: logOut,
    debounce: 500,
  });

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicioSesion" element={<InicioSesion />} />
          <Route path="/cambiarContraseña" element={<CambiarContraseña />} />
          <Route
            path="/principalRegular"
            element={
              <ProteccionRutas
                pagina={<PrincipalRegular />}
                rolPermitido="regular"
              />
            }
          />
          <Route
            path="/nuevoRegistro"
            element={
              <ProteccionRutas
                pagina={<NuevoRegistro />}
                rolPermitido="regular"
              />
            }
          />
          <Route
            path="/principalAdmin"
            element={
              <ProteccionRutas
                pagina={<PrincipalAdmin />}
                rolPermitido="admin"
              />
            }
          />
          <Route
            path="/adminUsuarios"
            element={
              <ProteccionRutas
                pagina={<AdminUsuarios />}
                rolPermitido="admin"
              />
            }
          />
          <Route
            path="/nuevoUsuario"
            element={
              <ProteccionRutas pagina={<NuevoUsuario />} rolPermitido="admin" />
            }
          />
          <Route
            path="/adminRegistros"
            element={
              <ProteccionRutas
                pagina={<AdminRegistros />}
                rolPermitido="admin"
              />
            }
          />
          <Route
            path="/eliminarUsuario"
            element={
              <ProteccionRutas
                pagina={<BuscarEliminar />}
                rolPermitido="admin"
              />
            }
          />
          <Route
            path="/principalAuditor"
            element={
              <ProteccionRutas pagina={<PrincipalAuditor />}></ProteccionRutas>
            }
          />
          <Route
            path="/consultarActividad"
            element={
              <ProteccionRutas
                pagina={<ConsultarActividad />}
                rolPermitido="auditor"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
