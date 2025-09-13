import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String },
    senha: { type: String, required: true },
    telefone: { type: String },
    plano: { type: String },
    foto_perfil_url: { type: String }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
