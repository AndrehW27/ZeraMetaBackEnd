import express from "express";
import cors from "cors";
import metaRoutes from "./routes/metaRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de metas
app.use("/api/metas", metaRoutes);

// Subir servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});





//-------------------------------

// import express from "express";
// import cors from "cors";
// import metaRoutes from "./routes/metaRoutes.js";
// // import connectDB from "./config/db.js";
// // connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// //No server.js, registra as rotas:
// app.use("/api/metas", metaRoutes);

// // Rota de teste
// app.get("/", (req, res) => {
//   res.send("API de Metas está rodando 🚀 (sem banco ainda)");
// });

// // Subir servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Servidor rodando na porta ${PORT}`);
// });



//------------------------------------------------------------------

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// // Carregar variáveis do .env
// dotenv.config();

// // Inicializa o app
// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json()); // permite trabalhar com JSON no body das requisições

// // Rota de teste
// app.get("/", (req, res) => {
//   res.send("API de Metas está rodando 🚀");
// });

// // Conectar ao MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("✅ MongoDB conectado!");
//     app.listen(process.env.PORT || 3000, () => {
//       console.log(`🚀 Servidor rodando na porta ${process.env.PORT || 3000}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Erro ao conectar no MongoDB:", err.message);
//   });
