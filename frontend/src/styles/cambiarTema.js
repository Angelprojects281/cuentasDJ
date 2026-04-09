//cambia de tema y guarda la configuracion en local para cargar el sistema con el tema seleccionado
function cambiarTema() {
  const botonTema = document.querySelector("#cambiar_tema");
  const raiz = document.documentElement;
  const theme = localStorage.getItem("theme") || "light";

  if (theme === "dark") {
    raiz.classList.add("dark");
    if (botonTema) botonTema.innerText = "tema 🌙";
  } else {
    raiz.classList.remove("dark");
    if (botonTema) botonTema.innerText = "tema ☀️";
  }

  if (botonTema)
    botonTema.addEventListener("click", () => {
      const raiz = document.documentElement;

      raiz.classList.toggle("dark");

      if (raiz.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        botonTema.innerText = "tema 🌙";
      } else {
        localStorage.setItem("theme", "light");
        botonTema.innerText = "tema ☀️";
      }
    });
}

cambiarTema();
