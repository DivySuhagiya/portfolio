"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Github, ExternalLink, Youtube } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Ensure you have shadcn button
import Image from "next/image";

export interface ProjectSection {
	id: string;
	title: string;
	content: React.ReactNode;
}

interface ProjectLayoutProps {
	title: string;
	tagline: string;
	tech: string[];
	architectureImage: string;
	architectureDescription: React.ReactNode;
	sections: ProjectSection[];
	// --- NEW PROPS ---
	githubLink?: string;
	backendLink?: string;
	demoLink?: string;
	youtubeLink?: string;
}

export default function ProjectLayout({
	title,
	tagline,
	tech,
	architectureImage,
	architectureDescription,
	sections,
	githubLink,
	backendLink,
	demoLink,
	youtubeLink,
}: ProjectLayoutProps) {
	const [activeSection, setActiveSection] = useState("architecture");

	const navItems = [
		{ id: "architecture", title: "System Architecture" },
		...sections.map((s) => ({ id: s.id, title: s.title })),
	];

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 150;
			const sectionPositions = navItems.map((section) => {
				const element = document.getElementById(section.id);
				if (!element) return { id: section.id, top: 0, bottom: 0 };
				return {
					id: section.id,
					top: element.offsetTop,
					bottom: element.offsetTop + element.offsetHeight,
				};
			});

			const current = sectionPositions.find(
				(section) =>
					scrollPosition >= section.top && scrollPosition < section.bottom
			);

			if (current) {
				setActiveSection(current.id);
			} else if (window.scrollY === 0) {
				setActiveSection("architecture");
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [navItems]);

	const scrollToSection = (e: React.MouseEvent, id: string) => {
		e.preventDefault();
		const el = document.getElementById(id);
		if (el) {
			const headerOffset = 100;
			const elementPosition = el.getBoundingClientRect().top;
			const offsetPosition =
				elementPosition + window.pageYOffset - headerOffset;
			window.scrollTo({ top: offsetPosition, behavior: "smooth" });
		}
	};

	return (
		<div className="min-h-screen bg-[#FDFCFB] text-neutral-900 selection:bg-purple-100">
			<div
				className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
					backgroundSize: "24px 24px",
				}}
			></div>

			<header className="fixed top-0 z-50 w-full border-b border-neutral-100/80 bg-[#FDFCFB]/80 backdrop-blur-md">
				<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
					<Link
						href="/home#work"
						className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
					>
						<ArrowLeft size={18} /> Back to Portfolio
					</Link>
					<span className="text-lg font-bold tracking-tight hidden md:block">
						{title}
					</span>
					<div className="w-20"></div>
				</div>
			</header>

			<main className="container mx-auto px-4 pt-32 md:px-8 relative z-10 max-w-6xl">
				<section className="mb-16 text-center md:text-left">
					<h1 className="text-4xl font-extrabold tracking-tight md:text-6xl mb-4">
						{title}
					</h1>
					<p className="text-xl text-neutral-500 max-w-2xl mb-8">{tagline}</p>

					<div className="flex flex-col md:flex-row gap-6 md:items-center">
						{/* Tech Badges */}
						<div className="flex flex-wrap gap-2 justify-center md:justify-start">
							{tech.map((t) => (
								<Badge
									key={t}
									variant="secondary"
									className="rounded-md px-3 py-1.5 text-[13px] font-medium bg-neutral-100/80 border border-neutral-200"
								>
									{t}
								</Badge>
							))}
						</div>

						{/* --- NEW: Action Buttons --- */}
						<div className="flex gap-3 justify-center md:justify-start">
							{demoLink && (
								<a href={demoLink} target="_blank" rel="noopener noreferrer">
									<Button className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 gap-2">
										<ExternalLink size={16} /> Live Demo
									</Button>
								</a>
							)}
							{githubLink && (
								<a href={githubLink} target="_blank" rel="noopener noreferrer">
									<Button
										variant="outline"
										className="rounded-full gap-2 border-neutral-200"
									>
										<Github size={16} /> View Code
									</Button>
								</a>
							)}
							{backendLink && (
								<a href={backendLink} target="_blank" rel="noopener noreferrer">
									<Button
										variant="outline"
										className="rounded-full gap-2 border-neutral-200"
									>
										<Github size={16} /> View Backend Code
									</Button>
								</a>
							)}
							{youtubeLink && (
								<a href={youtubeLink} target="_blank" rel="noopener noreferrer">
									<Button
										variant="outline"
										className="rounded-full gap-2 border-neutral-200"
									>
										<Youtube size={16} /> Watch Video
									</Button>
								</a>
							)}
						</div>
					</div>
				</section>

				<div className="flex flex-col md:flex-row gap-12 relative">
					<aside className="w-full md:w-64 hidden md:block shrink-0">
						<nav className="sticky top-24 flex flex-col gap-1">
							{navItems.map((item) => (
								<a
									key={item.id}
									href={`#${item.id}`}
									onClick={(e) => scrollToSection(e, item.id)}
									className={cn(
										"block px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-300",
										activeSection === item.id
											? "bg-purple-50 text-purple-700 border-l-4 border-purple-500 pl-3 shadow-sm"
											: "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 border-l-4 border-transparent pl-3"
									)}
								>
									{item.title}
								</a>
							))}
							<div className="my-4 h-[1px] bg-neutral-100 w-full" />
							<a
								href="#top"
								onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
								className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-600 transition-colors"
							>
								| Back to top |
							</a>
						</nav>
					</aside>

					<div className="w-full flex-1 flex flex-col gap-24 pb-32">
						<section id="architecture" className="scroll-mt-32">
							<h2 className="text-2xl font-bold mb-6">System Architecture</h2>
							<div className="relative w-full overflow-hidden rounded-2xl border border-neutral-200 shadow-lg bg-white p-1">
								<Image
									src={architectureImage}
									alt="System Architecture"
									className="w-full h-auto object-cover rounded-xl"
									width={1920}
									height={1080}
								/>
							</div>
							<div className="mt-8 text-neutral-600 leading-relaxed">
								{architectureDescription}
							</div>
						</section>

						{sections.map((section) => (
							<section
								key={section.id}
								id={section.id}
								className="scroll-mt-32"
							>
								<h2 className="text-2xl font-bold mb-6">{section.title}</h2>
								<div>{section.content}</div>
							</section>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
