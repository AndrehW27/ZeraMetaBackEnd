import express from "express";
import {
  criarRank,
  listarRanks,
  buscarRankPorUsuario,
  atualizarRank,
  deletarRank
} from "../controllers/rankController.js";

const router = express.Router();

router.post("/", criarRank);
router.get("/", listarRanks);
router.get("/:usuarioId", buscarRankPorUsuario);
router.put("/:id", atualizarRank);
router.delete("/:id", deletarRank);

export default router;
