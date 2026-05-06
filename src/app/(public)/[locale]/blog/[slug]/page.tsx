'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { 
  RiCalendarLine, 
  RiUserLine, 
  RiArrowLeftLine,
  RiShareLine,
  RiTwitterXFill,
  RiFacebookCircleFill,
  RiLinkedinBoxFill,
  RiInstagramLine,
  RiLinksLine,
  RiTimeLine
} from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { type Container, type ISourceOptions, type Engine } from "@tsparticles/engine";
import { getBlogPostBySlug } from '@/app/actions/blog';
import { getAuthorDisplayName } from '@/lib/blog-utils';

export default function BlogPostDetailPage() {
  const t = useTranslations('Blog');
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
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
        await loadFull(engine);
    }).then(() => {
        setInit(true);
    });

    const fetchPost = async () => {
      const data = await getBlogPostBySlug(slug);
      if (data) {
        setPost(data);
      } else {
        router.push('/blog');
      }
      setIsLoading(false);
    };
    fetchPost();
  }, [slug, router]);

  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
  }, []);

  const options: ISourceOptions = useMemo(() => ({
    fpsLimit: 60,
    particles: {
        color: { value: ["#00f2fe", "#4facfe"] },
        move: { enable: true, speed: 0.1 },
        number: { value: 20, density: { enable: true, area: 800 } },
        opacity: { value: { min: 0.1, max: 0.3 } },
        size: { value: { min: 0.5, max: 1 } }
    },
    background: { color: "transparent" },
  }), []);

  useEffect(() => {
    if (isLoading || !post) return;

    const ctx = gsap.context(() => {
      gsap.from('.article-header > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });

      gsap.from('.article-content', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#00040a] flex items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-b-2 border-gobai-cyan rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Article Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#00040a]">
        {/* Heading Background Image with Overlay */}
        {post.headingBackgroundImage && (
          <div className="absolute inset-0 z-0">
            <Image 
              src={post.headingBackgroundImage} 
              alt="" 
              fill 
              className="object-cover opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00040a] via-[#00040a]/80 to-[#00040a]/40" />
          </div>
        )}

        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gobai-blue/10 rounded-full blur-[120px] opacity-40" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gobai-cyan/10 rounded-full blur-[100px] opacity-30" />
        </div>

        {init && (
          <div className="absolute inset-0 z-[2] opacity-20">
            <Particles id="post-particles" particlesLoaded={particlesLoaded} options={options} />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-6 relative z-10 article-header">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white/40 hover:text-gobai-cyan transition-colors mb-12 uppercase tracking-widest text-xs font-bold"
          >
            <RiArrowLeftLine className="h-4 w-4" />
            {t('back')}
          </Link>

          <div className="flex items-center gap-4 text-gobai-cyan text-xs mb-8 uppercase tracking-widest font-black">
            <span className="px-3 py-1 rounded-md bg-gobai-cyan/10 border border-gobai-cyan/20">Tecnología</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5">
              <RiTimeLine className="h-4 w-4" />
              5 min lectura
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-10 uppercase">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 py-8 border-y border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gobai-cyan/20 border border-gobai-cyan/40 flex items-center justify-center overflow-hidden">
                {post.author.image ? (
                  <Image src={post.author.image} alt={post.author.name} fill />
                ) : (
                  <RiUserLine className="h-6 w-6 text-gobai-cyan" />
                )}
              </div>
              <div>
                <div className="text-white font-bold text-sm uppercase tracking-wide">
                  {getAuthorDisplayName(post.author)}
                </div>
                <div className="text-white/40 text-xs">Estratega en IA</div>
              </div>
            </div>

            <div className="h-8 w-px bg-white/5 hidden md:block" />

            <div className="flex items-center gap-2 text-white/40 text-sm">
              <RiCalendarLine className="h-4 w-4 text-gobai-cyan" />
              {new Date(post.createdAt).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row gap-16">
          {/* Share Sidebar */}
          <div className="md:w-16 flex flex-row md:flex-col items-center gap-6 md:sticky md:top-32 h-fit">
            <div 
              className="text-[10px] font-black uppercase tracking-widest text-gray-300 hidden md:block mb-4"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {t('share')}
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

          {/* Body */}
          <div className="flex-1 article-content">
            {post.featuredImage && post.showFeaturedImage && (
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl border border-gray-100">
                <Image 
                  src={post.featuredImage} 
                  alt={post.title} 
                  fill 
                  className="object-cover"
                />
              </div>
            )}
            <div 
              className="tiptap-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-gobai-blue-dark text-white text-center overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gobai-cyan via-gobai-turquoise to-gobai-cyan" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 uppercase">
            {t.rich('footer.title', {
              cyan: (chunks) => <span className="text-gobai-cyan">{chunks}</span>
            })}
          </h2>
          <Link 
            href="/contacto"
            className="inline-flex items-center px-10 py-5 bg-gobai-cyan text-[#00040a] font-black rounded-full hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(98,228,255,0.3)] uppercase tracking-widest text-sm"
          >
            {t('footer.cta')}
          </Link>
        </div>
      </section>
    </div>
  );
}
