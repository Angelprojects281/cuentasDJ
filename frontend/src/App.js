import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { useIdleTimer } from "react-idle-timer";

import Inicio from "./inicio/inicio";
import InicioSesion from "./generales/usuarioContraseña";
import CambiarContraseña from "./generales/cambiarContraseña";
import Buscar from "./generales/busqueda";
import Confirmacion from "./confirmacion/confirmacion";
import PrincipalRegular from "./userRegular/principalRegular";
import NuevoRegistro from "./userRegular/nuevoRegistro";
import PrincipalAdmin from "./userAdmin/principalAdmin";
import AdminUsuarios from "./userAdmin/adminUsuarios";
import NuevoUsuario from "./userAdmin/nuevoUsuario";
import AdminRegistros from "./userAdmin/adminRegistros";

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
  const idleTimer = useIdleTimer({
    timeout: 1000 * 60 * 1,
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
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/principalRegular" element={<PrincipalRegular />} />
          <Route path="/nuevoRegistro" element={<NuevoRegistro />} />
          <Route path="/principalAdmin" element={<PrincipalAdmin />} />
          <Route path="/adminUsuarios" element={<AdminUsuarios />} />
          <Route path="/nuevoUsuario" element={<NuevoUsuario />} />
          <Route path="/adminRegistros" element={<AdminRegistros />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
