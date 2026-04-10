'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { RiTimeLine, RiPuzzleLine, RiMedalLine, RiLineChartLine } from '@remixicon/react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
	const t = useTranslations('Features');
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const featuresRef = useRef<HTMLDivElement>(null);
	const backgroundRef = useRef<HTMLDivElement>(null);
	const clientsTitleRef = useRef<HTMLHeadingElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const trustIndicatorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Background animation
			gsap.set(backgroundRef.current, {
				background: 'linear-gradient(135deg, #001a2e 0%, var(--color-gobai-blue-dark) 20%, #002447 40%, var(--color-gobai-blue-dark) 60%, #001533 80%, var(--color-gobai-blue-dark) 100%)',
				backgroundSize: '400% 400%',
			});

			gsap.to(backgroundRef.current, {
				backgroundPosition: '100% 100%',
				duration: 25,
				ease: 'none',
				repeat: -1,
				yoyo: true,
			});

			// Set initial state for feature cards
			gsap.set('.feature-card', {
				y: 80,
				opacity: 0,
			});

			// Scroll-triggered animations
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top 80%',
					end: 'bottom 20%',
					toggleActions: 'play none none none',
				}
			});

			tl.from(titleRef.current, {
				y: 100,
				opacity: 0,
				duration: 1.2,
				ease: 'power3.out',
			})
				.from(subtitleRef.current, {
					y: 50,
					opacity: 0,
					duration: 1,
					ease: 'power3.out',
				}, '-=0.8')
				.to('.feature-card', {
					y: 0,
					opacity: 1,
					duration: 0.6,
					ease: 'power3.out',
					stagger: 0.2,
				}, '-=0.6')
				.from('.floating-feature-element', {
					scale: 0,
					rotation: 180,
					opacity: 0,
					duration: 1,
					ease: 'back.out(1.7)',
					stagger: 0.3,
				}, '-=1');

			// Clients title animation
			gsap.from(clientsTitleRef.current, {
				y: 50,
				opacity: 0,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: clientsTitleRef.current,
					start: 'top 80%',
					toggleActions: 'play none none none',
				}
			});

			// Infinite carousel animation for clients
			const carousel = carouselRef.current;
			if (carousel) {
				gsap.set(carousel, { x: 0 });
				gsap.to(carousel, {
					x: -carousel.scrollWidth / 2,
					duration: 20,
					ease: 'none',
					repeat: -1,
				});
			}

			// Trust indicator animation
			gsap.from(trustIndicatorRef.current, {
				y: 30,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out'
			});

		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const features = [
		{
			title: t('item1Title'),
			description: t('item1Desc'),
			image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
			icon: <RiTimeLine />,
			gradient: 'linear-gradient(135deg, var(--color-gobai-cyan-dark) 0%, var(--color-gobai-turquoise) 100%)',
		},
		{
			title: t('item2Title'),
			description: t('item2Desc'),
			image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
			icon: <RiPuzzleLine />,
			gradient: 'linear-gradient(135deg, var(--color-gobai-turquoise-dark) 0%, var(--color-gobai-cyan) 100%)',
		},
		{
			title: t('item3Title'),
			description: t('item3Desc'),
			image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
			icon: <RiMedalLine />,
			gradient: 'linear-gradient(135deg, var(--color-gobai-blue-light) 0%, var(--color-gobai-turquoise-light) 100%)',
		},
		{
			title: t('item4Title'),
			description: t('item4Desc'),
			image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
			icon: <RiLineChartLine />,
			gradient: 'linear-gradient(135deg, var(--color-gobai-blue-dark) 0%, var(--color-gobai-cyan-dark) 100%)',
		},
	];

	// Mock client logos with SVG icons
	const clients = [
		{
			name: 'TechCorp',
			icon: (
				<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
					<rect width="60" height="60" rx="12" fill="currentColor" opacity="0.1" />
					<path d="M15 20h30v4H15v-4zm0 8h20v4H15v-4zm0 8h25v4H15v-4z" fill="currentColor" opacity="0.6" />
					<circle cx="45" cy="30" r="8" fill="currentColor" opacity="0.3" />
				</svg>
			)
		},
		{
			name: 'DataFlow',
			icon: (
				<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
					<circle cx="30" cy="30" r="25" fill="currentColor" opacity="0.1" />
					<path d="M20 25l10 5-10 5v-10zm20 0v10l-10-5 10-5z" fill="currentColor" opacity="0.6" />
					<circle cx="30" cy="30" r="3" fill="currentColor" />
				</svg>
			)
		},
		{
			name: 'CloudSync',
			icon: (
				<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
					<path d="M45 25c0-8.284-6.716-15-15-15s-15 6.716-15 15c-5.523 0-10 4.477-10 10s4.477 10 10 10h30c5.523 0 10-4.477 10-10s-4.477-10-10-10z" fill="currentColor" opacity="0.2" />
					<circle cx="25" cy="30" r="2" fill="currentColor" opacity="0.6" />
					<circle cx="35" cy="30" r="2" fill="currentColor" opacity="0.6" />
					<path d="M30 35v-8" stroke="currentColor" strokeWidth="2" opacity="0.8" />
				</svg>
			)
		},
		{
			name: 'InnovateLab',
			icon: (
				<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
					<polygon points="30,10 50,25 50,35 30,50 10,35 10,25" fill="currentColor" opacity="0.1" />
					<polygon points="30,20 40,25 40,35 30,40 20,35 20,25" fill="currentColor" opacity="0.3" />
					<circle cx="30" cy="30" r="5" fill="currentColor" opacity="0.7" />
				</svg>
			)
		},
		{
			name: 'SmartSys',
			icon: (
				<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
					<rect x="10" y="15" width="40" height="30" rx="6" fill="currentColor" opacity="0.1" />
					<rect x="15" y="20" width="10" height="8" rx="2" fill="currentColor" opacity="0.4" />
					<rect x="30" y="20" width="15" height="3" rx="1" fill="currentColor" opacity="0.6" />
					<rect x="30" y="27" width="10" height="3" rx="1" fill="currentColor" opacity="0.6" />
					<rect x="15" y="35" width="30" height="3" rx="1" fill="currentColor" opacity="0.3" />
				</svg>
			)
		},
		{
			name: 'Digital+',
			icon: (
				<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
					<circle cx="30" cy="30" r="20" fill="currentColor" opacity="0.1" />
					<path d="M30 20v20M20 30h20" stroke="currentColor" strokeWidth="3" opacity="0.6" />
					<circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
				</svg>
			)
		},
		{
			name: 'FlexTech',
			icon: (
				<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
					<path d="M15 15h30v30H15z" fill="currentColor" opacity="0.1" />
					<path d="M20 20l20 20M40 20L20 40" stroke="currentColor" strokeWidth="2" opacity="0.4" />
					<circle cx="30" cy="30" r="6" fill="currentColor" opacity="0.6" />
				</svg>
			)
		},
		{
			name: 'NextGen',
			icon: (
				<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
					<path d="M10 30L30 10l20 20-20 20-20-20z" fill="currentColor" opacity="0.2" />
					<path d="M20 30l10-10 10 10-10 10-10-10z" fill="currentColor" opacity="0.5" />
					<circle cx="30" cy="30" r="4" fill="currentColor" />
				</svg>
			)
		},
		{
			name: 'ProActive',
			icon: (
				<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
					<rect x="15" y="15" width="30" height="30" rx="8" fill="currentColor" opacity="0.1" />
					<path d="M25 25h10v2H25v-2zm0 4h15v2H25v-2zm0 4h12v2H25v-2z" fill="currentColor" opacity="0.6" />
					<circle cx="22" cy="35" r="2" fill="currentColor" opacity="0.8" />
				</svg>
			)
		},
		{
			name: 'Velocity',
			icon: (
				<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
					<path d="M10 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20S10 41.046 10 30z" fill="currentColor" opacity="0.1" />
					<path d="M25 25l15 5-15 5v-4H15v-2h10v-4z" fill="currentColor" opacity="0.6" />
				</svg>
			)
		},
	];

	// Duplicate clients for seamless loop
	const duplicatedClients = [...clients, ...clients];

	return (
		<section
			ref={sectionRef}
			className="relative min-h-screen pt-20 pb-36 overflow-hidden bg-gobai-blue-dark"
		>
			{/* Animated Background */}
			<div
				ref={backgroundRef}
				className="absolute inset-0 opacity-95"
				style={{
					background: 'linear-gradient(135deg, #001a2e 0%, var(--color-gobai-blue-dark) 20%, #002447 40%, var(--color-gobai-blue-dark) 60%, #001533 80%, var(--color-gobai-blue-dark) 100%)',
					backgroundSize: '400% 400%',
				}}
			/>

			{/* Floating Background Elements */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="floating-feature-element absolute top-24 left-20" style={{ animation: 'float-slow 5s ease-in-out infinite', opacity: 0.7 }}>
					<svg width="70" height="70" viewBox="0 0 70 70" style={{ animation: 'rotate-slow 25s linear infinite' }}>
						<circle cx="35" cy="35" r="30" fill="none" stroke="var(--color-gobai-cyan)" strokeWidth="2" opacity="0.3" />
						<circle cx="35" cy="35" r="20" fill="var(--color-gobai-cyan-light)" opacity="0.2" />
						<circle cx="35" cy="35" r="10" fill="var(--color-gobai-cyan)" opacity="0.4" />
					</svg>
				</div>

				<div className="floating-feature-element absolute top-32 right-24" style={{ animation: 'float-medium 4.5s ease-in-out infinite 0.6s', opacity: 0.7 }}>
					<svg width="85" height="85" viewBox="0 0 85 85" style={{ animation: 'pulse-scale 3s ease-in-out infinite' }}>
						<polygon points="42.5,10 75,27.5 75,57.5 42.5,75 10,57.5 10,27.5" fill="none" stroke="var(--color-gobai-turquoise)" strokeWidth="2" opacity="0.4" />
						<polygon points="42.5,20 65,32.5 65,52.5 42.5,65 20,52.5 20,32.5" fill="var(--color-gobai-turquoise-light)" opacity="0.3" />
					</svg>
				</div>

				<div className="floating-feature-element absolute bottom-40 left-32" style={{ animation: 'float-fast 4s ease-in-out infinite 1.2s', opacity: 0.7 }}>
					<svg width="75" height="75" viewBox="0 0 75 75" style={{ animation: 'rotate-slow 30s linear infinite' }}>
						<rect x="15" y="15" width="45" height="45" rx="10" fill="none" stroke="var(--color-gobai-blue-bright)" strokeWidth="2" opacity="0.3" />
						<rect x="25" y="25" width="25" height="25" rx="5" fill="var(--color-gobai-blue-lighten)" opacity="0.4" />
					</svg>
				</div>

				<div className="floating-feature-element absolute bottom-32 right-20" style={{ animation: 'float-slow 5.5s ease-in-out infinite 1.8s', opacity: 0.7 }}>
					<svg width="65" height="65" viewBox="0 0 65 65" style={{ animation: 'pulse-scale 3.5s ease-in-out infinite' }}>
						<path d="M32.5 5 L60 20 L60 45 L32.5 60 L5 45 L5 20 Z" fill="none" stroke="var(--color-gobai-cyan-dark)" strokeWidth="2" opacity="0.4" />
						<path d="M32.5 15 L50 25 L50 40 L32.5 50 L15 40 L15 25 Z" fill="var(--color-gobai-cyan)" opacity="0.3" />
					</svg>
				</div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-20">
					<h2
						ref={titleRef}
						className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight"
						style={{
							background: 'linear-gradient(135deg, var(--color-gobai-blue-bright), var(--color-gobai-cyan-light), var(--color-gobai-turquoise-light))',
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
						className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light"
						style={{
							textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
						}}
					>
						{t('subtitle')}
					</p>
				</div>

				{/* Features Grid */}
				<div ref={featuresRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="feature-card group relative rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
							style={{
								background: 'rgba(255, 255, 255, 0.05)',
								border: '1px solid rgba(255, 255, 255, 0.1)',
								boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
							}}
						>
							{/* Card Background Gradient */}
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
								style={{ background: feature.gradient }}
							/>

							{/* Feature Image */}
							<div className="relative h-36 md:h-44 lg:h-48 overflow-hidden">
								<Image
									src={feature.image}
									alt={feature.title}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-110"
									style={{
										filter: 'brightness(0.7) contrast(1.1)',
									}}
								/>
								<div
									className="absolute inset-0"
									style={{
										background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)',
									}}
								/>

								{/* Feature Icon */}
								<div className="absolute top-3 right-3 md:top-4 md:right-4">
									<div
										className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-lg transition-all duration-300 group-hover:scale-110"
										style={{
											background: 'rgba(255, 255, 255, 0.15)',
											border: '1px solid rgba(255, 255, 255, 0.2)',
										}}
									>
										<div className="text-white" style={{ fontSize: '3rem' }}>
											{feature.icon}
										</div>
									</div>
								</div>
							</div>

							{/* Card Content */}
							<div className="relative p-4 md:p-6 lg:p-8">
								{/* Feature Title */}
								<h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-white transition-colors duration-300">
									{feature.title}
								</h3>

								{/* Feature Description */}
								<p className="text-sm md:text-base text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
									{feature.description}
								</p>

								{/* Decorative gradient line */}
								<div
									className="mt-4 md:mt-6 h-1 w-16 md:w-20 rounded-full transition-all duration-300 group-hover:w-24 md:group-hover:w-32"
									style={{ background: feature.gradient }}
								/>
							</div>

							{/* Card border glow effect */}
							<div
								className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
								style={{
									background: `linear-gradient(135deg, transparent 0%, rgba(179, 232, 255, 0.1) 50%, transparent 100%)`,
									padding: '2px',
									WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
									WebkitMaskComposite: 'exclude',
								}}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Clients Section - Integrated */}
			<div className="mt-32">
				{/* Clients Title */}
				<div className="text-center mb-20">
					<h2
						ref={clientsTitleRef}
						className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
						style={{
							background: 'linear-gradient(135deg, var(--color-gobai-blue-bright), var(--color-gobai-cyan-light), var(--color-gobai-turquoise-light))',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							textShadow: '0 0 40px rgba(179, 232, 255, 0.3)',
						}}
					>
						{t('clientsTitle')}
					</h2>
				</div>

				{/* Animated Logo Carousel */}
				<div className="relative">
					{/* Gradient fade edges */}
					{/* <div 
              className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, #001a2e 0%, rgba(0, 26, 46, 0.95) 30%, rgba(0, 26, 46, 0.5) 70%, rgba(0, 26, 46, 0) 100%)',
              }}
            />
            <div 
              className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to left, #001a2e 0%, rgba(0, 26, 46, 0.95) 30%, rgba(0, 26, 46, 0.5) 70%, rgba(0, 26, 46, 0) 100%)',
              }}
            /> */}

					{/* Carousel Container */}
					<div className="overflow-hidden">
						<div
							ref={carouselRef}
							className="flex items-center space-x-20 will-change-transform"
							style={{ width: 'max-content' }}
						>
							{duplicatedClients.map((client, index) => (
								<div
									key={`${client.name}-${index}`}
									className="shrink-0 group"
								>
									<div className="w-48 h-24 flex items-center justify-center p-6 transition-all duration-300 hover:scale-110">
										{/* Brand SVG Icon */}
										<div
											className="w-full h-full rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-xl"
											style={{
												background: 'rgba(255, 255, 255, 0.05)',
												border: '1px solid rgba(255, 255, 255, 0.1)',
												boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
												color: 'var(--color-gobai-cyan-light)',
											}}
										>
											<div className="transition-all duration-300 group-hover:scale-110 group-hover:opacity-80">
												{client.icon}
											</div>
											<span className="text-xs font-medium text-white/70 text-center group-hover:text-white transition-colors duration-300">
												{client.name}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Trust indicators */}
				<div ref={trustIndicatorRef} className="text-center mt-16">
					<p className="text-xl md:text-2xl text-white font-light leading-relaxed">
						{t.rich('trust', {
							count: t('count'),
							bold: (chunks) => <span className="font-semibold" style={{ color: 'var(--color-gobai-turquoise-light)' }}>{chunks}</span>
						})}
					</p>
				</div>
			</div>

			{/* Bottom gradient overlay */}
			<div
				className="absolute bottom-0 left-0 right-0 h-32 z-20"
				style={{
					background: 'linear-gradient(to top, rgba(255, 255, 255, 0.1), transparent)',
				}}
			/>
		</section>
	);
}