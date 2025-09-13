// import Usuario from "../models/Usuario.js";

// export const getUsuarioCompleto = async (req, res) => {
//   try {
//     const { id } = req.params;

//     console.log("🔍 Buscando usuário:", id);

//     const usuario = await Usuario.findById(id)
//       .populate("metas")
//       .populate("rank");

//     if (!usuario) {
//       return res.status(404).json({ error: "Usuário não encontrado 3" });
//     }

//     res.json(usuario);
//   } catch (err) {
//     console.error("❌ Erro ao buscar usuário:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// ------------------------------------------------------------------

// import Usuario from "../models/Usuario.js";
// import Meta from "../models/Meta.js";
// import Rank from "../models/Rank.js";

// // Buscar usuário com suas metas e rank (sem virtuals)
// export const getUsuarioComDados = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Buscar usuário
//     const usuario = await Usuario.findById(id);
//     if (!usuario) {
//       return res.status(404).json({ error: "Usuário não encontrado" });
//     }

//     // Buscar metas relacionadas a esse usuário
//     const metas = await Meta.find({ usuario_id: id });

//     // Buscar rank do usuário
//     const rank = await Rank.findOne({ usuario_id: id });

//     // Retornar tudo em um objeto só
//     res.json({
//       usuario,
//       metas,
//       rank
//     });
//   } catch (err) {
//     console.error("Erro no getUsuarioComDados:", err);
//     res.status(500).json({ error: "Erro interno no servidor" });
//   }
// };

import Usuario from "../models/Usuario.js";
import Meta from "../models/Meta.js";
import Rank from "../models/Rank.js";
import mongoose from "mongoose";

// List all users
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    console.error("Error listing users:", err);
    res.status(500).json({ error: err.message });
  }
};

// Fetch a user with metas and rank
export const getUsuarioComDados = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("ID received in route:", id);

    const objectId = new mongoose.Types.ObjectId(id);

    const usuario = await Usuario.findOne({ _id: objectId });

    if (!usuario) {
      return res.status(404).json({ error: "User not found in database" });
    }

    const metas = await Meta.find({ usuario_id: objectId });
    const rank = await Rank.findOne({ usuario_id: objectId });

    res.json({ usuario, metas, rank });
  } catch (err) {
    console.error("Error in getUsuarioComDados:", err);
    res.status(500).json({ error: err.message });
  }
};

// Create a new user
export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, telefone, plano, foto_perfil_url } = req.body;

    const novoUsuario = new Usuario({
      nome,
      email,
      senha,
      telefone,
      plano,
      foto_perfil_url
    });

    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update an existing user
export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // return updated document
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(usuarioAtualizado);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a user
export const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioDeletado = await Usuario.findByIdAndDelete(id);

    if (!usuarioDeletado) {
      return res.status(404).json({ error: "User not found" });
    }

    // Optionally, delete related metas and rank
    await Meta.deleteMany({ usuario_id: id });
    await Rank.deleteMany({ usuario_id: id });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: err.message });
  }
};

