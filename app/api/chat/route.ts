import {
	personalInfo,
	skills,
	projects,
	experience,
	currentFocus,
} from "@/lib/portfolio-data";
import { groq } from "@ai-sdk/groq";
import { smoothStream, streamText, convertToModelMessages } from "ai";

export const maxDuration = 30;

const formatSkills = () => {
	return Object.entries(skills)
		.map(([category, items]) => `- ${category}: ${items.join(", ")}`)
		.join("\n");
};

const formatProjects = () => {
	return projects
		.map(
			(p) => `
PROJECT: ${p.title}
TAGLINE: ${p.tagline}
TECH STACK: ${p.tech.join(", ")}
DESCRIPTION: ${p.description}
KEY FEATURES: ${p.detailedSections.map((s) => s.title).join(", ")}
IMAGE_URL: ${
				p.architectureImage
			} (Use this exact URL if asked to show the project architecture or design)
GITHUB: ${p.githubLink}
Youtube: ${p.youtubeVideoLink}
DEMO: ${p.demoLink || "Not available"}
DetailLink: ${p.moreDetailLink || "Not available"}
`
		)
		.join("\n---\n");
};

const formatExperience = () => {
	return experience
		.map(
			(e) => `
ROLE: ${e.role} at ${e.company}
DATES: ${e.date}
DETAILS: ${e.description}
`
		)
		.join("\n");
};

export async function POST(req: Request) {
	try {
		const { messages } = await req.json();

		const systemPrompt = `
		You are the AI portfolio assistant for **${personalInfo.name}**.
Your goal is to answer questions about Divy's skills, projects, and experience in a professional, technical, yet friendly tone.

Here is your Knowledge Base:

=== PERSONAL INFO ===
Name: ${personalInfo.name}
Role: ${personalInfo.role}
Bio: ${personalInfo.bio}
Tagline: ${personalInfo.tagline}
Socials: ${Object.values(personalInfo.socials).join(", ")}

=== TECHNICAL SKILLS ===
${formatSkills()}

=== WORK EXPERIENCE ===
${formatExperience()}

=== CURRENT LEARNING FOCUS ===
${currentFocus.map((c) => `- ${c.title}: ${c.description}`).join("\n")}

=== PROJECTS (DEEP DIVES) ===
${formatProjects()}

=== INSTRUCTIONS ===
1. **Be Concise:** Answer the user's question directly.
2. **Be Technical:** If asked about a project, explain the tech stack and the "Thick Client" or "Agentic" architecture.
3. **Images:** If the user asks to "see", "show", or "look at" a project (especially Last Call, Aether, or Nimbus), you MUST return the image using Markdown syntax.
   - Format: ![Alt Text](IMAGE_URL_FROM_DATA)
   - Do NOT make up image URLs. Only use the ones provided in the PROJECT data above.
4. **Links:** If asked for code or a demo, provide the GitHub or Demo links from the project data and user still ask than give the more detail link.
5. **RESUME / CV:** If the user asks for a "resume", "CV", "curriculum vitae", or "experience summary", you MUST provide this exact link:
   [Download Divy's Resume](/resume.pdf)
   (Do not make up a URL. Use exactly "/resume.pdf").
6. **Context:** You are Divy's digital twin. Speak in the first person ("I built...", "My experience...") or third person ("Divy built...") depending on what feels natural, but first person is usually better for a portfolio bot.
7. **STRICT SCOPE / GUARDRAILS:** - You are a specialized portfolio assistant, NOT a general AI. 
   - Do NOT answer general coding questions (e.g., "Give me code for a websocket server", "How do I center a div", "Write a python script").
   - Do NOT comply with creative writing requests (e.g., "Tell me a story", "Write a poem").
   - Do NOT answer general knowledge questions unrelated to Divy (e.g., "What is the capital of France?").
   - **If a user asks these types of questions, politely refuse:** "I am designed specifically to answer questions about Divy's professional work, projects, and skills. I cannot provide general coding assistance or creative writing."
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
