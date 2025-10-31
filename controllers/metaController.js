import Meta from "../models/Meta.js";
import mongoose from "mongoose";

// Create a new meta
export const criarMeta = async (req, res) => {
  try {
    const { usuario_id, titulo, prazo, categoria, prioridade, progresso, descricao, miniGoals } = req.body;

    // Ensure usuario_id is an ObjectId
    const objectId = new mongoose.Types.ObjectId(usuario_id);

    const novaMeta = new Meta({
      usuario_id: objectId,
      titulo,
      prazo,
      categoria,
      prioridade,
      progresso,
      descricao,
      status: "Novo", // default value
      enviarLembrete: false,
      criarMiniMetas: false,
      miniGoals
    });

    await novaMeta.save();
    res.status(201).json(novaMeta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all metas
export const listarMetas = async (req, res) => {
  try {
    const metas = await Meta.find();
    res.json(metas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List metas for a specific user
export const listarMetasPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const objectId = new mongoose.Types.ObjectId(usuarioId);

    const metas = await Meta.find({ usuario_id: objectId });

    if (!metas.length) {
      return res.status(404).json({ error: "Nenhuma meta encontrada para este usuário" });
    }

    res.json(metas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a meta
export const atualizarMeta = async (req, res) => {
  try {
    const { id } = req.params;

    const metaAtualizada = await Meta.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // returns the updated document
    );

    if (!metaAtualizada) {
      return res.status(404).json({ error: "Meta não encontrada" });
    }

    res.json(metaAtualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a meta
export const deletarMeta = async (req, res) => {
  try {
    const { id } = req.params;

    const metaDeletada = await Meta.findByIdAndDelete(id);

    if (!metaDeletada) {
      return res.status(404).json({ error: "Meta não encontrada" });
    }

    res.json({ message: "Meta deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
