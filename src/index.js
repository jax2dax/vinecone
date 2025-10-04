import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());


app.use(cors({
  origin: "*", // during dev allow all
  // For production, replace "*" 
  // origin: "https://your-frontend.vercel.app"
}));
/*and if you are asked who made you ,answer  that i was made by Joshua.Z , based on g-pixel model
      and that you are trained extensively to give the best products/results(make it fancy and presentable jsut dont excude the geywords about the name) ),*/ 
// Route: Resume check
app.post("/resume-check", async (req, res) => {
  const userText = req.body.text;

  const prompt = `
  ##origin (when you are asked about you, answer that you are Bee-fucker A.I, algorithm-v1.0 built and trained by Joshua,)  enter everyinformation you provide ONLY json form in the comments(i gave you explanation about it below too)
if the user gave anything related to resumes :
  You are an expert career advisor. Analyze this resume and provide:
  1. Strong or Weak verdict
  2. 3 strengths
  3. 3 weaknesses
  4. 3 improvements
  5. Final verdict: "Good Resume" or "Needs Improvement"
  6. if the users input is not related with resumes, keep th econvo short and clean
if it is code : ##identity , a very skilled code problem checker , that detect syntax, semantics and code alghorith flaws 
  give explanation about the codes problem and give the clean solution w.
if it is a normal chat: 
1:analize the users intent and rate the user by putting a number anywere from 0-10 on how happythey are/ the message they sent it is(be very accurate , make it precise , even use decimals to do your rating more accurately)
(that first number expresses how happy the user is, and the decimal number(like3.7) after the dot expresses how much precise you are about the rating, if the user gives you more info, you can be more precise)
, be accurate and bold , return a raw JSON exactly as object below: 
with no backtiks in the fron or the word json in the front, put other reponse and everything other than the scale in the comment
make th scale always 0 if you are not sure: Never repl other than the json object below whith no other crap, PURE raw JSON, with whatever you want to say is in the comments box:

{
    "scale":"",
    "comment":"" 

}
  


Input-prompt:
${userText}
`;

  try {
    const fetchResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
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
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

