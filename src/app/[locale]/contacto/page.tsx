'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiSendPlaneLine } from '@remixicon/react';
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

gsap.registerPlugin(ScrollTrigger);

export default function ContactoPage() {
  const t = useTranslations('Contacto');
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
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
      },
      modes: {
        bubble: {
          distance: 100,
          duration: 3,
          opacity: 0.8,
          size: 4,
        },
      },
    },
    particles: {
      color: {
        value: ["#00f2fe", "#4facfe", "#00c6ff", "#0072ff", "#70e1f5"],
      },
      links: {
        color: "#62e4ff",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.2,
        direction: "none" as const,
        random: true,
        straight: false,
        outModes: { default: "bounce" as const },
      },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: {
        value: { min: 0.1, max: 0.5 },
      },
      shape: { type: "circle" },
      size: {
        value: { min: 0.5, max: 1.5 },
      },
    },
    background: { color: "transparent" },
    detectRetina: true,
  }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      const tl = gsap.timeline();
      gsap.set('.hero-animate', { y: 60, opacity: 0 });
      tl.to('.hero-animate', { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out' });

      // Floating elements scale entrance
      gsap.from('.floating-element', {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      });

      // Section entrance
      const animSections = gsap.utils.toArray('.anim-section');
      animSections.forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* 1. Hero & Form Section (DARK) */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#00040a]">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1000px] bg-gobai-blue/20 rounded-full blur-[140px] opacity-60" />
          <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-gobai-cyan/15 rounded-full blur-[120px] opacity-40" />
          <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] bg-gobai-turquoise/15 rounded-full blur-[120px] opacity-40" />
        </div>

        {/* Floating Particles (Floating Dots) */}
        {init && (
          <div className="absolute inset-0 z-[1] opacity-50">
            <Particles id="contacto-particles" options={particlesOptions} className="w-full h-full" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="hero-animate text-5xl md:text-7xl font-display font-bold text-white mb-8 tracking-tight uppercase">
              {t('hero.title')}
            </h1>
            <p className="hero-animate text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-stretch">
            {/* Form Card */}
            <div className="hero-animate flex-1 bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-10 shadow-2xl">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-white uppercase tracking-widest">{t('hero.form.name')}</label>
                    <input 
                      type="text" 
                      placeholder={t('hero.form.namePlaceholder')}
                      className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gobai-cyan transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-white uppercase tracking-widest">{t('hero.form.email')}</label>
                    <input 
                      type="email" 
                      placeholder={t('hero.form.emailPlaceholder')}
                      className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gobai-cyan transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white uppercase tracking-widest">{t('hero.form.phone')}</label>
                  <input 
                    type="text" 
                    placeholder={t('hero.form.phonePlaceholder')}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gobai-cyan transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white uppercase tracking-widest">{t('hero.form.message')}</label>
                  <textarea 
                    rows={4}
                    placeholder={t('hero.form.messagePlaceholder')}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gobai-cyan transition-colors resize-none"
                  />
                </div>
                <button className="w-full py-5 bg-gradient-to-r from-gobai-cyan via-gobai-turquoise to-gobai-cyan text-[#00040a] font-black rounded-2xl shadow-[0_0_40px_rgba(98,228,255,0.4)] hover:shadow-[0_0_60px_rgba(98,228,255,0.6)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm">
                  <RiSendPlaneLine size={20} />
                  {t('hero.form.submit')}
                </button>
              </form>
            </div>

            {/* Image Card */}
            <div className="hero-animate flex-1 relative rounded-[40px] overflow-hidden group">
              <Image 
                src="/img/computer.jpg" 
                alt="Office" 
                fill 
                className="object-cover brightness-75 transition-transform duration-[10s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00040a] via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
                <div className="bg-gobai-turquoise text-white text-[10px] font-black px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-[0.2em]">
                  {t('hero.image.tag')}
                </div>
                <p className="text-white text-sm font-medium leading-relaxed">
                  {t('hero.image.tagDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Communication Channels Section (WHITE) */}
      <section className="py-32 bg-white anim-section">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-gobai-blue-dark mb-8 uppercase tracking-tight">
            {t('channels.title')}
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-20 font-medium leading-relaxed">
            {t('channels.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="group p-12 bg-[#f8fafc] rounded-[48px] border border-gray-100 shadow-xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-gobai-cyan/10 flex items-center justify-center text-gobai-cyan mx-auto mb-8 group-hover:bg-gobai-cyan group-hover:text-white transition-colors duration-300">
                  {i === 1 && <RiMailLine size={32} />}
                  {i === 2 && <RiPhoneLine size={32} />}
                  {i === 3 && <RiMapPinLine size={32} />}
                </div>
                <h3 className="text-xl font-bold text-gobai-blue-dark mb-4 uppercase">
                  {t(`channels.card${i}.title`)}
                </h3>
                <div className="text-2xl font-black text-gobai-blue-dark mb-4 tracking-tight">
                  {t(`channels.card${i}.value`)}
                </div>
                <p className="text-gray-400 font-medium uppercase text-xs tracking-widest">
                  {t(`channels.card${i}.desc`)}
                </p>
                <div className="mt-8 mx-auto w-12 h-1 bg-gobai-cyan/20 group-hover:w-24 group-hover:bg-gobai-cyan transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Final Content Section (DARK BLUE) */}
      <section className="py-40 bg-gobai-blue-dark relative overflow-hidden anim-section">
        <div className="absolute inset-0 bg-[#00040a]/20" />
        {/* Background circuit pattern placeholder */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-gobai-cyan) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-7xl font-display font-bold mb-10 uppercase leading-none tracking-tight">
            {t('final.title')}
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
            {t('final.subtitle')}
          </p>
        </div>
      </section>
    </div>
  );
}
