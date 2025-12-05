// src/components/common/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children }) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
};

export default Card;
