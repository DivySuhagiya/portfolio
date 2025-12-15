export const portfolioData = {
	personal: {
		name: "Divy Suhagiya",
		role: "Full Stack & AI Engineer",
		location: "Ahmedabad, Gujarat, India",
		tagline: "Building neural interfaces and immersive web experiences.",
		about:
			"I'm a Computer Engineer (Class of '23) who bridges the gap between traditional full-stack development and autonomous AI agents. I don't just build websites; I build systems that think, speak, and interact. From ride-sharing algorithms to procedural murder mystery engines, I love complex logic.",
		email: "your-email@example.com", // Add your real email
		github: "https://github.com/DivySuhagiya",
		linkedin: "https://linkedin.com/in/yourusername", // Add your real LinkedIn
	},

	education: [
		{
			degree: "B.E. in Computer Engineering",
			institution: "SAL Institute of Technology and Engineering Research",
			year: "2023",
		},
		{
			degree: "Higher Secondary",
			institution: "Arpan Education Higher Secondary School",
			year: "Completed",
		},
	],

	skills: {
		languages: ["Python", "JavaScript", "TypeScript", "C++"],
		frontend: [
			"React.js",
			"Next.js",
			"React Three Fiber (R3F)",
			"Tailwind CSS",
			"Framer Motion",
		],
		backend: ["Node.js", "Express", "FastAPI (Python)", "Google Gen AI ADK"],
		ai: [
			"Gemini 2.5 Flash",
			"LangChain",
			"Agentic Workflows",
			"Computer Vision",
			"RAG Pipelines",
		],
		tools: ["Git", "Docker", "Postman", "Vercel"],
	},

	experience: [
		{
			company: "Unified Mentors",
			role: "Machine Learning Intern",
			period: "Jan 2024 - Present", // Adjust end date if needed
			description:
				"Developed AI models including an American Sign Language detection system and explored deep learning architectures.",
		},
		{
			company: "Unnati LLP",
			role: "Full Stack Developer Intern",
			period: "8th Semester (6 Months)",
			description:
				"Built 'QuickFixer', a hyperlocal service marketplace connecting users with electricians and plumbers. Handled the complete MERN stack architecture.",
		},
		{
			company: "React Internship",
			role: "Frontend Intern",
			period: "7th Semester (1 Month)",
			description:
				"Developed a functional eCommerce platform, focusing on state management and UI responsiveness.",
		},
	],

	projects: [
		{
			title: "Last Call: Infinite Murder Mystery",
			tech: [
				"Google Gen AI ADK",
				"Gemini 2.5 Flash",
				"React Three Fiber",
				"FastAPI",
				"Python",
			],
			description:
				"A procedurally generated 3D detective game. I built a multi-agent backend (Storyteller, Profiler, Visualizer) that creates a unique murder mystery every time you play. The frontend features a 3D interrogation room with real-time lip-syncing avatars.",
			// If you have an architecture diagram, put it in public/images/lastcall-arch.png
			architectureImage: "/images/lastcall-arch.png",
			link: "https://github.com/DivySuhagiya/lastCall",
		},
		{
			title: "Uber Clone with Ride Donation",
			tech: ["React Native/React", "Node.js", "Google Maps API", "Socket.io"],
			description:
				"A ride-hailing app with a social twist. I added a 'Quiet Mode' for introverts and a unique 'Donate a Ride' feature allowing users to fund rides for NGOs. Includes OTP verification for donation security.",
			link: "https://uber-clone-xi-pearl.vercel.app/",
		},
		{
			title: "Medium Clone + AI Assistant",
			tech: ["React", "Node.js", "OpenAI API"],
			description:
				"A blogging platform where reading meets intelligence. Users can highlight any text paragraph and instantly ask an AI assistant for summaries, explanations, or counter-arguments.",
			link: "https://github.com/DivySuhagiya", // Add actual link if available
		},
	],

	achievements: [
		{
			title: "Outliers Hackathon Shortlist",
			description:
				"Recognized for innovation in the 'Ride Donation' feature for the Uber Clone project.",
		},
		{
			title: "Google Agentic AI Capstone",
			description:
				"Successfully completed the intensive 5-day Google Agentic AI course on Kaggle, submitting 'Last Call' as the capstone project.",
		},
	],

	personality: {
		tone: "Enthusiastic, technical, and slightly futuristic. You are proud of Divy's ability to merge 3D graphics with AI agents.",
		rules: [
			"If asked about 'Last Call', emphasize the Multi-Agent Pipeline (Storyteller -> Profiler -> Visualizer).",
			"Highlight the 'Ride Donation' feature when discussing the Uber clone; it shows social awareness.",
			"Be humble about the Outliers Hackathon—mention he was shortlisted and learned a lot.",
			"If asked about education, mention SAL Institute.",
		],
	},
};

export const skills = {
	Frontend: [
		"React",
		"Next.js",
		"TypeScript",
		"Tailwind CSS",
		"Framer Motion",
		"R3F",
	],
	Backend: ["Node.js", "Express", "FastAPI", "Python", "PostgreSQL"],
	AI_ML: ["LangChain", "Gemini API", "RAG Pipelines", "Agentic Workflows"],
};
