import dotenv from "dotenv";
dotenv.config(); // 👈 must be before mongoose.connect()

// Check for essential environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'EMAIL_SERVICE', 'EMAIL_USER', 'EMAIL_PASS', 'FRONTEND_URL'];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`FATAL ERROR: Environment variable ${varName} is not defined.`);
    process.exit(1); // Exit the process with an error code
  }
}

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import metaRoutes from "./routes/metaRoutes.js";
import rankRoutes from "./routes/rankRoutes.js";
import Usuario from "./models/Usuario.js";
// import Meta from "./models/Meta.js";
// import Rank from "./routes/rankRoutes.js";

import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "zeraMeta" // 👈 força o banco a ser "zeraMeta"
})
.then(() => {
  console.log("MongoDB conectado");
  console.log("Banco conectado:", mongoose.connection.name);
})
.catch(err => console.error("Erro ao conectar no MongoDB:", err));

// 🌐 Health-check (rota raiz)
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "🚀 API do ZeraMeta está rodando!" });
});

// 📌 Padronizar rotas com /api
app.use("/api/usuario", usuarioRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/rank", rankRoutes);
app.use("/api/auth", authRoutes);

// Subir servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
  console.log("Banco conectado:", mongoose.connection.name);
});
