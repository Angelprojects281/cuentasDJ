const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/routes");

const app = express();

// middlewares (DEBEN IR ARRIBA)
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(express.json());

// ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// rutas API (DESPUÉS de middlewares)
app.use("/api", authRoutes);

// puerto
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
