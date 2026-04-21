'use client';

import { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

// Only register plugins on the client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const main = useRef<HTMLDivElement>(null);
  const smoother = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      // create the smooth scroller
      smoother.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1, // seconds it takes to catch up to native scroll position
        effects: true, // look for data-speed and data-lag attributes on elements
        smoothTouch: 0.1, // much shorter smoothing time on touch devices
      });
    },
    {
      scope: main,
    }
  );

  return (
    <div id="smooth-wrapper" ref={main} className="fixed inset-0 w-full overflow-hidden">
      <div id="smooth-content" className="w-full">
        {children}
      </div>
    </div>
  );
}
