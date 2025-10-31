import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // make sure this runs before creating OpenAI

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Generic function to get suggestions
export async function getGoalSuggestions(userInput) {
    const completion = await client.chat.completions.create({
        model: "gpt-5", // or "gpt-4o-mini" if using free-tier endpoints
        messages: [
            {
                role: "system",
                content: "You are an AI coach that helps users create and refine personal goals and mini-goals.",
            },
            {
                role: "user",
                content: `The user said: "${userInput}". Suggest 3 goals with 3 mini-goals each in JSON format. Each goal should have a title, deadline (text only), description and an array of miniGoals. Each miniGoal should only title.`
            },
        ],
    });

    // ✅ Parse the response before returning
    const text = completion.choices[0].message.content.trim();

    try {
        return JSON.parse(text);
    } catch (err) {
        console.error("⚠️ Invalid JSON returned by OpenAI:", text);
        return { error: "Invalid JSON from OpenAI", raw: text };
    }
}
