'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function NavigationBar() {
	const t = useTranslations('Navbar');
	const navRef = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const isHomePage = pathname === '/' || pathname === '';

			if (isHomePage) {
				// Initial state for homepage - coordinated by HeroSection
				gsap.set(navRef.current, {
					y: -100,
					opacity: 0,
				});
			} else {
				// Entrance for other pages
				gsap.from(navRef.current, {
					y: -100,
					opacity: 0,
					duration: 1,
					ease: 'power3.out'
				});
			}

			// Hover animations for menu items
			gsap.set('.nav-item', {
				scale: 1,
			});

		}, navRef);

		return () => ctx.revert();
	}, [pathname]);

	const navItems = [
		{ name: t('home'), href: '/', hasDropdown: false },
		{ name: t('services'), href: '#servicios', hasDropdown: true },
		{ name: t('successCases'), href: '/casos-de-exito', hasDropdown: false },
		{ name: t('contact'), href: '/contacto', hasDropdown: false },
	];

	return (
		<nav
			ref={navRef}
			className={`fixed left-0 right-0 z-50 transition-all duration-500 ${isScrolled
				? 'bg-gobai-blue-dark/80 backdrop-blur-lg'
				: 'bg-transparent'
				}`}
			style={{
				boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none',
				top: isScrolled ? '0px' : '20px',
			}}
		>
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Desktop Navigation - Equally Distributed */}
				<div className="hidden lg:flex items-center justify-between h-20 w-full relative">
					{/* Left Navigation Items */}
					<div ref={menuRef} className="flex-1 flex items-center justify-start space-x-8">
						{navItems.slice(0, 2).map((item) => (
							<div key={item.name} className="relative group">
								<Link
									href={item.href}
									className="nav-item block relative px-4 py-2 text-white/90 hover:text-white font-display font-medium transition-all duration-300 group"
									style={{
										textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
									}}
								>
									<span className="relative z-10 flex items-center gap-1">
										{item.name}
										{item.hasDropdown && (
											<svg
												className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										)}
									</span>

									{/* Hover background effect */}
									<div
										className="absolute w-full inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"
										style={{
											background: 'linear-gradient(135deg, var(--color-gobai-blue-dark) 0%, var(--color-gobai-turquoise-dark) 100%)',
											boxShadow: '0 4px 20px rgba(31, 170, 163, 0.2)',
										}}
									/>

									{/* Bottom accent line */}
									<div
										className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300"
										style={{
											background: 'var(--color-gobai-turquoise)',
											boxShadow: '0 0 10px var(--color-gobai-turquoise)',
										}}
									/>
								</Link>

								{/* Dropdown menu */}
								{item.hasDropdown && item.name === 'Servicios' && (
									<div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
										<div
											className="rounded-xl p-6 shadow-2xl border border-white/10"
											style={{
												background: 'linear-gradient(135deg, rgba(0, 61, 102, 0.95) 0%, rgba(31, 170, 163, 0.95) 100%)',
												backdropFilter: 'blur(20px)',
											}}
										>
											<div className="space-y-3">
												<a href="/campanas-disruptivas" className="block text-white/90 hover:text-white transition-colors duration-200 py-2">Campañas Disruptivas</a>
												<a href="/gobiernos-politicas" className="block text-white/90 hover:text-white transition-colors duration-200 py-2">Gobiernos y Políticas</a>
											</div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>

					{/* Centered Logo */}
					<div ref={logoRef} className="flex-none flex items-center justify-center">
						<Link href="/" className="relative group cursor-pointer">
							<Image
								src="/img/gobai-white-logo.png"
								alt="Gobai"
								width={140}
								height={56}
								priority
								className="transition-all duration-300 group-hover:scale-105"
								style={{
									filter: 'drop-shadow(0 0 20px rgba(179, 232, 255, 0.3))',
								}}
							/>
							<div
								className="absolute inset-0 -z-10 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"
								style={{
									background: 'radial-gradient(ellipse, var(--color-gobai-cyan-light) 0%, transparent 70%)',
								}}
							/>
						</Link>
					</div>

					{/* Right Navigation Items */}
					<div className="flex-1 flex items-center justify-end space-x-8">
						{navItems.slice(2).map((item) => (
							<div key={item.name} className="relative group">
								<Link
									href={item.href}
									className="nav-item block relative px-4 py-2 text-white/90 hover:text-white font-display font-medium transition-all duration-300 group"
									style={{
										textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
									}}
								>
									<span className="relative z-10 flex items-center gap-1">
										{item.name}
										{item.hasDropdown && (
											<svg
												className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										)}
									</span>

									{/* Hover background effect */}
									<div
										className="absolute w-full inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"
										style={{
											background: 'linear-gradient(135deg, var(--color-gobai-blue-dark) 0%, var(--color-gobai-turquoise-dark) 100%)',
											boxShadow: '0 4px 20px rgba(31, 170, 163, 0.2)',
										}}
									/>

									{/* Bottom accent line */}
									<div
										className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300"
										style={{
											background: 'var(--color-gobai-turquoise)',
											boxShadow: '0 0 10px var(--color-gobai-turquoise)',
										}}
									/>
								</Link>

								{/* Dropdown menu */}
								{item.hasDropdown && item.name === 'Servicios' && (
									<div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
										<div
											className="rounded-xl p-6 shadow-2xl border border-white/10"
											style={{
												background: 'linear-gradient(135deg, rgba(0, 61, 102, 0.95) 0%, rgba(31, 170, 163, 0.95) 100%)',
												backdropFilter: 'blur(20px)',
											}}
										>
											<div className="space-y-3">
												<a href="/campanas-disruptivas" className="block text-white/90 hover:text-white transition-colors duration-200 py-2">Campañas Disruptivas</a>
												<a href="/gobiernos-politicas" className="block text-white/90 hover:text-white transition-colors duration-200 py-2">Gobiernos y Políticas</a>
											</div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Mobile Navigation */}
				<div className="flex lg:hidden items-center justify-between h-20">
					{/* Mobile Logo */}
					<div className="flex items-center">
						<Link href="/" className="relative group cursor-pointer">
							<Image
								src="/img/gobai-white-logo.png"
								alt="Gobai"
								width={140}
								height={56}
								priority
								className="transition-all duration-300 group-hover:scale-105"
								style={{
									filter: 'drop-shadow(0 0 20px rgba(179, 232, 255, 0.3))',
								}}
							/>
						</Link>
					</div>

					{/* Mobile Menu Toggle */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="relative w-10 h-10 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200"
					>
						<div className="w-6 h-6 flex flex-col justify-center">
							<span
								className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
									}`}
								style={{ backgroundColor: 'var(--color-gobai-turquoise)' }}
							/>
							<span
								className={`block h-0.5 w-6 bg-current mt-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
									}`}
								style={{ backgroundColor: 'var(--color-gobai-turquoise)' }}
							/>
							<span
								className={`block h-0.5 w-6 bg-current mt-1 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
									}`}
								style={{ backgroundColor: 'var(--color-gobai-turquoise)' }}
							/>
						</div>
					</button>
				</div>
			</div>

			{/* Full-Width Mobile Menu Overlay */}
			<div
				className={`lg:hidden fixed top-0 left-0 w-screen h-screen z-50 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
					}`}
				style={{
					background: 'linear-gradient(135deg, rgba(0, 26, 46, 0.98) 0%, rgba(0, 61, 102, 0.95) 50%, rgba(31, 170, 163, 0.95) 100%)',
					backdropFilter: 'blur(20px)',
					top: '0',
					left: '0',
					right: '0',
					bottom: '0',
					position: 'fixed',
				}}
			>
				{/* Mobile Menu Header */}
				<div className="flex items-center justify-between p-6 border-b border-white/10">
					<Link href="/" className="cursor-pointer">
						<Image
							src="/img/gobai-white-logo.png"
							alt="Gobai"
							width={140}
							height={56}
							priority
							className="transition-all duration-300"
							style={{
								filter: 'drop-shadow(0 0 20px rgba(179, 232, 255, 0.3))',
							}}
						/>
					</Link>
					<button
						onClick={() => {
							setIsMobileMenuOpen(false);
							setActiveSubmenu(null);
						}}
						className="w-10 h-10 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Mobile Menu Content */}
				<div className="flex-1 overflow-y-auto p-6">
					<div className="space-y-2">
						{navItems.map((item) => (
							<div key={item.name} className="relative">
								{item.hasDropdown ? (
									<>
										<button
											onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
											className="w-full flex items-center justify-between p-4 text-white hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl font-medium text-lg"
										>
											<span>{item.name}</span>
											<svg
												className={`w-5 h-5 transition-transform duration-300 ${activeSubmenu === item.name ? 'rotate-180' : ''
													}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</button>

										{/* Submenu */}
										{item.name === 'Servicios' && (
											<div
												className={`overflow-hidden transition-all duration-300 ${activeSubmenu === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
													}`}
											>
												<div className="ml-4 mt-2 space-y-2 border-l-2 border-white/20 pl-4">
													<a
														href="/campanas-disruptivas"
														className="block p-3 text-white/80 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
														onClick={() => {
															setIsMobileMenuOpen(false);
															setActiveSubmenu(null);
														}}
													>
														Campañas Disruptivas
													</a>
													<a
														href="/gobiernos-politicas"
														className="block p-3 text-white/80 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
														onClick={() => {
															setIsMobileMenuOpen(false);
															setActiveSubmenu(null);
														}}
													>
														Gobiernos y Políticas Públicas
													</a>
												</div>
											</div>
										)}
									</>
								) : (
									<a
										href={item.href}
										className="block p-4 text-white hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl font-medium text-lg"
										onClick={() => {
											setIsMobileMenuOpen(false);
											setActiveSubmenu(null);
										}}
									>
										{item.name}
									</a>
								)}
							</div>
						))}
					</div>

					{/* Mobile CTA Section */}
					<div className="mt-8 pt-8 border-t border-white/10">
						<button
							className="w-full py-4 px-6 font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
							style={{
								background: 'linear-gradient(135deg, var(--color-gobai-turquoise-dark) 0%, var(--color-gobai-turquoise) 50%, var(--color-gobai-cyan-dark) 100%)',
								boxShadow: '0 8px 30px rgba(31, 170, 163, 0.4)',
							}}
							onClick={() => {
								setIsMobileMenuOpen(false);
								setActiveSubmenu(null);
							}}
						>
							Comenzar
						</button>
					</div>

					{/* Contact Info */}
					<div className="mt-8 pt-8 border-t border-white/10 text-center">
						<p className="text-white/60 text-sm mb-2">¿Necesitas ayuda?</p>
						<a href="mailto:info@gobai.com" className="text-white hover:text-white/80 transition-colors duration-200">
							info@gobai.com
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
}