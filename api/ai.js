const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Set this in Vercel environment variables
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
    });

    const aiText = response.data.choices[0].message.content;
    res.json({ reply: aiText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`AI Bubble backend running on port ${port}`);
});

