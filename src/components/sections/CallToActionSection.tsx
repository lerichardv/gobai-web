'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { ContactModal } from '../forms/ContactModal';

gsap.registerPlugin(ScrollTrigger);

export default function CallToActionSection() {
	const t = useTranslations('CTA');
	const tHero = useTranslations('Hero');
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLHeadingElement>(null);
	const descriptionRef = useRef<HTMLDivElement>(null);
	const finalTextRef = useRef<HTMLParagraphElement>(null);
	const ctaButtonRef = useRef<HTMLButtonElement>(null);
	const backgroundRef = useRef<HTMLDivElement>(null);
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animated background
			gsap.set(backgroundRef.current, {
				background: 'radial-gradient(ellipse at center, #003d66 0%, #001a2e 40%, #000814 70%, #001122 100%)',
				backgroundSize: '400% 400%',
			});

			// Set initial states
			gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, finalTextRef.current], {
				y: 80,
				opacity: 0,
			});

			gsap.set(ctaButtonRef.current, {
				scale: 0,
				opacity: 0,
			});


			// Main animation timeline
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top 70%',
					end: 'bottom 30%',
					toggleActions: 'play reverse play reverse',
				}
			});

			tl.to(titleRef.current, {
				y: 0,
				opacity: 1,
				duration: 1.2,
				ease: 'power3.out',
			})
				.to(subtitleRef.current, {
					y: 0,
					opacity: 1,
					duration: 1,
					ease: 'power3.out',
				}, '-=0.8')
				.to(descriptionRef.current, {
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
				}, '-=0.6')
				.to(finalTextRef.current, {
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
				}, '-=0.4')
				.to(ctaButtonRef.current, {
					scale: 1,
					opacity: 1,
					duration: 0.8,
					ease: 'back.out(1.7)',
				}, '-=0.6');

			// Button hover animation setup
			const button = ctaButtonRef.current;
			if (button) {
				button.addEventListener('mouseenter', () => {
					gsap.to(button, {
						scale: 1.05,
						duration: 0.3,
						ease: 'power2.out',
					});
					gsap.to(button.querySelector('.button-glow') as HTMLElement, {
						opacity: 0.8,
						scale: 1.2,
						duration: 0.3,
						ease: 'power2.out',
					});
				});

				button.addEventListener('mouseleave', () => {
					gsap.to(button, {
						scale: 1,
						duration: 0.3,
						ease: 'power2.out',
					});
					gsap.to(button.querySelector('.button-glow') as HTMLElement, {
						opacity: 0.4,
						scale: 1,
						duration: 0.3,
						ease: 'power2.out',
					});
				});
			}

		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="relative w-full py-32 overflow-hidden"
		>
			{/* Animated Background */}
			<div
				ref={backgroundRef}
				className="absolute inset-0 animate-gradient"
				style={{
					background: 'radial-gradient(ellipse at center, #003d66 0%, #001a2e 40%, #000814 70%, #001122 100%)',
				}}
			/>

			{/* Geometric Background Elements */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{/* Large Ring Elements */}
				<div className="cta-ring absolute top-20 left-10" style={{ animation: 'rotate-slow 20s linear infinite', opacity: 0.7 }}>
					<svg width="200" height="200" viewBox="0 0 200 200" style={{ animation: 'pulse-scale 2s ease-in-out infinite' }}>
						<circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-gobai-cyan)" strokeWidth="2" opacity="0.2" />
						<circle cx="100" cy="100" r="60" fill="none" stroke="var(--color-gobai-turquoise)" strokeWidth="1" opacity="0.3" />
						<circle cx="100" cy="100" r="40" fill="var(--color-gobai-cyan-light)" opacity="0.1" />
					</svg>
				</div>

				<div className="cta-ring absolute top-32 right-20" style={{ animation: 'rotate-slow 25s linear infinite 0.5s', opacity: 0.7 }}>
					<svg width="150" height="150" viewBox="0 0 150 150" style={{ animation: 'pulse-scale 2.5s ease-in-out infinite' }}>
						<polygon points="75,15 135,45 135,105 75,135 15,105 15,45" fill="none" stroke="var(--color-gobai-turquoise)" strokeWidth="2" opacity="0.3" />
						<polygon points="75,30 120,52.5 120,97.5 75,120 30,97.5 30,52.5" fill="var(--color-gobai-turquoise-light)" opacity="0.15" />
						<circle cx="75" cy="75" r="20" fill="var(--color-gobai-cyan)" opacity="0.2" />
					</svg>
				</div>

				<div className="cta-ring absolute bottom-20 left-32" style={{ animation: 'rotate-slow 22s linear infinite 1s', opacity: 0.7 }}>
					<svg width="180" height="180" viewBox="0 0 180 180" style={{ animation: 'pulse-scale 3s ease-in-out infinite' }}>
						<rect x="40" y="40" width="100" height="100" rx="20" fill="none" stroke="var(--color-gobai-blue-bright)" strokeWidth="2" opacity="0.25" />
						<rect x="55" y="55" width="70" height="70" rx="15" fill="var(--color-gobai-blue-lighten)" opacity="0.15" />
						<circle cx="90" cy="90" r="15" fill="var(--color-gobai-cyan-light)" opacity="0.3" />
					</svg>
				</div>

				<div className="cta-ring absolute bottom-32 right-16" style={{ animation: 'rotate-slow 28s linear infinite 1.5s', opacity: 0.7 }}>
					<svg width="120" height="120" viewBox="0 0 120 120" style={{ animation: 'pulse-scale 2.8s ease-in-out infinite' }}>
						<path d="M60 10 L110 35 L110 85 L60 110 L10 85 L10 35 Z" fill="none" stroke="var(--color-gobai-turquoise-dark)" strokeWidth="2" opacity="0.4" />
						<path d="M60 25 L95 42.5 L95 77.5 L60 95 L25 77.5 L25 42.5 Z" fill="var(--color-gobai-turquoise)" opacity="0.2" />
					</svg>
				</div>

				{/* Floating Particles */}
				<div className="cta-particle absolute top-1/4 left-1/4" style={{ animation: 'float-slow 3s ease-in-out infinite' }}>
					<div className="w-4 h-4 rounded-full" style={{ background: 'var(--color-gobai-cyan-light)', opacity: 0.6 }}></div>
				</div>
				<div className="cta-particle absolute top-1/3 right-1/3" style={{ animation: 'float-medium 3.5s ease-in-out infinite 0.3s' }}>
					<div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-gobai-turquoise-light)', opacity: 0.5 }}></div>
				</div>
				<div className="cta-particle absolute bottom-1/4 left-1/3" style={{ animation: 'float-fast 2.8s ease-in-out infinite 0.6s' }}>
					<div className="w-5 h-5 rounded-full" style={{ background: 'var(--color-gobai-blue-bright)', opacity: 0.4 }}></div>
				</div>
				<div className="cta-particle absolute bottom-1/3 right-1/4" style={{ animation: 'float-slow 3.2s ease-in-out infinite 0.9s' }}>
					<div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-gobai-cyan)', opacity: 0.7 }}></div>
				</div>
				<div className="cta-particle absolute top-1/2 left-1/6" style={{ animation: 'float-medium 3.3s ease-in-out infinite 1.2s' }}>
					<div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-gobai-turquoise)', opacity: 0.5 }}></div>
				</div>
				<div className="cta-particle absolute top-2/3 right-1/6" style={{ animation: 'float-fast 2.5s ease-in-out infinite 1.5s' }}>
					<div className="w-4 h-4 rounded-full" style={{ background: 'var(--color-gobai-blue-lighten)', opacity: 0.6 }}></div>
				</div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
				{/* Main Title */}
				<h2
					ref={titleRef}
					className="text-2xl md:text-4xl lg:text-6xl font-bold mb-8 leading-tight"
					style={{
						background: 'linear-gradient(135deg, var(--color-gobai-blue-bright), var(--color-gobai-cyan-light), var(--color-gobai-turquoise-light), var(--color-gobai-cyan))',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
						textShadow: '0 0 60px rgba(179, 232, 255, 0.4)',
						filter: 'drop-shadow(0 0 30px rgba(179, 232, 255, 0.3))',
					}}
				>
					{t('title')}
				</h2>

				{/* Subtitle */}
				<h3
					ref={subtitleRef}
					className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-8"
					style={{
						textShadow: '0 0 40px rgba(255, 255, 255, 0.2)',
					}}
				>
					{t('subtitle')}
				</h3>

				{/* Description */}
				<div
					ref={descriptionRef}
					className="text-lg md:text3xl lg:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed font-light"
					style={{
						textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
					}}
				>
					{t.rich('description', {
						count: t('count'),
						bold: (chunks) => (
							<span
								className="font-bold"
								style={{
									color: 'var(--color-gobai-turquoise-light)',
									textShadow: '0 0 20px rgba(31, 170, 163, 0.5)',
								}}
							>
								{chunks}
							</span>
						)
					})}
				</div>

				{/* Final Text */}
				<p
					ref={finalTextRef}
					className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12"
					style={{
						background: 'linear-gradient(135deg, var(--color-gobai-turquoise-light), var(--color-gobai-cyan-light))',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
						textShadow: '0 0 30px rgba(179, 232, 255, 0.3)',
					}}
				>
					{t('final')}
				</p>

				{/* CTA Button */}
				<div className="relative inline-block">
					<button
						ref={ctaButtonRef}
						onClick={() => setIsContactModalOpen(true)}
						className="relative group px-12 py-6 text-2xl font-bold text-white rounded-2xl overflow-hidden cursor-pointer"
						style={{
							background: 'linear-gradient(135deg, var(--color-gobai-turquoise-dark) 0%, var(--color-gobai-turquoise) 25%, var(--color-gobai-cyan) 75%, var(--color-gobai-cyan-light) 100%)',
							boxShadow: '0 15px 50px rgba(31, 170, 163, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
							border: '2px solid rgba(255, 255, 255, 0.2)',
						}}
					>
						<span className="relative z-10">{t('button')}</span>

						{/* Button Glow Effect */}
						<div
							className="button-glow absolute inset-0 opacity-40"
							style={{
								background: 'linear-gradient(135deg, var(--color-gobai-cyan-light) 0%, var(--color-gobai-turquoise-light) 50%, var(--color-gobai-blue-bright) 100%)',
							}}
						/>

						{/* Button Shine Effect */}
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

						{/* Button Pulse Ring */}
						<div
							className="absolute inset-0 rounded-2xl animate-pulse"
							style={{
								background: 'linear-gradient(135deg, transparent, rgba(179, 232, 255, 0.2), transparent)',
							}}
						/>
					</button>

					{/* Button Outer Glow */}
					<div
						className="absolute inset-0 rounded-2xl blur-xl opacity-50 -z-10"
						style={{
							background: 'linear-gradient(135deg, var(--color-gobai-turquoise), var(--color-gobai-cyan-light))',
						}}
					/>
				</div>

				{/* Stats Indicator */}
				<div className="mt-16 flex justify-center items-center space-x-8 text-white/70">
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'var(--color-gobai-cyan)' }}></div>
						<span className="text-lg">{t('stat1')}</span>
					</div>
					<div className="w-px h-8 bg-white/30"></div>
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'var(--color-gobai-turquoise)' }}></div>
						<span className="text-lg">{t('stat2')}</span>
					</div>
					<div className="w-px h-8 bg-white/30"></div>
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'var(--color-gobai-blue-bright)' }}></div>
						<span className="text-lg">{t('stat3')}</span>
					</div>
				</div>
			</div>

			{/* Bottom Edge Glow */}
			<div
				className="absolute bottom-0 left-0 right-0 h-32"
				style={{
					background: 'linear-gradient(to top, rgba(179, 232, 255, 0.1), transparent)',
				}}
			/>

			{/* Contact Modal */}
			<ContactModal 
				isOpen={isContactModalOpen} 
				onOpenChange={setIsContactModalOpen}
				title={tHero('modal.title')}
				description={tHero('modal.description')}
			/>
		</section>
	);
}