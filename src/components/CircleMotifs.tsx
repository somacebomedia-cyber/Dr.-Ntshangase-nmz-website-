import React from 'react';

interface CircleMotifProps {
  className?: string;
  variant?: 'full' | 'subtle' | 'compact' | 'badge';
}

/**
 * Authentic Circles Theme/Motif directly matching the frosted glass entrance door
 * from physical surgery reference photo (IMG_20260910_101257_883_9387b7f6.jpg).
 * Features the signature curved horizon arc and floating organic teal/seafoam bubbles.
 */
export const CircleMotif: React.FC<CircleMotifProps> = ({
  className = '',
  variant = 'full',
}) => {
  if (variant === 'badge') {
    return (
      <div className={`relative w-12 h-12 rounded-xl bg-teal-900/10 dark:bg-teal-400/10 flex items-center justify-center overflow-hidden border border-teal-600/20 ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          {/* Base Curved Arc */}
          <path d="M 0 85 Q 50 68 100 85 L 100 100 L 0 100 Z" fill="#0a5450" className="dark:fill-teal-500" />
          {/* Bubbles */}
          <circle cx="28" cy="55" r="14" fill="#23716d" className="dark:fill-teal-400" />
          <circle cx="50" cy="38" r="11" fill="#5ea3a1" opacity="0.8" />
          <circle cx="75" cy="52" r="9" fill="#86bcba" opacity="0.7" />
          <circle cx="53" cy="62" r="5" fill="#0a5450" className="dark:fill-teal-300" />
        </svg>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
        <svg viewBox="0 0 300 130" className="w-full h-auto" fill="none" preserveAspectRatio="none">
          {/* Horizon Arc */}
          <path
            d="M 0 115 Q 150 78 300 115 L 300 130 L 0 130 Z"
            fill="#0a5450"
            className="transition-colors duration-500 dark:fill-teal-700/60"
          />
          {/* Left Large Bubble */}
          <circle cx="68" cy="72" r="26" fill="#23716d" className="dark:fill-teal-600/80" />
          {/* Center-Top Bubble */}
          <circle cx="125" cy="45" r="20" fill="#5ea3a1" opacity="0.85" />
          {/* Small Center-Bottom Deep Dot */}
          <circle cx="160" cy="85" r="10" fill="#0a5450" className="dark:fill-teal-400" />
          {/* Right Bubble */}
          <circle cx="218" cy="68" r="15" fill="#86bcba" opacity="0.8" />
          {/* Floating Micro accent */}
          <circle cx="258" cy="42" r="6" fill="#5ea3a1" opacity="0.6" />
        </svg>
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-teal-500/10 dark:bg-teal-400/5 blur-2xl" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-teal-600/10 dark:bg-teal-300/5 blur-3xl" />
        <div className="absolute -bottom-10 right-1/4 w-72 h-72 rounded-full bg-emerald-500/10 dark:bg-teal-400/5 blur-2xl" />
      </div>
    );
  }

  // Full variant - authentic reproduction of the glass door signage motif
  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 600 240"
        className="w-full h-auto"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#073b38" />
            <stop offset="50%" stopColor="#0a5450" />
            <stop offset="100%" stopColor="#0d635f" />
          </linearGradient>
          <linearGradient id="bubble1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#308a85" />
            <stop offset="100%" stopColor="#1a6460" />
          </linearGradient>
          <linearGradient id="bubble2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67b2af" />
            <stop offset="100%" stopColor="#439490" />
          </linearGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="220" cy="110" r="90" fill="#2dd4bf" opacity="0.12" filter="blur(24px)" />

        {/* The Exact Curved Horizon from Physical Sign */}
        <path
          d="M -20 215 Q 300 145 620 215 L 620 260 L -20 260 Z"
          fill="url(#arcGrad)"
          className="transition-colors duration-500 dark:fill-teal-800"
        />

        {/* Floating Bubble 1: Large Left Oval */}
        <ellipse
          cx="140"
          cy="145"
          rx="52"
          ry="38"
          fill="url(#bubble1)"
          className="animate-float-slow"
        />

        {/* Floating Bubble 2: Medium Top-Center Oval */}
        <ellipse
          cx="245"
          cy="92"
          rx="42"
          ry="30"
          fill="url(#bubble2)"
          opacity="0.9"
          className="animate-float-gentle"
        />

        {/* Floating Bubble 3: Deep Dark Center-Bottom Dot */}
        <circle
          cx="310"
          cy="165"
          r="19"
          fill="#073b38"
          className="dark:fill-teal-300 transition-colors"
        />

        {/* Floating Bubble 4: Right Soft Oval */}
        <ellipse
          cx="430"
          cy="140"
          rx="32"
          ry="24"
          fill="#7bbdbb"
          opacity="0.85"
          className="animate-float-slow"
        />

        {/* Ambient Micro-Dots */}
        <circle cx="370" cy="88" r="8" fill="#5ea3a1" opacity="0.6" />
        <circle cx="505" cy="110" r="6" fill="#86bcba" opacity="0.5" />
      </svg>
    </div>
  );
};

/**
 * Physical Surgery Medical Cross Icon
 * Matches the white cross on deep teal from IMG_20260910_101312_918_e06909d7.jpg
 */
export const MedicalCrossIcon: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 p-1 rounded-md',
    md: 'w-10 h-10 p-1.5 rounded-lg',
    lg: 'w-14 h-14 p-2 rounded-xl',
  };

  return (
    <div
      className={`bg-[#0a5450] text-white flex items-center justify-center shadow-sm shrink-0 ${sizeClasses[size]} ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        {/* Symmetric Medical Cross */}
        <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
      </svg>
    </div>
  );
};
