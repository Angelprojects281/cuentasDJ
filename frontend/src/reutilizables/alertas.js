import Swal from "sweetalert2";

export function mostrarAlerta(simbolo, titulo, mensaje) {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: simbolo,
    confirmButtonText: "Aceptar",
    customClass: { confirmButton: "principales", popup: "alertStyle" },
  });
}

export function mostrarConfirmacion(simbolo, titulo, mensaje) {
  return Swal.fire({
    showCancelButton: true,
    cancelButtonText: "cancelar",
    confirmButtonText: "Aceptar",
    icon: simbolo,
    title: titulo,
    text: mensaje,
    buttonsStyling: false,
    customClass: {
      popup: "alertStyle",
      confirmButton: "principales",
      cancelButton: "secundarios",
    },
  });
}
