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
