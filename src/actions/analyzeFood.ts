"use server";
import { GoogleGenAI, Type } from "@google/genai";
import { auth } from "@/src/lib/auth";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          calories: { type: Type.INTEGER },
          carbs: { type: Type.INTEGER },
          protein: { type: Type.INTEGER },
          fat: { type: Type.INTEGER },
          confidence: { type: Type.NUMBER },
        },
        required: [
          "name",
          "calories",
          "carbs",
          "protein",
          "fat",
        ],
      },
    },
    total: {
      type: Type.OBJECT,
      properties: {
        calories: { type: Type.INTEGER },
        carbs: { type: Type.INTEGER },
        protein: { type: Type.INTEGER },
        fat: { type: Type.INTEGER },
      },
      required: ["calories", "carbs", "protein", "fat"],
    },
  },
  required: ["items", "total"],
};

export async function analyzeFood(b64Data: string, mime: string) {
  // Each call spends Gemini quota, so only logged-in users may call it
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            data: b64Data,
            mimeType: mime
          }
        },
        "Analyze the attached food image. Identify each distinct visible food item. For every item, return an object in the `items` array containing: `name`, `calories`, `carbs`, `protein`, `fat`, and `confidence`. Estimate nutrients only from what is visible in the image and do not invent foods that are not clearly present. After calculating all individual items, provide the summed nutritional values in the `total` object (`calories`, `carbs`, `protein`, `fat`). Ensure the totals equal the sum of the values from all items. Return only valid JSON matching the provided schema."
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    if (!res.text) throw new Error();
    return JSON.parse(res.text);
  } catch (err) {
    return { error: "Analysis failed" };
  }
}