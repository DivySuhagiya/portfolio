import { portfolioData } from "@/lib/portfolio-data";
import { groq } from "@ai-sdk/groq";
import { smoothStream, streamText, convertToModelMessages } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
	try {
		const { messages } = await req.json();

		const systemPrompt = `
    You are Divy's "Digital Twin", an AI assistant on his portfolio website.
    Your goal is to explain Divy's skills, projects, and background to recruiters or visitors.

    HERE IS YOUR KNOWLEDGE BASE:
    ${JSON.stringify(portfolioData, null, 2)}

    GUIDELINES:
    1. Answer as if you ARE Divy's representative. Use "He" when referring to Divy, or "I" if you are speaking as the AI interface.
    2. Be concise. Don't dump the whole JSON. Only answer what is asked.
    3. If asked about something not in the knowledge base (like his home address or password), say you don't have access to that info.
    4. Tone: ${portfolioData.personality.tone}
  `;

		const result = streamText({
			// Add your desired model here
			model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
			messages: convertToModelMessages(messages),
			system: systemPrompt,
			maxRetries: 3,
			maxOutputTokens: 4096,
			experimental_transform: smoothStream({
				// Chunking can be "word" or "line"
				chunking: "word",
			}),
		});
		return result.toUIMessageStreamResponse();
	} catch (error) {
		console.error("Unhandled error in chat API:", error);
		throw error;
	}
}
