import React, { useState } from 'react';
import { X, Search, Sliders, Grid, List, Check } from 'lucide-react';
import { BRANDS, CATEGORIES, MATERIALS } from '../constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [yearRange, setYearRange] = useState<number>(1990);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[var(--bg-main)] border border-[var(--border-main)] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-main)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 bg-[var(--color-accent)] animate-pulse rounded-none"></div>
             <h2 className="font-mono text-sm tracking-widest text-[var(--text-muted)]">ADVANCED_QUERY_PROTOCOL</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 border border-[var(--border-main)] hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors text-[var(--text-main)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input Area */}
        <div className="p-8 md:p-12 border-b border-[var(--border-main)]">
          <div className="relative group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--text-dim)] group-focus-within:text-[var(--color-accent)] transition-colors w-8 h-8" />
            <input 
              type="text" 
              placeholder="ENTER KEYWORDS, MODEL NUMBERS, OR SERIALS..." 
              className="w-full bg-transparent border-b-2 border-[var(--border-main)] text-2xl md:text-4xl font-bold py-4 pl-12 text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--color-accent)] transition-colors font-sans uppercase tracking-tight"
              autoFocus
            />
          </div>
        </div>

        {/* Filter Grid - Scrollable */}
        <div className="flex-grow overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-full divide-y md:divide-y-0 md:divide-x divide-[var(--border-main)]">
            
            {/* Column 1: Logical Filters */}
            <div className="p-6 space-y-8">
                <h3 className="font-mono text-xs text-[var(--text-dim)] uppercase mb-4 flex items-center gap-2">
                    <Grid size={12} /> Categories
                </h3>
                <div className="space-y-1">
                    {CATEGORIES.map(cat => (
                        <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-4 h-4 border border-[var(--border-main)] group-hover:border-[var(--color-accent)] flex items-center justify-center transition-colors">
                                <div className="w-2 h-2 bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="font-mono text-sm text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">{cat}</span>
                        </label>
                    ))}
                </div>

                <div className="pt-6 border-t border-[var(--border-main)]">
                    <h3 className="font-mono text-xs text-[var(--text-dim)] uppercase mb-4">Brands</h3>
                    <div className="grid grid-cols-2 gap-2">
                         {BRANDS.slice(0, 8).map(brand => (
                             <button key={brand} className="text-left font-mono text-xs text-[var(--text-muted)] hover:text-[var(--color-accent)] truncate">
                                 {brand}
                             </button>
                         ))}
                         <button className="text-left font-mono text-xs text-[var(--text-main)] underline decoration-[var(--border-main)]">VIEW ALL</button>
                    </div>
                </div>
            </div>

            {/* Column 2: Timeline & Materials */}
            <div className="p-6 space-y-8">
                <h3 className="font-mono text-xs text-[var(--text-dim)] uppercase mb-4 flex items-center gap-2">
                    <Sliders size={12} /> Timeline
                </h3>
                <div className="px-2">
                    <input 
                        type="range" 
                        min="1970" 
                        max="2025" 
                        value={yearRange}
                        onChange={(e) => setYearRange(parseInt(e.target.value))}
                        className="w-full accent-[var(--color-accent)] h-1 bg-[var(--border-main)] appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-4 font-mono text-xs">
                        <span className="text-[var(--text-dim)]">1970</span>
                        <span className="text-[var(--color-accent)] text-lg font-bold">{yearRange}</span>
                        <span className="text-[var(--text-dim)]">2025</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-[var(--border-main)]">
                    <h3 className="font-mono text-xs text-[var(--text-dim)] uppercase mb-4">Materials</h3>
                    <div className="flex flex-wrap gap-2">
                        {MATERIALS.map(mat => (
                            <button key={mat} className="px-2 py-1 border border-[var(--border-main)] text-[10px] font-mono text-[var(--text-muted)] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-colors">
                                {mat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Column 3: Aesthetics (Subjective) */}
            <div className="p-6 space-y-8">
                <h3 className="font-mono text-xs text-[var(--text-dim)] uppercase mb-4">Aesthetics</h3>
                
                {/* Color Picker */}
                <div className="grid grid-cols-5 gap-4">
                    {['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ffffff', '#000000', '#ff00ff', '#00ffff', '#ffa500', '#808080'].map(color => (
                        <button 
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-full aspect-square border ${selectedColor === color ? 'border-[var(--text-main)] scale-110' : 'border-[var(--border-main)]'} hover:scale-110 transition-transform relative`}
                            style={{ backgroundColor: color }}
                        >
                            {selectedColor === color && <Check className="absolute inset-0 m-auto text-black mix-blend-difference" size={12}/>}
                        </button>
                    ))}
                </div>

                {/* Form Factor */}
                <div className="pt-6 border-t border-[var(--border-main)] space-y-2">
                     <h3 className="font-mono text-xs text-[var(--text-dim)] uppercase mb-4">Form Factor</h3>
                     {['BOXY', 'ROUNDED', 'ORGANIC', 'MODULAR', 'RACK-MOUNT', 'HANDHELD'].map(form => (
                         <div key={form} className="flex justify-between items-center group cursor-pointer py-1 border-b border-[var(--border-main)]/50">
                             <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--text-main)]">{form}</span>
                             <span className="w-2 h-2 border border-[var(--text-dim)] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)]"></span>
                         </div>
                     ))}
                </div>
            </div>

            {/* Column 4: Quick Lists & Meta */}
            <div className="p-6 bg-[var(--bg-panel)]">
                <h3 className="font-mono text-xs text-[var(--text-dim)] uppercase mb-4 flex items-center gap-2">
                    <List size={12} /> Popular Searches
                </h3>
                <ul className="space-y-3 font-mono text-xs">
                    {['WALKMAN ANNIVERSARY', 'BRAUN DIETER RAMS', 'GAMEBOY MODS', 'APPLE SNOW WHITE', 'SYNTHESIZERS 80S'].map((term, i) => (
                        <li key={i} className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--color-accent)] cursor-pointer">
                            <span className="opacity-30">0{i+1}</span>
                            <span>{term}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-12 p-4 border border-[var(--border-main)] bg-[var(--bg-main)]">
                    <h4 className="font-bold text-[var(--text-main)] text-sm mb-2">ARCHIVIST NOTE</h4>
                    <p className="font-mono text-[10px] text-[var(--text-dim)] leading-relaxed">
                        Search syntax supports boolean operators (AND, OR) and year ranges (e.g., 1980..1990). Use "type:prototype" for non-production units.
                    </p>
                </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[var(--border-main)] bg-[var(--bg-secondary)] flex justify-between items-center">
            <span className="font-mono text-xs text-[var(--text-dim)]">3,204 RESULTS FOUND IN 0.04S</span>
            <button className="bg-[var(--color-accent)] text-[var(--bg-main)] px-8 py-3 font-bold text-sm tracking-wide hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-colors uppercase">
                Execute Search
            </button>
        </div>

      </div>
    </div>
  );
};

export default SearchModal;