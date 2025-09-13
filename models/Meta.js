import mongoose from "mongoose";
  


const metaSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    titulo: { type: String, required: true },
    descricao: { type: String },
    progresso: { type: Number, default: 0 },
    prazo: { type: String },
    prioridade: { type: String, enum: ["Baixa", "Média", "Alta"], default: "Média" },
    status: { type: String, enum: ["Novo", "Em andamento", "Pausado", "Concluído"], default: "Novo" },
    categoria: { type: String, enum: ["Outros", "Saúde", "Finanças", "Educação", "Pessoal", "Relacionamento", "Profissional", "Lazer", "Viagem", "Hobbie"], default: "Outros" },
    enviarLembrete: { type: Boolean, default: false },
    criarMiniMetas: { type: Boolean, default: false }
}, { timestamps: true });

const Meta = mongoose.model("Meta", metaSchema);
export default Meta;

// const metaSchema = new mongoose.Schema({
//     titulo: { type: String, required: true },
//     descricao: { type: String },
//     progresso: { type: Number, default: 0 },
//     prazo: { type: String },
//     prioridade: { type: String, enum: ["Baixa", "Média", "Alta"], default: "Média" },
//     status: { type: String, enum: ["Novo", "Em andamento", "Pausado", "Concluído"], default: "Novo" },
//     categoria: { type: String, enum: ["Outros", "Saúde", "Finanças", "Educação", "Pessoal", "Relacionamento", "Profissional", "Lazer", "Viagem", "Hobbie"], default: "Outros" },
//     enviarLembrete: { type: Boolean, default: false },
//     criarMiniMetas: { type: Boolean, default: false }
// }, { timestamps: true });

// export default mongoose.model("Meta", metaSchema);


