import React, { useMemo } from 'react';
import { ManifestoPanel, LogoScrollPanel, IndustrialLabel, TechSpecsRow } from './HeroParts';
import { LOGOS } from '../constants';

const Hero: React.FC = () => {
  // Generate randomized row configurations once on mount
  const rowConfigs = useMemo(() => {
    // 12 ROWS - Reduced for better visibility and performance in smaller containers
    return Array.from({ length: 12 }).map((_, i) => {
        // Create a shuffled copy of LOGOS
        const shuffled = [...LOGOS];
        // Fisher-Yates Shuffle
        for (let j = shuffled.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [shuffled[j], shuffled[k]] = [shuffled[k], shuffled[j]];
        }
        
        // PENDULUM CONFIG
        const isLeft = i % 2 === 0;
        const direction = isLeft ? 'alternate' : 'alternate-reverse';
        const duration = 45 + Math.random() * 25; 
        const delay = -(Math.random() * duration);

        return {
            key: i,
            loopStyle: {
                animation: `pendulum ${duration}s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`,
                animationDirection: direction,
                animationDelay: `${delay}s`
            },
            items: shuffled
        };
    });
  }, []);

  return (
    <section className="relative w-full border-b border-[var(--border-main)] bg-[var(--bg-main)] transition-colors duration-300">
      
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* LEFT SIDE: BIG SQUARE - STATIC IMAGE */}
        <div className="relative border-r border-[var(--border-main)] overflow-hidden bg-[var(--bg-main)] aspect-square">
            <img 
                src="https://i.imgur.com/1B6UiG1.png" 
                alt="Tech Archive Hero" 
                className="w-full h-full object-cover transition-all duration-500" 
            />
        </div>
        
        {/* RIGHT SIDE: REFACTORED TO 2 COLUMNS (Strict Flexbox) */}
        {/* Using Flexbox instead of Grid to guarantee column behavior */}
        <div className="aspect-square flex flex-row bg-[var(--bg-secondary)] relative z-20 overflow-hidden">
            
            {/* COLUMN 1 (LEFT) - MODIFIED: Removed Grid, Added Dotted Line */}
            <div className="w-1/2 h-full border-r border-[var(--border-main)] bg-[var(--bg-main)] relative overflow-hidden">
                 <ManifestoPanel />
            </div>

            {/* COLUMN 2 (RIGHT) - MODIFIED: Bottom cell contains Grid + TechSpecs */}
            <div className="w-1/2 h-full flex flex-col bg-[var(--bg-main)]">
                 {/* Top Cell: Logo Scroll (Restored) */}
                 <div className="h-1/2 w-full border-b border-[var(--border-main)] relative overflow-hidden">
                      <LogoScrollPanel rowConfigs={rowConfigs} />
                 </div>
                 
                 {/* Bottom Cell: Tech Archive + System Status Grid */}
                 <div className="h-1/2 w-full relative overflow-hidden">
                      <IndustrialLabel />
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;