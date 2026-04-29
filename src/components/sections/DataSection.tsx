'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { RiBarChartBoxLine, RiTargetLine, RiGovernmentLine, RiLockLine, RiFolderShieldLine, RiAwardLine, RiTrophyLine, RiChatCheckLine } from '@remixicon/react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function DataSection() {
	const t = useTranslations('Data');
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const leftContentRef = useRef<HTMLDivElement>(null);
	const rightContentRef = useRef<HTMLDivElement>(null);
	const dataCardsRef = useRef<HTMLDivElement>(null);
	const progressBarRef = useRef<HTMLDivElement>(null);
	const progressTextRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Set initial states
			gsap.set([titleRef.current, subtitleRef.current], {
				y: 60,
				opacity: 0,
			});

			gsap.set(leftContentRef.current, {
				x: -100,
				opacity: 0,
			});

			gsap.set(rightContentRef.current, {
				x: 100,
				opacity: 0,
			});

			gsap.set('.data-card', {
				y: 50,
				opacity: 0,
				scale: 0.9,
			});

			// Main timeline
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top 80%',
					end: 'bottom 20%',
					toggleActions: 'play reverse play reverse',
				}
			});

			tl.to(titleRef.current, {
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
			})
				.to(subtitleRef.current, {
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
				}, '-=0.6')
				.to(leftContentRef.current, {
					x: 0,
					opacity: 1,
					duration: 1,
					ease: 'power3.out',
				}, '-=0.4')
				.to(rightContentRef.current, {
					x: 0,
					opacity: 1,
					duration: 1,
					ease: 'power3.out',
				}, '-=0.8')
				.to('.data-card', {
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.6,
					ease: 'back.out(1.7)',
					stagger: 0.15,
				}, '-=0.5');

			// Animated progress bar with changing percentages
			const progressValues = [45, 67, 82, 95, 73, 88, 56, 91, 64, 79];
			const progressTexts = [
				'Analizando datos...',
				'Procesando información...',
				'Generando insights...',
				'Optimizando resultados...',
				'Validando modelos...',
				'Compilando reportes...',
				'Refinando algoritmos...',
				'Sincronizando datos...',
				'Calibrando métricas...',
				'Finalizando análisis...'
			];

			let currentIndex = 0;
			const animateProgress = () => {
				const nextIndex = (currentIndex + 1) % progressValues.length;
				const currentValue = progressValues[currentIndex];
				const nextValue = progressValues[nextIndex];
				const currentText = progressTexts[currentIndex];
				const nextText = progressTexts[nextIndex];

				// Animate progress bar width
				gsap.to(progressBarRef.current, {
					width: `${nextValue}%`,
					duration: 1.5,
					ease: 'power2.inOut',
				});

				// Animate progress text with fade transition
				gsap.to(progressTextRef.current, {
					opacity: 0,
					duration: 0.3,
					ease: 'power2.inOut',
					onComplete: () => {
						if (progressTextRef.current) {
							progressTextRef.current.textContent = `${nextValue}%`;
						}
						gsap.to(progressTextRef.current, {
							opacity: 1,
							duration: 0.3,
							ease: 'power2.inOut',
						});
					}
				});

				// Update processing text
				const processingElement = progressTextRef.current?.previousElementSibling?.querySelector('.processing-text');
				if (processingElement) {
					gsap.to(processingElement, {
						opacity: 0,
						duration: 0.3,
						ease: 'power2.inOut',
						onComplete: () => {
							processingElement.textContent = nextText;
							gsap.to(processingElement, {
								opacity: 1,
								duration: 0.3,
								ease: 'power2.inOut',
							});
						}
					});
				}

				currentIndex = nextIndex;

				// Schedule next animation
				gsap.delayedCall(2.5, animateProgress);
			};

			// Start the animation after initial load
			gsap.delayedCall(2, animateProgress);

		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const dataServices = [
		{
			title: t('service1Title'),
			description: t('service1Desc'),
			image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
			icon: <RiBarChartBoxLine />,
			color: 'var(--color-gobai-cyan)',
		},
		{
			title: t('service2Title'),
			description: t('service2Desc'),
			image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
			icon: <RiTargetLine />,
			color: 'var(--color-gobai-turquoise)',
		},
		{
			title: t('service3Title'),
			description: t('service3Desc'),
			image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
			icon: <RiGovernmentLine />,
			color: 'var(--color-gobai-blue-bright)',
		},
	];

	return (
		<section
			ref={sectionRef}
			className="relative py-24 overflow-hidden"
			style={{
				background: 'linear-gradient(165deg, #f8fafc 0%, #ffffff 25%, #f1f5f9 50%, #ffffff 75%, #f8fafc 100%)',
			}}>
			{/* Decorative Background Elements */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Security Shield Pattern        */}
				<div className="absolute top-20 left-10 security-icon" style={{ animation: 'rotate-slow 20s linear infinite', opacity: 0.7 }}>
					<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
						<path d="M40 10L20 20V35C20 50 30 65 40 70C50 65 60 50 60 35V20L40 10Z" fill="var(--color-gobai-cyan)" opacity="0.1" />
						<path d="M40 15L25 23V35C25 47 33 59 40 63C47 59 55 47 55 35V23L40 15Z" stroke="var(--color-gobai-cyan)" strokeWidth="2" opacity="0.3" />
						<circle cx="40" cy="35" r="8" fill="var(--color-gobai-cyan)" opacity="0.4" />
					</svg>
				</div>

				<div className="absolute top-32 right-16 security-icon" style={{ animation: 'rotate-slow 25s linear infinite', opacity: 0.7 }}>
					<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
						<rect x="10" y="20" width="40" height="30" rx="5" fill="var(--color-gobai-turquoise)" opacity="0.15" />
						<rect x="15" y="15" width="30" height="10" rx="5" stroke="var(--color-gobai-turquoise)" strokeWidth="2" opacity="0.4" />
						<circle cx="30" cy="35" r="4" fill="var(--color-gobai-turquoise)" opacity="0.6" />
					</svg>
				</div>

				<div className="absolute bottom-20 left-20 security-icon" style={{ animation: 'rotate-slow 30s linear infinite', opacity: 0.7 }}>
					<svg width="70" height="70" viewBox="0 0 70 70" fill="none">
						<polygon points="35,10 60,25 60,45 35,60 10,45 10,25" fill="var(--color-gobai-blue-light)" opacity="0.1" />
						<polygon points="35,18 52,28 52,42 35,52 18,42 18,28" stroke="var(--color-gobai-blue-light)" strokeWidth="2" opacity="0.4" />
						<circle cx="35" cy="35" r="6" fill="var(--color-gobai-blue-light)" opacity="0.5" />
					</svg>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header Section */}
				<div className="text-center mb-20">
					<h2
						ref={titleRef}
						className="text-2xl md:text-4xl lg:text-6xl font-bold mb-8 leading-tight"
						style={{
							background: 'linear-gradient(135deg, var(--color-gobai-blue-dark), var(--color-gobai-cyan-dark), var(--color-gobai-turquoise-dark))',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							textShadow: '0 0 40px rgba(0, 0, 0, 0.1)',
						}}
					>
						{t('title')}
					</h2>

					<p
						ref={subtitleRef}
						className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light"
					>
						{t('subtitle')}
					</p>
				</div>

				{/* Split Layout Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
					{/* Left Content - Security Visual */}
					<div ref={leftContentRef} className="relative">
						<div className="relative w-full h-[380px] xl:h-[400px] rounded-3xl overflow-hidden">
							<Image
								src="https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
								alt="Data Security"
								fill
								className="object-cover"
								style={{
									filter: 'brightness(0.9) contrast(1.1) saturate(1.1)',
								}}
							/>
							<div
								className="absolute inset-0"
								style={{
									background: 'linear-gradient(135deg, rgba(0, 61, 102, 0.8) 0%, rgba(31, 170, 163, 0.6) 100%)',
								}}
							/>

							{/* Floating Security Badge */}
							<div className="absolute top-8 right-8 p-6 rounded-2xl backdrop-blur-lg"
								style={{
									background: 'rgba(255, 255, 255, 0.2)',
									border: '1px solid rgba(255, 255, 255, 0.3)',
								}}
							>
								<div className="text-center">
									<div className="mb-2 text-white" style={{ fontSize: '3rem' }}><RiLockLine className='mx-auto' /></div>
									<div className="text-white font-semibold text-sm">{t('secure')}</div>
									<div className="text-white/80 text-xs">100%</div>
								</div>
							</div>

							{/* Data Flow Animation */}
							<div className="absolute bottom-8 left-8 right-8">
								<div className="flex items-center space-x-4 p-4 rounded-2xl backdrop-blur-lg"
									style={{
										background: 'rgba(255, 255, 255, 0.15)',
										border: '1px solid rgba(255, 255, 255, 0.2)',
									}}
								>
									<div className="flex-1">
										<div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
											<div
												ref={progressBarRef}
												className="h-full rounded-full"
												style={{
													background: 'linear-gradient(90deg, var(--color-gobai-cyan-light), var(--color-gobai-turquoise-light))',
													width: '45%',
													boxShadow: '0 0 15px rgba(179, 232, 255, 0.4)'
												}}
											/>
										</div>
										<div className="text-white text-xs mt-1">
											<span className="processing-text">Analizando datos...</span>
										</div>
									</div>
									<div ref={progressTextRef} className="text-white text-sm font-medium">45%</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Content - Trust Indicators */}
					<div ref={rightContentRef} className="space-y-8">
						<div className="space-y-6">
							<div className="flex items-center space-x-4 p-6 rounded-2xl"
								style={{
									background: 'linear-gradient(135deg, rgba(31, 170, 163, 0.1) 0%, rgba(179, 232, 255, 0.1) 100%)',
									border: '1px solid rgba(31, 170, 163, 0.2)',
								}}
							>
								<div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
									style={{ background: 'var(--color-gobai-cyan)' }}
								>
									<RiFolderShieldLine className="text-white" style={{ fontSize: '2rem' }} />
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-800 mb-2">{t('feature1Title')}</h3>
									<p className="text-gray-600">{t('feature1Desc')}</p>
								</div>
							</div>

							<div className="flex items-center space-x-4 p-6 rounded-2xl"
								style={{
									background: 'linear-gradient(135deg, rgba(0, 61, 102, 0.1) 0%, rgba(31, 170, 163, 0.1) 100%)',
									border: '1px solid rgba(0, 61, 102, 0.2)',
								}}
							>
								<div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
									style={{ background: 'var(--color-gobai-turquoise)' }}
								>
									<RiAwardLine className="text-white" style={{ fontSize: '2rem' }} />
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-800 mb-2">{t('feature2Title')}</h3>
									<p className="text-gray-600">{t('feature2Desc')}</p>
								</div>
							</div>

							<div className="flex items-center space-x-4 p-6 rounded-2xl"
								style={{
									background: 'linear-gradient(135deg, rgba(179, 232, 255, 0.1) 0%, rgba(31, 170, 163, 0.1) 100%)',
									border: '1px solid rgba(179, 232, 255, 0.2)',
								}}
							>
								<div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
									style={{ background: 'var(--color-gobai-blue-bright)' }}
								>
									<RiChatCheckLine className="text-white" style={{ fontSize: '2rem' }} />
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-800 mb-2">{t('feature3Title')}</h3>
									<p className="text-gray-600">{t('feature3Desc')}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Data Services Cards - Unique Layout */}
				<div ref={dataCardsRef} className="relative">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{dataServices.map((service, index) => (
							<div
								key={index}
								className="data-card group relative"
							>
								{/* Card with Hexagonal Clip Path */}
								<div className="relative overflow-hidden rounded-3xl h-96"
									style={{
										background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
										border: '1px solid rgba(0, 0, 0, 0.1)',
										boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
									}}
								>
									{/* Service Image */}
									<div className="relative h-48 overflow-hidden">
										<Image
											src={service.image}
											alt={service.title}
											fill
											className="object-cover group-hover:scale-110"
											style={{
												filter: 'brightness(0.8) contrast(1.1)',
											}}
										/>
										<div
											className="absolute inset-0"
											style={{
												background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}40 100%)`,
											}}
										/>

										{/* Service Icon */}
										<div className="absolute top-4 left-4">
											<div
												className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-lg group-hover:scale-110"
												style={{
													background: 'rgba(255, 255, 255, 0.25)',
													border: '1px solid rgba(255, 255, 255, 0.3)',
												}}
											>
												<div className="text-white" style={{ fontSize: '2rem' }}>
													{service.icon}
												</div>
											</div>
										</div>
									</div>

									{/* Card Content */}
									<div className="p-6">
										<h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900">
											{service.title}
										</h3>
										<p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700">
											{service.description}
										</p>

										{/* Progress Bar */}
										<div className="mt-4">
											<div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
												<div
													className="h-full rounded-full group-hover:animate-pulse"
													style={{
														background: service.color,
														width: `${85 + index * 5}%`
													}}
												/>
											</div>
											<div className="text-xs text-gray-500 mt-1 text-right">{85 + index * 5}%</div>
										</div>
									</div>

									{/* Hover Gradient Overlay */}
									<div
										className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none rounded-3xl"
										style={{
											background: `linear-gradient(135deg, ${service.color} 0%, transparent 100%)`,
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}