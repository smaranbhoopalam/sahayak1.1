import React from 'react';

interface SahayakDnaLogoProps {
  className?: string;
  size?: number;
}

export const SahayakDnaLogo: React.FC<SahayakDnaLogoProps> = ({ className = 'w-9 h-9', size = 36 }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <linearGradient id="crossGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>

        {/* Top Medical Cross */}
        <path
          d="M 42 12 H 58 V 24 H 70 V 38 H 58 V 50 H 42 V 38 H 30 V 24 H 42 Z"
          fill="url(#crossGradient)"
          stroke="#ffffff"
          strokeWidth="2"
        />

        {/* DNA Double Helix Left Strand */}
        <path
          d="M 28 32 C 22 50, 40 70, 50 82 C 60 94, 78 98, 72 75 C 68 60, 45 45, 28 32 Z"
          fill="url(#dnaGradient)"
          fillOpacity="0.9"
        />

        {/* DNA Double Helix Right Strand */}
        <path
          d="M 72 32 C 78 50, 60 70, 50 82 C 40 94, 22 98, 28 75 C 32 60, 55 45, 72 32 Z"
          fill="url(#dnaGradient)"
          fillOpacity="0.8"
        />

        {/* DNA Base Rung Horizontal Bars */}
        <line x1="38" y1="42" x2="62" y2="42" stroke="#ccfbf1" strokeWidth="4" strokeLinecap="round" />
        <line x1="34" y1="54" x2="66" y2="54" stroke="#ccfbf1" strokeWidth="4" strokeLinecap="round" />
        <line x1="38" y1="66" x2="62" y2="66" stroke="#ccfbf1" strokeWidth="4" strokeLinecap="round" />
        <line x1="44" y1="78" x2="56" y2="78" stroke="#ccfbf1" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
};
