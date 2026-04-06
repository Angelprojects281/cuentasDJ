import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Lee el tema del localStorage o usa "light" por defecto
    return localStorage.getItem("theme") || "light";
  });

  // Aplica el tema al elemento raíz cuando cambia
  useEffect(() => {
    const raiz = document.documentElement;

    if (theme === "dark") {
      raiz.classList.add("dark");
    } else {
      raiz.classList.remove("dark");
    }

    // Guarda el tema en localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto de temas
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme debe ser usado dentro de ThemeProvider");
  }

  return context;
};
