import Rank from "../models/Rank.js";
import mongoose from "mongoose";

// Criar um novo rank
export const criarRank = async (req, res) => {
  try {
    const { usuario_id, nivel, experiencia, titulo } = req.body;

    // garantir que usuario_id é ObjectId
    const objectId = new mongoose.Types.ObjectId(usuario_id);

    const novoRank = new Rank({
      usuario_id: objectId,
      nivel,
      experiencia,
      titulo
    });

    await novoRank.save();
    res.status(201).json(novoRank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os ranks
export const listarRanks = async (req, res) => {
  try {
    const ranks = await Rank.find();
    res.json(ranks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar rank por usuário
export const buscarRankPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    console.log("usuarioId param:", usuarioId);
    const objectId = new mongoose.Types.ObjectId(usuarioId);    
    console.log("Converted ObjectId:", objectId);

    const rank = await Rank.findOne({ usuario_id: objectId });

    if (!rank) {
      return res.status(404).json({ error: "Rank não encontrado para este usuário" });
    }

    res.json(rank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar rank
export const atualizarRank = async (req, res) => {
  try {
    const { id } = req.params;

    const rankAtualizado = await Rank.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // retorna o documento atualizado
    );

    if (!rankAtualizado) {
      return res.status(404).json({ error: "Rank não encontrado" });
    }

    res.json(rankAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar rank
export const deletarRank = async (req, res) => {
  try {
    const { id } = req.params;

    const rankDeletado = await Rank.findByIdAndDelete(id);

    if (!rankDeletado) {
      return res.status(404).json({ error: "Rank não encontrado" });
    }

    res.json({ message: "Rank deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
