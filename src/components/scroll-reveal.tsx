'use client';

import { useEffect } from 'react';

/**
 * Adds .is-visible to any .sd-rise / .sd-rise-soft / .sd-mask / .sd-drift /
 * .sd-drift-left when it enters the viewport. In browsers that support
 * `animation-timeline: view()` the CSS overrides this with a real
 * scroll-driven animation, so this is a no-op fallback.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If the browser supports native scroll-driven animations, skip JS entirely.
    const supportsNative =
      CSS && CSS.supports && CSS.supports('animation-timeline: view()');
    if (supportsNative) return;

    const selector =
      '.sd-rise, .sd-rise-soft, .sd-mask, .sd-drift, .sd-drift-left';
    const targets = document.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
