
'use client';

const DOT_COUNT = 10; // Reduced for performance
// Adjustable mesh variables
const DOT_CONNECTION_RADIUS = 300; // px
const DOT_SPACING_X = 160; // px
const DOT_SPACING_Y = 140; // px
const DOT_SIZE_MIN = 1; // px
const DOT_SIZE_VARIATION = 3.5; // px
const DOT_SIZE_NEIGHBOR_SCALE = 1.2;
const DOT_DISTANCE_MIN = 50; // px
const DOT_DISTANCE_MAX = 1000; // px
const DOT_MESH_CENTER_X = 800; // px (center of mesh horizontally)
const DOT_MESH_CENTER_Y = 400; // px (center of mesh vertically)

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function HeroSection() {
	const t = useTranslations('Hero');
	const heroRef = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);
	const floatingElementsRef = useRef<HTMLDivElement>(null);
	const backgroundRef = useRef<HTMLDivElement>(null);
	const personRef = useRef<HTMLDivElement>(null);

	const handleStartClick = () => {
		if (personRef.current) {
			const tl = gsap.timeline();
			
			tl.to(personRef.current, {
				scale: 1.15,
				duration: 0.8,
				ease: 'power3.out',
				onComplete: () => {
					const smoother = (gsap as any).ScrollSmoother?.get();
					if (smoother) {
						smoother.scrollTo('#services-section', true, 'top top');
					}
				}
			})
			.to(personRef.current, {
				scale: 1,
				duration: 1.2,
				delay: 0.5,
				ease: 'power2.inOut',
			});
		}
	};



	useEffect(() => {
		const ctx = gsap.context(() => {
			const smoother = (gsap as any).ScrollSmoother?.get();
			
			// Initial state
			if (smoother) {
				smoother.paused(true);
				smoother.scrollTop(0);
			} else {
				window.scrollTo(0, 0);
				document.body.style.overflow = 'hidden';
			}

			// Timeline for initial animations
			const tl = gsap.timeline({
				onComplete: () => {
					if (smoother) {
						smoother.paused(false);
					} else {
						document.body.style.overflow = 'auto';
					}
				}
			});

			// Background gradient animation
			gsap.set(backgroundRef.current, {
				background: 'linear-gradient(135deg, #00040a 0%, #000a1a 20%, #00101a 40%, #001533 60%, #00040a 80%, #000a1a 100%)',
				backgroundSize: '400% 400%',
			});

			gsap.to(backgroundRef.current, {
				backgroundPosition: '0% 0%',
				duration: 20,
				ease: 'none',
				repeat: -1,
				yoyo: true,
			});

			// Coordinated animations
			tl.from('#person-background', {
				y: 300,
				x: -50,
				scale: 1.05,
				opacity: 0,
				duration: 2.5,
				ease: 'power4.out',
			}, 0.2)
			.to(document.querySelector('nav'), {
				y: 0,
				opacity: 1,
				duration: 1.5,
				ease: 'power3.out',
			}, 1.2)
			.from(logoRef.current, {
				scale: 0,
				opacity: 0,
				duration: 1,
				ease: 'elastic.out(1, 0.5)',
			}, 1.5)
			.from('.hero-badge', {
				y: 20,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
			}, 1.6)
			.from(titleRef.current, {
				y: 100,
				opacity: 0,
				duration: 1.2,
				ease: 'power3.out',
			}, 1.8)
			.from(subtitleRef.current, {
				y: 50,
				opacity: 0,
				duration: 1,
				ease: 'power3.out',
			}, 2.1)
			.from(ctaRef.current, {
				y: 30,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
			}, 2.4)
			.from('.floating-element', {
				scale: 0,
				opacity: 0,
				duration: 0.8,
				ease: 'back.out(1.7)',
				stagger: 0.15,
			}, 2.0);


		}, heroRef);

		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<div
			ref={heroRef}
			className="min-h-screen flex items-center lg:items-start justify-center overflow-hidden pb-16 pt-32 md:pt-16 p-5 relative"
		>
			<style>{`
				@keyframes energyScan {
					0% {
						-webkit-mask-position: 0% -100%;
						mask-position: 0% -100%;
						opacity: 0;
					}
					10% { opacity: 0.3; }
					20% { opacity: 1; filter: brightness(2) saturate(1.5); }
					25% { opacity: 0.5; filter: brightness(3) saturate(2); }
					30% { opacity: 1; filter: brightness(2.5) saturate(1.5); }
					60% { opacity: 0.8; filter: brightness(1.8) saturate(1.2); }
					90% { opacity: 0; }
					100% {
						-webkit-mask-position: 0% 200%;
						mask-position: 0% 200%;
						opacity: 0;
					}
				}
				.animate-scan-wave {
					-webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.1) 80%, transparent 100%);
					mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.1) 80%, transparent 100%);
					-webkit-mask-size: 100% 300%;
					mask-size: 100% 300%;
					-webkit-mask-repeat: no-repeat;
					mask-repeat: no-repeat;
					animation: energyScan 5s ease-in-out infinite;
				}
			`}</style>

			{/* Animated Background */}
			<div
				ref={backgroundRef}
				className="absolute inset-0 opacity-95"
				style={{
					background: 'linear-gradient(135deg, #00040a 0%, #000a1a 20%, #00101a 40%, #001533 60%, #00040a 80%, #000a1a 100%)',
					backgroundSize: '400% 400%',
				}}
			/>
			
			{/* Person Image with Wave & Flicker */}
			<div ref={personRef} id="person-background" data-speed="0.8" className="absolute inset-0 pointer-events-none z-0">
				{/* Base image */}
				<div 
					className="absolute inset-0 -translate-x-50 md:-translate-x-0 bg-bottom-left bg-no-repeat bg-size-[200%] sm:bg-size-[80%] hover:scale-105 transition-transform duration-[10s]" 
					style={{ backgroundImage: 'url("/img/person.png")', opacity: 0.75 }}
				></div>
				
				{/* Bright scanning wave overlay */}
				<div 
					className="absolute inset-0 -translate-x-50 md:-translate-x-0 bg-bottom-left bg-no-repeat bg-size-[200%] sm:bg-size-[80%] animate-scan-wave mix-blend-screen" 
					style={{ 
						backgroundImage: 'url("/img/person.png")',
						filter: 'drop-shadow(0 0 15px rgba(99, 198, 252, 0.8)) hue-rotate(15deg)' 
					}}
				></div>
			</div>

			{/* Inner Border Container */}
			<div
				className="absolute inset-5 pointer-events-none"
				style={{
					border: '2px solid rgba(255, 255, 255, 0.2)',
					borderRadius: '40px',
					boxShadow: 'inset 0 0 60px rgba(99, 198, 252, 0.1), 0 0 40px rgba(179, 232, 255, 0.1)',
				}}
			/>

			{/* Floating Background Elements */}
				<div className="floating-element absolute top-20 left-20" style={{ animation: 'float-slow 6s ease-in-out infinite', opacity: 0.7 }}>
					<svg width="60" height="60" viewBox="0 0 60 60" style={{ animation: 'pulse-scale 3s ease-in-out infinite' }}>
						<circle cx="30" cy="30" r="25" fill="none" stroke="var(--color-gobai-cyan)" strokeWidth="2" opacity="0.25" />
						<circle cx="30" cy="30" r="5" fill="var(--color-gobai-cyan)" opacity="0.3" />
					</svg>
				</div>

				<div className="floating-element absolute bottom-32 left-32" style={{ animation: 'float-fast 4s ease-in-out infinite 1s', opacity: 0.7 }}>
					<svg width="70" height="70" viewBox="0 0 70 70" style={{ animation: 'pulse-scale 3s ease-in-out infinite' }}>
						<rect x="10" y="10" width="50" height="50" rx="10" fill="none" stroke="var(--color-gobai-blue-bright)" strokeWidth="2" opacity="0.2" />
						<rect x="25" y="25" width="20" height="20" rx="4" fill="var(--color-gobai-blue-lighten)" opacity="0.15" />
					</svg>
				</div>

				<div className="floating-element absolute bottom-40 right-16" style={{ animation: 'float-slow 7s ease-in-out infinite 1.2s', opacity: 0.7 }}>
					<svg width="65" height="65" viewBox="0 0 65 65" style={{ animation: 'rotate-slow 40s linear infinite' }}>
						<path d="M32.5 5 L55 20 L55 45 L32.5 60 L10 45 L10 20 Z" fill="none" stroke="var(--color-gobai-blue-bright)" strokeWidth="2" opacity="0.15" />
					</svg>
				</div>

				<div className="floating-element absolute bottom-20 right-20" style={{ animation: 'float-medium 5s ease-in-out infinite 2s', opacity: 0.7 }}>
					<svg width="50" height="50" viewBox="0 0 50 50" style={{ animation: 'pulse-scale 4s ease-in-out infinite' }}>
						<circle cx="25" cy="25" r="20" fill="none" stroke="var(--color-gobai-turquoise-dark)" strokeWidth="2" opacity="0.25" />
					</svg>
				</div>

				{/* Neural network connecting lines */}
				<svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
					<defs>
						<linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="var(--color-gobai-cyan)" stopOpacity="0.3" />
							<stop offset="100%" stopColor="var(--color-gobai-turquoise)" stopOpacity="0.1" />
						</linearGradient>
					</defs>
					<path d="M100 100 Q300 200 600 150 T1000 300" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.6" />
					<path d="M200 400 Q500 300 800 450 T1200 200" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.4" />
					<path d="M50 600 Q400 500 700 600 T1100 550" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.5" />
				</svg>


			{/* Main Content */}
			<div className="relative z-10 text-center lg:text-left px-6 mx-auto min-w-[300px] lg:pt-[25vh] lg:pl-[55vw] pb-36 md:pb-0">
				{/* AI Badge */}
				<div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 lg:justify-start">
					<div className="w-2 h-2 rounded-full bg-gobai-cyan animate-pulse" />
					<span className="text-xs font-bold tracking-widest text-gobai-cyan uppercase">
						{t('aiBadge')}
					</span>
				</div>

				<h1
					ref={titleRef}
					className="text-3xl md:text-3xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight uppercase"
					style={{
						background: 'linear-gradient(135deg, var(--color-gobai-blue-bright), var(--color-gobai-cyan-light), var(--color-gobai-turquoise-light))',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
						textShadow: '0 0 40px rgba(179, 232, 255, 0.3)',
					}}
				>
					<span className="block text-white lg:text-left">{t('title')}</span>
					{/* <small>Con IA</small> */}
				</h1>

				<p
					ref={subtitleRef}
					className="text-md md:text-lg text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed font-light lg:text-left"
					style={{
						textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
					}}
				>
					{t('subtitle')}
				</p>

				<div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
					<button
						onClick={handleStartClick}
						className="group relative px-10 py-4 bg-white text-lg font-bold rounded-full overflow-hidden hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)]"
						style={{
							color: 'var(--color-gobai-blue-dark)',
						}}
					>
						<span className="relative z-10">{t('ctaStart')}</span>
						<div
							className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-gobai-cyan-light to-gobai-turquoise-light"
						/>
					</button>

					<button
						className="group relative px-10 py-4 border-2 border-white/30 text-white text-lg font-bold rounded-full overflow-hidden hover:scale-105 hover:border-gobai-cyan hover:shadow-[0_10px_30px_rgba(98,228,255,0.2)] backdrop-blur-sm"
					>
						<span className="relative z-10">{t('ctaDemo')}</span>
						<div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-linear-to-r from-gobai-cyan to-gobai-turquoise" />
						<div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full" />
					</button>
				</div>

				{/* Stats or features */}
				{/* <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div className="text-center">
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: 'var(--color-gobai-cyan-light)' }}
            >
              99.9%
            </div>
            <div className="text-white/80">Tasa de Precisión</div>
          </div>
          <div className="text-center">
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: 'var(--color-gobai-turquoise-light)' }}
            >
              50x
            </div>
            <div className="text-white/80">Procesamiento Más Rápido</div>
          </div>
          <div className="text-center">
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: 'var(--color-gobai-blue-bright)' }}
            >
              24/7
            </div>
            <div className="text-white/80">Soporte IA</div>
          </div>
        </div> */}
			</div>

			{/* Bottom gradient overlay */}
			<div
				className="absolute bottom-0 left-0 right-0 h-32"
				style={{
					background: 'linear-gradient(to top, rgba(255, 255, 255, 0.1), transparent)',
				}}
			/>


		</div>
	);
}