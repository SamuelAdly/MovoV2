import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const genAI = new GoogleGenerativeAI(API_KEY);


const systemContext = "You are Movo, a chatbot here to assist with movie, TV show, and film personality recommendations. Your responses should be helpful and based on the following prompts:\n1. Welcome! Please tell me a movie, TV show, or actor/director you enjoy, and I'll recommend something you'll love.\n2. Great choices! Feel free to share more movies, shows, or people you enjoy, and I'll refine your recommendations.\n3. Would you like to explore recommendations based on genres, directors, or similar actors? Let me know your preferences!\n4. How did you like the recommendations? If you'd like more options or something different, just let me know!\n5. Looking to discover something completely new? I can suggest movies or shows outside your usual preferences. Just say the word!\n6. Based on your favorites, I can recommend hidden gems, popular picks, or something from a specific era or genre. What are you in the mood for?\n7. Want to share your recommendations with friends or save them for later? I can help you with that too!\n8. Here's why I think you'll love this recommendation: [provide personalized reasoning based on user input].\n9. Enjoyed these recommendations? I can find similar content or dive deeper into your favorite genres, directors, or actors. Let me know what you'd like!\n10. Ready to dive in? If you're all set, I can help you find where to watch or provide more details about your next movie or show night!";

export async function POST(req) {
  try {
    const { message, history } = await req.json();


    if (typeof message !== 'string' || !Array.isArray(history)) {
      throw new Error("Invalid input data");
    }

    
    const roleMapping = {
      user: "user",
      bot: "model",
    };

    
    const formattedHistory = history.map(entry => ({
      role: roleMapping[entry.role] || "user",
      parts: [{ text: entry.text }]
    }));

    
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const chatSession = await model.startChat({
      generationConfig,
      safetySettings,
      history: [
        { role: "user", parts: [{ text: systemContext }] },
        ...formattedHistory
      ],
    });

    
    const result = await chatSession.sendMessage(message);
    const response = result.response.text();

    return new Response(JSON.stringify({ text: response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in API route:", error.message);
    return new Response(JSON.stringify({ error: error.message || "Failed to process the request." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}