import React from 'react';
import { TICKER_ITEMS } from '../constants';
import { Square } from 'lucide-react';

const Ticker: React.FC = () => {
  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[60] bg-[var(--color-accent)] text-[var(--bg-main)] h-8 flex items-center overflow-hidden border-b border-black font-mono text-xs font-bold tracking-tight uppercase select-none transition-colors duration-300 group/ticker"
      style={{ contain: 'layout paint style' }} 
    >
      <div 
        className="animate-marquee whitespace-nowrap flex items-center group-hover/ticker:[animation-play-state:paused] will-change-transform"
        style={{ 
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        {/* Double the items to ensure smooth infinite loop without gaps */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <div 
            key={`${item.id}-${index}`} 
            className="flex items-center h-8 transition-opacity duration-300 group/item group-hover/ticker:opacity-40 hover:!opacity-100"
          >
            {/* Item Content with padding */}
            <div className="flex items-center px-8 group-hover/item:underline decoration-2 underline-offset-2">
                <span className="mr-3 opacity-70">[{item.timestamp}]</span>
                <span className="mr-3 opacity-60">//{item.type}</span>
                <span>{item.text}</span>
            </div>
            
            {/* Technical Separator - Dimmed on hover to avoid distraction */}
            <div className="flex items-center justify-center opacity-50 transition-opacity duration-300 group-hover/ticker:opacity-20">
               <Square size={8} fill="currentColor" strokeWidth={0} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;