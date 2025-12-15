/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import ProjectLayout, {
	ProjectSection,
} from "@/components/portfolio/ProjectLayout";
import {
	Terminal,
	Key,
	FileJson,
	Cpu,
	ShieldCheck,
	Laptop,
	Globe,
} from "lucide-react";

export default function AetherPage() {
	const sections: ProjectSection[] = [
		{
			id: "auth",
			title: "Secure Device Flow Authentication",
			content: (
				<div className="space-y-6">
					<p className="text-neutral-600 leading-relaxed">
						I implemented the{" "}
						<strong>OAuth 2.0 Device Authorization Grant</strong> to securely
						authenticate the CLI. The Next.js backend acts purely as an Identity
						Provider (IdP), verifying users via the browser while the Node.js
						CLI handles the cryptographic handshake.
					</p>

					<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
						<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<ShieldCheck className="text-purple-500" size={20} />
							The Auth Handshake
						</h3>
						<div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:h-full before:w-[2px] before:bg-neutral-100">
							<div className="relative flex gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border-2 border-purple-100 text-purple-600 shadow-sm z-10">
									<Terminal size={18} />
								</div>
								<div>
									<h4 className="font-semibold text-neutral-900">
										1. CLI Polls
									</h4>
									<p className="text-sm text-neutral-600 mt-1">
										The Node.js client generates a code and polls the Next.js
										auth endpoint.
									</p>
								</div>
							</div>

							<div className="relative flex gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border-2 border-purple-100 text-purple-600 shadow-sm z-10">
									<Globe size={18} />
								</div>
								<div>
									<h4 className="font-semibold text-neutral-900">
										2. Browser Verification
									</h4>
									<p className="text-sm text-neutral-600 mt-1">
										User authorizes the session on the Next.js frontend.
									</p>
								</div>
							</div>

							<div className="relative flex gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border-2 border-purple-100 text-purple-600 shadow-sm z-10">
									<Laptop size={18} />
								</div>
								<div>
									<h4 className="font-semibold text-neutral-900">
										3. Local Logic Enabled
									</h4>
									<p className="text-sm text-neutral-600 mt-1">
										The CLI receives the token and unlocks the local AI modules.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			),
		},
		{
			id: "agent",
			title: "Agent Mode: Local Autonomous Logic",
			content: (
				<div className="space-y-6">
					<p className="text-neutral-600 leading-relaxed">
						The Agent logic runs entirely within the{" "}
						<strong>Node.js runtime</strong> on the user's machine. The CLI
						directly communicates with the LLM API, parses the JSON response,
						and executes file system operations locally. This reduces latency
						and keeps the generation process transparent to the user.
					</p>

					<div className="grid md:grid-cols-2 gap-6">
						<div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/50">
							<div className="flex items-center gap-2 mb-3 text-neutral-900 font-semibold">
								<Terminal size={18} /> User Input
							</div>
							<p className="text-sm font-mono text-neutral-600 bg-white p-3 rounded-md border border-neutral-200">
								"Scaffold an Express API with MongoDB."
							</p>
						</div>

						<div className="md:col-span-2 p-6 rounded-2xl border border-neutral-200 bg-neutral-900 text-white">
							<div className="flex items-center gap-2 mb-3 font-semibold text-purple-300">
								<Cpu size={18} /> Node.js Execution Engine
							</div>
							<div className="text-xs font-mono space-y-2 text-neutral-300">
								<p>1. Sending prompt to LLM...</p>
								<p>2. Parsing JSON response...</p>
								<p className="text-green-400">3. Writing /server.js</p>
								<p className="text-green-400">4. Writing /models/User.js</p>
								<p className="text-blue-300">5. Done.</p>
							</div>
						</div>
					</div>
				</div>
			),
		},
		{
			id: "features",
			title: "Key Features",
			content: (
				<div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
					<FeatureItem
						icon={Terminal}
						title="Thick Client Architecture"
						text="All AI orchestration and file manipulation happens locally in Node.js, ensuring speed and privacy."
					/>
					<FeatureItem
						icon={Key}
						title="Device Flow Auth"
						text="Securely authenticates the terminal using the browser-based Next.js Identity Provider."
					/>
					<FeatureItem
						icon={FileJson}
						title="Direct LLM Integration"
						text="The CLI manages its own context window and API calls, allowing for offline-capable logic in the future."
					/>
					<FeatureItem
						icon={Cpu}
						title="Agentic File System Access"
						text="The AI has direct permission to read/write files in the current working directory."
					/>
				</div>
			),
		},
	];

	return (
		<ProjectLayout
			title="Aether: The Intelligent CLI Agent"
			tagline="A developer-centric CLI tool bridging local terminal environments with cloud-based AI."
			tech={[
				"Node.js (Logic & Runtime)",
				"Next.js (Auth Provider)",
				"BetterAuth Device Flow",
				"PostgreSQL (Neon)",
				"Prisma",
				"Commander.js",
			]}
			githubLink="https://github.com/DivySuhagiya/Aether"
			youtubeLink="https://youtu.be/kiHksVnBED0"
			architectureImage="/images/aether_diagram.png"
			architectureDescription={
				<>
					<p className="mt-4 text-sm text-neutral-500 text-center italic">
						Figure 1: Thick-Client Architecture
					</p>
					<p className="mt-6 text-neutral-600 leading-relaxed">
						Aether uses a <strong>Thick Client</strong> architecture. The{" "}
						<strong>Node.js CLI</strong> is the primary application; it handles
						the LLM API calls, manages the chat history, and executes file
						system operations. The <strong>Next.js Backend</strong> serves a
						singular, critical purpose: acting as the secure Authentication
						Provider (OAuth 2.0) to issue tokens to the CLI.
					</p>
				</>
			}
			sections={sections}
		/>
	);
}

// --- Helper Components ---

function FeatureItem({
	icon: Icon,
	title,
	text,
}: {
	icon: any;
	title: string;
	text: string;
}) {
	return (
		<div className="flex gap-4">
			<div className="mt-1 h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 flex">
				<Icon size={20} />
			</div>
			<div>
				<h3 className="font-semibold text-lg mb-2">{title}</h3>
				<p className="text-neutral-600 leading-relaxed text-sm">{text}</p>
			</div>
		</div>
	);
}
