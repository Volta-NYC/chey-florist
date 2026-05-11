'use client';

import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  number?: string;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}

export function Section({ title, subtitle, eyebrow, number, children, className = '', align = 'left' }: SectionProps) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <section className={`py-24 md:py-32 ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`flex flex-col ${alignCls} mb-14 md:mb-20`}>
          <div className="eyebrow text-gold mb-5 flex items-center gap-3">
            {number && <span className="text-ink">{number}</span>}
            {number && <span className="w-10 h-px bg-ink/40" />}
            <span>{eyebrow ?? 'Chapter'}</span>
          </div>
          <h2 className="display text-5xl md:text-7xl font-light leading-[0.95] tracking-[-0.02em] max-w-3xl">
            {title.split('|').map((part, i) =>
              i % 2 === 1 ? (
                <span key={i} className="italiana italic text-moss"> {part} </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h2>
          {subtitle && (
            <p className="serif text-xl text-ink/70 max-w-2xl mt-6 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
