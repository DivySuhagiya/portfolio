/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bot, Copy, ArrowUp, ArrowDown, User, RefreshCcw } from "lucide-react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import remarkGfm from "remark-gfm";

// --- 1. Custom Markdown Components ---
const MarkdownComponents = {
	// --- TABLE STYLING START ---
	table: ({ children }: any) => (
		<div className="my-6 w-full overflow-y-auto rounded-lg border border-neutral-200 shadow-sm">
			<table className="w-full min-w-[300px] border-collapse text-sm">
				{children}
			</table>
		</div>
	),
	thead: ({ children }: any) => (
		<thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-900">
			{children}
		</thead>
	),
	tbody: ({ children }: any) => (
		<tbody className="bg-white divide-y divide-neutral-100">{children}</tbody>
	),
	tr: ({ children }: any) => (
		<tr className="transition-colors hover:bg-neutral-50/50">{children}</tr>
	),
	th: ({ children }: any) => (
		<th className="px-4 py-3 text-left font-semibold text-neutral-900">
			{children}
		</th>
	),
	td: ({ children }: any) => (
		<td className="px-4 py-3 text-neutral-600 align-top">{children}</td>
	),
	// --- TABLE STYLING END ---

	// Style Code Blocks
	code: ({ node, inline, className, children, ...props }: any) => {
		const match = /language-(\w+)/.exec(className || "");
		const content = String(children).replace(/\n$/, "");

		if (!inline) {
			return (
				<div className="relative my-4 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900 text-neutral-50 shadow-sm">
					<div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950/50 px-4 py-2 text-xs text-neutral-400">
						<span className="font-mono">{match?.[1] || "code"}</span>
						<button
							onClick={() => {
								navigator.clipboard.writeText(content);
								toast.success("Code copied!");
							}}
							className="hover:text-white transition-colors"
						>
							<Copy className="h-3 w-3" />
						</button>
					</div>
					<pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed">
						<code className={className} {...props}>
							{children}
						</code>
					</pre>
				</div>
			);
		}
		// Inline code styling
		return (
			<code
				className="rounded-md bg-neutral-200/50 px-1.5 py-0.5 font-mono text-sm font-medium text-neutral-800"
				{...props}
			>
				{children}
			</code>
		);
	},
	// Style Lists
	ul: ({ children }: any) => (
		<ul className="ml-5 list-disc space-y-1 py-2 text-neutral-600 marker:text-neutral-400">
			{children}
		</ul>
	),
	ol: ({ children }: any) => (
		<ol className="ml-5 list-decimal space-y-1 py-2 text-neutral-600 marker:text-neutral-400">
			{children}
		</ol>
	),
	// Style Headings
	h1: ({ children }: any) => (
		<h1 className="mb-4 mt-6 text-2xl font-bold tracking-tight text-neutral-900">
			{children}
		</h1>
	),
	h2: ({ children }: any) => (
		<h2 className="mb-3 mt-5 text-xl font-bold tracking-tight text-neutral-900">
			{children}
		</h2>
	),
	h3: ({ children }: any) => (
		<h3 className="mb-2 mt-4 text-lg font-semibold text-neutral-900">
			{children}
		</h3>
	),
	// Style Paragraphs
	p: ({ children }: any) => (
		<p className="mb-4 leading-7 text-neutral-700 last:mb-0">{children}</p>
	),
	// Style Links
	a: ({ href, children }: any) => (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900 transition-all"
		>
			{children}
		</a>
	),
};

// --- 2. Refined Input Component ---
function AiInput({
	value,
	onChange,
	onSubmit,
	onKeyDown,
	isLoading,
}: {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onSubmit: () => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	isLoading: boolean;
}) {
	const { textareaRef, adjustHeight } = useAutoResizeTextarea({
		minHeight: 52,
		maxHeight: 200,
	});

	return (
		<div className="relative flex w-full items-end gap-2 rounded-3xl border bg-background p-2 shadow-sm ring-offset-background transition-shadow focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
			<Textarea
				ref={textareaRef}
				placeholder="Ask anything..."
				className="min-h-[52px] w-full resize-none border-0 bg-transparent px-4 py-3 text-base shadow-none focus-visible:ring-0 placeholder:text-muted-foreground"
				value={value}
				onKeyDown={onKeyDown}
				onChange={(e) => {
					onChange(e);
					adjustHeight();
				}}
			/>
			<button
				onClick={onSubmit}
				disabled={!value.trim() || isLoading}
				className={cn(
					"flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all",
					value.trim() && !isLoading
						? "bg-primary text-primary-foreground hover:bg-primary/90"
						: "bg-muted text-muted-foreground cursor-not-allowed"
				)}
			>
				<ArrowUp className="h-5 w-5" />
			</button>
		</div>
	);
}

