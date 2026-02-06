
import React from 'react';
import { HUDFrame } from '../constants';

interface FuturisticCardProps {
  children: React.ReactNode;
  title?: string;
  accentColor?: string;
  className?: string;
  idTag?: string;
}

const FuturisticCard: React.FC<FuturisticCardProps> = ({ children, title, accentColor = '#00F6FF', className = '', idTag }) => {
  const generatedId = idTag || Math.random().toString(16).slice(2, 6).toUpperCase();

  return (
    <div className={`group relative bg-black border border-white/5 p-5 transition-all duration-500 hover:scale-[1.01] hover:bg-zinc-950 hover:border-white/10 ${className}`}>
      {/* Dynamic Data Tag */}
      <div className="absolute top-1 right-2 text-[7px] font-mono text-white/10 group-hover:text-white/40 tracking-widest select-none">
        REF_0X_{generatedId}
      </div>

      {/* Glow Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700 rounded-lg pointer-events-none" 
        style={{ backgroundColor: accentColor }}
      />
      
      {/* Futuristic Frame Corners */}
      <HUDFrame color={accentColor} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] pointer-events-none overflow-hidden">
        <div className="h-full w-full bg-[radial-gradient(#888_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {title && (
          <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-2">
             <div className="w-1 h-4 transition-colors duration-400 bg-white/10 group-hover:bg-current shadow-[0_0_8px_currentColor]" style={{ color: accentColor }}></div>
             <h3 className="text-[10px] font-black tracking-[0.25em] uppercase grayscale group-hover:grayscale-0 transition-all" style={{ color: accentColor }}>{title}</h3>
          </div>
        )}
        <div className="grayscale-[0.8] opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FuturisticCard;
