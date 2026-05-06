'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { 
  RiArrowLeftLine,
  RiMapPinLine,
  RiCalendarLine,
  RiFacebookCircleFill,
  RiInstagramLine,
  RiLinksLine
} from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type Container, type ISourceOptions, type Engine } from "@tsparticles/engine";
import { getSuccessCaseBySlug } from '@/app/actions/success-cases';

export default function SuccessCaseDetailPage() {
  const t = useTranslations('CasosDeExito');
  const locale = useLocale();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false);
  const [caseData, setCaseData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
    }).then(() => {
        setInit(true);
    });

    const fetchCase = async () => {
      const data = await getSuccessCaseBySlug(slug, locale as any);
      if (data) {
        setCaseData(data);
      } else {
        router.push('/casos-de-exito');
      }
      setIsLoading(false);
    };
    fetchCase();
  }, [slug, router, locale]);

  const options: ISourceOptions = useMemo(() => ({
    fpsLimit: 60,
    particles: {
        color: { value: ["#00f2fe", "#4facfe"] },
        move: { enable: true, speed: 0.2 },
        number: { value: 30, density: { enable: true, area: 800 } },
        opacity: { value: { min: 0.1, max: 0.4 } },
        size: { value: { min: 1, max: 2 } }
    },
    background: { color: "transparent" },
  }), []);

  useEffect(() => {
    if (isLoading || !caseData) return;

    const ctx = gsap.context(() => {
      gsap.from('.header-content > *', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
      });

      gsap.from('.main-content', {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, caseData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#00040a] flex items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-b-2 border-gobai-cyan rounded-full animate-spin" />
      </div>
    );
  }

  if (!caseData) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Success Case Hero - Bolder & More Minimal than Blog */}
      <section className="relative pt-60 pb-40 overflow-hidden bg-[#00040a]">
        {/* Background Image if available */}
        {caseData.mainImage && (
          <div className="absolute inset-0 z-0">
            <Image 
              src={caseData.mainImage} 
              alt={caseData.title} 
              fill 
              className="object-cover opacity-40 blur-[2px]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#00040a]/60 via-[#00040a]/90 to-white" />
          </div>
        )}

        {/* Cinematic Lighting */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-0 right-0 w-[1000px] h-[800px] bg-gobai-blue/20 rounded-full blur-[150px] opacity-50" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-gobai-cyan/20 rounded-full blur-[130px] opacity-40" />
        </div>

        {init && (
          <div className="absolute inset-0 z-[2] opacity-30">
            <Particles id="case-particles" options={options} />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-6 relative z-10 header-content text-center lg:text-left">
          <Link 
            href="/casos-de-exito" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-gobai-cyan transition-colors mb-16 uppercase tracking-[0.2em] text-sm font-black"
          >
            <RiArrowLeftLine className="h-5 w-5" />
            {t('backToList') || 'Volver a Casos de Éxito'}
          </Link>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
            <div className="inline-block px-5 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-[0.3em]">
              Caso de éxito
            </div>
            {caseData.tag && (
              <div className="inline-block px-5 py-2 rounded-xl bg-gobai-cyan/10 border border-gobai-cyan/30 text-gobai-cyan text-xs font-black uppercase tracking-[0.3em]">
                {caseData.tag}
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-12 uppercase leading-tight">
            {caseData.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-12 py-10 border-t border-white/10">
            {(caseData.location || caseData.date) && (
              <div className="flex items-center gap-10">
                {caseData.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <RiMapPinLine className="h-5 w-5 text-gobai-cyan" />
                    </div>
                    <div>
                      <div className="text-white/40 text-[10px] uppercase tracking-widest font-black mb-1">Ubicación</div>
                      <div className="text-white font-bold text-sm uppercase">{caseData.location}</div>
                    </div>
                  </div>
                )}
                {caseData.date && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <RiCalendarLine className="h-5 w-5 text-gobai-turquoise" />
                    </div>
                    <div>
                      <div className="text-white/40 text-[10px] uppercase tracking-widest font-black mb-1">Fecha</div>
                      <div className="text-white font-bold text-sm uppercase">{caseData.date}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Social buttons removed from here as they are now in the sticky sidebar */}
          </div>
        </div>
      </section>

      {/* Case Content Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-16">
          {/* Share Sidebar */}
          <div className="md:w-16 flex flex-row md:flex-col items-center gap-6 md:sticky md:top-32 h-fit">
            <div 
              className="text-[10px] font-black uppercase tracking-widest text-gray-300 hidden md:block mb-4"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {locale === 'es' ? 'Compartir' : 'Share'}
            </div>
            <a 
              href="https://www.facebook.com/people/GOBAI/61578267635547/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gobai-cyan hover:text-white hover:border-gobai-cyan transition-all"
              title="Follow on Facebook"
            >
              <RiFacebookCircleFill className="h-5 w-5" />
            </a>
            <a 
              href="https://www.instagram.com/gobai.la" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gobai-cyan hover:text-white hover:border-gobai-cyan transition-all"
              title="Follow on Instagram"
            >
              <RiInstagramLine className="h-5 w-5" />
            </a>
            <div className="relative">
              <button 
                onClick={copyToClipboard}
                className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gobai-cyan hover:text-white hover:border-gobai-cyan transition-all"
                title="Copy Link"
              >
                <RiLinksLine className="h-5 w-5" />
              </button>
              {copied && (
                <div className="absolute left-full ml-4 md:left-auto md:ml-0 md:-top-10 md:left-1/2 md:-translate-x-1/2 px-3 py-1 bg-gobai-blue-dark text-white text-[10px] font-black uppercase tracking-widest rounded-lg animate-in fade-in zoom-in slide-in-from-bottom-2 duration-300">
                  {locale === 'es' ? 'Copiado' : 'Copied'}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 main-content">
            {/* Multi-image Gallery or Intro Image */}
            {caseData.images && caseData.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                {caseData.images.slice(0, 2).map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl group border border-gray-100">
                    <Image 
                      src={img} 
                      alt={`${caseData.title} ${idx + 1}`} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Description / Summary */}
            <div className="text-2xl md:text-3xl font-display font-medium text-gobai-blue-dark mb-16 leading-relaxed border-l-4 border-gobai-cyan pl-8 py-4 italic">
              {caseData.description}
            </div>

            {/* Rich Text Content */}
            <div 
              className="tiptap-content text-lg md:text-xl text-gray-700 leading-loose prose prose-blue prose-xl"
              dangerouslySetInnerHTML={{ __html: caseData.content }}
            />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 bg-gobai-blue-dark text-white text-center overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gobai-cyan via-gobai-turquoise to-gobai-cyan" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-7xl font-display font-bold mb-12 uppercase leading-tight">
            {t('final.title') || '¿Listo para tu próxima Victoria?'}
          </h2>
          <Link 
            href="/contacto"
            className="inline-flex items-center px-12 py-6 bg-white text-gobai-blue-dark font-black rounded-full hover:scale-110 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] uppercase tracking-[0.2em] text-base"
          >
            {t('final.button') || 'Comenzar Hoy'}
          </Link>
        </div>
      </section>
    </div>
  );
}
