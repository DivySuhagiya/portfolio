/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import ProjectLayout, {
	ProjectSection,
} from "@/components/portfolio/ProjectLayout";
import { Box, Zap, MousePointer2, Palette, Move3d } from "lucide-react";

export default function NimbusPage() {
	const sections: ProjectSection[] = [
		{
			id: "cinematic",
			title: "Cinematic Scroll Experience",
			content: (
				<div className="space-y-6">
					<p className="text-neutral-600 leading-relaxed">
						The hero section features a sophisticated{" "}
						<strong>GSAP ScrollTrigger</strong> animation. As the user scrolls,
						the keyboard assembles itself: the chassis positions itself, and the
						keycaps float down in a wave-like motion, synchronized with the
						user&apos;s scroll depth.
					</p>

					<div className="rounded-2xl border border-neutral-200 bg-neutral-900 p-6 text-white shadow-sm">
						<h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-purple-300">
							<Move3d size={20} /> Animation Logic
						</h3>
						<pre className="text-xs font-mono text-neutral-300 overflow-x-auto p-2 bg-black/30 rounded">
							{`// Wave Animation Logic
const waveProgress = columnIndex / (columns.length - 1);
const waveStartTime = waveProgress * 2 + 0.5;

scrollTimeline.to(keycapPositions, {
  y: "+=0.08", // Lift keycaps up
  duration: 0.5,
  ease: "power2.inOut",
}, waveStartTime);`}
						</pre>
						<p className="text-sm text-neutral-400 mt-4">
							Each column of keycaps is calculated dynamically and animated with
							a slight delay to create a fluid "wave" effect across the
							keyboard.
						</p>
					</div>
				</div>
			),
		},
		{
			id: "playground",
			title: "Interactive Switch Playground",
			content: (
				<div className="space-y-6">
					<p className="text-neutral-600 leading-relaxed">
						I built a dedicated section for users to "feel" the switches. Each
						switch type (Blue, Red, Brown, Black) renders in its own isolated{" "}
						<code>Canvas</code>. Clicking a switch triggers a GSAP animation and
						plays a unique audio sample recorded from real mechanical switches.
					</p>
					<div className="grid md:grid-cols-2 gap-4">
						<FeatureItem
							icon={MousePointer2}
							title="Haptic Audio"
							text="Uses the Web Audio API to play distinct 'click' and 'clack' sounds randomized for realism."
						/>
						<FeatureItem
							icon={Box}
							title="Isolated Rendering"
							text="Each switch lives in a separate React Three Fiber stage with its own lighting environment."
						/>
					</div>
				</div>
			),
		},
		{
			id: "customization",
			title: "Real-Time Theme Customization",
			content: (
				<div className="space-y-6">
					<p className="text-neutral-600 leading-relaxed">
						The Theme Changer allows users to swap keycap materials instantly. I
						used <code>useTexture</code> from <strong>@react-three/drei</strong>{" "}
						to preload textures and mapped them to the 3D model's UVs.
					</p>
					<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
						<div className="flex items-center gap-4 mb-4">
							<div className="h-16 w-16 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 shadow-inner"></div>
							<div>
								<h4 className="font-semibold">Texture State Management</h4>
								<p className="text-sm text-neutral-500">
									React state drives the texture prop updates.
								</p>
							</div>
						</div>
						<p className="text-sm text-neutral-600">
							When a user selects a texture, the app transitions the state
							`isAnimating` to prevent spam-clicking, updates the
							`selectedTexture` ID, and seamlessly re-renders the material on
							the active scene.
						</p>
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
						icon={Zap}
						title="Performance Optimized"
						text="Assets are compressed and lighting is baked where possible to ensure 60FPS scrolling."
					/>
					<FeatureItem
						icon={Palette}
						title="Dynamic Textures"
						text="Real-time material swapping without reloading the 3D model."
					/>
					<FeatureItem
						icon={Move3d}
						title="Custom Camera Controller"
						text="A custom-written camera rig that adds subtle parallax tilt based on mouse movement."
					/>
					<FeatureItem
						icon={Box}
						title="GSAP Integration"
						text="Deep integration between DOM scroll events and Three.js scene properties."
					/>
				</div>
			),
		},
	];

	return (
		<ProjectLayout
			title="Nimbus"
			tagline="A cinematic 3D product showcase for a custom mechanical keyboard."
			tech={[
				"React Three Fiber",
				"GSAP ScrollTrigger",
				"Next.js",
				"Tailwind CSS",
				"Web Audio API",
			]}
			// ✅ Added your links
			githubLink="https://github.com/DivySuhagiya/nimbus"
			demoLink="https://nimbus-gilt.vercel.app/"
			architectureImage="/images/nimbus_diagram.png"
			architectureDescription={
				<>
					<p className="mt-4 text-sm text-neutral-500 text-center italic">
						Figure 1: Scene Graph & State Architecture
					</p>
					<p className="mt-6 text-neutral-600 leading-relaxed">
						The application is wrapped in a single <code>Canvas</code> for the
						hero section, while the playground uses multiple smaller canvas
						instances. State is managed via React Context to sync the UI overlay
						(DOM) with the 3D scene (WebGL). The animation loop is powered by
						GSAP's timeline linked to the native window scroll position.
					</p>
				</>
			}
			sections={sections}
		/>
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
