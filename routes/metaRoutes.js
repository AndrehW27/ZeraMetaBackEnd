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