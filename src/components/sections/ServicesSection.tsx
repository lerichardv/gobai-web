'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/all';
import { RiRobot2Line, RiGovernmentLine, RiNewspaperLine } from '@remixicon/react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
	const t = useTranslations('Services');
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const servicesRef = useRef<HTMLDivElement>(null);
	const backgroundRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Background animation
			gsap.set(backgroundRef.current, {
				background: 'linear-gradient(135deg, var(--color-gobai-gray-lighten) 0%, #f8fafc 30%, var(--color-gobai-gray-light) 70%, #ffffff 100%)',
				backgroundSize: '400% 400%',
			});



			// Set initial state for service cards
			gsap.set('.service-card', {
				y: 80,
				opacity: 0,
			});

			// Scroll-triggered animations with enhanced effects
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top 70%', // Start earlier for better visibility
					end: 'bottom 20%',
					toggleActions: 'play reverse play reverse',
				}
			});

			tl.from(titleRef.current, {
				y: 150,
				opacity: 0,
				scale: 0.8,
				rotationX: -15,
				duration: 1.4,
				ease: 'power4.out',
			})
				.from(subtitleRef.current, {
					y: 80,
					opacity: 0,
					filter: 'blur(10px)',
					duration: 1.2,
					ease: 'power3.out',
				}, '-=0.9')
				.to('.service-card', {
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'back.out(1.2)',
					stagger: 0.2,
				}, '-=0.7');

		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const services = [
		{
			title: t('service1Title'),
			description: t('service1Desc'),
			icon: <RiRobot2Line size="30px" />,
			gradient: 'linear-gradient(135deg, var(--color-gobai-cyan-dark) 0%, var(--color-gobai-turquoise) 100%)',
			image: '/api/placeholder/400/300'
		},
		{
			title: t('service2Title'),
			description: t('service2Desc'),
			icon: <RiGovernmentLine size="30px" />,
			gradient: 'linear-gradient(135deg, var(--color-gobai-turquoise-dark) 0%, var(--color-gobai-cyan) 100%)',
			image: '/api/placeholder/400/300'
		},
		{
			title: t('service3Title'),
			description: t('service3Desc'),
			icon: <RiNewspaperLine size="30px" />,
			gradient: 'linear-gradient(135deg, var(--color-gobai-blue-light) 0%, var(--color-gobai-turquoise-light) 100%)',
			image: '/api/placeholder/400/300'
		}
	];

	// Animated phrase letter-by-letter effect with GSAP ScrollTrigger using useGSAP
	const phraseContainerRef = useRef<HTMLDivElement>(null);
	const phrase = t('phrase');

	useGSAP(() => {
		const letters = gsap.utils.toArray('.phrase-char');

		// Pin the container for 500px
		ScrollTrigger.create({
			trigger: "#animated-phrase-container",
			pin: true,
			start: "center center",
			end: "+=500",
			scrub: true,
		});

		// Animate letters
		gsap.fromTo(letters, {
			y: 20,
			opacity: 0,
			scale: 2
		}, {
			y: 0,
			opacity: 1,
			scale: 1,
			duration: 0.8,
			ease: "power2.out",
			stagger: 0.03,
			scrollTrigger: {
				trigger: "#animated-phrase-container",
				start: "top 40%",
			}
		});

	}, { scope: sectionRef });

	return (
		<section
			id="services-section"
			ref={sectionRef}
			className="relative py-20 overflow-hidden pb-[150px] bg-white"
		>
			{/* Animated Background */}
			<div
				ref={backgroundRef}
				className="absolute inset-0 opacity-95 animate-gradient"
				style={{
					background: 'linear-gradient(135deg, var(--color-gobai-gray-lighten) 0%, #f8fafc 30%, var(--color-gobai-gray-light) 70%, #ffffff 100%)',
				}}
			/>

			{/* Floating Background Elements */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Parallax elements around the phrase area */}
				<div className="absolute top-[15%] left-[10%]">
					<svg width="40" height="40" viewBox="0 0 40 40" style={{ animation: 'rotate-slow 15s linear infinite, float-slow 8s ease-in-out infinite' }}>
						<rect x="10" y="10" width="20" height="20" fill="none" stroke="var(--color-gobai-cyan)" strokeWidth="1" opacity="0.5" />
					</svg>
				</div>
				<div className="absolute top-[20%] right-[15%]">
					<svg width="60" height="60" viewBox="0 0 60 60" style={{ animation: 'pulse-scale 4s ease-in-out infinite, float-medium 10s ease-in-out infinite' }}>
						<circle cx="30" cy="30" r="15" fill="var(--color-gobai-turquoise)" opacity="0.4" />
					</svg>
				</div>
				<div className="absolute top-[40%] left-[5%]">
					<svg width="100" height="100" viewBox="0 0 100 100" style={{ animation: 'float-medium 6s ease-in-out infinite' }}>
						<path d="M50 20 L80 50 L50 80 L20 50 Z" fill="none" stroke="var(--color-gobai-blue-bright)" strokeWidth="1" opacity="0.45" />
					</svg>
				</div>
				<div className="absolute top-[60%] right-[10%]">
					<svg width="80" height="80" viewBox="0 0 80 80" style={{ animation: 'rotate-slow 25s linear infinite reverse, float-slow 12s ease-in-out infinite' }}>
						<circle cx="40" cy="40" r="30" fill="none" stroke="var(--color-gobai-cyan-dark)" strokeWidth="1" opacity="0.4" />
						<circle cx="40" cy="40" r="5" fill="var(--color-gobai-cyan)" opacity="0.5" />
					</svg>
				</div>
				<div className="absolute bottom-[10%] left-[20%]">
					<svg width="50" height="50" viewBox="0 0 50 50" style={{ animation: 'float-slow 5s ease-in-out infinite' }}>
						<rect x="5" y="5" width="40" height="40" rx="8" fill="var(--color-gobai-turquoise-light)" opacity="0.4" />
					</svg>
				</div>

				{/* 10 Additional Parallax Elements */}
				<div className="absolute top-[10%] left-[45%]">
					<div className="w-2 h-2 rounded-full bg-gobai-cyan" style={{ opacity: 0.6, animation: 'pulse-scale 2s infinite, float-fast 4s ease-in-out infinite' }} />
				</div>
				<div className="absolute top-[30%] left-[25%]">
					<svg width="30" height="30" viewBox="0 0 30 30" style={{ animation: 'rotate-slow 10s linear infinite, float-medium 7s ease-in-out infinite' }}>
						<path d="M15 2 L28 15 L15 28 L2 15 Z" fill="none" stroke="var(--color-gobai-blue-bright)" strokeWidth="1" opacity="0.5" />
					</svg>
				</div>
				<div className="absolute top-[50%] right-[35%]">
					<div className="w-1.5 h-1.5 rounded-full bg-gobai-turquoise" style={{ opacity: 0.7, animation: 'pulse-scale 3s infinite 0.5s, float-slow 9s ease-in-out infinite' }} />
				</div>
				<div className="absolute bottom-[25%] right-[20%]">
					<svg width="120" height="120" viewBox="0 0 120 120" style={{ animation: 'float-medium 8s ease-in-out infinite' }}>
						<circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-gobai-cyan-light)" strokeWidth="0.5" opacity="0.4" />
					</svg>
				</div>
				<div className="absolute top-[70%] left-[15%]">
					<div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gobai-cyan/60 to-transparent" style={{ animation: 'rotate-slow 40s linear infinite, float-slow 15s ease-in-out infinite' }} />
				</div>
				<div className="absolute top-[45%] left-[80%]">
					<svg width="40" height="40" viewBox="0 0 40 40" style={{ animation: 'pulse-scale 5s ease-in-out infinite 1s, float-medium 6s ease-in-out infinite' }}>
						<rect x="10" y="10" width="20" height="20" rx="4" fill="var(--color-gobai-blue-light)" opacity="0.45" />
					</svg>
				</div>
				<div className="absolute bottom-[15%] right-[45%]">
					<div className="w-3 h-3 rounded-full bg-gobai-cyan/60 blur-[2px]" style={{ animation: 'float-fast 3s ease-in-out infinite' }} />
				</div>
				<div className="absolute top-[85%] right-[5%]">
					<svg width="50" height="50" viewBox="0 0 50 50" style={{ animation: 'rotate-slow 20s linear infinite, float-slow 11s ease-in-out infinite' }}>
						<circle cx="25" cy="25" r="20" fill="none" stroke="var(--color-gobai-turquoise)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
					</svg>
				</div>
				<div className="absolute top-[5%] right-[30%]">
					<div className="w-1 h-1 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" style={{ animation: 'float-fast 5s ease-in-out infinite' }} />
				</div>
				<div className="absolute bottom-[40%] left-[40%]">
					<svg width="70" height="70" viewBox="0 0 70 70" style={{ animation: 'float-slow 7s ease-in-out infinite' }}>
						<path d="M35 10 L60 50 L10 50 Z" fill="none" stroke="var(--color-gobai-cyan)" strokeWidth="0.5" opacity="0.4" />
					</svg>
				</div>

				<div className="floating-service-element absolute top-20 left-16" style={{ animation: 'float-slow 5s ease-in-out infinite', opacity: 1 }}>
					<svg width="80" height="80" viewBox="0 0 80 80" style={{ animation: 'rotate-slow 30s linear infinite' }}>
						<path d="M40 10 L65 25 L65 50 L40 65 L15 50 L15 25 Z" fill="none" stroke="var(--color-gobai-cyan)" strokeWidth="2" opacity="0.7" />
						<path d="M40 20 L55 30 L55 45 L40 55 L25 45 L25 30 Z" fill="var(--color-gobai-cyan-light)" opacity="0.6" />
					</svg>
				</div>

				<div className="floating-service-element absolute top-40 right-20" style={{ animation: 'float-medium 4.5s ease-in-out infinite 0.8s', opacity: 1 }}>
					<svg width="60" height="60" viewBox="0 0 60 60" style={{ animation: 'pulse-scale 3s ease-in-out infinite' }}>
						<circle cx="30" cy="30" r="25" fill="none" stroke="var(--color-gobai-turquoise)" strokeWidth="2" opacity="0.8" />
						<circle cx="30" cy="30" r="15" fill="var(--color-gobai-turquoise-light)" opacity="0.7" />
						<circle cx="30" cy="30" r="8" fill="var(--color-gobai-turquoise)" opacity="0.9" />
					</svg>
				</div>

				<div className="floating-service-element absolute bottom-32 left-24" style={{ animation: 'float-fast 4s ease-in-out infinite 1.6s', opacity: 1 }}>
					<svg width="70" height="70" viewBox="0 0 70 70" style={{ animation: 'rotate-slow 25s linear infinite' }}>
						<rect x="10" y="10" width="50" height="50" rx="12" fill="none" stroke="var(--color-gobai-blue-bright)" strokeWidth="2" opacity="0.7" />
						<rect x="20" y="20" width="30" height="30" rx="6" fill="var(--color-gobai-blue-lighten)" opacity="0.6" />
					</svg>
				</div>

				<div className="floating-service-element absolute bottom-20 right-32" style={{ animation: 'float-slow 5.5s ease-in-out infinite 2.4s', opacity: 1 }}>
					<svg width="90" height="90" viewBox="0 0 90 90" style={{ animation: 'pulse-scale 3.5s ease-in-out infinite' }}>
						<polygon points="45,10 75,30 75,60 45,80 15,60 15,30" fill="none" stroke="var(--color-gobai-cyan-dark)" strokeWidth="2" opacity="0.7" />
						<polygon points="45,25 60,35 60,55 45,65 30,55 30,35" fill="var(--color-gobai-cyan)" opacity="0.6" />
					</svg>
				</div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
				{/* Animated Phrase Area */}
				<div id="animated-phrase-container" className="w-full h-[80vh] flex items-center justify-center mb-10 relative">
					<h1
						id="animated-phrase"
						className="w-full text-center text-4xl md:text-6xl lg:text-8xl font-extrabold text-gray-900 tracking-tight break-words"
						style={{
							filter: 'drop-shadow(0 0 40px rgba(31, 98, 170, 0.4)) drop-shadow(0 0 80px rgba(99, 150, 252, 0.3)) drop-shadow(0 10px 60px rgba(179, 208, 255, 0.2))',
						}}
					>
						<span id="animated-phrase-text" className="inline-block " ref={phraseContainerRef}>
							{phrase.split(" ").map((word, wordIndex, array) => (
								<span key={`word-${wordIndex}`}>
									<span className="inline-block whitespace-nowrap">
										{word.split("").map((char, charIndex) => (
											<span key={`char-${wordIndex}-${charIndex}`} className="inline-block phrase-char opacity-0 -translate-y-[20px] text-gobai-blue-dark">
												{char}
											</span>
										))}
									</span>
									{wordIndex !== array.length - 1 && " "}
								</span>
							))}
						</span>
					</h1>
				</div>
				{/* Section Header */}
				<div className="text-center mb-20">
					<h2
						ref={titleRef}
						className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-800 mb-8 leading-tight"
						style={{
							background: 'linear-gradient(135deg, var(--color-gobai-blue-dark), var(--color-gobai-cyan-dark), var(--color-gobai-turquoise-dark))',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							textShadow: '0 0 40px rgba(179, 232, 255, 0.3)',
						}}
					>
						{t('title')}
					</h2>

					<p
						ref={subtitleRef}
						className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light"
						style={{
							textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
						}}
					>
						{t('subtitle')}
					</p>
				</div>

				{/* Services Grid */}
				<div ref={servicesRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
					{services.map((service, index) => (
						<div
							key={index}
							className="service-card group relative rounded-3xl overflow-hidden backdrop-blur-lg hover:scale-105 hover:shadow-2xl"
							style={{
								background: 'rgba(255, 255, 255, 0.9)',
								boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
							}}
						>
							{/* Card Background Gradient */}
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
								style={{ background: service.gradient }}
							/>

							{/* Card Content */}
							<div className="relative p-8">
								{/* Service Icon */}
								<div className="mb-6">
									<div
										className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
										style={{
											background: service.gradient,
											boxShadow: '0 10px 30px rgba(31, 170, 163, 0.3)',
										}}
									>
										<div className="text-white" style={{ fontSize: '3.5rem' }}>
											{service.icon}
										</div>
									</div>
								</div>

								{/* Service Title */}
								<h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">
									{service.title}
								</h3>

								{/* Service Description */}
								<p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
									{service.description}
								</p>

								{/* CTA Button */}
								<button
									className="group/btn relative px-6 py-3 bg-white/80 hover:bg-white text-gray-800 font-semibold rounded-full transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
									style={{
										backdropFilter: 'blur(10px)',
									}}
								>
									<span className="relative z-10 flex items-center gap-2">
										{t('seeMore')}
										<svg
											className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</span>

									{/* Button hover effect */}
									<div
										className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
										style={{ background: service.gradient }}
									/>
								</button>

								{/* Decorative elements */}
								<div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
									<svg width="40" height="40" viewBox="0 0 40 40">
										<circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
										<circle cx="20" cy="20" r="8" fill="currentColor" opacity="0.3" />
									</svg>
								</div>
							</div>

							{/* Card border glow effect */}
							<div
								className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
								style={{
									background: `linear-gradient(135deg, transparent 0%, ${service.gradient.split('var(--color-gobai-')[1]?.split(')')[0] ? 'rgba(31, 170, 163, 0.2)' : 'rgba(179, 232, 255, 0.2)'} 50%, transparent 100%)`,
									padding: '2px',
									WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
									WebkitMaskComposite: 'exclude',
								}}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Bottom fade */}
			<div
				className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
				style={{
					background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)',
				}}
			/>
		</section>
	);
}