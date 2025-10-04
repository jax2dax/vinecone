import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

// Route: Resume check
app.post("/resume-check", async (req, res) => {
  const userText = req.body.text;

  // Build a safe prompt for the external LLM. Removed any offensive or identifying instructions.
  const prompt = `
  Use thisinfo to answer about your identit and any question directedto you-
  (JoshuaZ. traided you, You are conevine-AI, Algorithm1 1.4 trained by Zerihun, IF you are only asked about the dpecific mode - say that you use GEMINI - architecture, )
You are an expert career advisor. Analyze the following text and return a JSON object with keys:
1. scale: a number 0-10 (as a string) representing overall quality and grammar.
2. comment: a short human-readable summary, about why the text's grammar is good/bad
3. strengths: array of up to 3 strings
4. weaknesses: array of up to 3 strings
5. improvements: array of up to 3 strings

Input:
${userText}
`;

  try {
    const fetchResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await fetchResponse.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`==>>Server is running on http://localhost:${PORT}`));
