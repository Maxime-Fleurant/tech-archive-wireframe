import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, Share2, Heart, 
    Rotate3d, Image as ImageIcon,
    ExternalLink, Users, Volume2, Cpu, TrendingUp, Package, Search, X, 
    Calendar, Palette, 
    MonitorPlay, FileText, LayoutGrid, LayoutTemplate,
    Aperture, Scale, Link, Play, Grid
} from 'lucide-react';
import { StickerFragile, StickerRecycle, StickerUmbrella, StickerUp, StickerFlame, StickerHands } from './StickerIcons';
import { 
    DETAILED_PRODUCT, ASSET_MODES, SUB_CATEGORIES, COLOR_VARIANTS, 
    ASSET_LIBRARY, TAG_POOL, SOUND_TRACKS 
} from '../constants';
import { 
    LEDStatusModule, SectionHeader, DataField, TimelineNode, ResourceLink, 
    OrnaFlightTag, IndustrialCard, OscilloscopeHUD, CarouselGallery, 
    MasonryAdvertGallery, ImageModal 
} from './ProductParts';

interface ProductPageProps {
  onBack: () => void;
}

type ViewMode = 'ALL' | 'TV_ADS' | 'UI_UX' | 'COMMUNITY' | 'MANUALS' | 'PACKAGING' | 'INTERNALS' | 'MISC';
type DisplayMode = 'MASONRY' | 'CAROUSEL';
type DashboardView = 'PHOTO' | '3D' | 'BLUEPRINT' | 'PACKAGING';

