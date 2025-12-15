/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, ArrowDown, Copy, Check, FileText } from "lucide-react"; // Changed icons for better clarity
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import CurrentFocus from "@/components/portfolio/current-focus";
import StickyCard from "@/components/portfolio/StickyCard";
import { skills } from "@/lib/portfolio-data"; // Assuming personalInfo has your email
import ContactUs from "@/components/mvpblocks/contact-us";
import { useState } from "react";


// 1. Functional Copy Email Button
const CopyEmailButton = () => {
	const [copied, setCopied] = useState(false);
	const email = "divysuhagiya100@gmail.com";

	const handleCopy = () => {
		navigator.clipboard.writeText(email);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
	};

	return (
		<Button
			variant="outline"
			onClick={handleCopy}
			className="hidden md:flex rounded-full border-purple-200 hover:bg-purple-50 hover:text-purple-700 gap-2 transition-all duration-300 w-32"
		>
			{copied ? <Check size={16} /> : <Copy size={16} />}
			{copied ? "Copied!" : "Copy Email"}
		</Button>
	);
};

// 2. The Wavy Line (for the Name)
const SquigglyLine = () => (
	<svg
		className="absolute top-full left-0 w-full h-3 -mt-1 text-purple-500"
		viewBox="0 0 100 10"
		preserveAspectRatio="none"
	>
		<motion.path
			d="M0 5 Q 5 0 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5"
			fill="transparent"
			stroke="currentColor"
			strokeWidth="4"
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{ duration: 1, delay: 0.5 }}
		/>
	</svg>
);

// 3. The Marker Stroke (for "Intelligent Systems")
const MarkerUnderline = () => (
	<svg
		className="absolute top-full left-0 w-full h-4 -mt-2 -z-10"
		viewBox="0 0 200 9"
		preserveAspectRatio="none"
	>
		<motion.path
			d="M2.00025 7.00001C35.9185 3.69373 133.376 -2.36017 197.997 3.5229"
			fill="transparent"
			stroke="#A855F7" // Purple-500
			strokeWidth="5"
			strokeLinecap="round"
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{ duration: 0.8, delay: 0.8 }}
			className="opacity-60"
		/>
	</svg>
);

// 4. The Box
const RoughBox = () => (
	<svg
		className="absolute -top-1 -left-2 w-[calc(100%+16px)] h-[calc(100%+12px)] -z-10"
		viewBox="0 0 100 100"
		preserveAspectRatio="none"
	>
		<motion.path
			d="M5,5 L95,8 L92,92 L8,95 Z"
			fill="transparent"
			stroke="#A855F7"
			strokeWidth="2"
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{ duration: 0.8, delay: 1.5 }}
			className="opacity-80"
		/>
	</svg>
);

// 5. Section Heading
const SectionHeading = ({
	children,
	icon: Icon,
}: {
	children: React.ReactNode;
	icon: any;
}) => (
	<div className="flex items-center gap-3 mb-8">
		<div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
			<Icon size={20} />
		</div>
		<h2 className="text-2xl font-bold tracking-tight">{children}</h2>
	</div>
);

