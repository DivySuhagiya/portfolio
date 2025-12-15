"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Data ---
const activities = [
	{
		id: "01",
		title: "Building AI Code Reviewer",
		role: "Full Stack & AI Engineer",
		description:
			"Developing an autonomous agent similar to CodeRabbit. It integrates with GitHub to analyze Pull Requests, detect bugs, and suggest code optimizations in real-time.",
		image:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", // Coding/Matrix vibe
	},
	{
		id: "02",
		title: "Exploring Agentic AI",
		role: "Research & Development",
		description:
			"Deep diving into Google's Gen AI ADK and LangChain. I'm fascinated by how autonomous agents can solve complex reasoning tasks.",
		image:
			"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
	},
	{
		id: "03",
		title: "Mastering Distributed Systems",
		role: "Backend Engineering",
		description:
			"Learning the migration strategies from Monolith to Microservices. Deep diving into scalable backend concepts using Redis, Kafka, and event-driven architectures.",
		image:
			"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop", // Server/Network vibe
	},
];

export default function CurrentFocus() {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section className="py-24 bg-[#FDFCFB] text-neutral-900">
			<div className="container mx-auto px-6 md:px-12 max-w-6xl">
				{/* Main Title - Styled like "What am I upto these days?" */}
				<div className="mb-16">
					<h2 className="text-3xl md:text-4xl font-light text-neutral-800 tracking-tight">
						What am I upto these days?
					</h2>
				</div>

				<div className="flex flex-col md:flex-row gap-16 items-start">
					{/* Left Side: Image (Rounded & shadow like reference) */}
					<div className="w-full md:w-[45%]  top-24">
						<div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-xl">
							<AnimatePresence mode="wait">
								<motion.img
									key={activities[activeIndex].id}
									src={activities[activeIndex].image}
									alt={activities[activeIndex].title}
									initial={{ opacity: 0, scale: 1.1 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.5, ease: "easeOut" }}
									className="absolute inset-0 h-full w-full object-cover"
								/>
							</AnimatePresence>
						</div>
					</div>

					{/* Right Side: The List */}
					<div className="w-full md:w-[55%] flex flex-col gap-10 pt-4">
						{activities.map((item, index) => (
							<div
								key={item.id}
								onMouseEnter={() => setActiveIndex(index)}
								onClick={() => setActiveIndex(index)}
								className="group cursor-pointer tap-highlight-transparent"
							>
								{/* Title Row */}
								<div className="flex items-baseline gap-6 pb-4">
									<span className="text-sm font-mono text-neutral-400">
										0{index + 1}.
									</span>
									<h3
										className={cn(
											"text-xl md:text-2xl transition-all duration-300",
											// Active: Bold & Dark. Inactive: Light & Grey
											activeIndex === index
												? "font-semibold text-neutral-900"
												: "font-light text-neutral-400 group-hover:text-neutral-600"
										)}
									>
										{item.title}
									</h3>
								</div>

								{/* THE FIX: Border is here, directly under title, not under description */}
								<div
									className={cn(
										"h-[1px] w-full transition-colors duration-300",
										activeIndex === index
											? "bg-neutral-900"
											: "bg-neutral-200 group-hover:bg-neutral-300"
									)}
								/>

								{/* Description Area */}
								<motion.div
									initial={false}
									animate={{
										height: activeIndex === index ? "auto" : 0,
										opacity: activeIndex === index ? 1 : 0,
										marginTop: activeIndex === index ? 24 : 0,
									}}
									transition={{ duration: 0.4, ease: "easeInOut" }}
									className="overflow-hidden"
								>
									<div className="pl-10 pr-4">
										<p className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-2">
											{item.role}
										</p>
										<p className="text-base text-neutral-600 leading-relaxed font-light">
											{item.description}
										</p>
									</div>
								</motion.div>
							</div>
						))}
					</div>
				</div>
				{/* Bottom Button - Styled like the "Read more" pill */}
				{/* <div className="mt-12 flex justify-center items-center pl-10">
					<button className="rounded-full bg-neutral-100 px-8 py-3 text-sm font-medium text-neutral-600 transition-all hover:bg-neutral-200 active:scale-95">
						Read more about me
					</button>
				</div> */}
			</div>
		</section>
	);
}
