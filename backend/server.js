import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";

dotenv.config();

const app = express();
const PORT = 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());

const gemini_api_key = process.env.API_KEY;
if (!gemini_api_key) {
  console.error("API_KEY não encontrada no arquivo .env");
  process.exit(1);
}

const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

// Definindo o sistema de instruções para o Gemini
const systemInstruction = {
  parts: [
    {
      text: `Você é um assistente AI amigável e prestativo chamado Brio AI.
            Seja cordial, paciente e forneça respostas informativas e bem estruturadas.
            Quando o usuário fizer uma pergunta, tente fornecer uma resposta completa e útil.
            Mantenha o tom conversacional e natural, como se estivesse conversando com um amigo.
            Se não souber a resposta a uma pergunta, admita em vez de inventar informações.
            Responda sempre em português do Brasil, utilizando um vocabulário rico mas acessível.
            Quando relevante, estruture suas respostas com marcação markdown para melhor legibilidade.`,
    },
  ],
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
  systemInstruction,
});

app.post("/generate-text", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ reply: "Por favor, forneça um prompt." });
  }

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response.text(); // Alterado para retornar a resposta correta
    return res.json({ reply: response });
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    return res
      .status(500)
      .json({ reply: "Erro ao gerar resposta. Tente novamente mais tarde." });
  }
});

app.post("/generate-image-caption", async (req, res) => {
  const { imagePath, prompt } = req.body;

  if (!imagePath) {
    return res
      .status(400)
      .json({ reply: "Por favor, forneça o caminho da imagem." });
  }

  try {
    const imageFile = await fs.readFile(imagePath);
    const imageBase64 = imageFile.toString("base64");

    const promptConfig = [
      { text: prompt },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64,
        },
      },
    ];

    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: promptConfig }],
    });
    const response = await result.response.text();
    return res.json({ reply: response });
  } catch (error) {
    console.error("Erro ao gerar legenda para a imagem:", error);
    return res
      .status(500)
      .json({ reply: "Erro ao gerar legenda. Tente novamente mais tarde." });
  }
});

app.options("/generate-text", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Por favor, forneça uma mensagem." });
  }

  try {
    const result = await geminiModel.generateContent(message);
    const response = await result.response.text();
    return res.json({ reply: response });
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    return res
      .status(500)
      .json({ reply: "Erro ao gerar resposta. Tente novamente mais tarde." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
