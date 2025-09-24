import dotenv from "dotenv";
dotenv.config(); // 👈 must be before mongoose.connect()

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

// Usar as rotas
app.use("/usuario", usuarioRoutes);
app.use("/meta", metaRoutes);
app.use("/rank", rankRoutes);

// Routes after authentication middleware
app.use("/api/auth", authRoutes);

// Subir servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
  console.log("Banco conectado:", mongoose.connection.name);
});
