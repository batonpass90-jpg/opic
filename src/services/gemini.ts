import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateQuestions = async (userType: 'worker' | 'student') => {
  const prompt = `Generate 3 OPIc interview questions for a ${userType}. 
  The first question should be a self-introduction related to their status.
  The second question should be about a specific experience or routine.
  The third question should be a role-play or problem-solving scenario.
  Return ONLY a JSON array of strings. Example: ["Question 1", "Question 2", "Question 3"]`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating questions:", error);
    return [
      "Tell me about yourself.",
      "Describe your typical day.",
      "Ask me three questions about the new policy."
    ];
  }
};

export const generateFeedback = async (question: string, transcript: string) => {
    const prompt = `
    You are an OPIc evaluator.
    Question: "${question}"
    User Answer: "${transcript}"
    
    Provide concise feedback on:
    1. Grammar & Vocabulary
    2. Fluency & Coherence
    3. Suggest a better way to phrase the key point.
    
    Keep it encouraging but professional.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating feedback:", error);
        return "Unable to generate feedback at this time.";
    }
}
