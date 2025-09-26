import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  criarMeta,
  listarMetas,
  atualizarMeta,
  deletarMeta,
  listarMetasPorUsuario,
} from "../controllers/metaController.js";

const router = express.Router();

router.post("/", auth, criarMeta);       // Criar meta
router.get("/", auth, listarMetas);      // Listar todas
router.get("/:usuarioId", auth, listarMetasPorUsuario);  // Listar metas de um usuário
router.put("/:id", auth, atualizarMeta); // Atualizar
router.delete("/:id", auth, deletarMeta); // Deletar

export default router;

// import express from "express";
// import auth from "../middleware/authMiddleware.js";
// import Meta from "../models/Meta.js";

// const router = express.Router();

// // Criar meta (rota protegida)
// router.post("/", auth, async (req, res) => {
//   try {
//     const novaMeta = new Meta({
//       titulo: req.body.titulo,
//       descricao: req.body.descricao,
//       usuario: req.user.id, // 👈 pega o usuário do token
//     });
//     await novaMeta.save();
//     res.json(novaMeta);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// // Listar metas do usuário logado
// router.get("/", auth, async (req, res) => {
//   try {
//     const metas = await Meta.find({ usuario: req.user.id });
//     res.json(metas);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// export default router;
