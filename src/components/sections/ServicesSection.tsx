'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/all';
import { RiRobot2Line, RiGovernmentLine, RiNewspaperLine } from '@remixicon/react';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
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

			gsap.to(backgroundRef.current, {
				backgroundPosition: '100% 100%',
				duration: 25,
				ease: 'none',
				repeat: -1,
				yoyo: true,
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
					toggleActions: 'play none none reverse',
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
				}, '-=0.7')
				.from('.floating-service-element', {
					scale: 0,
					rotation: 180,
					opacity: 0,
					duration: 1,
					ease: 'back.out(1.7)',
					stagger: 0.3,
				}, '-=1.5');

		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const services = [
		{
			title: 'Campañas Disruptivas con AI',
			description: 'Segmenta con precisión, analiza personalidad y sentimientos, e impulsa tus resultados con Candidatos Robots. Innovación y IA para optimizar tu estrategia.',
			icon: <RiRobot2Line size="30px" />,
			gradient: 'linear-gradient(135deg, var(--color-gobai-cyan-dark) 0%, var(--color-gobai-turquoise) 100%)',
			image: '/api/placeholder/400/300'
		},
		{
			title: 'Gobiernos y políticas públicas',
			description: 'Gobai revoluciona la participación ciudadana con tecnología digital. Impulsa ciudades inteligentes y crea políticas más efectivas con innovación y datos.',
			icon: <RiGovernmentLine size="30px" />,
			gradient: 'linear-gradient(135deg, var(--color-gobai-turquoise-dark) 0%, var(--color-gobai-cyan) 100%)',
			image: '/api/placeholder/400/300'
		},
		{
			title: 'Crisis de opinión pública',
			description: 'Gestiona crisis con segmentación precisa y análisis de riesgo en tiempo real. Responde con estrategia e inteligencia para proteger tu reputación con IA.',
			icon: <RiNewspaperLine size="30px" />,
			gradient: 'linear-gradient(135deg, var(--color-gobai-blue-light) 0%, var(--color-gobai-turquoise-light) 100%)',
			image: '/api/placeholder/400/300'
		}
	];

	// Animated phrase letter-by-letter effect with GSAP ScrollTrigger using useGSAP
	const phraseContainerRef = useRef<HTMLDivElement>(null);
	const phrase = "Innovación que transforma el futuro de tu negocio";

	useGSAP(() => {
		const letters = gsap.utils.toArray(phraseContainerRef?.current?.children || []);

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
				trigger: phraseContainerRef.current,
				start: "top 80%"
			}
		});

	});

	return (
		<section
			ref={sectionRef}
			className="relative py-20 overflow-hidden pb-[150px] bg-white"
		>
			{/* Animated Background */}
			<div
				ref={backgroundRef}
				className="absolute inset-0 opacity-95"
				style={{
					background: 'linear-gradient(135deg, var(--color-gobai-gray-lighten) 0%, #f8fafc 30%, var(--color-gobai-gray-light) 70%, #ffffff 100%)',
					backgroundSize: '400% 400%',
				}}
			/>

			{/* Floating Background Elements */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="floating-service-element absolute top-20 left-16" style={{ animation: 'float-slow 5s ease-in-out infinite', opacity: 0.7 }}>
					<svg width="80" height="80" viewBox="0 0 80 80" style={{ animation: 'rotate-slow 30s linear infinite' }}>
						<path d="M40 10 L65 25 L65 50 L40 65 L15 50 L15 25 Z" fill="none" stroke="var(--color-gobai-cyan)" strokeWidth="2" opacity="0.4" />
						<path d="M40 20 L55 30 L55 45 L40 55 L25 45 L25 30 Z" fill="var(--color-gobai-cyan-light)" opacity="0.3" />
					</svg>
				</div>

				<div className="floating-service-element absolute top-40 right-20" style={{ animation: 'float-medium 4.5s ease-in-out infinite 0.8s', opacity: 0.7 }}>
					<svg width="60" height="60" viewBox="0 0 60 60" style={{ animation: 'pulse-scale 3s ease-in-out infinite' }}>
						<circle cx="30" cy="30" r="25" fill="none" stroke="var(--color-gobai-turquoise)" strokeWidth="2" opacity="0.5" />
						<circle cx="30" cy="30" r="15" fill="var(--color-gobai-turquoise-light)" opacity="0.4" />
						<circle cx="30" cy="30" r="8" fill="var(--color-gobai-turquoise)" opacity="0.6" />
					</svg>
				</div>

				<div className="floating-service-element absolute bottom-32 left-24" style={{ animation: 'float-fast 4s ease-in-out infinite 1.6s', opacity: 0.7 }}>
					<svg width="70" height="70" viewBox="0 0 70 70" style={{ animation: 'rotate-slow 25s linear infinite' }}>
						<rect x="10" y="10" width="50" height="50" rx="12" fill="none" stroke="var(--color-gobai-blue-bright)" strokeWidth="2" opacity="0.4" />
						<rect x="20" y="20" width="30" height="30" rx="6" fill="var(--color-gobai-blue-lighten)" opacity="0.3" />
					</svg>
				</div>

				<div className="floating-service-element absolute bottom-20 right-32" style={{ animation: 'float-slow 5.5s ease-in-out infinite 2.4s', opacity: 0.7 }}>
					<svg width="90" height="90" viewBox="0 0 90 90" style={{ animation: 'pulse-scale 3.5s ease-in-out infinite' }}>
						<polygon points="45,10 75,30 75,60 45,80 15,60 15,30" fill="none" stroke="var(--color-gobai-cyan-dark)" strokeWidth="2" opacity="0.4" />
						<polygon points="45,25 60,35 60,55 45,65 30,55 30,35" fill="var(--color-gobai-cyan)" opacity="0.3" />
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
							{/* <span className="phrase-char text-gobai-blue opacity-0 translate-y-2">
								t
							</span>
							<span className="phrase-char text-gobai-blue opacity-0 translate-y-2">
								e
							</span>
							<span className="phrase-char text-gobai-blue opacity-0 translate-y-2">
								s
							</span>
							<span className="phrase-char text-gobai-blue opacity-0 translate-y-2">
								t
							</span> */}
							{phrase.split("").map((char, index) => (
								<span key={index} className="inline-block phrase-char opacity-0 -translate-y-[20px] text-gobai-blue-dark">
									{char === " " ? "\u00A0" : char}
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
						Nuestros Servicios Especializados
					</h2>

					<p
						ref={subtitleRef}
						className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light"
						style={{
							textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
						}}
					>
						Descubre la gama completa de soluciones que GOBAI tiene para ti.
						Desde estrategias personalizadas hasta herramientas de análisis avanzado,
						elige lo que tu proyecto necesita para impactar.
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
										Ver más
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