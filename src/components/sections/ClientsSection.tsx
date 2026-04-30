'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation on scroll
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      // Infinite carousel animation handled by CSS class animate-carousel

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mock client logos with SVG icons
  const clients = [
    { name: 'Agrolibano', image: '/img/clientes/Incidencia%20Empresarial/L-Grupo-Agrolibano-wo-slogan.png' },
    { name: 'Chamba', image: '/img/clientes/Incidencia%20Empresarial/chamba.png' },
    { name: 'CCIT', image: '/img/clientes/Incidencia%20Empresarial/ccit.png' },
    { name: 'COHEP', image: '/img/clientes/Incidencia%20Empresarial/cohep.png' },
    { name: 'PNH', image: '/img/clientes/Incidencia%20Política/PNH_2016_logo.svg.png' },
    { name: 'Vamos Panamá', image: '/img/clientes/Incidencia%20Política/coalición%20vamos%20panamá.webp' },
    { name: 'Alcandía Marcovia', image: '/img/clientes/Incidencia%20Política/alcandia%20marcovia.png' },
    { name: 'Partido Liberal', image: '/img/clientes/Incidencia%20Política/partido%20liberal%20hn.png' },
    { name: 'AMDC', image: '/img/clientes/Incidencia%20Política/amdc-logo.webp' },
  ];

  // Duplicate clients for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section 
      ref={sectionRef}
      className="relative pt-0 pb-20 overflow-hidden animate-gradient"
      style={{
        background: 'linear-gradient(135deg, #001a2e 0%, var(--color-gobai-blue-dark) 20%, #002447 40%, var(--color-gobai-blue-dark) 60%, #001533 80%, var(--color-gobai-blue-dark) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            style={{
              background: 'linear-gradient(135deg, var(--color-gobai-blue-bright), var(--color-gobai-cyan-light), var(--color-gobai-turquoise-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(179, 232, 255, 0.3)',
            }}
          >
            Nuestros clientes
          </h2>
        </div>

        {/* Animated Logo Carousel */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div 
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
          />

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex items-center space-x-20 animate-carousel"
              style={{ width: 'max-content' }}
            >
              {duplicatedClients.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="shrink-0 group"
                >
                  <div className="w-48 h-24 flex items-center justify-center p-6 transition-all duration-300 hover:scale-110">
                    <div 
                      className="w-full h-full rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:shadow-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <div className="relative w-full h-full transition-all duration-300 group-hover:scale-110">
                        <Image
                          src={(client as any).image}
                          alt={client.name}
                          fill
                          className="object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16">
          <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
            Más de <span className="font-semibold" style={{ color: 'var(--color-gobai-turquoise-light)' }}>500+ empresas</span> confían en GOBAI
          </p>
        </div>
      </div>
    </section>
  );
}