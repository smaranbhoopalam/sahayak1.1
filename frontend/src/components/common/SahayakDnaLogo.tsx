import React from 'react';
import logo from '../../assets/logo.png';

interface SahayakDnaLogoProps {
  className?: string;
  size?: number;
}

export const SahayakDnaLogo: React.FC<SahayakDnaLogoProps> = ({ className = 'w-9 h-9', size = 36 }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <img
        src={logo}
        alt="Sahayak Logo"
        style={{ width: size, height: size }}
        className="object-contain"
      />
    </div>
  );
};
