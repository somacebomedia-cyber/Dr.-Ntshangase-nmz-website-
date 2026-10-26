import React from 'react';

interface CircleMotifProps {
  className?: string;
  variant?: 'full' | 'subtle' | 'compact' | 'badge' | 'scatter-left' | 'scatter-right' | 'ambient-orbs';
}

/**
 * Authentic Floating Circles Motif
 * Recreated from the entrance door frosted glass graphics of Dr Ntshangase's surgery.
 * Features organic floating teal/mint bubbles and curved arcs used as ambient background compositions.
 * Guaranteed 100% overflow-safe on all mobile viewports.
 */
export const CircleMotif: React.FC<CircleMotifProps> = ({
  className = '',
  variant = 'full',
}) => {
  if (variant === 'ambient-orbs') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 max-w-full ${className}`}>
        {/* Top-right floating orb cluster */}
        <div className="absolute -top-10 -right-6 w-36 sm:w-44 h-28 sm:h-32 opacity-35 dark:opacity-20 overflow-hidden">
          <svg viewBox="0 0 160 120" fill="none" className="w-full h-full">
            <circle cx="100" cy="50" r="38" fill="#14b8a6" className="animate-float-slow" />
            <circle cx="45" cy="80" r="24" fill="#0d9488" className="animate-float-gentle" />
            <circle cx="130" cy="95" r="14" fill="#2dd4bf" />
            <circle cx="65" cy="30" r="8" fill="#0a5450" />
          </svg>
        </div>

        {/* Bottom-left floating orb cluster */}
        <div className="absolute -bottom-10 -left-6 w-40 sm:w-52 h-28 sm:h-36 opacity-30 dark:opacity-15 overflow-hidden">
          <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
            <ellipse cx="70" cy="90" rx="48" ry="36" fill="#0a5450" className="animate-float-gentle" />
            <circle cx="140" cy="60" r="28" fill="#2dd4bf" className="animate-float-slow" />
            <circle cx="170" cy="110" r="16" fill="#14b8a6" />
            <circle cx="35" cy="40" r="10" fill="#5eead4" />
          </svg>
        </div>

        {/* Center-right subtle micro accent */}
        <div className="absolute top-1/2 right-4 sm:right-12 w-16 sm:w-24 h-16 sm:h-24 opacity-25 dark:opacity-10 hidden sm:block overflow-hidden">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="20" fill="#14b8a6" className="animate-float-slow" />
            <circle cx="75" cy="25" r="8" fill="#0f766e" />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'scatter-left') {
    return (
      <div className={`absolute left-0 top-1/4 pointer-events-none select-none opacity-25 dark:opacity-15 overflow-hidden max-w-[200px] sm:max-w-none ${className}`}>
        <svg width="240" height="240" viewBox="0 0 280 280" fill="none" className="w-40 sm:w-60 h-auto">
          <circle cx="140" cy="140" r="80" fill="#14b8a6" opacity="0.4" className="animate-float-slow" />
          <circle cx="80" cy="90" r="42" fill="#0d9488" opacity="0.6" />
          <circle cx="210" cy="120" r="32" fill="#2dd4bf" opacity="0.7" className="animate-float-gentle" />
          <circle cx="170" cy="210" r="24" fill="#0a5450" opacity="0.5" />
          <circle cx="100" cy="220" r="14" fill="#99f6e4" />
        </svg>
      </div>
    );
  }

  if (variant === 'scatter-right') {
    return (
      <div className={`absolute right-0 top-1/3 pointer-events-none select-none opacity-25 dark:opacity-15 overflow-hidden max-w-[200px] sm:max-w-none ${className}`}>
        <svg width="240" height="240" viewBox="0 0 300 300" fill="none" className="w-40 sm:w-60 h-auto">
          <circle cx="150" cy="150" r="90" fill="#0f766e" opacity="0.35" className="animate-float-gentle" />
          <circle cx="90" cy="210" r="46" fill="#14b8a6" opacity="0.6" className="animate-float-slow" />
          <circle cx="210" cy="90" r="34" fill="#5eead4" opacity="0.7" />
          <circle cx="80" cy="90" r="20" fill="#0a5450" opacity="0.5" />
          <circle cx="230" cy="180" r="16" fill="#2dd4bf" />
        </svg>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`relative w-12 h-12 rounded-xl bg-teal-900/10 dark:bg-teal-400/10 flex items-center justify-center overflow-hidden border border-teal-600/20 shrink-0 ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <path d="M 0 85 Q 50 68 100 85 L 100 100 L 0 100 Z" fill="#0a5450" className="dark:fill-teal-500" />
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
      <div className={`relative overflow-hidden pointer-events-none select-none max-w-full ${className}`}>
        <svg viewBox="0 0 300 130" className="w-full h-auto max-w-full" fill="none" preserveAspectRatio="none">
          <path
            d="M 0 115 Q 150 78 300 115 L 300 130 L 0 130 Z"
            fill="#0a5450"
            className="transition-colors duration-500 dark:fill-teal-700/60"
          />
          <circle cx="68" cy="72" r="26" fill="#23716d" className="dark:fill-teal-600/80" />
          <circle cx="125" cy="45" r="20" fill="#5ea3a1" opacity="0.85" />
          <circle cx="160" cy="85" r="10" fill="#0a5450" className="dark:fill-teal-400" />
          <circle cx="218" cy="68" r="15" fill="#86bcba" opacity="0.8" />
          <circle cx="258" cy="42" r="6" fill="#5ea3a1" opacity="0.6" />
        </svg>
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none max-w-full ${className}`}>
        <div className="absolute -top-16 -right-16 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-teal-500/10 dark:bg-teal-400/5 blur-2xl" />
        <div className="absolute top-1/2 -left-20 w-52 sm:w-80 h-52 sm:h-80 rounded-full bg-teal-600/10 dark:bg-teal-300/5 blur-3xl" />
        <div className="absolute -bottom-10 right-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-emerald-500/10 dark:bg-teal-400/5 blur-2xl" />
      </div>
    );
  }

  // Full variant - authentic reproduction of the glass door signage motif
  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none max-w-full ${className}`}>
      <svg
        viewBox="0 0 600 240"
        className="w-full h-auto max-w-full"
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

        <circle cx="220" cy="110" r="90" fill="#2dd4bf" opacity="0.12" filter="blur(24px)" />

        <path
          d="M -20 215 Q 300 145 620 215 L 620 260 L -20 260 Z"
          fill="url(#arcGrad)"
          className="transition-colors duration-500 dark:fill-teal-800"
        />

        <ellipse
          cx="140"
          cy="145"
          rx="52"
          ry="38"
          fill="url(#bubble1)"
          className="animate-float-slow"
        />

        <ellipse
          cx="245"
          cy="92"
          rx="42"
          ry="30"
          fill="url(#bubble2)"
          opacity="0.9"
          className="animate-float-gentle"
        />

        <circle
          cx="310"
          cy="165"
          r="19"
          fill="#073b38"
          className="dark:fill-teal-300 transition-colors"
        />

        <ellipse
          cx="430"
          cy="140"
          rx="32"
          ry="24"
          fill="#7bbdbb"
          opacity="0.85"
          className="animate-float-slow"
        />

        <circle cx="370" cy="88" r="8" fill="#5ea3a1" opacity="0.6" />
        <circle cx="505" cy="110" r="6" fill="#86bcba" opacity="0.5" />
      </svg>
    </div>
  );
};

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
        <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
      </svg>
    </div>
  );
};
