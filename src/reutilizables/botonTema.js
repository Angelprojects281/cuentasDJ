import { useTheme } from "../context/ThemeContext";

function Tema() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div id="tema">
      <button className="tema" onClick={toggleTheme}>
        tema {theme === "dark" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}

export default Tema;
