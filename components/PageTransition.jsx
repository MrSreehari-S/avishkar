'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import anime from 'animejs/lib/anime.es.js';

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const slicesRef = useRef([]);

  const slicesTotal = 6;
  const slicesColor = '#000';
  const orientation = 'vertical';

  // -------- Instant Hard Cover (0ms) --------
  function instantCover() {
    slicesRef.current.forEach((el) => {
      if (!el) return;
      el.style.transform =
        orientation === 'vertical'
          ? 'translateY(0%)'
          : 'translateX(0%)';
    });
  }

  // -------- Reveal Animation (new page enters) --------
  function runRevealAnimation() {
    return anime({
      targets: slicesRef.current,
      duration: 800,
      delay: (_, i) => i * 80,
      easing: 'easeInOutQuart',
      translateY:
        orientation === 'vertical'
          ? ['0%', '100%']
          : '0%',
      translateX:
        orientation === 'vertical'
          ? '0%'
          : ['0%', '100%'],
    }).finished;
  }

  // -------- Route Change Handler --------
  useEffect(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    (async () => {
      // 1. Instantly cover the screen (no animation)
      instantCover();

      // 2. Swap page content under full opaque cover
      setDisplayChildren(children);

      // 3. Animate reveal
      await runRevealAnimation();

      // 4. Reset slice positions to off-screen (ready for next transition)
      slicesRef.current.forEach((el) => {
        if (!el) return;
        el.style.transform = 'translateY(100%)';
      });

      setIsAnimating(false);
    })();
  }, [pathname]);

  return (
    <>
      {/* Overlay Slices */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'row' : 'column',
        }}
      >
        {Array.from({ length: slicesTotal }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (slicesRef.current[i] = el)}
            className="transition-slice flex-1"
            style={{
              backgroundColor: slicesColor,
              transform:
                orientation === 'vertical'
                  ? 'translateY(100%)'
                  : 'translateX(100%)',
              transition: 'none',
              boxShadow:
                orientation === 'vertical'
                  ? `1px 0 0 ${slicesColor}`
                  : `0 1px 0 ${slicesColor}`,
            }}
          />
        ))}
      </div>

      {/* Actual page content */}
      <div className="relative">{displayChildren}</div>
    </>
  );
}
