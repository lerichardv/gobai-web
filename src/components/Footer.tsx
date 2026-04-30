'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import logoImg from '../../public/img/gobai-white-logo.png';
import { usePathname } from '@/i18n/routing';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');
  const isAdminPage = pathname.startsWith('/admin');

  if (isAuthPage || isAdminPage) {
    return null;
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([logoRef.current, navigationRef.current, socialRef.current, copyrightRef.current], {
        y: 50,
        opacity: 0,
      });

      gsap.set('.footer-particle', {
        scale: 0,
        opacity: 0,
      });

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        }
      });

      tl.to(logoRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      })
      .to(navigationRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .to(socialRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4')
      .to(copyrightRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .to('.footer-particle', {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1,
      }, '-=0.6');



    }, footerRef);

    return () => ctx.revert();
  }, []);

  const navigationLinks = [
    {
      title: 'Navegación',
      links: [
        { name: 'Inicio', href: '/' },
        { name: 'Casos de éxito', href: '/casos-de-exito' },
        { name: 'Contacto', href: '/contacto' },
      ]
    },
    {
      title: 'Servicios',
      links: [
        { name: 'Campañas Disruptivas', href: '/campanas-disruptivas' },
        { name: 'Gobiernos y Políticas', href: '/gobiernos-politicas' },
      ]
    },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000510 0%, #000814 25%, #001122 50%, #000510 75%, #000000 100%)',
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Particles */}
        <div className="footer-particle absolute top-20 left-1/4 animate-float-short">
          <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: 'var(--color-gobai-cyan)', opacity: 0.4 }}></div>
        </div>
        <div className="footer-particle absolute top-32 right-1/3 animate-float-short" style={{ animationDelay: '0.8s' }}>
          <div className="w-1 h-1 rounded-full animate-pulse-glow" style={{ background: 'var(--color-gobai-turquoise)', opacity: 0.3, animationDelay: '0.4s' }}></div>
        </div>
        <div className="footer-particle absolute top-1/2 left-1/6 animate-float-short" style={{ animationDelay: '1.6s' }}>
          <div className="w-3 h-3 rounded-full animate-pulse-glow" style={{ background: 'var(--color-gobai-blue-bright)', opacity: 0.5, animationDelay: '0.8s' }}></div>
        </div>
        <div className="footer-particle absolute bottom-32 right-1/4 animate-float-short" style={{ animationDelay: '2.4s' }}>
          <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: 'var(--color-gobai-cyan-light)', opacity: 0.4, animationDelay: '1.2s' }}></div>
        </div>
        <div className="footer-particle absolute bottom-20 left-1/3 animate-float-short" style={{ animationDelay: '3.2s' }}>
          <div className="w-1 h-1 rounded-full animate-pulse-glow" style={{ background: 'var(--color-gobai-turquoise-light)', opacity: 0.6, animationDelay: '1.6s' }}></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-gobai-cyan)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
          {/* Logo and Description */}
          <div ref={logoRef} className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src={logoImg}
                alt="Gobai"
                width={180}
                height={72}
                priority
                className="transition-all duration-300 hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(179, 232, 255, 0.3))',
                }}
              />
            </div>
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              Revolucionamos la política con inteligencia artificial avanzada. 
              Lideramos el cambio hacia un futuro más inteligente y estratégico.
            </p>
          </div>

          {/* Navigation Links */}
          <div ref={navigationRef} className="lg:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-md">
              {navigationLinks.map((section, index) => (
                <div key={index}>
                  <h3 className="text-white font-bold text-lg mb-4 relative">
                    {section.title}
                    <div 
                      className="absolute bottom-0 left-0 w-8 h-0.5 mt-2"
                      style={{ background: 'var(--color-gobai-turquoise)' }}
                    />
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-white/60 hover:text-white transition-all duration-300 hover:translate-x-1 block text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div ref={socialRef} className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-white font-semibold text-lg mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    title={social.name}
                  >
                    <div className="text-white/70 group-hover:text-white transition-colors duration-300">
                      {social.icon}
                    </div>
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-gobai-cyan), var(--color-gobai-turquoise))',
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right">
              <div className="mb-2">
                <a 
                  href="mailto:info@gobai.com" 
                  className="text-white hover:text-white/80 transition-colors duration-300 text-lg font-medium"
                  style={{ color: 'var(--color-gobai-turquoise-light)' }}
                >
                  info@gobai.com
                </a>
              </div>
              <div className="text-white/60 text-sm">
                +504 2234-5678
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div ref={copyrightRef} className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
            <div className="mb-4 md:mb-0">
              <p>© 2025 Gobai. Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors duration-300">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Términos de Servicio</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </div>

      {/* Top Edge Glow */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-gobai-cyan), transparent)',
          opacity: 0.3,
        }}
      />
    </footer>
  );
}