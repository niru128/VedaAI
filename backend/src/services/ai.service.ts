import dotenv from "dotenv";

dotenv.config();

export const generateQuestions = async (prompt: string) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
		"HTTP-Referer": "http://localhost:5000", // REQUIRED
      "X-Title": "VedaAI Project"              // REQUIRED
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct", // free model
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    },
  );

  const data = await response.json();
  if (!response.ok) {
    console.error("OpenRouter Error:", data);
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  return data.choices[0].message.content;
};