// --- 3. Main Chat Component ---
export default function ModernChatbot() {
	const [responseTimes, setResponseTimes] = useState<Record<string, number>>(
		{}
	);
	const [input, setInput] = useState("");
	const [showScrollButton, setShowScrollButton] = useState(false);
	const startTimeRef = useRef<number>(0);
	const scrollRef = useRef<HTMLDivElement>(null);

	const transport = useMemo(
		() =>
			new DefaultChatTransport({
				api: "/api/chat",
			}),
		[]
	);

	const { messages, status, error, sendMessage, stop } = useChat({
		transport,
		onFinish: ({ message }) => {
			const duration = (Date.now() - startTimeRef.current) / 1000;
			setResponseTimes((prev) => ({ ...prev, [message.id]: duration }));
		},
	});

	const isLoading = status === "submitted" || status === "streaming";

	// --- NEW: Scroll Handler to toggle button visibility ---
	const handleScroll = () => {
		if (scrollRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
			const isUserScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
			setShowScrollButton(isUserScrolledUp);
		}
	};

	// --- NEW: Manual Scroll to Bottom Function ---
	const scrollToBottom = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: "smooth",
			});
			setShowScrollButton(false);
		}
	};

	// Auto-scroll logic (Smart)
	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer) {
			const isUserAtBottom =
				scrollContainer.scrollHeight -
					scrollContainer.scrollTop -
					scrollContainer.clientHeight <
				100;

			if (isUserAtBottom) {
				scrollContainer.scrollTop = scrollContainer.scrollHeight;
			}
		}
	}, [messages]);

	// Force scroll on new message (User sent)
	useEffect(() => {
		if (scrollRef.current) {
			if (messages.length > 0) {
				const lastMessage = messages[messages.length - 1];
				if (lastMessage.role === "user") {
					scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
				}
			}
		}
	}, [messages.length]);

	const handleSubmit = useCallback(
		(e?: React.FormEvent) => {
			e?.preventDefault();
			if (!input.trim()) return;
			startTimeRef.current = Date.now();
			sendMessage({ parts: [{ type: "text", text: input.trim() }] });
			setInput("");
			setShowScrollButton(false);
		},
		[input, sendMessage]
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (event.key === "Enter" && !event.shiftKey) {
				event.preventDefault();
				handleSubmit();
			}
		},
		[handleSubmit]
	);

	return (
		<div className="relative flex h-[100dvh] w-full flex-col bg-[#FDFCFB] text-neutral-900 font-sans selection:bg-yellow-200 selection:text-neutral-900">
			<div
				className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-multiply"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
				}}
			></div>

			{/* Subtle Gradient Mesh */}
			<div className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-purple-50/50 to-transparent opacity-60 z-0" />

			{/* --- HEADER --- */}
			<header className="sticky top-0 z-20 flex h-16 items-center justify-center border-b border-neutral-100 bg-[#FDFCFB]/80 backdrop-blur-md">
				<div className="flex items-center gap-2 rounded-full border border-neutral-200/50 bg-white/50 px-3 py-1.5 text-sm font-medium text-neutral-600 shadow-sm">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
					</span>
					Divy's Digital Twin
				</div>
			</header>

			{/* Messages Area */}
			<div
				ref={scrollRef}
				onScroll={handleScroll}
				className="flex-1 overflow-y-auto p-4 scroll-smooth"
			>
				<div className="mx-auto flex max-w-3xl flex-col gap-6 pb-24">
					{messages.length === 0 ? (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className="mt-[10vh] flex flex-col items-center text-center"
						>
							<div className="mb-6 rounded-full border border-neutral-100 bg-white p-4 shadow-sm">
								<img
									src="/assets/robo.svg"
									alt="AI"
									className="h-16 w-16 opacity-80"
								/>
							</div>
							<h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
								How can I help you?
							</h2>
							<p className="mt-2 text-neutral-500">
								I can explain Divy's projects, skills, or background.
							</p>
						</motion.div>
					) : (
						messages.map((m) => (
							<div
								key={m.id}
								className={cn(
									"flex w-full gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
									m.role === "user" ? "justify-end" : "justify-start"
								)}
							>
								{/* Avatar for AI only */}
								{m.role !== "user" && (
									<div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm sm:flex">
										<Bot className="h-5 w-5 text-primary" />
									</div>
								)}

								{/* Message Bubble */}
								<div
									className={cn(
										"relative max-w-[85%] rounded-3xl px-5 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[75%]",
										m.role === "user"
											? "bg-primary text-primary-foreground rounded-tr-sm"
											: "bg-background border text-foreground rounded-tl-sm"
									)}
								>
									<div
										className={cn(
											"markdown-container",
											m.role === "user" && "font-medium"
										)}
									>
										{m.parts.map((part, i) =>
											part.type === "text" ? (
												m.role === "user" ? (
													<p key={i} className="whitespace-pre-wrap">
														{part.text}
													</p>
												) : (
													<ReactMarkdown
														key={i}
														remarkPlugins={[remarkGfm]}
														components={MarkdownComponents}
													>
														{part.text}
													</ReactMarkdown>
												)
											) : null
										)}
									</div>

									{/* Actions / Meta for AI */}
									{m.role !== "user" && (
										<div className="mt-2 flex items-center gap-3 opacity-0 transition-opacity group-hover:opacity-100 peer-hover:opacity-100 hover:opacity-100">
											<button
												onClick={() => {
													const text = m.parts
														.filter((p) => p.type === "text")
														.map((p) => p.text)
														.join("");
													navigator.clipboard.writeText(text);
													toast.success("Copied response");
												}}
												className="text-muted-foreground hover:text-foreground"
												title="Copy full response"
											>
												<Copy className="h-3.5 w-3.5" />
											</button>
											{responseTimes[m.id] && (
												<span className="text-[10px] text-muted-foreground">
													{responseTimes[m.id].toFixed(2)}s
												</span>
											)}
										</div>
									)}
								</div>

								{/* Avatar for User only */}
								{m.role === "user" && (
									<div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 sm:flex">
										<User className="h-5 w-5 text-primary" />
									</div>
								)}
							</div>
						))
					)}

					{/* Loading Indicator */}
					{isLoading && (
						<div className="flex w-full gap-4">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white">
								<Bot className="h-4 w-4 text-neutral-400 animate-pulse" />
							</div>
							<div className="flex items-center gap-1.5 rounded-[1.5rem] rounded-tl-md border border-neutral-100 bg-white px-5 py-4 shadow-sm">
								<span className="h-2 w-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 animate-bounce [animation-delay:-0.3s]" />
								<span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-bounce [animation-delay:-0.15s]" />
								<span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce" />
							</div>
						</div>
					)}

					{error && (
						<div className="mx-auto flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
							<span className="font-semibold">Error:</span> Something went
							wrong.
						</div>
					)}
				</div>
			</div>

			{/* Input Area - Sticky Bottom */}
			<div className="sticky bottom-0 z-10 w-full bg-gradient-to-t from-background via-background/95 to-transparent pb-6 pt-2">
				<div className="mx-auto max-w-3xl px-4 relative">
					{/* --- NEW: Scroll To Bottom Button --- */}
					<AnimatePresence>
						{showScrollButton && (
							<motion.button
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								onClick={scrollToBottom}
								className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md hover:bg-neutral-50"
							>
								<ArrowDown className="h-4 w-4 text-neutral-600" />
							</motion.button>
						)}
					</AnimatePresence>

					{messages.length > 0 && (
						<button
							onClick={() => stop()}
							className={cn(
								"mb-2 mx-auto flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-sm hover:bg-muted transition-all",
								!isLoading && "hidden"
							)}
						>
							<div className="h-2 w-2 bg-primary animate-pulse rounded-full" />
							Stop generating
						</button>
					)}
					<AiInput
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onSubmit={handleSubmit}
						onKeyDown={handleKeyDown}
						isLoading={isLoading}
					/>
					<p className="mt-2 text-center text-xs text-muted-foreground">
						Divy's Digital Twin can make mistakes.
					</p>
				</div>
			</div>
		</div>
	);
}
