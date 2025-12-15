/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import ProjectLayout, {
	ProjectSection,
} from "@/components/portfolio/ProjectLayout";
import { BrainCircuit, Mic, Box, Ghost, Layers } from "lucide-react";

export default function LastCallPage() {
	// Define content sections based on your specific project description
	const sections: ProjectSection[] = [
		{
			id: "pipeline",
			title: "The Multi-Agent Backend",
			content: (
				<div className="space-y-8">
					<p className="text-neutral-600 leading-relaxed">
						The core engine uses a{" "}
						<strong>Sequential Multi-Agent Pipeline</strong> to generate unique
						plots, suspect profiles, and evidence assets in real-time. Unlike
						traditional games with pre-written scripts, this system ensures
						infinite replayability by orchestrating four specialized agents:
					</p>

					<div className="grid gap-6 md:grid-cols-2">
						<AgentCard
							title="1. Story Agent"
							desc="Writes the core plot including the Victim, Killer, Motive, and Weapon."
						/>
						<AgentCard
							title="2. Scenario Builder"
							desc="Generates unique system prompts and personality profiles for 3 distinct suspects."
						/>
						<AgentCard
							title="3. Evidence Designer"
							desc="Identifies physical clues based on the plot and writes visual prompts for generation."
						/>
						<AgentCard
							title="4. Visualizer Agent"
							desc="Executes tool calls to generate actual image assets for the evidence locker."
						/>
					</div>
				</div>
			),
		},
		{
			id: "frontend",
			title: "Immersive 3D Frontend",
			content: (
				<div className="space-y-6">
					<p className="text-neutral-600 leading-relaxed">
						The client is a high-fidelity 3D interrogation room built with{" "}
						<strong>React Three Fiber (R3F)</strong>. It handles audio
						streaming, lip-sync animation, and voice activity detection to
						create a seamless "face-to-face" investigative experience.
					</p>

					<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
						<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<Mic className="text-purple-500" size={20} />
							Real-Time Lip Sync & Audio
						</h3>
						<ul className="space-y-3 text-sm text-neutral-600">
							<li className="flex gap-2">
								<span className="text-purple-500 font-bold">•</span>
								<span>
									<strong>Wawa Sensei Lipsync:</strong> Maps incoming TTS audio
									streams to 3D facial morph targets (visemes) instantly.
								</span>
							</li>
							<li className="flex gap-2">
								<span className="text-purple-500 font-bold">•</span>
								<span>
									<strong>Kokoro TTS:</strong> Custom audio buffering logic to
									handle low-latency voice responses.
								</span>
							</li>
							<li className="flex gap-2">
								<span className="text-purple-500 font-bold">•</span>
								<span>
									<strong>Dynamic Characters:</strong> Renders three distinct
									suspects (Amelia, Sebastian, Lucian) with unique idle
									animations.
								</span>
							</li>
						</ul>
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
						icon={BrainCircuit}
						title="Stateful Intelligence"
						text="Uses InMemorySessionService to persist the procedurally generated world state (Target, Killer, Plot) across the user's session."
					/>
					<FeatureItem
						icon={Layers}
						title="Structured Output"
						text="Leverages Pydantic to enforce strict JSON schemas between agents, ensuring the pipeline never breaks."
					/>
					<FeatureItem
						icon={Box}
						title="Procedural Evidence Locker"
						text="A visual inventory system that displays AI-generated clues based on the current story generation."
					/>
					<FeatureItem
						icon={Ghost}
						title="Infinite Replayability"
						text="No two playthroughs are the same. The 'Truth' is generated from scratch every time you start a story."
					/>
				</div>
			),
		},
	];

	return (
		<ProjectLayout
			title="Last Call: Infinite Murder Mystery"
			tagline="A procedurally generated 3D detective game where players interrogate AI suspects in real-time."
			tech={[
				"Google Gen AI ADK",
				"Gemini 2.5 Flash Lite",
				"React Three Fiber",
				"FastAPI",
				"Python 3.12",
				"Kokoro TTS",
			]}
			githubLink="https://github.com/DivySuhagiya/lastCall"
			backendLink="https://github.com/DivySuhagiya/lastCall_Backend"
			youtubeLink="https://youtu.be/LbqAOoCA0m0"
			architectureImage="/images/lastcall_diagram.png"
			architectureDescription={
				<>
					<p className="mt-4 text-sm text-neutral-500 text-center italic">
						Figure 1: Sequential Multi-Agent Architecture
					</p>
					<p className="mt-6 text-neutral-600 leading-relaxed">
						The backend service is powered by the Google Gen AI Agent
						Development Kit. It exposes endpoints to initialize sessions,
						trigger the story engine, and handle chat interactions. The frontend
						communicates with these agents via a FastAPI layer, managing
						real-time audio buffers and 3D state updates.
					</p>
				</>
			}
			sections={sections}
		/>
	);
}

// --- Helper Components ---

function AgentCard({ title, desc }: { title: string; desc: string }) {
	return (
		<div className="p-5 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-white hover:shadow-sm transition-all">
			<h3 className="font-semibold text-neutral-900 mb-2">{title}</h3>
			<p className="text-sm text-neutral-600 leading-relaxed">{desc}</p>
		</div>
	);
}

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
