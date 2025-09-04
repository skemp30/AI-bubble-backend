// api/ai.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Securely set in Vercel environment variables
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const userMessage = req.body.message;

    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini", // You can change to gpt-4.1 if desired
      messages: [{ role: "user", content: userMessage }],
    });

    const aiText = response.data.choices[0].message.content;
    res.status(200).json({ reply: aiText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
