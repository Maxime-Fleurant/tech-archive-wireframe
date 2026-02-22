import React from 'react';
import { ITEM_OF_THE_DAY } from '../constants';
import { Box, Layers, Cpu, Activity, Share2 } from 'lucide-react';

const ItemOfTheDay: React.FC = () => {
  return (
    <section className="w-full border-b border-[var(--border-main)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[800px]">
        
        {/* Left Column: Visuals (7 cols) */}
        <div className="lg:col-span-7 bg-[var(--bg-panel)] relative border-b lg:border-b-0 lg:border-r border-[var(--border-main)] group overflow-hidden transition-colors duration-300">
            {/* ID Badge */}
            <div className="absolute top-6 left-6 z-20 flex gap-2">
                <span className="bg-[var(--color-accent)] text-[var(--bg-main)] font-mono text-xs font-bold px-2 py-1">ITEM OF THE DAY</span>
                <span className="bg-[var(--bg-main)] border border-[var(--border-main)] text-[var(--text-main)] font-mono text-xs px-2 py-1">{ITEM_OF_THE_DAY.id}</span>
            </div>

            {/* Main Image */}
            <div className="w-full h-full flex items-center justify-center p-12">
                <div className="relative w-full max-w-2xl aspect-square">
                    {/* Decorative Target Markers */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--border-main)]"></div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--border-main)]"></div>
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--border-main)]"></div>
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[var(--border-main)]"></div>
                    
                    <img 
                        src={ITEM_OF_THE_DAY.imageUrl} 
                        alt={ITEM_OF_THE_DAY.name} 
                        className="w-full h-full object-contain grayscale contrast-125 hover:grayscale-0 transition-all duration-700 drop-shadow-2xl"
                    />
                </div>
            </div>
            
            {/* Overlay Texture Removed */}
        </div>

        {/* Right Column: Data Dossier (5 cols) */}
        <div className="lg:col-span-5 bg-[var(--bg-main)] flex flex-col transition-colors duration-300">
            {/* Header */}
            <div className="p-8 border-b border-[var(--border-main)]">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none text-[var(--text-main)]">
                        {ITEM_OF_THE_DAY.brand}<br/>
                        <span className="text-stroke text-transparent stroke-[var(--text-muted)]/30">{ITEM_OF_THE_DAY.name}</span>
                    </h2>
                    <div className="text-right">
                        <span className="block text-4xl font-mono text-[var(--color-accent)]">{ITEM_OF_THE_DAY.year}</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-6 flex-wrap">
                    {ITEM_OF_THE_DAY.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 border border-[var(--border-main)] text-[10px] font-mono hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-colors cursor-default">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="p-8 border-b border-[var(--border-main)] bg-[var(--bg-secondary)]">
                <p className="font-mono text-sm leading-relaxed text-[var(--text-muted)] text-justify">
                    {ITEM_OF_THE_DAY.description}
                </p>
            </div>

            {/* Technical Specs Grid */}
            <div className="flex-grow">
                <div className="grid grid-cols-2 h-full">
                    {Object.entries(ITEM_OF_THE_DAY.specs).map(([key, value], idx) => (
                        <div key={key} className={`p-6 border-b border-[var(--border-main)] ${idx % 2 === 0 ? 'border-r' : ''} hover:bg-[var(--bg-secondary)] transition-colors group`}>
                            <span className="block font-mono text-[10px] text-[var(--text-dim)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">{key}</span>
                            <span className="block font-bold text-sm tracking-wide text-[var(--text-main)]">{value}</span>
                        </div>
                    ))}
                    {/* Filler blocks to maintain grid */}
                    <div className="p-6 border-b border-r border-[var(--border-main)] flex items-center justify-center hover:bg-[var(--bg-secondary)]">
                        <Box className="text-[var(--border-main)]" />
                    </div>
                    <div className="p-6 border-b border-[var(--border-main)] flex items-center justify-center hover:bg-[var(--bg-secondary)]">
                        <Layers className="text-[var(--border-main)]" />
                    </div>
                </div>
            </div>

            {/* Actions Footer */}
            <div className="grid grid-cols-3 border-t border-[var(--border-main)]">
                <button className="p-6 flex flex-col items-center justify-center gap-2 border-r border-[var(--border-main)] hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] transition-colors group text-[var(--text-main)]">
                    <Cpu size={20} />
                    <span className="font-mono text-[10px] tracking-wider">SCHEMATICS</span>
                </button>
                <button className="p-6 flex flex-col items-center justify-center gap-2 border-r border-[var(--border-main)] hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] transition-colors group text-[var(--text-main)]">
                    <Activity size={20} />
                    <span className="font-mono text-[10px] tracking-wider">HISTORY</span>
                </button>
                <button className="p-6 flex flex-col items-center justify-center gap-2 hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] transition-colors group text-[var(--text-main)]">
                    <Share2 size={20} />
                    <span className="font-mono text-[10px] tracking-wider">SHARE</span>
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ItemOfTheDay;