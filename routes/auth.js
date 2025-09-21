import express from "express";
import bcrypt from "bcryptjs";   // 👈 também aqui
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const router = express.Router();

// Register
router.post("/cadastro", async (req, res) => {
  try {
    const { email, senha, nome } = req.body;

    const userExists = await Usuario.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "Usuario already exists" });

    const newUser = new Usuario({ email, senha, nome });
    await newUser.save();

    res.json({ msg: "Usuario registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await Usuario.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user._id, email: user.email, nome: user.nome }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
