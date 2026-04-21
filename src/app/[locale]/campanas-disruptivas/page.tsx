'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  RiRadarLine, 
  RiDashboardLine, 
  RiGroupLine, 
  RiMessage3Line, 
  RiBarChartLine, 
  RiShieldFlashLine,
  RiGlobalLine,
  RiShakeHandsLine
} from '@remixicon/react';
import Image from 'next/image';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { type Container, type ISourceOptions, type Engine } from "@tsparticles/engine";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CampanasDisruptivasPage() {
  const t = useTranslations('CampanasDisruptivas');
  const containerRef = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
        await loadFull(engine);
    }).then(() => {
        setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
  }, []);

  const options: ISourceOptions = useMemo(() => ({
    fpsLimit: 60,
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
        move: {
            enable: true,
            speed: 0.2,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
                default: "bounce"
            }
        },
        number: {
            value: 25,
            density: {
                enable: true,
                area: 800
            }
        },
        opacity: {
            value: { min: 0.1, max: 0.5 },
        },
        shape: {
            type: "circle"
        },
        size: {
            value: { min: 0.5, max: 1.5 },
        }
    },
    background: {
        color: "transparent"
    },
    detectRetina: true,
  }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline();
      
      gsap.set('.hero-content > *', {
        y: 60,
        opacity: 0
      });

      tl.to('.hero-content > *', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
      });

      // Section Animations
      const animSections = gsap.utils.toArray('.anim-section');
      animSections.forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* 1. Hero Section (DARK with BLUE GRADIENT) */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#00040a]">
        {/* Multi-point Cinematic Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-gobai-blue/20 rounded-full blur-[120px] opacity-60" />
          <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-gobai-cyan/10 rounded-full blur-[100px] opacity-40" />
          <div className="absolute -bottom-24 -right-24 w-[700px] h-[700px] bg-gobai-turquoise/10 rounded-full blur-[110px] opacity-40" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gobai-blue-light/10 rounded-full blur-[90px] opacity-30" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gobai-cyan-dark/10 rounded-full blur-[90px] opacity-30" />
        </div>
        
        {/* Particles */}
        {init && (
          <div className="absolute inset-0 z-[1] opacity-60">
            <Particles
              id="hero-particles"
              particlesLoaded={particlesLoaded}
              options={options}
              className="w-full h-full"
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 hero-content relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-display font-semibold mb-8 leading-tight tracking-tight uppercase">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto mb-12 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-gobai-cyan via-gobai-turquoise to-gobai-cyan text-[#00040a] font-black rounded-full shadow-[0_0_40px_rgba(98,228,255,0.6)] hover:shadow-[0_0_60px_rgba(98,228,255,0.8)] hover:scale-105 relative overflow-hidden group">
            <span className="relative z-10">{t('hero.cta')}</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full" />
          </button>
        </div>
      </section>

      {/* 2. Precision Section (WHITE) */}
      <section className="py-24 bg-white anim-section text-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-gobai-blue-dark leading-tight lowercase">
               {t('precision.title')}
            </h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
              {t('precision.description')}
            </p>
            
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-gobai-cyan/10 border border-gobai-cyan/20">
              <div className="w-12 h-12 rounded-xl bg-gobai-cyan flex items-center justify-center text-white shrink-0">
                 <RiRadarLine size={24} />
              </div>
              <div>
                 <div className="font-black text-gobai-blue-dark uppercase tracking-wide">{t('precision.feature')}</div>
                 <div className="text-gray-600 text-sm">{t('precision.featureDesc')}</div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-video">
               <div className="absolute inset-0 bg-linear-to-tr from-gobai-blue-dark/20 to-transparent z-10" />
               <Image 
                 src="/img/computer.jpg" 
                 alt="Precision Strategy" 
                 fill 
                 className="object-cover hover:scale-110"
                 priority
               />
            </div>
             {/* Decorative element from PDF */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gobai-cyan/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* 3. Suite Integral Section (WHITE - Full Width Cards) */}
      <section className="py-24 bg-[#f8fafc] anim-section border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-gobai-blue-dark uppercase">
            {t('suite.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-6 p-10 bg-white rounded-3xl shadow-sm border border-gray-50 hover:shadow-xl group overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gobai-cyan" />
                <div className="w-16 h-16 rounded-2xl bg-gobai-cyan/10 flex items-center justify-center text-gobai-cyan group-hover:bg-gobai-cyan group-hover:text-white shrink-0">
                  {i === 1 && <RiDashboardLine size={32} />}
                  {i === 2 && <RiMessage3Line size={32} />}
                  {i === 3 && <RiGlobalLine size={32} />}
                  {i === 4 && <RiBarChartLine size={32} />}
                </div>
                <h3 className="font-bold text-xl text-left text-gobai-blue-dark leading-snug">
                  {t(`suite.item${i}`)}
                </h3>
              </div>
            ))}
          </div>
          
          <button className="px-10 py-4 bg-gobai-cyan-dark text-white font-bold rounded-full hover:bg-gobai-cyan uppercase tracking-widest text-sm">
            {t('suite.cta')}
          </button>
        </div>
      </section>

      {/* 4. Demo Section (GRADIENT TURQUOISE) */}
      <section className="py-24 bg-linear-to-r from-gobai-blue-dark to-gobai-turquoise text-white relative overflow-hidden anim-section">
          <div className="absolute inset-0 bg-[#00040a]/10" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
             <h2 className="text-4xl md:text-6xl font-display font-bold mb-10 leading-tight uppercase">
                {t('demo.title')}
             </h2>
             <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                {t('demo.description')}
             </p>
             <button className="px-10 py-5 bg-white/20 backdrop-blur-md border border-white/40 text-white font-bold rounded-full hover:bg-white/30 uppercase tracking-widest">
                {t('demo.cta')}
             </button>
          </div>
          {/* Decorative shapes from PDF */}
          <div className="absolute -top-20 -left-20 w-64 h-64 border border-white/10 rounded-[60px] rotate-45" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 border border-white/10 rounded-full" />
      </section>

      {/* 5. Field Operations (WHITE) */}
      <section className="py-24 bg-white anim-section">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl aspect-square">
             <Image 
               src="/img/team.jpg" 
               alt="Team Operations" 
               fill 
               className="object-cover hover:scale-110"
             />
          </div>
          <div className="flex-1 text-gray-900">
             <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-gobai-blue-dark uppercase">
               {t('field.title')}
             </h2>
             <p className="text-gray-600 text-lg mb-12 leading-relaxed font-medium">
               {t('field.description')}
             </p>
             <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-gobai-cyan flex items-center justify-center text-white">
                       <RiRadarLine size={18} />
                    </div>
                    <span className="font-black text-gobai-blue-dark uppercase tracking-tight">{t(`field.item${i}`)}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 6. Communication (WHITE with center cards) */}
      <section className="py-24 bg-[#00040a]/[0.02] border-t border-gray-100 anim-section">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 text-gray-900">
               <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-gobai-blue-dark uppercase tracking-tight">
                  {t('communication.title')}
               </h2>
               <p className="max-w-3xl mx-auto text-lg text-gray-600 font-medium">
                  {t('communication.description')}
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl border border-gray-50 text-center group">
                     <div className="w-20 h-20 rounded-[28px] bg-gobai-cyan/10 flex items-center justify-center text-gobai-cyan mx-auto mb-10 group-hover:bg-gobai-cyan group-hover:text-white">
                        {i === 1 && <RiShakeHandsLine size={40} />}
                        {i === 2 && <RiRadarLine size={40} />}
                        {i === 3 && <RiBarChartLine size={40} />}
                     </div>
                     <h3 className="text-xl font-black text-gobai-blue-dark mb-4 uppercase tracking-snug">
                        {t(`communication.feature${i}.title`)}
                     </h3>
                     <p className="text-gray-600 font-medium leading-relaxed">
                        {t(`communication.feature${i}.desc`)}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. Final CTA (DARK with BLUE GRADIENT) */}
      <section className="py-32 bg-[#00040a] relative overflow-hidden text-center text-white anim-section">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,114,255,0.1)_0%,_transparent_60%)] pointer-events-none" />
          <div className="max-w-5xl mx-auto px-6 relative z-10">
             <div className="text-gobai-cyan font-black uppercase tracking-[0.4em] mb-6 text-sm">
                {t('final.question')}
             </div>
             <h2 className="text-4xl md:text-7xl font-display font-bold mb-16 uppercase leading-none">
                {t('final.title')}
             </h2>
             
             <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24">
                <button className="px-14 py-6 bg-gobai-cyan text-[#00040a] font-black rounded-full shadow-[0_20px_40px_rgba(98,228,255,0.3)] hover:scale-105 uppercase tracking-widest">
                   {t('final.cta1')}
                </button>
                <button className="px-14 py-6 border border-white/20 font-black rounded-full hover:bg-white/5 uppercase tracking-widest">
                   {t('final.cta2')}
                </button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[1, 2, 3].map(i => (
                   <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-gobai-cyan/40">
                      <div className="w-12 h-12 rounded-xl bg-gobai-cyan/20 flex items-center justify-center text-gobai-cyan mb-6">
                         {i === 1 && <RiShieldFlashLine size={24} />}
                         {i === 2 && <RiRadarLine size={24} />}
                         {i === 3 && <RiDashboardLine size={24} />}
                      </div>
                      <div className="text-white font-black text-lg mb-2 uppercase tracking-wide">{t(`final.box${i}`)}</div>
                      <div className="text-white/50 text-sm font-medium leading-snug">{t(`final.box${i}Desc`)}</div>
                   </div>
                ))}
             </div>
          </div>
      </section>
    </div>
  );
}
