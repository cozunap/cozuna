"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";

interface HeroMockupProps {
  lang: string;
}

export default function Hero3DMockup({ lang }: HeroMockupProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate normalized coordinates (-1 to 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth tilt angles (subtle & elegant)
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 12;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4 perspective-[1200px]">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? "scale(1.02)" : "scale(1)"}`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black/95 p-3 sm:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(59,130,246,0.18)] backdrop-blur-2xl group"
      >
        {/* Subtle Ambient Reflected Light Glow */}
        <div 
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-blue-500/20 via-cyan-400/25 to-blue-600/20 blur-3xl pointer-events-none rounded-full"
          aria-hidden="true" 
        />

        {/* Mac-style Browser Chrome Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 px-2 sm:px-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80 inline-block shadow-sm" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80 inline-block shadow-sm" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/80 inline-block shadow-sm" />
          </div>

          {/* Clean URL Bar Pill */}
          <div className="flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-full px-3 sm:px-4 py-1 text-[10px] sm:text-xs text-zinc-400 font-mono tracking-tight">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>https://cozuna.com/work/live-preview</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline text-[11px] text-zinc-400">Verified Client</span>
          </div>
        </div>

        {/* Showcase Device Canvas / Inner Viewport */}
        <div className="relative aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-inner">
          <Image
            src="/assets/images/2024/10/la-casa-del-mofongo.webp"
            alt="COzuna Featured Web & Branding Showcase"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority
          />

          {/* Glass Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

          {/* Floating Live Badge inside Showcase */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] sm:text-xs font-semibold shadow-lg">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span className="text-zinc-200">Featured Showcase</span>
          </div>

          {/* Bottom Card Overlay Details */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 z-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-blue-400 mb-1">
                Web Development & Branding • New York
              </p>
              <h3 className="text-base sm:text-xl font-bold text-white tracking-tight drop-shadow-md">
                La Casa Del Mofongo
              </h3>
            </div>

            <Link
              href={`/${lang}/what-we-do/la-casa-del-mofongo`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brand-primary text-white text-xs font-bold uppercase tracking-wide hover:bg-blue-600 transition-all shadow-md hover:scale-105"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
