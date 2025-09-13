// import express from "express";
// import Usuario from "../models/Usuario.js";
// import Meta from "../models/Meta.js";
// import Rank from "../models/Rank.js";

// const router = express.Router();

// // Rota: buscar usuário com metas e rank
// router.get("/:id", async (req, res) => {
//   try {
//     const usuarioId = req.params.id;

//     const usuario = await Usuario.findById(usuarioId).lean();
//     if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

//     const metas = await Meta.find({ usuario_id: usuarioId }).lean();
//     const rank = await Rank.find({ usuario_id: usuarioId }).lean();

//     res.json({ ...usuario, metas, rank });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erro interno" });
//   }
// });

// export default router;


// -------------------------------------------------------------------

// import express from "express";
// import { getUsuarioCompleto } from "../controllers/usuarioController.js";

// const router = express.Router();

// router.get("/:id", getUsuarioCompleto);

// export default router;
import express from "express";
import {
  getUsuarioComDados,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  listarUsuarios // 👈 new function
} from "../controllers/usuarioController.js";

const router = express.Router();

// Fetch all users
router.get("/", listarUsuarios);

// Fetch a user with metas and rank
router.get("/:id", getUsuarioComDados);

// Create a new user
router.post("/", criarUsuario);

// Update an existing user
router.put("/:id", atualizarUsuario);

// Delete a user
router.delete("/:id", deletarUsuario);

export default router;