// --- MAIN PAGE COMPONENT ---
export default function StandardPortfolio() {
	return (
		<div className="min-h-screen bg-[#FDFCFB] text-neutral-900 selection:bg-purple-100">
			{/* Background Tech Grid Subtle Pattern */}
			<div
				className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
					backgroundSize: "24px 24px",
				}}
			></div>

			{/* Header / Nav */}
			<header className="fixed top-0 z-50 w-full border-b border-neutral-100/80 bg-[#FDFCFB]/80 backdrop-blur-md">
				<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
					<span className="text-lg font-bold tracking-tight">Divy.dev</span>

					<nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
						<a
							href="#skills"
							className="hover:text-neutral-900 transition-colors"
						>
							Skills
						</a>
						<a
							href="#work"
							className="hover:text-neutral-900 transition-colors"
						>
							Work
						</a>
						<a
							href="#contact"
							className="hover:text-neutral-900 transition-colors"
						>
							Contact
						</a>
					</nav>

					<div className="flex items-center gap-4">
						{/* 1. Copy Email Button */}
						<CopyEmailButton />

						{/* 2. Resume Button - Ensure you put a file named 'resume.pdf' in your 'public' folder */}
						<a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
							<Button
								variant="outline"
								className="hidden md:flex rounded-full border-purple-200 hover:bg-purple-50 hover:text-purple-700 gap-2"
							>
								<FileText size={16} />
								Resume
							</Button>
						</a>

						{/* 3. AI Chat Button */}
						<Link href="/chat">
							<Button
								variant="outline"
								className="hidden md:flex rounded-full border-purple-200 hover:bg-purple-50 hover:text-purple-700 gap-2"
							>
								<Sparkles size={16} />
								Talk to AI Version
							</Button>
						</Link>

						{/* Mobile AI Link */}
						<Link
							href="/chat"
							className="md:hidden text-sm font-medium text-purple-600"
						>
							AI Version {"->"}
						</Link>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 pt-32 md:px-8 relative z-10">
				<section className="flex flex-col items-start justify-center min-h-[60vh] mb-24 max-w-4xl mx-auto">
					{/* Profile Picture Circle */}
					<motion.div
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="mb-8 relative h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-lg ring-1 ring-purple-100"
					>
						<img
							src="/portfolio.png"
							alt="Divy"
							className="h-full w-full object-cover mt-1"
						/>
					</motion.div>

					{/* Main Text Content */}
					<h1 className="text-4xl font-bold leading-[1.4] tracking-tight text-neutral-800 md:text-6xl">
						<span className="block mb-2">
							Hi{" "}
							<span className="inline-block origin-bottom-right hover:animate-wave">
								👋🏼
							</span>{" "}
							I am
							<span className="relative inline-block mx-3 text-neutral-900">
								Divy,
								<SquigglyLine />
							</span>
							and I build
						</span>

						<span className="block mb-2">
							<span className="relative inline-block whitespace-nowrap mr-3">
								intelligent systems
								<MarkerUnderline />
							</span>
							that not only
						</span>

						<span className="block mb-2">solve complex problems but are</span>
						<span className="block">
							scalable, efficient and
							<span className="relative inline-block ml-4 px-1">
								<span className="relative z-10 text-neutral-900">
									innovative
								</span>
								<RoughBox />
							</span>
						</span>
					</h1>

					{/* Down Arrows */}
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 2, duration: 1 }}
						className="mt-12 flex gap-2 text-purple-300"
					>
						<ArrowDown size={24} />
						<ArrowDown size={24} />
						<ArrowDown size={24} />
					</motion.div>
				</section>

				<CurrentFocus />

				{/* --- Skills Section --- */}
				<section id="skills" className="mb-32 max-w-4xl mx-auto">
					<SectionHeading icon={Cpu}>Technical Arsenal</SectionHeading>
					<div className="grid gap-8 md:grid-cols-3">
						{Object.entries(skills).map(([category, items], idx) => (
							<motion.div
								key={category}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: idx * 0.1 }}
								viewport={{ once: true }}
								className="space-y-4"
							>
								<h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
									{category}
								</h3>
								<div className="flex flex-wrap gap-2">
									{items.map((skill) => (
										<Badge
											key={skill}
											variant="secondary"
											className="rounded-md px-3 py-1.5 text-[13px] font-medium bg-neutral-100/80 hover:bg-neutral-200 transition-colors"
										>
											{skill}
										</Badge>
									))}
								</div>
							</motion.div>
						))}
					</div>
				</section>

				{/* --- Featured Work Section --- */}
				<section id="work" className="mb-32">
					<SectionHeading icon={Terminal}>Featured Projects</SectionHeading>
					<StickyCard />
				</section>

				{/* --- Footer --- */}
				<section
					id="contact"
					className="text-center border-t border-neutral-100"
				>
					<ContactUs />
				</section>
			</main>
		</div>
	);
}
