// import mongoose from "mongoose";

// mongoose.connect("mongodb+srv://andrehwillian_db_user:ANJtKEuhaL9Lx8UM@<cluster>.mongodb.net/<banco>?retryWrites=true&w=majority")
//   .then(() => console.log("MongoDB conectado!"))
//   .catch(err => console.error("Erro de conexão:", err));
// ----------------------------------------------------------------------------

// import express from "express";
// import mongoose from "mongoose";
// import usuarioRoutes from "./routes/usuarioRoutes.js";

// const app = express();
// app.use(express.json());

// mongoose.connect("mongodb+srv://andrehwillian_db_user:ANJtKEuhaL9Lx8UM@cluster0.fqblerk.mongodb.net/")
//   .then(() => console.log("MongoDB conectado!"))
//   .catch(err => console.error(err));

// // Usando a rota
// app.use("/usuario", usuarioRoutes);

// app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import metaRoutes from "./routes/metaRoutes.js";
import rankRoutes from "./routes/rankRoutes.js";
import dotenv from "dotenv";

dotenv.config(); // 👈 must be before mongoose.connect()

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

// Subir servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
  console.log("Banco conectado:", mongoose.connection.name);
});


// ----------------------------------------------------------------
// import express from "express";
// import cors from "cors";
// import metaRoutes from "./routes/metaRoutes.js";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Rotas de metas
// app.use("/api/metas", metaRoutes);

// // Subir servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Servidor rodando na porta ${PORT}`);
// });





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
