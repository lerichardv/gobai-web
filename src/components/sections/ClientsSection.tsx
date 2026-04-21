'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    { 
      name: 'TechCorp', 
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <rect width="60" height="60" rx="12" fill="currentColor" opacity="0.1"/>
          <path d="M15 20h30v4H15v-4zm0 8h20v4H15v-4zm0 8h25v4H15v-4z" fill="currentColor" opacity="0.6"/>
          <circle cx="45" cy="30" r="8" fill="currentColor" opacity="0.3"/>
        </svg>
      )
    },
    { 
      name: 'DataFlow', 
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="25" fill="currentColor" opacity="0.1"/>
          <path d="M20 25l10 5-10 5v-10zm20 0v10l-10-5 10-5z" fill="currentColor" opacity="0.6"/>
          <circle cx="30" cy="30" r="3" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'CloudSync', 
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M45 25c0-8.284-6.716-15-15-15s-15 6.716-15 15c-5.523 0-10 4.477-10 10s4.477 10 10 10h30c5.523 0 10-4.477 10-10s-4.477-10-10-10z" fill="currentColor" opacity="0.2"/>
          <circle cx="25" cy="30" r="2" fill="currentColor" opacity="0.6"/>
          <circle cx="35" cy="30" r="2" fill="currentColor" opacity="0.6"/>
          <path d="M30 35v-8" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
        </svg>
      )
    },
    { 
      name: 'InnovateLab', 
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <polygon points="30,10 50,25 50,35 30,50 10,35 10,25" fill="currentColor" opacity="0.1"/>
          <polygon points="30,20 40,25 40,35 30,40 20,35 20,25" fill="currentColor" opacity="0.3"/>
          <circle cx="30" cy="30" r="5" fill="currentColor" opacity="0.7"/>
        </svg>
      )
    },
    { 
      name: 'SmartSys', 
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <rect x="10" y="15" width="40" height="30" rx="6" fill="currentColor" opacity="0.1"/>
          <rect x="15" y="20" width="10" height="8" rx="2" fill="currentColor" opacity="0.4"/>
          <rect x="30" y="20" width="15" height="3" rx="1" fill="currentColor" opacity="0.6"/>
          <rect x="30" y="27" width="10" height="3" rx="1" fill="currentColor" opacity="0.6"/>
          <rect x="15" y="35" width="30" height="3" rx="1" fill="currentColor" opacity="0.3"/>
        </svg>
      )
    },
    { 
      name: 'Digital+', 
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="20" fill="currentColor" opacity="0.1"/>
          <path d="M30 20v20M20 30h20" stroke="currentColor" strokeWidth="3" opacity="0.6"/>
          <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
        </svg>
      )
    },
    { 
      name: 'FlexTech', 
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M15 15h30v30H15z" fill="currentColor" opacity="0.1"/>
          <path d="M20 20l20 20M40 20L20 40" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
          <circle cx="30" cy="30" r="6" fill="currentColor" opacity="0.6"/>
        </svg>
      )
    },
    { 
      name: 'NextGen', 
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M10 30L30 10l20 20-20 20-20-20z" fill="currentColor" opacity="0.2"/>
          <path d="M20 30l10-10 10 10-10 10-10-10z" fill="currentColor" opacity="0.5"/>
          <circle cx="30" cy="30" r="4" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'ProActive', 
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <rect x="15" y="15" width="30" height="30" rx="8" fill="currentColor" opacity="0.1"/>
          <path d="M25 25h10v2H25v-2zm0 4h15v2H25v-2zm0 4h12v2H25v-2z" fill="currentColor" opacity="0.6"/>
          <circle cx="22" cy="35" r="2" fill="currentColor" opacity="0.8"/>
        </svg>
      )
    },
    { 
      name: 'Velocity', 
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M10 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20S10 41.046 10 30z" fill="currentColor" opacity="0.1"/>
          <path d="M25 25l15 5-15 5v-4H15v-2h10v-4z" fill="currentColor" opacity="0.6"/>
        </svg>
      )
    },
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
        <div className="text-center mt-16">
          <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
            Más de <span className="font-semibold" style={{ color: 'var(--color-gobai-turquoise-light)' }}>500+ empresas</span> confían en GOBAI
          </p>
        </div>
      </div>
    </section>
  );
}