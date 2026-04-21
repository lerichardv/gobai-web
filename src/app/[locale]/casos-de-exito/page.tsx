'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

gsap.registerPlugin(ScrollTrigger);

export default function CasosDeExitoPage() {
  const t = useTranslations('CasosDeExito');
  const containerRef = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = useMemo(() => ({
    background: { color: "transparent" },
    fpsLimit: 120,
    particles: {
      color: { value: "#62e4ff" },
      links: {
        color: "#62e4ff",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none" as const,
        outModes: { default: "bounce" as const },
      },
      number: { density: { enable: true, area: 800 }, value: 15 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      const tl = gsap.timeline();
      gsap.set('.hero-animate', { y: 60, opacity: 0 });
      tl.to('.hero-animate', { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out' });

      // Stat cards entrance
      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 80%',
        }
      });
      
      gsap.set('.stat-card', { y: 40, opacity: 0 });
      statsTl.to('.stat-card', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Projects entrance
      const projectCards = gsap.utils.toArray('.project-card');
      projectCards.forEach((card: any) => {
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        });

        gsap.set(card, { y: 60, opacity: 0 });
        cardTl.to(card, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { key: 'stat1', icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )},
    { key: 'stat2', icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )},
    { key: 'stat3', icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { key: 'stat4', icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* 1. Hero Section (DARK) */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#00040a]">
        {/* Multi-point Cinematic Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-gobai-blue/20 rounded-full blur-[120px] opacity-60" />
          <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-gobai-cyan/10 rounded-full blur-[100px] opacity-40" />
          <div className="absolute -bottom-24 -right-24 w-[700px] h-[700px] bg-gobai-turquoise/10 rounded-full blur-[110px] opacity-40" />
        </div>
        
        {init && (
          <div className="absolute inset-0 z-[1] opacity-40">
            <Particles id="hero-particles" options={particlesOptions} className="w-full h-full" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="hero-animate text-5xl md:text-7xl font-display font-semibold text-white mb-8 bg-gradient-to-r from-gobai-cyan to-gobai-turquoise bg-clip-text text-transparent uppercase tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="hero-animate text-lg md:text-xl text-white/70 max-w-4xl mx-auto mb-20 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="stats-container grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card group relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-gobai-cyan/50 hover:bg-white/10">
                <div className="mb-4 inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-gobai-blue/20 to-gobai-cyan/20 text-gobai-cyan group-hover:scale-110">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  {t(`hero.${stat.key}`)}
                </div>
                <div className="text-sm text-white/50 uppercase tracking-widest">
                  {t(`hero.${stat.key}Label`)}
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gobai-cyan/5 opacity-0 group-hover:opacity-100 blur-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Projects Section (WHITE) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gobai-blue-dark mb-6 uppercase tracking-tight">
              {t('projects.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('projects.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="project-card group bg-[#f8fafc] rounded-[40px] overflow-hidden border border-gray-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src="/img/team.jpg" 
                    alt="Project" 
                    fill 
                    className="object-cover group-hover:scale-110" 
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-gobai-turquoise text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
                    {t('projects.tag')}
                  </div>
                </div>
                
                <div className="p-10">
                  <h3 className="text-2xl font-display font-bold text-gobai-blue-dark mb-4 leading-tight group-hover:text-gobai-turquoise">
                    {t('projects.cardTitle')}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {t('projects.cardDesc')}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        {t('projects.location')}
                      </span>
                      <span className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        {t('projects.date')}
                      </span>
                    </div>
                    <button className="px-6 py-3 bg-white text-gobai-blue-dark border border-gobai-blue-dark/20 text-xs font-bold rounded-full hover:bg-gobai-blue-dark hover:text-white hover:border-transparent uppercase tracking-widest">
                      {t('projects.cta')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Final CTA Section (BLUE) */}
      <section className="relative py-32 bg-gobai-blue-dark overflow-hidden">
        {/* Background Energy */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gobai-cyan/10 rounded-full blur-[150px] animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 uppercase tracking-tight">
            {t('final.title')}
          </h2>
          <p className="text-xl text-white/70 mb-12 leading-relaxed">
            {t('final.description')}
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-gobai-cyan via-gobai-turquoise to-gobai-cyan text-[#00040a] font-black rounded-full shadow-[0_0_40px_rgba(98,228,255,0.6)] hover:shadow-[0_0_60px_rgba(98,228,255,0.8)] hover:scale-105 relative overflow-hidden group uppercase tracking-widest">
            <span className="relative z-10">{t('final.button')}</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full" />
          </button>
        </div>
      </section>
    </div>
  );
}
