//proteccion de rutas y permisos
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProteccionRutas({ pagina, rolPermitido }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/inicioSesion" />;
  }

  const decodedToken = jwtDecode(token);

  if (rolPermitido && decodedToken.rol !== rolPermitido) {
    return <Navigate to="/inicioSesion" />;
  } else {
    return pagina;
  }
}

export default ProteccionRutas;
