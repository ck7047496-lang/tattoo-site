import { Injectable } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    // Initialize Gemini API
    // Note: GEMINI_API_KEY is injected by the environment
    this.ai = new GoogleGenAI({ apiKey: typeof GEMINI_API_KEY !== 'undefined' ? GEMINI_API_KEY : '' });
  }

  async generateTattooMockup(bodyPartImageBase64: string, referenceImageBase64: string, location: string): Promise<string> {
    try {
      const prompt = `Generate a realistic mockup of a tattoo on a human body. 
      The tattoo should be placed on the ${location}.
      Blend the reference tattoo design naturally onto the body part, respecting lighting, contours, and skin texture.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: bodyPartImageBase64.split(',')[1] || bodyPartImageBase64,
                mimeType: 'image/jpeg',
              },
            },
            {
              inlineData: {
                data: referenceImageBase64.split(',')[1] || referenceImageBase64,
                mimeType: 'image/jpeg',
              },
            },
            { text: prompt }
          ]
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/jpeg;base64,${part.inlineData.data}`;
        }
      }
      
      throw new Error("No image generated");
    } catch (error) {
      console.error("Error generating tattoo mockup:", error);
      // Fallback for demo purposes if API fails or key is missing
      return 'https://picsum.photos/seed/tattoo/800/800';
    }
  }

  async estimateTattoo(size: string, description: string, location: string): Promise<{ price: string, time: string }> {
    try {
      const prompt = `Estime o preço e o tempo para uma tatuagem com base nestes parâmetros:
      Tamanho: ${size}
      Descrição/Detalhes: ${description}
      Local no Corpo: ${location}
      
      Retorne APENAS um objeto JSON com 'price' (ex: "R$ 350 - R$ 900") e 'time' (ex: "2 - 4 horas").
      Use valores realistas em Real (R$) para um estúdio de alto padrão no Brasil.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              price: { type: Type.STRING },
              time: { type: Type.STRING }
            },
            required: ["price", "time"]
          }
        }
      });

      const text = response.text || '{}';
      return JSON.parse(text);
    } catch (error) {
      console.error("Error estimating tattoo:", error);
      return { price: "R$ 500 - R$ 1200", time: "3 - 5 horas" };
    }
  }
}
