'use client';

import { useRef, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

// Only register plugins on the client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const main = useRef<HTMLDivElement>(null);
  const smoother = useRef<ScrollSmoother | null>(null);

  const pathname = usePathname();

  useGSAP(
    () => {
      if (!smoother.current) {
        smoother.current = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 0.5,
          effects: true,
          smoothTouch: 0.05,
        });
      }
    },
    {
      scope: main,
    }
  );

  useGSAP(() => {
    if (smoother.current) {
      smoother.current.scrollTo(0, false);
    }
  }, { dependencies: [pathname] });

  return (
    <div id="smooth-wrapper" ref={main} className="fixed inset-0 w-full overflow-hidden">
      <div id="smooth-content" className="w-full">
        {children}
      </div>
    </div>
  );
}
