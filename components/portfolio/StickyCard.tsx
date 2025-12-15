"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { StickyCardConstants } from "@/lib/sticky-card-constants";

gsap.registerPlugin(ScrollTrigger);

const StickyCard = () => {
	const container = useRef(null);
	const router = useRouter();

	// useGSAP(
	// 	() => {
	// 		const stickyCards = document.querySelectorAll(".sticky-card");

	// 		stickyCards.forEach((card, idx) => {
	// 			if (idx < stickyCards.length - 1) {
	// 				ScrollTrigger.create({
	// 					trigger: card,
	// 					start: "top top",
	// 					endTrigger: stickyCards[stickyCards.length - 1],
	// 					end: "top top",
	// 					pin: true,
	// 					pinSpacing: false,
	// 				});
	// 			}

	// 			if (idx < stickyCards.length - 1) {
	// 				ScrollTrigger.create({
	// 					trigger: stickyCards[idx + 1],
	// 					start: "top bottom",
	// 					end: "top top",
	// 					onUpdate: (self) => {
	// 						const progress = self.progress;
	// 						const scale = 1 - progress * 0.25;
	// 						const rotation = (idx % 2 === 0 ? 1 : -1) * progress * 5;
	// 						const afterOpacity = progress;

	// 						gsap.set(card, {
	// 							scale: scale,
	// 							rotation: rotation,
	// 							"--after-opacity": afterOpacity,
	// 						});
	// 					},
	// 				});
	// 			}
	// 		});
	// 	},
	// 	{ scope: container }
	// );

	//glass effect
	useGSAP(
		() => {
			const stickyCards = document.querySelectorAll(".sticky-card");

			stickyCards.forEach((card, idx) => {
				if (idx < stickyCards.length - 1) {
					ScrollTrigger.create({
						trigger: card,
						start: "top top",
						endTrigger: stickyCards[stickyCards.length - 1],
						end: "top top",
						pin: true,
						pinSpacing: false,
					});
				}

				if (idx < stickyCards.length - 1) {
					ScrollTrigger.create({
						trigger: stickyCards[idx + 1],
						start: "top bottom",
						end: "top top",
						onUpdate: (self) => {
							const progress = self.progress;
							const blur = progress * 10;
							const opacity = 1 - progress;

							gsap.set(card, {
								filter: `blur(${blur}px)`,
								opacity: opacity,
							});
						},
					});
				}
			});
		},
		{ scope: container }
	);

	return (
		<div className="relative h-full w-full " ref={container}>
			{StickyCardConstants.map((cardData, idx) => (
				<div
					className="sticky-card relative flex h-[100svh] w-full flex-col gap-0 bg-[var(--fg)] p-[1.5rem] text-[var(--bg)] will-change-transform after:pointer-events-none after:absolute after:top-0 after:left-0 after:z-2 after:h-full after:w-full after:bg-[rgba(0,0,0,0.5)] after:opacity-[var(--after-opacity,0)] after:transition-opacity after:duration-[0.1s] after:ease-in-out after:content-[''] lg:flex-row lg:gap-[3rem]"
					key={idx}
				>
					<div className="sticky-card-index flex-1 lg:flex-2">
						<h1 className="text-[4rem] md:text-[7rem] font-extrabold tracking-[-0.35rem] leading-[1.1]">
							{cardData.index}
						</h1>
					</div>
					<div className="sticky-card-content flex-4 md:pt-[1.5rem]">
						<div className="sticky-card-content-wrapper flex w-full flex-col gap-[1.5rem] lg:w-9/12">
							<h1 className="sticky-card-header text-[4rem] md:text-[5rem] font-extrabold tracking-[-0.35rem] leading-[1.1] w-9/12">
								{cardData.title}
							</h1>

							<div className="sticky-card-image">
								<img className="w-full h-full" src={cardData.image} alt="" />
							</div>

							<div className="sticky-card-copy flex-1 flex-col gap-[0.5rem] lg:flex-row lg:gap-[1.5rem]">
								<div className="sticky-card-copy-title flex-2">
									<div className="sticky-card-copy-description flex-4">
										<p className="text-[1rem] md:text-[1.125rem] font-medium">
											{cardData.description}
										</p>
										<Button
											onClick={() => router.push(cardData.link)}
											className="mt-6 cursor-pointer"
										>
											Read More
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default StickyCard;
