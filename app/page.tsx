"use client";

import {
	motion,
	useMotionValue,
	useMotionTemplate,
	animate,
} from "framer-motion";
import {
	ArrowRight,
	MessageCircle,
	ExternalLink,
	Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const COLORS_BOTTOM = ["#DD335C", "#CE84CF", "#1E67C6", "#13FFAA"];

export default function Home() {
	const router = useRouter();
	const [isHovering, setIsHovering] = useState(false);

	// 1. Dynamic Color Logic
	const colorTop = useMotionValue(COLORS_TOP[0]);
	const colorBottom = useMotionValue(COLORS_BOTTOM[0]);

	useEffect(() => {
		animate(colorTop, COLORS_TOP, {
			ease: "easeInOut",
			duration: 10,
			repeat: Infinity,
			repeatType: "mirror",
		});
		animate(colorBottom, COLORS_BOTTOM, {
			ease: "easeInOut",
			duration: 10,
			repeat: Infinity,
			repeatType: "mirror",
		});
	}, []);

	const backgroundImageTop = useMotionTemplate`linear-gradient(to bottom right, ${colorTop}, transparent)`;
	const backgroundImageBottom = useMotionTemplate`linear-gradient(to top left, ${colorBottom}, transparent)`;

	const handleStart = () => {
		router.push("/chat");
	};

	const handleStandardPortfolio = () => {
		router.push("/home");
	};

	return (
		<section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#FDFCFB] px-4 text-neutral-900 selection:bg-yellow-200">
			{/* --- BACKGROUND: Shifting Blobs --- */}
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				{/* Grain Texture */}
				<div
					className="absolute inset-0 z-20 opacity-[0.03] mix-blend-multiply"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
					}}
				></div>

				{/* Blob 1 (Top Left) */}
				<motion.div
					style={{ backgroundImage: backgroundImageTop }}
					animate={{
						x: [0, 50, -30, 0],
						y: [0, -30, 50, 0],
						scale: [1, 1.1, 0.9, 1],
					}}
					transition={{
						duration: 15,
						repeat: Infinity,
						repeatType: "mirror",
						ease: "easeInOut",
					}}
					className="absolute -left-[15%] -top-[15%] h-[35rem] w-[35rem] rounded-full opacity-30 blur-[80px]"
				/>

				{/* Blob 2 (Bottom Right) */}
				<motion.div
					style={{ backgroundImage: backgroundImageBottom }}
					animate={{
						x: [0, -50, 30, 0],
						y: [0, 30, -50, 0],
						scale: [1, 1.2, 0.9, 1],
					}}
					transition={{
						duration: 18,
						repeat: Infinity,
						repeatType: "mirror",
						ease: "easeInOut",
						delay: 2,
					}}
					className="absolute -right-[15%] -bottom-[15%] h-[40rem] w-[40rem] rounded-full opacity-30 blur-[90px]"
				/>
			</div>

			{/* --- FOREGROUND CONTENT --- */}
			<div className="relative z-10 flex flex-col items-center text-center">
				{/* Avatar Pill */}
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6 }}
					className="mb-8 flex items-center gap-3 rounded-full border border-neutral-200/60 bg-white/80 px-2 py-2 pr-5 shadow-sm backdrop-blur-md"
				>
					<img
						src="https://i.postimg.cc/j5dW4vFd/Mvpblocks.webp"
						alt="Divy"
						className="h-10 w-10 rounded-full object-cover border border-white"
					/>
					<span className="text-sm font-medium text-neutral-600">
						Divy's Digital Twin
					</span>
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
					</span>
				</motion.div>

				{/* Headlines */}
				<h1 className="max-w-5xl text-5xl font-bold leading-[1.15] tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
					Crafting
					<span className="font-serif italic font-normal text-neutral-400 px-3">
						digital
					</span>
					<br />
					<span className="relative inline-block px-2">
						<span className="relative z-10">experiences</span>
						{/* Highlighter */}
						<motion.span
							initial={{ width: "0%" }}
							animate={{ width: "100%" }}
							transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
							className="absolute bottom-2 left-0 h-[0.4em] w-full origin-left -rotate-1 rounded-sm bg-yellow-300 opacity-80 mix-blend-multiply -z-10"
						/>
					</span>{" "}
					that matter.
				</h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className="mt-8 max-w-xl text-lg text-neutral-500 leading-relaxed"
				>
					This isn't a search engine; it's a memory. I uploaded my{" "}
					<span className="font-semibold text-neutral-800">
						professional DNA
					</span>{" "}
					into this AI's core context, so it knows my work as well as I do.
				</motion.p>

				{/* Buttons Area */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1 }}
					className="mt-14 flex flex-col items-center gap-6"
				>
					{/* Wrapper for the button and the floating badge */}
					<div className="relative group">
						{/* --- UNIQUE BADGE ON TOP --- */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2, type: "spring" }}
							className="absolute -top-5 left-1/2 -translate-x-1/2"
						>
							<div className="relative flex items-center gap-1 whitespace-nowrap rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
								<Sparkles className="h-2.5 w-2.5 text-yellow-500 fill-yellow-500" />
								<span>Chat with</span>
								{/* Little triangle to make it look like a speech bubble */}
								<div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-neutral-200 bg-white"></div>
							</div>
						</motion.div>

						{/* Primary CTA */}
						<button
							onClick={handleStart}
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
							className="mt-2 group relative isolate flex items-center justify-center rounded-full outline-none transition-transform active:scale-95"
						>
							{/* 1. The Glowing Aura (Behind) */}
							<div
								className={cn(
									"absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40 blur transition-all duration-500 group-hover:opacity-75 group-hover:blur-md",
									isHovering ? "inset-[-2px]" : ""
								)}
							/>

							{/* 2. The Main Button Body */}
							<div className="relative flex items-center gap-3 overflow-hidden rounded-full bg-neutral-950 px-10 py-5 text-white ring-1 ring-white/10 transition-all duration-300 group-hover:bg-neutral-900">
								{/* 3. The "Shine" Swipe Effect */}
								<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

								{/* Icon */}
								<MessageCircle
									className={cn(
										"relative z-10 h-5 w-5 transition-all duration-300",
										isHovering
											? "rotate-12 -translate-y-0.5 text-purple-300"
											: "text-neutral-300"
									)}
								/>

								{/* Text */}
								<span className="relative z-10 font-semibold text-lg tracking-wide">
									Divy's Digital Twin
								</span>

								{/* Arrow */}
								<ArrowRight
									className={cn(
										"relative z-10 h-5 w-5 transition-transform duration-300",
										isHovering
											? "translate-x-1 text-purple-300"
											: "text-neutral-300"
									)}
								/>
							</div>
						</button>
					</div>

					{/* Secondary Option */}
					<div className="flex flex-col items-center gap-2 pt-2">
						<span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
							Prefer the boring way? 👇
						</span>
						<button
							onClick={handleStandardPortfolio}
							className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
						>
							<span>View Standard Portfolio</span>
							<ExternalLink className="h-3 w-3 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
						</button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
