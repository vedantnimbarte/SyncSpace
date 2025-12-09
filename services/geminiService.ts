import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (
  prompt: string, 
  history: { role: 'user' | 'model', text: string }[],
  context?: string
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    // We use the 2.5 flash model as requested for general text tasks
    const modelId = 'gemini-2.5-flash';

    const systemInstruction = `You are SyncSpace AI, a helpful, intelligent assistant integrated into a collaborative workspace platform. 
    You help users with writing docs, analyzing spreadsheet data, brainstorming on canvas, and building workflows.
    Keep answers concise, professional, and helpful.
    Current Context: ${context || 'General Workspace'}
    `;

    // Convert history to compatible format if we were doing a persistent chat session object,
    // but for simple single-turn or manual history management, we can just append previous turns to the prompt 
    // or use the simple generateContent for this stateless demo wrapper.
    // For better experience, we will concatenate the history into a prompt string for this simple demo service.
    
    let fullPrompt = "";
    history.forEach(msg => {
      fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
    });
    fullPrompt += `User: ${prompt}`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the AI service right now.";
  }
};