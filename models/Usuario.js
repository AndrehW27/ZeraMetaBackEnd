import mongoose from "mongoose";
import bcrypt from "bcryptjs";   // 👈 usa bcryptjs aqui também

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  telefone: { type: String, default: "" },
  plano: { type: String, default: "Free" },
  foto_perfil_url: { type: String, default: "" }
});

// Hash senha before saving
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
