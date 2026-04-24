const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/routes");

const app = express();

// middlewares (DEBEN IR ARRIBA)
app.use(
  // Configuración de CORS para permitir solicitudes desde el frontend
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(express.json());

// ruta de prueba
app.get("/", (req, res) => {
  // Ruta de prueba para verificar que el backend funciona
  res.send("Backend funcionando 🚀");
});

// rutas API (DESPUÉS de middlewares)
app.use("/api", authRoutes); // Rutas de autenticación bajo el prefijo /api

// puerto
const PORT = 4000;

app.listen(PORT, () => {
  // Inicia el servidor y escucha en el puerto definido
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
