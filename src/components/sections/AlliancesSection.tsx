'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const AlliancesSection = () => {
	const t = useTranslations('Alliances');
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const carouselWrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top 80%',
					toggleActions: 'play reverse play reverse',
				}
			});

			tl.from(titleRef.current, {
				y: 50,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out'
			})
			.from(subtitleRef.current, {
				y: 30,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out'
			}, '-=0.6')
			.from(carouselWrapperRef.current, {
				y: 80,
				opacity: 0,
				duration: 1,
				ease: 'power3.out'
			}, '-=0.4');
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	// Actual alliance logos from public/img/alianzas
	const alliances = [
		{ name: 'COHEP', image: '/img/alianzas/cohep.png', isWhiteLogo: false },
		{ name: 'Expo Horeca', image: '/img/alianzas/expo horeca.png', isWhiteLogo: true },
		{ name: 'Horeca', image: '/img/alianzas/horeca.jpg', isWhiteLogo: false },
		{ name: 'Rome Theory', image: '/img/alianzas/rome theory.png', isWhiteLogo: false },
		{ name: 'SICON', image: '/img/alianzas/sicon.png', isWhiteLogo: false },
		{ name: 'UTH Florida University', image: '/img/alianzas/uth flo.png', isWhiteLogo: false },
		{ name: 'UTH', image: '/img/alianzas/uth.png', isWhiteLogo: false }
	];

	// Duplicate alliances for seamless infinite loop on wide screens
	const duplicatedAlliances = [...alliances, ...alliances, ...alliances, ...alliances, ...alliances];

	return (
		<section
			ref={sectionRef}
			className="relative min-h-[70vh] py-24 overflow-hidden bg-gobai-blue-dark flex flex-col justify-center"
		>
			{/* Awesome Background Gradient */}
			<div 
				className="absolute inset-0 z-0 opacity-80"
				style={{
					background: 'radial-gradient(circle at 80% 20%, rgba(0, 180, 216, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(3, 100, 133, 0.15) 0%, transparent 40%), linear-gradient(135deg, #001122 0%, #001a33 50%, #000c1a 100%)'
				}}
			/>

			{/* Floating Dots */}
			<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
				{[...Array(15)].map((_, i) => {
					const animations = ['animate-float', 'animate-float-slow', 'animate-float-fast', 'animate-pulse-glow'];
					const animClass = animations[i % animations.length];
					const size = i % 3 === 0 ? 8 : i % 2 === 0 ? 4 : 2;
					const top = [10, 25, 45, 70, 85, 15, 80, 50, 30, 90, 20, 60, 40, 75, 5][i];
					const left = [10, 80, 20, 90, 30, 70, 40, 60, 15, 85, 50, 25, 75, 5, 95][i];
					const bgClass = i % 2 === 0 ? 'bg-cyan-400' : 'bg-teal-400';
					return (
						<div 
							key={i}
							className={`absolute rounded-full ${bgClass} opacity-30 ${animClass}`}
							style={{
								width: `${size}px`,
								height: `${size}px`,
								top: `${top}%`,
								left: `${left}%`,
								boxShadow: `0 0 ${size * 2}px ${i % 2 === 0 ? '#22d3ee' : '#2dd4bf'}`
							}}
						/>
					);
				})}
			</div>

			<div className="container mx-auto px-6 relative z-10 mb-2">
				<div className="text-center max-w-3xl mx-auto">
					<h2 ref={titleRef} className="text-3xl md:text-5xl font-bold text-white mb-6">
						{t('title')}
					</h2>
					<p ref={subtitleRef} className="text-xl text-white/70">
						{t('subtitle')}
					</p>
				</div>
			</div>

			<div ref={carouselWrapperRef} className="relative mt-8 z-10">
				{/* Carousel Container */}
				<div className="overflow-hidden pt-20 pb-4">
					<div
						className="flex items-center space-x-6 animate-carousel"
						style={{ width: 'max-content', animationDuration: '60s' }}
					>
						{duplicatedAlliances.map((alliance, index) => (
							<div
								key={`${alliance.name}-${index}`}
								className="shrink-0 group"
							>
								<div className="w-80 h-auto flex items-center justify-center px-4 py-8 transition-all duration-300 hover:scale-105">
									{/* Brand Card */}
									<div
										className="w-full rounded-2xl flex flex-col items-center justify-center gap-5 px-8 pb-8 pt-0 transition-all duration-300 group-hover:shadow-xl"
										style={{
											background: 'rgba(255, 255, 255, 0.05)',
											border: '1px solid rgba(255, 255, 255, 0.1)',
											boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
										}}
									>
										<div 
											className={`relative w-56 h-32 shrink-0 rounded-2xl shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${alliance.isWhiteLogo ? 'bg-[#001a2e] border border-white/10' : 'bg-white'}`}
											style={{ marginTop: '-64px' }}
										>
											<div className="relative w-[85%] h-[85%]">
												<Image 
													src={alliance.image}
													alt={alliance.name}
													fill
													className="object-contain"
												/>
											</div>
										</div>
										<div className="flex flex-col items-center gap-2">
											<span className="text-md mb-1 font-semibold text-white/90 text-center group-hover:text-white transition-colors duration-300">
												{alliance.name}
											</span>
											<span 
												className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold border"
												style={{
													borderColor: 'var(--color-gobai-turquoise)',
													color: 'var(--color-gobai-turquoise)',
													backgroundColor: 'rgba(0,0,0,0.3)'
												}}
											>
												{t('badge')}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default AlliancesSection;
