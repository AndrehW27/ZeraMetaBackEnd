import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: String, default : "" },
    plano: { type: String, default : "Free"  },
    foto_perfil_url: { type: String, default : "" }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
