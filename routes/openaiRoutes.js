import express from "express";
import { getGoalSuggestions } from "../services/openaiService.js";

const router = express.Router();

router.post("/suggest", async (req, res) => {
  try {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ error: "Missing userInput" });
    }

    const result = await getGoalSuggestions(userInput);
    res.json(result);
  } catch (error) {
    console.error("❌ Detailed OpenAI error:", error);
    res.status(500).json({ 
      error: error.message || "OpenAI request failed", 
      details: error 
    });
  }
});

export default router;
