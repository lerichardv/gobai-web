'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide preloader after 300ms
    const timer = setTimeout(() => {
      // Animate out the preloader
      gsap.to('.preloader', {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsVisible(false);
        }
      });
    }, 300);



    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="preloader fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 9999,
        background: 'linear-gradient(135deg, #001a2e 0%, var(--color-gobai-blue-dark) 20%, #002447 40%, var(--color-gobai-blue-dark) 60%, #001533 80%, var(--color-gobai-blue-dark) 100%)',
      }}
    >

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="floating-particle absolute w-2 h-2 rounded-full animate-float-short"
            style={{
              background: i % 2 === 0 ? 'var(--color-gobai-cyan)' : 'var(--color-gobai-turquoise)',
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
              boxShadow: `0 0 20px ${i % 2 === 0 ? 'var(--color-gobai-cyan)' : 'var(--color-gobai-turquoise)'}`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Loader Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Loader Ring System */}
        <div className="relative w-32 h-32 mb-8">
          {/* Outer Ring */}
          <div 
            className="loader-ring absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              background: 'linear-gradient(45deg, var(--color-gobai-cyan), var(--color-gobai-turquoise), var(--color-gobai-blue-bright)) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'subtract',
              borderImage: 'linear-gradient(45deg, var(--color-gobai-cyan), var(--color-gobai-turquoise)) 1',
              animation: 'spin 2s linear infinite',
              willChange: 'transform',
            }}
          >
            <div className="absolute inset-1 rounded-full" style={{ background: 'var(--color-gobai-blue-dark)' }} />
          </div>

          {/* Middle Ring */}
          <div 
            className="loader-ring absolute inset-4 rounded-full border border-transparent"
            style={{
              borderImage: 'linear-gradient(225deg, var(--color-gobai-turquoise), var(--color-gobai-cyan)) 1',
              animation: 'spin 3s linear infinite reverse',
            }}
          >
            <div className="absolute inset-1 rounded-full" style={{ background: 'var(--color-gobai-blue-dark)' }} />
          </div>

          {/* Center Dot */}
          <div 
            className="loader-center absolute inset-0 flex items-center justify-center animate-pulse-glow"
          >
            <div 
              className="w-8 h-8 rounded-full"
              style={{
                background: 'linear-gradient(135deg, var(--color-gobai-cyan), var(--color-gobai-turquoise))',
                boxShadow: '0 0 30px var(--color-gobai-cyan), 0 0 60px var(--color-gobai-turquoise)',
              }}
            />
          </div>

          {/* Orbiting Dots */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="loader-dot absolute w-3 h-3 rounded-full"
              style={{
                background: i % 2 === 0 ? 'var(--color-gobai-cyan)' : 'var(--color-gobai-turquoise)',
                boxShadow: `0 0 15px ${i % 2 === 0 ? 'var(--color-gobai-cyan)' : 'var(--color-gobai-turquoise)'}`,
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 60}deg) translateY(-50px) translateX(-50%)`,
                transformOrigin: '50% 50px',
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <div className="loader-text text-center">
          <h2 
            className="text-2xl font-bold mb-2"
            style={{
              background: 'linear-gradient(135deg, var(--color-gobai-blue-bright), var(--color-gobai-cyan-light), var(--color-gobai-turquoise-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            GOBAI
          </h2>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: 'var(--color-gobai-cyan)',
                animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`,
                boxShadow: '0 0 10px var(--color-gobai-cyan)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner Tech Elements */}
      <div className="absolute top-8 left-8 w-16 h-16">
        <svg viewBox="0 0 64 64" className="w-full h-full opacity-40">
          <path 
            d="M8 8L24 8L24 24M40 8L56 8L56 24M8 40L8 56L24 56M40 56L56 56L56 40" 
            stroke="var(--color-gobai-turquoise)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="absolute top-8 right-8 w-16 h-16">
        <svg viewBox="0 0 64 64" className="w-full h-full opacity-40">
          <circle cx="32" cy="32" r="24" stroke="var(--color-gobai-cyan)" strokeWidth="2" fill="none" className="animate-pulse" />
          <circle cx="32" cy="32" r="12" stroke="var(--color-gobai-cyan)" strokeWidth="1" fill="none" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-8 left-8 w-16 h-16">
        <svg viewBox="0 0 64 64" className="w-full h-full opacity-40">
          <polygon 
            points="32,8 56,24 56,40 32,56 8,40 8,24" 
            stroke="var(--color-gobai-turquoise)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="absolute bottom-8 right-8 w-16 h-16">
        <svg viewBox="0 0 64 64" className="w-full h-full opacity-40">
          <rect x="16" y="16" width="32" height="32" rx="4" stroke="var(--color-gobai-cyan)" strokeWidth="2" fill="none" className="animate-pulse" />
          <rect x="24" y="24" width="16" height="16" rx="2" stroke="var(--color-gobai-cyan)" strokeWidth="1" fill="none" opacity="0.6" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}