
import React from 'react';

export const COLORS = {
  cyan: '#00F6FF',
  green: '#38FF8B',
  blue: '#3A7BFF',
  gray: '#444444',
  black: '#000000',
  graphite: '#111111'
};

export const HUDCorner = ({ className, accentColor = COLORS.cyan }: { className?: string, accentColor?: string }) => (
  <svg viewBox="0 0 40 40" className={className} width="24" height="24">
    <path d="M40 2H2V40" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.6"/>
    <rect x="0" y="0" width="4" height="4" fill={accentColor} />
  </svg>
);

export const HUDFrame = ({ color }: { color: string }) => (
  <div className="absolute inset-0 pointer-events-none transition-all duration-300">
    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-30 transition-all group-hover:opacity-100" style={{ borderColor: color }} />
    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-30 transition-all group-hover:opacity-100" style={{ borderColor: color }} />
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 opacity-30 transition-all group-hover:opacity-100" style={{ borderColor: color }} />
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-30 transition-all group-hover:opacity-100" style={{ borderColor: color }} />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 opacity-20 group-hover:opacity-60" style={{ backgroundColor: color }} />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 opacity-20 group-hover:opacity-60" style={{ backgroundColor: color }} />
  </div>
);