const ProductPage: React.FC<ProductPageProps> = ({ onBack }) => {
  const item = DETAILED_PRODUCT; // Use enhanced data from constants
  
  const [dashboardView, setDashboardView] = useState<DashboardView>('PHOTO');
  const [soundActive, setSoundActive] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('ALL');
  const [subViewMode, setSubViewMode] = useState<string>('ALL');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('MASONRY'); 
  const [hoveredView, setHoveredView] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<any | null>(null);

  // ENRICH ASSETS with Random Tags (3-10 per item)
  const enrichedAssets = useMemo(() => {
    // 1. Enrich
    const mapped = ASSET_LIBRARY.map((asset, index) => {
        const tagCount = 3 + (index % 8); // Generates between 3 and 10
        const tags = [asset.category]; // Ensure category is first tag
        
        for (let i = 0; i < tagCount; i++) {
            // Pick tags from pool based on index offset
            const tagIndex = (index + i * 2) % TAG_POOL.length;
            tags.push(TAG_POOL[tagIndex]);
        }
        
        // Remove duplicates if any
        const uniqueTags = Array.from(new Set(tags));
        
        return {
            ...asset,
            id: `asset-${index}`,
            tags: uniqueTags
        };
    });

    // 2. Shuffle using Fisher-Yates
    for (let i = mapped.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
    }

    return mapped;
  }, []);

  const toggleSound = () => {
    setSoundActive(!soundActive);
  };

  const VISUAL_MODES = [
      { id: 'PHOTO', label: 'Photo', icon: ImageIcon },
      { id: '3D', label: '3D Model', icon: Rotate3d },
      { id: 'BLUEPRINT', label: 'Schematic', icon: Grid },
      { id: 'PACKAGING', label: 'Packaging', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] animate-[fadeIn_0.5s_ease-out]">
      
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
            <ImageModal item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>

      {/* STICKY HEADER STACK */}
      <div className="sticky top-[6rem] z-40 bg-[var(--bg-main)] grid grid-cols-1 lg:grid-cols-4 shadow-2xl shadow-[var(--bg-main)] h-14">
        
        {/* Left Col: Actions */}
        <div className="lg:col-span-1 border-r border-b border-[var(--border-main)] flex items-center justify-between pr-4 bg-[var(--bg-main)] h-full">
            <div className="flex items-center h-full">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 font-mono text-xs hover:text-[var(--color-accent)] transition-colors h-full px-6 border-r border-[var(--border-main)] hover:bg-[var(--bg-secondary)]"
                >
                    <ArrowLeft size={16} />
                    <span className="font-bold hidden sm:inline">INDEX</span>
                </button>
                <div className="px-6 flex items-baseline gap-2 truncate">
                    <span className="font-bold uppercase tracking-tight text-base truncate">{item.branding.brand}</span>
                    <span className="font-mono text-xs text-[var(--text-muted)]">/</span>
                    <span className="font-mono text-xs text-[var(--text-muted)] truncate">{item.modelNumber}</span>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                 <button className="text-[var(--text-muted)] hover:text-[var(--color-accent)] transition-colors"><Heart size={16} /></button>
                 <button className="text-[var(--text-muted)] hover:text-[var(--color-accent)] transition-colors"><Share2 size={16} /></button>
            </div>
        </div>

        {/* Right Col: Asset Navigation */}
        <div className="lg:col-span-3 flex flex-col bg-[var(--bg-main)] h-full overflow-visible relative border-b border-[var(--border-main)]">
             <div className="w-full h-full flex items-center lg:border-b-0">
                <div className="flex-1 flex items-center overflow-visible no-scrollbar h-full">
                    {ASSET_MODES.map((mode) => {
                        const hasSubCategories = SUB_CATEGORIES[mode.id]?.length > 0;
                        const isActive = viewMode === mode.id;
                        const isHovered = hoveredView === mode.id;
                        return (
                            <div 
                                key={mode.id}
                                className="h-full relative group/tab"
                                onMouseEnter={() => setHoveredView(mode.id)}
                                onMouseLeave={() => setHoveredView(null)}
                            >
                                <button
                                    onClick={() => {
                                        setViewMode(mode.id as ViewMode);
                                        setSubViewMode('ALL');
                                    }}
                                    className={`
                                        h-full px-6 flex items-center gap-2 border-r border-[var(--border-main)]
                                        transition-all duration-200 relative whitespace-nowrap min-w-max z-20 bg-[var(--bg-main)]
                                        ${isActive 
                                            ? 'bg-[var(--bg-secondary)] text-[var(--color-accent)]' 
                                            : 'hover:bg-[var(--bg-secondary)] hover:text-[var(--color-accent)] text-[var(--text-muted)]'
                                        }
                                    `}
                                >
                                    {isActive && <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-accent)]"></div>}
                                    <mode.icon size={14} className={isActive ? 'text-[var(--color-accent)]' : 'text-[var(--text-dim)] group-hover/tab:text-[var(--color-accent)]'} />
                                    <div className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wide">
                                        <span>{mode.label}</span>
                                        {isActive && subViewMode !== 'ALL' && (
                                            <>
                                                <span className="text-[var(--text-dim)] mx-1">//</span>
                                                <span className="text-[var(--color-accent)] animate-[fadeIn_0.3s_ease-out]">{subViewMode}</span>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); setSubViewMode('ALL'); }}
                                                    className="ml-2 hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] rounded-full p-0.5"
                                                >
                                                    <X size={8} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </button>
                                {hasSubCategories && isHovered && (
                                    <div className="absolute top-full left-[-1px] min-w-[220px] bg-[var(--bg-secondary)] border border-[var(--border-main)] shadow-2xl z-50 animate-[fadeIn_0.2s_ease-out]">
                                        <div className="flex flex-col">
                                            {SUB_CATEGORIES[mode.id].map((sub) => (
                                                <button
                                                    key={sub}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setViewMode(mode.id as ViewMode);
                                                        setSubViewMode(sub);
                                                        setHoveredView(null);
                                                    }}
                                                    className={`
                                                        px-4 py-2 text-left font-mono text-[10px] uppercase tracking-wide hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] transition-colors
                                                        ${isActive && subViewMode === sub ? 'text-[var(--color-accent)] font-bold' : 'text-[var(--text-muted)]'}
                                                    `}
                                                >
                                                    {sub}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <button className="h-full px-5 flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] transition-colors duration-200 group border-r border-[var(--border-main)]" aria-label="Search Assets">
                        <Search size={16} />
                    </button>
                </div>
                
                {/* Control Area: LED Status + Display Mode Toggle */}
                <div className="flex-none h-full bg-[var(--bg-main)] z-10 shadow-[-10px_0_20px_var(--bg-main)] flex items-center">
                    
                    {/* NEW: LED Status Module (Vertical) */}
                    <LEDStatusModule />

                    {/* Display Toggle - Right Aligned */}
                    <div className="flex items-center h-full border-l border-[var(--border-main)]">
                        <button 
                            onClick={() => setDisplayMode('MASONRY')}
                            className={`h-full aspect-square flex items-center justify-center transition-colors border-r border-[var(--border-main)] ${displayMode === 'MASONRY' ? 'bg-[var(--bg-secondary)] text-[var(--color-accent)]' : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'}`}
                            title="Masonry View"
                        >
                            <LayoutGrid size={14} />
                        </button>
                        <button 
                            onClick={() => setDisplayMode('CAROUSEL')}
                            className={`h-full aspect-square flex items-center justify-center transition-colors ${displayMode === 'CAROUSEL' ? 'bg-[var(--bg-secondary)] text-[var(--color-accent)]' : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'}`}
                            title="Carousel View"
                        >
                            <LayoutTemplate size={14} />
                        </button>
                    </div>
                </div>
             </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-4 min-h-[calc(100vh-9.5rem)]">

        {/* --- LEFT COLUMN: DATA (Master Height) --- */}
        <div className="lg:col-span-1 border-r border-[var(--border-main)] flex flex-col bg-[var(--bg-main)]">
            
            {/* 1. IDENTITY HEADER */}
            <div className="sticky top-[9.5rem] z-40 relative p-6 border-b border-[var(--border-main)] bg-[var(--bg-panel)] overflow-hidden flex-none shadow-sm">
                
                {/* TOP RIGHT CORNER: REF TAG */}
                <div className="absolute top-6 right-6 z-20">
                     <span className="font-mono text-[9px] text-[var(--text-dim)] border border-[var(--border-main)] px-2 py-1 bg-[var(--bg-panel)]">
                         REF: {item.modelNumber}
                     </span>
                </div>

                {/* Header Content */}
                <div className="flex flex-col gap-1 relative z-10 mb-4">
                     <div className="flex items-center gap-3">
                        {/* BRAND NAME */}
                        <h2 className="font-bold text-2xl tracking-widest text-[var(--color-accent)] uppercase">
                            {item.branding.brand} CORP.
                        </h2>
                     </div>
                </div>

                <h1 className="relative z-10 text-5xl xl:text-7xl font-bold uppercase leading-[0.8] tracking-tighter text-[var(--text-main)] mb-4">
                    {item.name}
                </h1>

                {item.slogan && (
                    <div className="relative z-10 mb-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="border-l-4 border-[var(--text-dim)] pl-4">
                                <p className="text-xl md:text-2xl font-bold italic tracking-tighter text-[var(--text-muted)] uppercase leading-none">
                                    "{item.slogan}"
                                </p>
                            </div>
                            {/* Barcode Ornament - 33% width, aligned right */}
                            <div className="w-1/3">
                                <OrnaFlightTag className="!bg-transparent !p-0" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="relative z-10 flex items-center justify-between border-t border-dashed border-[var(--border-main)] pt-4 mt-0 flex-wrap gap-y-2">
                    <div className="flex items-center gap-3">
                        <span className="bg-[var(--text-main)] text-[var(--bg-main)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase">
                            {item.typology.category}
                        </span>
                        <span className="font-mono text-[9px] uppercase text-[var(--text-muted)] tracking-wide">
                            {item.typology.subCategory}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="flex items-center gap-1 text-[var(--text-muted)]">
                            <StickerFragile className="w-6 h-6" />
                            <StickerRecycle className="w-6 h-6" />
                            <StickerUmbrella className="w-6 h-6" />
                            <StickerUp className="w-6 h-6" />
                            <StickerFlame className="w-6 h-6" />
                            <StickerHands className="w-6 h-6" />
                        </div>

                        <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-[var(--color-accent)]">
                            <span>EST.</span>
                            <span>{item.year}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 2. DESCRIPTION */}
            <div className="border-b border-[var(--border-main)] bg-[var(--bg-main)] flex flex-col">
                <div className="p-6 pb-4">
                    <blockquote className="text-lg md:text-xl font-medium uppercase leading-[1.1] tracking-tight text-[var(--text-main)]">
                        {item.descriptionHook}
                    </blockquote>
                </div>
                <div className="p-6 pt-0 flex flex-col gap-6">
                    <p className="font-mono text-sm md:text-base leading-relaxed text-[var(--text-muted)] text-justify">
                        {item.description}
                    </p>
                    {item.wikiUrl && (
                        <a 
                            href={item.wikiUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 self-start border-b border-[var(--border-main)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors group pb-0.5"
                        >
                            <span className="font-bold text-[10px] tracking-wide uppercase">WIKIPEDIA</span>
                            <ExternalLink size={10} />
                        </a>
                    )}
                </div>
            </div>

            {/* 3. INTERACTIVE TERMINAL */}
            <div className="w-full aspect-square border-b border-[var(--border-main)] relative bg-[var(--bg-panel)] flex flex-col group">
                <div className="flex-grow relative overflow-hidden">
                    <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                        {VISUAL_MODES.map((mode) => (
                            <button key={mode.id} onClick={() => setDashboardView(mode.id as DashboardView)} className={`w-8 h-8 flex items-center justify-center border border-[var(--border-main)] shadow-lg transition-all duration-200 ${dashboardView === mode.id ? 'bg-[var(--color-accent)] text-[var(--bg-main)]' : 'bg-[var(--bg-main)]/90 text-[var(--text-muted)] hover:text-[var(--color-accent)]'}`} title={mode.label}>{React.createElement(mode.icon, { size: 14 })}</button>
                        ))}
                    </div>
                    <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
                        {COLOR_VARIANTS.map((c, i) => (
                            <button 
                                key={i} 
                                onClick={() => setSelectedColorIndex(i)}
                                className={`w-4 h-4 shadow-lg border border-[var(--border-main)] transition-all duration-200 hover:scale-125 ${selectedColorIndex === i ? 'ring-2 ring-[var(--text-main)] scale-110' : ''}`}
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                            />
                        ))}
                    </div>
                    <OscilloscopeHUD active={soundActive} />
                    {dashboardView === '3D' && <div className="w-full h-full flex items-center justify-center z-0 p-8 bg-[var(--bg-panel)]"><img src="https://placehold.co/600x600/1a1a1a/333333?text=3D+MODEL+PLACEHOLDER" alt="3D" className="w-full h-full object-contain opacity-50 mix-blend-lighten" /></div>}
                    {dashboardView === 'PHOTO' && <div className="absolute inset-0 z-0 flex items-center justify-center p-8 bg-[var(--bg-panel)]"><img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" /></div>}
                    {dashboardView === 'BLUEPRINT' && <div className="w-full h-full bg-[var(--color-accent)]/5 relative flex items-center justify-center z-0"><div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--color-accent-rgb),0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-accent-rgb),0.2)_1px,transparent_1px)] bg-[size:40px_40px]"></div><img src={item.imageUrl} className="w-[85%] h-[85%] object-contain opacity-60 grayscale invert mix-blend-difference" /></div>}
                    {dashboardView === 'PACKAGING' && <div className="flex w-full h-full flex-col items-center justify-center text-[var(--text-dim)] z-0 bg-[var(--bg-panel)]"><Package size={32} className="mb-2 opacity-50" strokeWidth={1} /><span className="font-mono text-[10px] text-[var(--color-accent)]">SCAN REQUIRED</span></div>}
                </div>
            </div>

            {/* --- MASONRY DATA MATRIX --- */}
            <div className="flex w-full border-b border-[var(--border-main)] items-stretch">
                
                {/* --- LEFT SUB-COLUMN --- */}
                <div className="w-1/2 border-r border-[var(--border-main)] flex flex-col bg-[var(--bg-main)]">
                    
                    {/* BRAND IDENTITY */}
                    <SectionHeader label="BRAND_IDENTITY" icon={null} className="border-t-0" />
                    <div className="p-4 grid grid-cols-1 gap-0 bg-[var(--bg-main)]">
                         <DataField label="Brand" value={item.branding.brand} />
                         <DataField label="Line" value={item.branding.line} />
                         <DataField label="Parent" value={item.branding.parent} placeholder="-" />
                         <DataField label="OEM" value={item.branding.oem} placeholder="Internal" />
                         
                         {/* SONY LOGO FIELD */}
                         <div className="w-full py-6 px-6 border-b border-dashed border-[var(--border-main)] flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-colors last:border-b-0">
                             <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" 
                                alt="Sony Logo" 
                                className="w-full h-auto block opacity-90 invert" 
                             />
                         </div>
                    </div>

                    {/* TYPOLOGY */}
                    <SectionHeader label="TYPOLOGY" icon={LayoutGrid} />
                    <div className="p-4 grid grid-cols-1 gap-0 bg-[var(--bg-main)]">
                        <DataField label="Category" value={item.typology.category} />
                        <DataField label="Sub-Cat" value={item.typology.subCategory} />
                        <DataField label="Nature" value={item.typology.nature} placeholder="Standard" />
                        <DataField label="Grade" value={item.typology.grade} placeholder="Consumer" />
                        <DataField label="Target Audience" value={['Youth', 'Travelers', 'Music Lovers']} full />
                        <DataField label="Mobility" value={item.typology.mobility} placeholder="Portable" />
                        <DataField label="Keywords" value={item.typology.keywords} full />
                    </div>

                    {/* AESTHETIC FORM */}
                    <SectionHeader label="AESTHETIC_FORM" icon={Palette} />
                    <div className="bg-[var(--bg-main)]">
                        <div className="p-4">
                            <div className="py-3 border-b border-dashed border-[var(--border-main)] hover:bg-[var(--bg-secondary)] transition-colors group">
                                <div className="flex justify-between items-center gap-2">
                                    <span className="font-mono text-[8px] uppercase text-[var(--text-dim)] shrink-0 tracking-wider group-hover:text-[var(--text-muted)] transition-colors">
                                        Colors
                                    </span>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 border border-[var(--border-main)]" style={{ backgroundColor: item.aesthetic.primaryColor }} title="Primary"></div>
                                        <div className="w-3 h-3 border border-[var(--border-main)]" style={{ backgroundColor: item.aesthetic.secondaryColor }} title="Secondary"></div>
                                        <div className="w-3 h-3 border border-[var(--border-main)] bg-red-500" title="Red Variant"></div>
                                        <div className="w-3 h-3 border border-[var(--border-main)] bg-black" title="Black Variant"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-0">
                                <DataField label="Materials" value={item.aesthetic.materials} full />
                                <DataField label="Finish" value={item.aesthetic.finish} />
                                <DataField label="Form Factor" value={item.aesthetic.formFactor} />
                                <DataField label="Lighting / UI" value={item.aesthetic.lighting} placeholder="None" />
                                <DataField label="Design Style" value={item.aesthetic.style} placeholder="Industrial" />
                                <DataField label="Designer" value={item.aesthetic.designer} placeholder="Unknown" />
                                <DataField label="Design Agency" value={item.aesthetic.agency} placeholder="In-House" />
                            </div>

                             <div className="py-3 border-t border-dashed border-[var(--border-main)] hover:bg-[var(--bg-secondary)] transition-colors group">
                                <div className="flex justify-between items-center gap-2">
                                    <span className="font-mono text-[8px] uppercase text-[var(--text-dim)] shrink-0 tracking-wider group-hover:text-[var(--text-muted)] transition-colors">
                                        Color Variants
                                    </span>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 border border-[var(--border-main)]" style={{ backgroundColor: '#3d5c94' }} title="Blue"></div>
                                        <div className="w-3 h-3 border border-[var(--border-main)]" style={{ backgroundColor: '#facc15' }} title="Yellow"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SONIC SIGNATURE */}
                    <SectionHeader label="SONIC_SIGNATURE" icon={Volume2} />
                    <div className="bg-[var(--bg-main)]">
                       <div className="p-4 flex flex-col gap-0">
                           {SOUND_TRACKS.map(track => (
                               <div key={track.id} className="py-3 border-b border-dashed border-[var(--border-main)] flex justify-between items-center group hover:bg-[var(--bg-secondary)] transition-colors last:border-b-0">
                                   <span className="font-mono text-[8px] uppercase text-[var(--text-dim)] tracking-wider group-hover:text-[var(--text-main)] transition-colors">{track.label}</span>
                                   <button className="p-1 border border-[var(--border-main)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] transition-colors">
                                       <Play size={10} fill="currentColor" />
                                   </button>
                               </div>
                           ))}
                       </div>
                    </div>

                    {/* SYSTEM TECH */}
                    <SectionHeader label="SYSTEM_TECH" icon={Cpu} />
                    <div className="bg-[var(--bg-main)] p-4 grid grid-cols-1 gap-0 border-b border-[var(--border-main)]">
                         <DataField label="Technology Base" value={item.tech.base} placeholder="Electronic" />
                         <DataField label="Key Component" value={['Stereo Magnetic Head', 'Brushless Motor']} full />
                         <DataField label="Power Source" value={item.tech.power} placeholder="Passive" />
                         <DataField label="Media Format" value={item.tech.media} placeholder="N/A" />
                         <DataField label="Input Interface" value={item.tech.inputs} full />
                         <DataField label="Display" value={item.tech.display} placeholder="None" />
                         <DataField label="Connectivity" value={item.tech.ports} full />
                    </div>

                    {/* SPACER FOR BOTTOM ALIGNMENT */}
                    <div className="mt-auto">
                        <IndustrialCard item={item} />
                    </div>

                </div>

                {/* --- RIGHT SUB-COLUMN --- */}
                <div className="w-1/2 flex flex-col bg-[var(--bg-main)] h-full">
                    
                    {/* PHYSICAL DATA */}
                    <SectionHeader label="PHYSICAL_DATA" icon={Scale} className="border-t-0 border-r" />
                    <div className="bg-[var(--bg-main)] p-4 grid grid-cols-1 gap-0">
                        <DataField label="Dimensions" value={item.physical.dimensions} />
                        <DataField label="Weight" value={item.physical.weight} />
                        <DataField label="Ruggedness" value={[item.physical.ruggedness]} full />
                        <DataField label="Mechanical Features" value={item.physical.mechanical} full />
                    </div>

                    {/* HISTORY */}
                    <SectionHeader label="HISTORY" icon={Calendar} className="border-r" />
                    <div className="bg-[var(--bg-main)] p-4">
                         <div>
                            <TimelineNode date={item.timeline.announceDate} label="Announcement" type="start" />
                            <TimelineNode date={item.timeline.releaseDate} label="Release" type="mid" />
                            <TimelineNode date={item.timeline.eolDate} label="End of Life" type="end" isLast />
                         </div>
                         <div className="w-full border-t border-dashed border-[var(--border-main)] mt-0"></div>
                         <div className="grid grid-cols-1 gap-0">
                            <DataField label="Cultural Era" value={item.timeline.eraTags} placeholder="-" full />
                            <DataField label="Competitors" value={item.timeline.competitors} full />
                         </div>
                    </div>

                    {/* LOGO */}
                    <SectionHeader label="LOGO" icon={Aperture} className="border-r" />
                    <div className="bg-[var(--bg-main)] border-b border-[var(--border-main)] w-full relative group">
                        <div className="p-10 w-full">
                            <img 
                                src={item.vectorLogoUrl} 
                                alt="Brand Logo" 
                                className="w-full h-auto block object-contain drop-shadow-xl opacity-90 group-hover:opacity-100 transition-opacity" 
                            />
                        </div>
                    </div>

                    {/* MARKET STATUS */}
                    <SectionHeader label="MARKET_STATUS" icon={TrendingUp} className="border-r" />
                    <div className="bg-[var(--bg-main)] p-4 grid grid-cols-1 gap-0">
                         <DataField label="Commercial Status" value={item.market.status} placeholder="Discontinued" />
                         <DataField label="Sales Volume" value={item.market.sales} placeholder="Unknown" />
                         <DataField label="Launch Price" value={item.market.launchPrice} placeholder="N/A" />
                         <DataField label="Current Value" value={item.market.adjPrice} placeholder="N/A" />
                    </div>

                    {/* CULTURAL IMPACT */}
                    <SectionHeader label="CULTURAL_IMPACT" icon={Users} className="border-r" />
                    <div className="bg-[var(--bg-main)] p-4 grid grid-cols-1 gap-0">
                         <DataField label="Media Cameos" value={item.culture.cameos} full />
                         <DataField label="Subcultures" value={item.culture.movements} full />
                    </div>

                    {/* RESOURCES */}
                    <SectionHeader label="EXT_RESOURCES" icon={Link} className="border-r" />
                    <div className="bg-[var(--bg-main)] p-4 border-b border-[var(--border-main)] flex-grow">
                        {[
                            ...item.resources.official,
                            ...item.resources.wiki,
                            ...item.resources.manuals,
                            ...item.resources.community
                        ].map((r, i) => (
                             <ResourceLink key={i} label={r.label} source={r.source} />
                        ))}
                    </div>

                </div>
            </div>

            {/* FOOTER METADATA */}
            <div className="p-8 bg-[var(--bg-panel)] font-mono text-[9px] text-[var(--text-dim)] leading-relaxed border-b border-[var(--border-main)]">
                <span className="block mb-2 text-[var(--color-accent)]">/// END OF RECORD</span>
                DATABASE ID: {item.id}<br/>
                LAST UPDATED: {item.lastModified}<br/>
                CONTRIBUTOR: {item.uploadedBy}
            </div>

        </div>

        {/* --- RIGHT COLUMN: VISUAL MASONRY / CAROUSEL --- */}
        <div className={`lg:col-span-3 bg-[var(--bg-secondary)] ${displayMode === 'CAROUSEL' ? 'relative lg:sticky lg:top-[9.5rem] h-[calc(100vh-9.5rem)]' : 'relative min-h-screen lg:min-h-0'}`}>
             <div className={`${displayMode === 'CAROUSEL' ? 'h-full' : 'lg:absolute lg:inset-0'} flex flex-col`}>
                 <div className="flex-grow overflow-y-auto custom-scrollbar relative h-full">
                    {displayMode === 'CAROUSEL' ? (
                        <CarouselGallery 
                            items={enrichedAssets} 
                            onImageClick={setLightboxItem}
                        />
                    ) : (
                        <MasonryAdvertGallery 
                            items={enrichedAssets} 
                            onImageClick={setLightboxItem}
                        />
                    )}
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;