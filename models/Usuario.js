import mongoose from "mongoose";
import bcrypt from "bcryptjs";   // 👈 usa bcryptjs aqui também

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  telefone: { type: String, default: "" },
  plano: { type: String, enum: ['Explorer', 'Achiever', 'Champion', 'Legend'], default: "Explorer" },
  foto_perfil_url: { type: String, default: "" },
  resetToken: { type: String },
  resetTokenExpires: { type: Date }
});

// Hash senha before saving
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();

  // Adiciona uma verificação para garantir que a senha não é nula/undefined
  if (!this.senha) return next();

  this.senha = await bcrypt.hash(this.senha, 12); // Aumentar o salt para 12 é uma boa prática de segurança
  next();
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
