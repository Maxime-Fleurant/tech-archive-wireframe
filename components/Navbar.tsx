import React, { useState } from 'react';
import { 
    Search, User, Sun, Moon, Globe, Layers, PenTool, Tag, ChevronRight, 
    Speaker, Monitor, Camera, Gamepad2, Smartphone, Keyboard, Printer, HardDrive, Cable, Box 
} from 'lucide-react';

interface NavbarProps {
  onSearchOpen: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

// Data for the dropdown menus
const MENU_DATA: Record<string, { title: string; icon: any; items: any[] }> = {
  BRANDS: {
    title: 'MANUFACTURERS_INDEX',
    icon: Globe,
    items: [
      { label: 'BRAUN', sub: 'GERMANY' },
      { label: 'SONY', sub: 'JAPAN' },
      { label: 'APPLE', sub: 'USA' },
      { label: 'NINTENDO', sub: 'JAPAN' },
      { label: 'OLIVETTI', sub: 'ITALY' },
      { label: 'YAMAHA', sub: 'JAPAN' },
      { label: 'TEENAGE ENG.', sub: 'SWEDEN' },
      { label: 'LEICA', sub: 'GERMANY' },
      { label: 'CASIO', sub: 'JAPAN' },
      { label: 'ATARI', sub: 'USA' },
      { label: 'COMMODORE', sub: 'USA' },
      { label: 'BANG & OLUFSEN', sub: 'DENMARK' },
      { label: 'PANASONIC', sub: 'JAPAN' },
      { label: 'TECHNICS', sub: 'JAPAN' },
      { label: 'POLAROID', sub: 'USA' },
      { label: 'KODAK', sub: 'USA' },
    ]
  },
  CATEGORIES: {
    title: 'FUNCTIONAL_CATEGORIES',
    icon: Layers,
    items: [
      { label: 'AUDIO', icon: Speaker },
      { label: 'COMPUTING', icon: Monitor },
      { label: 'IMAGING', icon: Camera },
      { label: 'GAMING', icon: Gamepad2 },
      { label: 'TELEPHONY', icon: Smartphone },
      { label: 'INPUT', icon: Keyboard },
      { label: 'OUTPUT', icon: Printer },
      { label: 'STORAGE', icon: HardDrive },
      { label: 'ACCESSORIES', icon: Cable },
      { label: 'PROTOTYPES', icon: Box },
    ]
  },
  DESIGNERS: {
    title: 'LEGACY_ARCHITECTS',
    icon: PenTool,
    items: [
      { label: 'DIETER RAMS', sub: 'BRAUN' },
      { label: 'JONY IVE', sub: 'APPLE' },
      { label: 'HARTMUT ESSLINGER', sub: 'FROG' },
      { label: 'RICHARD SAPPER', sub: 'IBM' },
      { label: 'MARIO BELLINI', sub: 'OLIVETTI' },
      { label: 'NAOTO FUKASAWA', sub: 'MUJI' },
      { label: 'MARC NEWSON', sub: 'IKEPOD' },
      { label: 'KENNETH GRANGE', sub: 'KODAK' },
      { label: 'YVES BEHAR', sub: 'FUSEPROJECT' },
      { label: 'PHILIPPE STARCK', sub: 'INDEPENDENT' },
    ]
  },
  TAGS: {
    title: 'TAXONOMY_CLUSTERS',
    icon: Tag,
    items: [
      { label: 'PROTOTYPE' },
      { label: 'SPACE-AGE' },
      { label: 'MINIMALISM' },
      { label: 'BAUHAUS' },
      { label: 'CYBERPUNK' },
      { label: 'TRANSLUCENT' },
      { label: 'MATTE-BLACK' },
      { label: 'ALUMINUM' },
      { label: 'MIL-SPEC' },
      { label: 'BRUTALIST' },
      { label: 'RETRO-FUTURISM' },
      { label: 'HIGH-FIDELITY' },
      { label: 'ANALOG' },
      { label: 'MECHANICAL' },
      { label: 'INDUSTRIAL' },
      { label: 'MODULAR' },
    ]
  }
};

const Navbar: React.FC<NavbarProps> = ({ onSearchOpen, theme, onToggleTheme }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav 
        className="relative bg-[var(--bg-main)] border-b border-[var(--border-main)] h-16 transition-colors duration-300"
        onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between px-6 h-full">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-6 h-6 border border-[var(--text-main)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] group-hover:text-[var(--bg-main)] transition-colors duration-300">
                <span className="font-bold text-xs">TA</span>
            </div>
            <h1 className="text-xl font-bold tracking-tighter uppercase glitch-hover">The Tech Archive</h1>
          </div>

          {/* Center: Links */}
          <div className="hidden md:flex items-center gap-8 font-mono text-sm tracking-wide h-full">
            {['BRANDS', 'CATEGORIES', 'DESIGNERS', 'TAGS'].map((link) => (
              <div 
                key={link} 
                className="h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(link)}
              >
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className={`relative py-4 transition-colors duration-200 group flex items-center gap-1 ${activeMenu === link ? 'text-[var(--color-accent)]' : 'text-[var(--text-muted)] hover:text-[var(--color-accent)]'}`}
                  >
                    {link}
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-[var(--color-accent)] transition-all duration-300 ${activeMenu === link ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </a>
              </div>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onSearchOpen(); }}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--border-main)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] transition-all duration-200 group"
            >
              <Search size={16} className="group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs hidden sm:inline-block">SEARCH ARCHIVE</span>
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleTheme(); }}
              className="p-2 border border-[var(--border-main)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className="p-2 border border-[var(--border-main)] hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] hover:border-[var(--color-accent)] transition-colors duration-200">
              <User size={18} />
            </button>
          </div>
      </div>

      {/* MEGA MENU DROPDOWN */}
      <div 
         className={`absolute top-[calc(100%-1px)] left-0 w-full border-t border-b border-[var(--border-main)] bg-[var(--bg-main)] transition-all duration-300 shadow-2xl overflow-hidden ${activeMenu ? 'h-[450px] opacity-100 visible' : 'h-0 opacity-0 invisible'}`}
         style={{ transformOrigin: 'top' }}
      >
        {activeMenu && MENU_DATA[activeMenu] && (
            <div className="grid grid-cols-12 h-full">
                {/* Header Column - Fixed */}
                <div className="col-span-3 border-r border-[var(--border-main)] p-8 bg-[var(--bg-secondary)] flex flex-col justify-between h-full sticky top-0">
                    <div>
                        <div className="flex items-center gap-3 text-[var(--color-accent)] mb-4">
                            {React.createElement(MENU_DATA[activeMenu].icon, { size: 20 })}
                            <span className="font-mono text-xs tracking-widest uppercase">
                                {MENU_DATA[activeMenu].title}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4 text-[var(--text-main)]">
                            {activeMenu}
                        </h3>
                        <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed max-w-[200px]">
                            Explore curated collections organized by {activeMenu.toLowerCase()}. Use filters to refine your search parameters.
                        </p>
                    </div>
                    <div>
                        <button className="flex items-center gap-2 font-mono text-xs text-[var(--text-main)] hover:text-[var(--color-accent)] group transition-colors">
                            <span>VIEW ALL {activeMenu}</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Content Grid - Scrollable */}
                <div className="col-span-9 p-8 overflow-y-auto h-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
                        {MENU_DATA[activeMenu].items.map((item: any, idx: number) => {
                            return (
                                <a 
                                    key={idx} 
                                    href="#"
                                    className="group border border-[var(--border-main)] hover:border-[var(--color-accent)] p-4 transition-all duration-200 flex flex-col justify-between aspect-[4/3] relative overflow-hidden bg-[var(--bg-main)] hover:bg-[var(--color-accent)]/5"
                                >
                                    {/* Animated Grid Background */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none animate-grid-pan z-0 transition-opacity duration-300"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, var(--color-accent) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent) 1px, transparent 1px)`,
                                            backgroundSize: '20px 20px'
                                        }}
                                    ></div>

                                    {/* Laser Scanline */}
                                    <div className="absolute top-[-10%] left-0 w-full h-[1px] bg-[var(--color-accent)] shadow-[0_0_10px_2px_var(--color-accent)] opacity-0 group-hover:animate-scan-vertical delay-500 z-20"></div>

                                    {/* Corner Reveal */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-[var(--color-accent)]">
                                        <ChevronRight size={14} />
                                    </div>
                                    
                                    <div className="relative z-10 text-[var(--text-dim)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                                        {item.icon ? (
                                            React.createElement(item.icon, { 
                                                className: 'w-6 h-6', 
                                                strokeWidth: 1.5 
                                            })
                                        ) : (
                                            <span className="font-mono text-[10px]">0{idx + 1}</span>
                                        )}
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <span className="block font-bold text-sm tracking-wide transition-colors uppercase text-[var(--text-main)] group-hover:text-[var(--color-accent)] group-hover:drop-shadow-[0_0_5px_rgba(var(--color-accent-rgb),0.5)]">
                                            {item.label}
                                        </span>
                                        {item.sub && (
                                            <span className="block font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--color-accent)]/70 transition-colors uppercase mt-1">
                                                {item.sub}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;