// lib/portfolio-data.ts

export const personalInfo = {
	name: "Divy Suhagiya",
	role: "Full Stack & AI Engineer",
	location: "Ahmedabad, Gujarat, India",
	tagline:
		"Building intelligent systems that bridge the gap between complex AI and intuitive user experiences.",
	bio: "I specialize in integrating autonomous agentic workflows and high-fidelity 3D interfaces into robust web applications. My work focuses on moving beyond simple chatbots to create 'Thick Client' intelligent applications that understand context and execute complex tasks.",
	socials: {
		github: "https://github.com/DivySuhagiya",
		linkedin: "https://www.linkedin.com/in/divy-suhagiya-627299236",
		email: "mailto:Divysuhagiya100@gmail.com",
	},
	resume: "/resume.pdf",
};

export const skills = {
	"AI & Agents": [
		"Google Gen AI ADK",
		"LangChain",
		"AutoGPT Patterns",
		"RAG Pipelines",
		"TensorFlow / Keras",
		"Gemini 2.5 Flash",
	],
	"Frontend & 3D": [
		"React / Next.js",
		"TypeScript",
		"React Three Fiber (R3F)",
		"GSAP ScrollTrigger",
		"Tailwind CSS",
		"Framer Motion",
	],
	"Backend & Infra": [
		"Node.js",
		"FastAPI (Python)",
		"PostgreSQL (Neon)",
		"Prisma ORM",
		"BetterAuth",
		"Docker",
	],
};

export const currentFocus = [
	{
		id: "01",
		title: "Building AI Code Reviewer",
		description:
			"Developing an autonomous agent similar to CodeRabbit. It integrates with GitHub to analyze Pull Requests, detect bugs, and suggest code optimizations in real-time.",
	},
	{
		id: "02",
		title: "Exploring Agentic AI",
		description:
			"Deep diving into Google's Gen AI ADK and LangChain. I'm fascinated by how autonomous agents can solve complex reasoning tasks.",
	},
	{
		id: "03",
		title: "Mastering Distributed Systems",
		description:
			"Learning the migration strategies from Monolith to Microservices. Deep diving into scalable backend concepts using Redis, Kafka, and event-driven architectures.",
	},
];

export const experience = [
	{
		company: "Unified Mentor Pvt Ltd",
		role: "Machine Learning Intern",
		date: "Dec 2024 – Feb 2025",
		description:
			"Engineered supervised and unsupervised machine learning models using Python, TensorFlow, and Keras. Designed robust data preprocessing pipelines.",
	},
	{
		company: "Unnati Informatics LLP",
		role: "Full Stack Developer Intern",
		date: "Jan 2023 – May 2023",
		description:
			"Built scalable full-stack web features using React and Node.js. Designed and deployed secure RESTful API endpoints.",
	},
	{
		company: "Techmicra Data System",
		role: "ReactJS Intern",
		date: "June 2022 – July 2022",
		description:
			"Developed a responsive e-commerce frontend interface using React.js, ensuring pixel-perfect implementation of UI designs.",
	},
];

export const projects = [
	{
		id: "last-call",
		title: "Last Call: Infinite Murder Mystery",
		tagline:
			"Procedural 3D detective game powered by a multi-agent LLM backend.",
		tech: [
			"Google Gen AI ADK",
			"Gemini 2.5 Flash Lite",
			"React Three Fiber",
			"FastAPI",
			"Python",
		],
		description:
			"A procedurally generated 3D detective game. The backend runs a Sequential Multi-Agent Pipeline where an 'Author Agent' writes the plot, a 'Profiler' creates character scenarios, and an 'Evidence Designer' works with a 'Visualizer' to generate assets in real-time.",
		architectureImage: "/images/lastcall_diagram.png",
		githubLink: "https://github.com/DivySuhagiya/lastCall",
		demoLink: null,
		youtubeVideoLink: "https://youtu.be/LbqAOoCA0m0",
		detailedSections: [
			{
				id: "pipeline",
				title: "The Multi-Agent Backend",
				content:
					"The core engine uses a Sequential Multi-Agent Pipeline to generate unique plots. It orchestrates four specialized agents: Story Agent (Plot), Scenario Builder (Profiles), Evidence Designer (Clues), and Visualizer Agent (Assets).",
			},
			{
				id: "frontend",
				title: "Immersive 3D Frontend",
				content:
					"Built with React Three Fiber (R3F), featuring real-time lip-syncing avatars (Wawa Sensei + Kokoro TTS) and dynamic camera angles that respond to game state.",
			},
		],
		moreDetailLink: "https://portfolio-virid-two-54.vercel.app/last-call"
	},
	{
		id: "aether",
		title: "Aether: The Intelligent CLI Agent",
		tagline:
			"A developer-centric CLI tool bridging local terminal environments with cloud-based AI.",
		tech: [
			"Node.js CLI",
			"BetterAuth Device Flow",
			"Next.js",
			"PostgreSQL",
			"Prisma",
		],
		description:
			"A 'Thick Client' CLI tool that brings AI directly to the terminal. Features a secure Device Flow authentication (like GitHub CLI) and an autonomous Agent Mode that can scaffold full-stack applications by writing directly to the local file system.",
		architectureImage: "/images/aether_diagram.png",
		githubLink: "https://github.com/DivySuhagiya/Aether",
		demoLink: null,
		youtubeVideoLink: "https://youtu.be/kiHksVnBED0",
		detailedSections: [
			{
				id: "auth",
				title: "Secure Device Flow",
				content:
					"Implemented OAuth 2.0 Device Authorization Grant. The Node.js CLI polls the Next.js Identity Provider, allowing secure login without handling passwords locally.",
			},
			{
				id: "agent",
				title: "Autonomous Local Agent",
				content:
					"The CLI runs the Agent logic locally in Node.js, directly calling LLM APIs and executing file system operations to scaffold projects based on natural language prompts.",
			},
		],
		moreDetailLink: "https://portfolio-virid-two-54.vercel.app/aether"
	},
	{
		id: "nimbus",
		title: "Nimbus",
		tagline:
			"A cinematic 3D product showcase for a custom mechanical keyboard.",
		tech: [
			"React Three Fiber",
			"GSAP ScrollTrigger",
			"Next.js",
			"Web Audio API",
		],
		description:
			"A high-performance 3D website featuring cinematic scroll-based animations. Includes Draco-compressed assets for speed, a custom audio engine for haptic switch feedback, and real-time texture swapping for product customization.",
		architectureImage: "/images/nimbus_diagram.png",
		githubLink: "https://github.com/DivySuhagiya/nimbus",
		demoLink: "https://nimbus-gilt.vercel.app/",
		youtubeVideoLink: null,
		detailedSections: [
			{
				id: "performance",
				title: "3D Asset Optimization",
				content:
					"Used Draco compression to reduce assets by 85% and texture atlasing to minimize draw calls, ensuring 60FPS performance even on mobile devices.",
			},
			{
				id: "interaction",
				title: "Interactive Playground",
				content:
					"Users can click switches to trigger specific animations and play randomized mechanical keyboard audio samples via the Web Audio API.",
			},
		],
		moreDetailLink: "https://portfolio-virid-two-54.vercel.app/nimbus"
	},
];
