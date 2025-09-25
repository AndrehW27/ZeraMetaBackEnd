import express from "express";
import bcrypt from "bcryptjs";   // 👈 também aqui
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
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

    // Generate JWT token for the new user
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Usuario registered successfully",
      token,
      user: { id: newUser._id, email: newUser.email, nome: newUser.nome }
    });
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

    // ...inside login route...
    console.log("Senha enviada:", senha);
    console.log("Senha no banco:", user.senha);

  } catch (err) {
    res.status(500).json({ msg: err.message });
    console.log("Senha enviada:", senha);
    console.log("Senha no banco:", user.senha);
  }
});

// Redefinir Senha
router.post("/redefinir-senha", async (req, res) => {
  try {
    const { email, novaSenha } = req.body;

    const user = await Usuario.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.senha = novaSenha; // Do NOT hash here!
    await user.save();

    res.json({ msg: "Senha redefinida com sucesso" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Redefinir senha por email (envia link)
router.post("/redefinir-senha-email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Usuario.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Generate token and expiration
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/senha-por-email?token=${resetToken}&email=${email}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Redefinição de senha",
      html: `<p>Para redefinir sua senha, clique <a href="${resetLink}">aqui</a>. Este link expira em 1 hora.</p>`,
    });

    res.json({ msg: "Link de redefinição de senha enviado para o email." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
