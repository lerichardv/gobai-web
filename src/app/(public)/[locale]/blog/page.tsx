'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  RiCalendarLine, 
  RiUserLine, 
  RiArrowRightLine,
  RiTimeLine
} from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { type Container, type ISourceOptions, type Engine } from "@tsparticles/engine";
import { getPublishedBlogPosts } from '@/app/actions/blog';
import { getAuthorDisplayName, stripHtml } from '@/lib/blog-utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogListPage() {
  const t = useTranslations('Blog');
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
        await loadFull(engine);
    }).then(() => {
        setInit(true);
    });

    const fetchPosts = async () => {
      const data = await getPublishedBlogPosts(locale);
      setPosts(data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

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
    if (isLoading) return;

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

      // Post Cards Animation
      gsap.from('.post-card', {
        scrollTrigger: {
          trigger: '.posts-grid',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#00040a]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-gobai-blue/20 rounded-full blur-[120px] opacity-60" />
          <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-gobai-cyan/10 rounded-full blur-[100px] opacity-40" />
          <div className="absolute -bottom-24 -right-24 w-[700px] h-[700px] bg-gobai-turquoise/10 rounded-full blur-[110px] opacity-40" />
        </div>
        
        {init && (
          <div className="absolute inset-0 z-[1] opacity-60">
            <Particles
              id="blog-particles"
              particlesLoaded={particlesLoaded}
              options={options}
              className="w-full h-full"
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 hero-content relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-gobai-cyan text-sm font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-gobai-cyan animate-pulse" />
            Actualidad
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-8 uppercase">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto mb-12">
            {t('hero.subtitle')}
          </p>
          
          {/* Search Bar in Hero */}
          <div className="max-w-2xl mx-auto relative group">
            <input 
              type="text"
              placeholder={locale === 'es' ? 'Buscar artículos...' : 'Search articles...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:border-gobai-cyan/50 focus:ring-4 focus:ring-gobai-cyan/10 transition-all text-lg"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gobai-cyan flex items-center justify-center text-[#00040a] shadow-[0_0_20px_rgba(98,228,255,0.4)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts-section" className="py-24 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gobai-blue-dark uppercase">
              {searchQuery ? (locale === 'es' ? 'Resultados' : 'Results') : t('latest')}
            </h2>
            <div className="px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm text-gray-400 text-[10px] font-black uppercase">
              {filteredPosts.length} {locale === 'es' ? 'Artículos' : 'Articles'}
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-[40px] h-[300px] animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
              <p className="text-gray-400 text-lg">{t('noPosts')}</p>
            </div>
          ) : (
            <div className="space-y-8 posts-grid">
              {filteredPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="group post-card block"
                >
                  <div className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row h-full md:h-[350px]">
                    {/* Left: Image */}
                    <div className="relative w-full md:w-[40%] h-64 md:h-full overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-gobai-blue-dark/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <Image 
                        src={post.featuredImage || `https://picsum.photos/seed/${post.slug}/800/600`}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6 z-20">
                        <span className="px-4 py-2 rounded-xl bg-gobai-blue-dark/80 backdrop-blur-md text-gobai-cyan text-[10px] font-black uppercase shadow-lg border border-white/10">
                          Tecnología
                        </span>
                      </div>
                    </div>
                    
                    {/* Right: Content */}
                    <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-6 text-gray-400 text-[10px] mb-6 uppercase font-black">
                        <span className="flex items-center gap-2">
                          <RiCalendarLine className="h-4 w-4 text-gobai-cyan" />
                          {new Date(post.createdAt).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US')}
                        </span>
                        <span className="flex items-center gap-2">
                          <RiUserLine className="h-4 w-4 text-gobai-cyan" />
                          {getAuthorDisplayName(post.author)}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-display font-bold text-gobai-blue-dark mb-6 group-hover:text-gobai-cyan transition-colors uppercase line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-500 line-clamp-2 mb-8 text-lg leading-relaxed">
                        {stripHtml(post.content)}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-gobai-cyan font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2 group-hover:gap-4 transition-all">
                          {t('readMore')}
                          <RiArrowRightLine className="h-4 w-4" />
                        </span>
                        <div className="flex items-center gap-2 text-gray-300">
                          <RiTimeLine className="h-4 w-4" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">5 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {/* Infinite Scroll Style "Load More" */}
          {!isLoading && filteredPosts.length > 0 && (
            <div className="mt-20 text-center">
              <button className="px-12 py-5 border border-gray-200 text-gobai-blue-dark font-black rounded-full hover:bg-gobai-blue-dark hover:text-white hover:border-gobai-blue-dark transition-all uppercase tracking-widest text-xs">
                {locale === 'es' ? 'Cargar más artículos' : 'Load more articles'}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
