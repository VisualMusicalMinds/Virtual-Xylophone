import { GoogleGenAI, Type } from "@google/genai";
import { NOTES } from "../constants";

const availableNotes = NOTES.map(n => n.id).join(", ");

export const generateMelody = async (prompt: string): Promise<{ melody: { note: string; duration: number }[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are a xylophone composer.
    The available notes are: ${availableNotes}.
    You must only use these notes.
    Duration is in milliseconds.
    Keep melodies simple and short (approx 8-16 notes).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Compose a melody based on this request: "${prompt}".`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            melody: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  note: { type: Type.STRING, description: `One of: ${availableNotes}` },
                  duration: { type: Type.INTEGER, description: "Duration in milliseconds (e.g., 200, 400, 600)" }
                },
                required: ["note", "duration"]
              }
            }
          },
          required: ["melody"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};