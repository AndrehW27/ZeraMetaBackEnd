import express from "express";
import {
  criarMeta,
  listarMetas,
  atualizarMeta,
  deletarMeta,
} from "../controllers/metaController.js";

const router = express.Router();

router.post("/", criarMeta);       // Criar meta
router.get("/", listarMetas);      // Listar todas
router.put("/:id", atualizarMeta); // Atualizar
router.delete("/:id", deletarMeta); // Deletar

export default router;


// import express from "express";
// import Meta from "../models/Meta.js";

// const router = express.Router();

// // Criar nova meta
// router.post("/", async (req, res) => {
//   try {
//     const meta = new Meta(req.body);
//     const saved = await meta.save();
//     res.status(201).json(saved);
//     console.log("Meta criada:", res.status(201).json(saved));
    
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Listar todas as metas
// router.get("/", async (req, res) => {
//   const metas = await Meta.find();
//   res.json(metas);
// });

// // Atualizar meta por ID
// router.put("/:id", async (req, res) => {
//   try {
//     const updated = await Meta.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Deletar meta
// router.delete("/:id", async (req, res) => {
//   try {
//     await Meta.findByIdAndDelete(req.params.id);
//     res.json({ message: "Meta removida" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// export default router;
