import mongoose from "mongoose";

const rankSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    nivel: { type: Number, default: 1 },
    experiencia: { type: Number},
    titulo: { type: String }
});

const Rank = mongoose.model("Rank", rankSchema, "rank"); // exact collection name in Compass
export default Rank;