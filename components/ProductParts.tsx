
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ExternalLink, Heart, Share2, MoreVertical, X, 
    ChevronLeft, ChevronRight 
} from 'lucide-react';

// --- SUB-COMPONENTS FOR PRODUCT PAGE ---

// LED Status Module (Vertical)
export const LEDStatusModule = () => {
    const [bootState, setBootState] = useState<'IDLE' | 'BOOT_1' | 'BOOT_2' | 'BOOT_3' | 'BLINK_OFF' | 'BLINK_ON' | 'ACTIVE'>('IDLE');

    useEffect(() => {
        const START_TIME = 200; // Immediate start on mount
        const timeouts = [
            setTimeout(() => setBootState('BOOT_1'), START_TIME),
            setTimeout(() => setBootState('BOOT_2'), START_TIME + 250),
            setTimeout(() => setBootState('BOOT_3'), START_TIME + 500),
            setTimeout(() => setBootState('BLINK_OFF'), START_TIME + 1000),
            setTimeout(() => setBootState('BLINK_ON'), START_TIME + 1150),
            setTimeout(() => setBootState('BLINK_OFF'), START_TIME + 1300),
            setTimeout(() => setBootState('BLINK_ON'), START_TIME + 1450),
            setTimeout(() => setBootState('ACTIVE'), START_TIME + 1600),
        ];
        return () => timeouts.forEach(t => clearTimeout(t));
    }, []);

    const getLedClass = (color: 'red' | 'amber' | 'blue') => {
        const base = "w-1.5 h-1.5 rounded-full transition-all duration-75";
        const off = color === 'red' ? "bg-[#330000]" : color === 'amber' ? "bg-[#332200]" : "bg-[#001133]";
        const on = color === 'red' ? "bg-[#ff0000] shadow-[0_0_8px_#ff0000]" : color === 'amber' ? "bg-[#ffaa00] shadow-[0_0_8px_#ffaa00]" : "bg-[#00aaff] shadow-[0_0_8px_#00aaff]";

        if (bootState === 'IDLE') return `${base} ${off}`;
        if (bootState === 'BLINK_OFF') return `${base} ${off}`;
        if (bootState === 'BLINK_ON') return `${base} ${on}`;
        
        if (color === 'red' && ['BOOT_1', 'BOOT_2', 'BOOT_3'].includes(bootState)) return `${base} ${on}`;
        if (color === 'amber' && ['BOOT_2', 'BOOT_3'].includes(bootState)) return `${base} ${on}`;
        if (color === 'blue' && ['BOOT_3'].includes(bootState)) return `${base} ${on}`;

        if (bootState === 'ACTIVE') {
            if (color === 'red') return `${base} bg-[#ff0000] shadow-[0_0_8px_#ff0000]`; 
            if (color === 'amber') return `${base} bg-[#332200] animate-[led-data-seq_2s_steps(1)_infinite]`; 
            if (color === 'blue') return `${base} bg-[#001133] animate-[led-net-seq_3s_ease-in-out_infinite]`;
        }

        return `${base} ${off}`;
    };

    return (
        <div className="flex flex-col justify-center gap-1.5 px-4 h-full border-r border-[var(--border-main)] bg-[var(--bg-main)]">
            <div className={getLedClass('red')} title="PWR"></div>
            <div className={getLedClass('amber')} title="DAT"></div>
            <div className={getLedClass('blue')} title="NET"></div>
        </div>
    );
}

export interface SectionHeaderProps { label: string; icon?: any; color?: string; className?: string; }

export const SectionHeader: React.FC<SectionHeaderProps> = ({ label, icon: Icon, color = "var(--color-accent)", className = "" }) => (
    <div className={`flex items-center gap-3 border-t border-b border-[var(--border-main)] bg-[var(--bg-panel)] px-4 py-3 sticky top-[9.5rem] z-30 backdrop-blur-sm bg-[var(--bg-panel)]/95 shadow-sm ${className}`}>
        <div className="w-1 h-2.5 shrink-0" style={{ backgroundColor: color }}></div>
        {Icon && <Icon size={12} className="text-[var(--text-main)] shrink-0" />}
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--text-main)] truncate leading-none pt-px">
            {label}
        </span>
    </div>
);

// Data Field Component
export const DataField = ({ label, value, placeholder, full = false }: { label: string, value?: string | string[], placeholder?: string, full?: boolean }) => {
    const displayValue = value || placeholder || "N/A";
    const isPlaceholder = !value;
    const isArray = Array.isArray(displayValue);
    
    return (
        <div className={`py-3 border-b border-dashed border-[var(--border-main)] last:border-b-0 transition-colors group ${!isArray ? 'hover:bg-[var(--bg-secondary)]' : ''} ${full ? 'col-span-1' : ''}`}>
            {isArray ? (
                <div className="flex flex-wrap items-baseline gap-1 w-full justify-end">
                    <span className="font-mono text-[8px] uppercase text-[var(--text-dim)] shrink-0 tracking-wider transition-colors mr-auto">
                        {label}
                    </span>
                    {(displayValue as string[]).map((v, i) => (
                         <span key={i} className="inline-block border border-[var(--border-main)] px-1 py-0.5 text-[8px] font-mono text-[var(--text-muted)] bg-[var(--bg-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-colors cursor-default">
                            {v}
                        </span>
                    ))}
                </div>
            ) : (
                <div className="flex justify-between items-center gap-2">
                    <span className="font-mono text-[8px] uppercase text-[var(--text-dim)] shrink-0 tracking-wider group-hover:text-[var(--text-muted)] transition-colors">
                        {label}
                    </span>
                    <div className={`text-right font-medium text-[10px] leading-relaxed ${isPlaceholder ? 'text-[var(--text-dim)] italic' : 'text-[var(--text-main)] group-hover:text-[var(--color-accent)]'}`}>
                        {displayValue}
                    </div>
                </div>
            )}
        </div>
    );
}

// Timeline Node Component
export const TimelineNode = ({ date, label, type, isLast = false }: { date: string, label: string, type: 'start' | 'mid' | 'end', isLast?: boolean }) => (
    <div className="flex gap-4 w-full relative pb-6 group">
        <div className="flex flex-col items-center relative shrink-0 w-3 pt-[0.25rem]">
            <div className={`w-2.5 h-2.5 shrink-0 z-10 border border-[var(--text-main)] bg-[var(--bg-main)] flex items-center justify-center ${type === 'start' ? 'border-[var(--color-accent)]' : ''}`}>
                <div className={`w-1 h-1 ${type === 'start' ? 'bg-[var(--color-accent)]' : 'bg-[var(--text-main)]'}`}></div>
            </div>
            {!isLast && (
                <div 
                    className="absolute top-3 bottom-[-1.5rem] w-px bg-[var(--border-main)] left-1/2 -translate-x-1/2"
                ></div>
            )}
        </div>
        <div className="w-full">
            <div className="flex justify-between items-baseline border-b border-dashed border-[var(--border-main)] pb-1 mb-0.5">
                 <span className="block font-mono text-[8px] font-bold text-[var(--color-accent)]">{date}</span>
                 {type === 'start' && <span className="text-[7px] font-mono text-[var(--text-dim)] uppercase">START</span>}
                 {type === 'end' && <span className="text-[7px] font-mono text-[var(--text-dim)] uppercase">END</span>}
            </div>
            <span className="block font-sans text-[10px] font-medium text-[var(--text-main)] leading-tight">{label}</span>
        </div>
    </div>
);

// Resource Link Component
export const ResourceLink: React.FC<{ label: string, source: string }> = ({ label, source }) => (
    <a href="#" className="flex items-center justify-between py-3 border-b border-dashed border-[var(--border-main)] last:border-b-0 hover:bg-[var(--bg-secondary)] group transition-colors">
        <div className="flex flex-col">
            <span className="font-bold text-[10px] uppercase tracking-wide group-hover:text-[var(--color-accent)] transition-colors">{label}</span>
            <span className="font-mono text-[8px] opacity-60 group-hover:opacity-80">{source}</span>
        </div>
        <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-accent)]" />
    </a>
);

export const OrnaFlightTag = ({ className = "" }: { className?: string }) => (
    <div className={`w-full px-4 py-6 bg-[var(--bg-main)] ${className}`}>
        <div className="flex flex-col gap-1 w-full">
             <div className="flex justify-end mb-1">
                <span className="font-mono text-[7px] font-bold text-[var(--text-main)] block leading-none tracking-widest uppercase border border-[var(--text-main)] px-1 py-0.5">PRIORITY</span>
             </div>
             <div className="h-10 w-full flex items-stretch justify-between overflow-hidden">
                  {[...Array(65)].map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-[var(--text-main)]" 
                        style={{
                            width: Math.random() > 0.6 ? '3px' : (Math.random() > 0.3 ? '1px' : '0.5px'), 
                            opacity: Math.random() > 0.1 ? 1 : 0.2
                        }}
                      ></div>
                  ))}
             </div>
             <div className="flex justify-between items-end font-mono text-[8px] text-[var(--text-main)] font-bold tracking-widest mt-1">
                 <span>* 8829-001-L2 *</span>
                 <span className="opacity-50">S/N: 554032</span>
             </div>
        </div>
    </div>
);

export const IndustrialCard = ({ item }: { item: any }) => {
    return (
        <div className="w-full p-4 bg-[var(--bg-main)] flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                    <h3 className="font-bold text-3xl tracking-tighter leading-[0.85] text-[var(--text-main)]">
                        TECH<br/>ARCHIVE<span className="text-[var(--color-accent)] text-lg align-top ml-0.5">®</span>
                    </h3>
                </div>
                <div className="border-2 border-[var(--text-main)] w-12 h-12 flex items-center justify-center bg-[var(--bg-main)] group-hover:bg-[var(--text-main)] group-hover:text-[var(--bg-main)] transition-colors duration-300">
                    <span className="font-bold text-lg tracking-tighter">TA</span>
                </div>
            </div>
        </div>
    );
};

export const OscilloscopeHUD: React.FC<{ active: boolean }> = ({ active }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let offset = 0;

        const render = () => {
            const width = canvas.width;
            const height = canvas.height;
            const centerY = height / 2;

            ctx.clearRect(0, 0, width, height);

            if (active) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-accent').trim();
                
                for (let x = 0; x < width; x++) {
                    const y = centerY + 
                             Math.sin((x + offset) * 0.1) * 15 * Math.sin(x * 0.01) + 
                             Math.random() * 5;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
                offset += 5;
            }
            animationId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationId);
    }, [active]);

    if (!active) return null;

    return (
        <div className="absolute inset-x-0 bottom-24 h-32 flex items-center justify-center pointer-events-none z-30 mix-blend-screen">
             <canvas ref={canvasRef} width={600} height={128} className="w-full h-full max-w-lg" />
        </div>
    );
};

// Carousel Component
export const CarouselGallery: React.FC<{ items: any[], onImageClick: (item: any) => void }> = ({ items, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const next = (e: React.MouseEvent) => { 
        e.stopPropagation(); 
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % items.length); 
    };
    const prev = (e: React.MouseEvent) => { 
        e.stopPropagation(); 
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length); 
    };

    const getThumbnail = (item: any) => item.src || `https://placehold.co/600x400?text=NO+IMAGE`;
    const visibleItem = items[currentIndex];

    if (!items.length) return null;

    const slideVariants = {
        enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0 })
    };

    return (
        <div className="w-full h-full flex flex-col relative bg-[var(--bg-secondary)] overflow-hidden group">
            <div className="flex-grow min-h-0 relative flex items-center justify-center overflow-hidden bg-[var(--bg-secondary)] select-none">
                <div className="absolute inset-0 pointer-events-none opacity-20" 
                     style={{ backgroundImage: 'radial-gradient(var(--text-dim) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                </div>
                
                <div className="relative w-full h-full z-10 cursor-zoom-in overflow-hidden" onClick={() => onImageClick(visibleItem)}>
                     <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                           key={currentIndex}
                           custom={direction}
                           variants={slideVariants}
                           initial={direction === 0 ? "center" : "enter"}
                           animate="center"
                           exit="exit"
                           transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                           className="absolute inset-0 flex items-center justify-center w-full h-full"
                        >
                             <motion.img 
                                src={visibleItem.src}
                                alt={visibleItem.title}
                                className="w-[80%] h-[80%] object-contain drop-shadow-2xl"
                                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
                             />
                        </motion.div>
                     </AnimatePresence>

                     <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-[var(--bg-main)]/90 backdrop-blur-md border border-[var(--border-main)] p-4 max-w-sm z-20 shadow-xl opacity-0 animate-[fadeIn_0.5s_0.2s_forwards] pointer-events-auto cursor-default" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-2 border-b border-[var(--border-main)] pb-2 gap-8">
                            <span className="font-mono text-[9px] text-[var(--color-accent)] uppercase tracking-widest">
                                ASSET_ID: {currentIndex.toString().padStart(3, '0')}
                            </span>
                            <div className="flex items-center gap-1">
                                <button className="p-1.5 hover:bg-[var(--bg-secondary)] text-[var(--text-dim)] hover:text-[var(--color-accent)] transition-colors"><Heart size={12} /></button>
                                <button className="p-1.5 hover:bg-[var(--bg-secondary)] text-[var(--text-dim)] hover:text-[var(--color-accent)] transition-colors"><Share2 size={12} /></button>
                                <button className="p-1.5 hover:bg-[var(--bg-secondary)] text-[var(--text-dim)] hover:text-[var(--color-accent)] transition-colors"><MoreVertical size={12} /></button>
                            </div>
                        </div>
                        <div className="flex justify-between items-end gap-4">
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--text-main)] truncate max-w-[200px]">{visibleItem.title}</h3>
                                <div className="flex gap-2 mt-1 items-center">
                                    <span className="font-mono text-[9px] text-[var(--text-dim)]">{currentIndex + 1} / {items.length}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[var(--border-main)] border-dashed">
                            {visibleItem.tags?.slice(0, 5).map((tag: string, i: number) => (
                                <span key={i} className="px-1.5 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-main)] text-[8px] font-mono text-[var(--text-muted)]">#{tag}</span>
                            ))}
                            {visibleItem.tags && visibleItem.tags.length > 5 && (
                                <span className="px-1.5 py-0.5 bg-[var(--color-accent)]/10 border border-[var(--color-accent)] text-[8px] font-mono text-[var(--color-accent)] font-bold">+{visibleItem.tags.length - 5}</span>
                            )}
                        </div>
                     </div>
                </div>

                <div onClick={prev} className="absolute inset-y-0 left-0 w-[15%] z-30 cursor-pointer flex items-center justify-start group/nav">
                    <div className="h-24 w-12 bg-[var(--bg-main)]/90 border-r border-y border-[var(--border-main)] flex items-center justify-center -translate-x-full group-hover/nav:translate-x-0 transition-transform duration-300 shadow-xl">
                        <ChevronLeft size={24} className="text-[var(--text-main)] group-hover/nav:text-[var(--color-accent)] transition-colors" />
                    </div>
                </div>

                <div onClick={next} className="absolute inset-y-0 right-0 w-[15%] z-30 cursor-pointer flex items-center justify-end group/nav">
                    <div className="h-24 w-12 bg-[var(--bg-main)]/90 border-l border-y border-[var(--border-main)] flex items-center justify-center translate-x-full group-hover/nav:translate-x-0 transition-transform duration-300 shadow-xl">
                        <ChevronRight size={24} className="text-[var(--text-main)] group-hover/nav:text-[var(--color-accent)] transition-colors" />
                    </div>
                </div>
            </div>
            
            <div className="h-24 flex-none border-t border-[var(--border-main)] bg-[var(--bg-main)] flex items-center gap-2 p-2 overflow-x-auto no-scrollbar z-20">
                {items.map((item, idx) => (
                    <button 
                        key={item.id || idx}
                        onClick={(e) => { e.stopPropagation(); setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
                        className={`h-full aspect-square border transition-all duration-300 relative overflow-hidden group/thumb ${idx === currentIndex ? 'border-[var(--color-accent)] opacity-100' : 'border-[var(--border-main)] opacity-40 hover:opacity-80 hover:border-[var(--text-muted)]'}`}
                    >
                        <img src={getThumbnail(item)} className="h-full w-full object-cover" alt={`thumb-${idx}`} />
                        {idx === currentIndex && (
                            <div className="absolute inset-0 ring-1 ring-[var(--color-accent)] bg-[var(--color-accent)]/10"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

interface MasonryProps {
  items: any[];
  onImageClick: (item: any) => void;
}

export const MasonryAdvertGallery: React.FC<MasonryProps> = ({ items, onImageClick }) => {
    const [columns, setColumns] = useState<any[][]>([[], [], [], []]);

    useEffect(() => {
        const generatedAds = [...items, ...items];
        const cols: any[][] = [[], [], [], []];
        generatedAds.forEach((ad, i) => {
            cols[i % 4].push(ad);
        });
        setColumns(cols);
    }, [items]);

    return (
        <div className="w-full min-h-full bg-[var(--bg-main)] p-4">
            <div className="flex w-full items-start gap-4">
                {columns.map((col, colIndex) => (
                    <div key={colIndex} className="flex-1 flex flex-col gap-4">
                        {col.map((ad, i) => (
                            <div 
                                key={`${ad.id}_${i}`} 
                                className="w-full bg-[var(--bg-main)] relative group cursor-zoom-in overflow-hidden border border-[var(--bg-main)] hover:border-[var(--border-main)] transition-colors"
                                onClick={() => onImageClick(ad)}
                            >
                                <motion.img 
                                    src={ad.src} 
                                    alt={ad.title} 
                                    className="w-full h-auto block transition-transform duration-700" 
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                                    <div className="self-end flex flex-col gap-2 translate-x-4 group-hover:translate-x-0 transition-transform duration-300" onClick={(e) => e.stopPropagation()}>
                                        <button className="p-2 bg-[var(--bg-main)] border border-[var(--border-main)] text-[var(--text-main)] hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] transition-colors"><Heart size={14} /></button>
                                        <button className="p-2 bg-[var(--bg-main)] border border-[var(--border-main)] text-[var(--text-main)] hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] transition-colors"><Share2 size={14} /></button>
                                        <button className="p-2 bg-[var(--bg-main)] border border-[var(--border-main)] text-[var(--text-main)] hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] transition-colors"><MoreVertical size={14} /></button>
                                    </div>
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] block font-bold mb-2 truncate">{ad.title}</span>
                                        <div className="flex flex-wrap gap-1">
                                            {ad.tags?.slice(0, 3).map((tag: string, idx: number) => (
                                                <span key={idx} className="bg-[var(--bg-main)] text-[var(--text-dim)] border border-[var(--border-main)] px-1.5 py-0.5 text-[8px] font-mono">#{tag}</span>
                                            ))}
                                            {ad.tags && ad.tags.length > 3 && (
                                                <span className="bg-[var(--color-accent)] text-[var(--bg-main)] px-1.5 py-0.5 text-[8px] font-mono font-bold">+{ad.tags.length - 3}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ImageModal: React.FC<{ item: any | null, onClose: () => void }> = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md"></div>
            <div className="relative max-w-7xl max-h-full flex flex-col items-center justify-center pointer-events-none gap-4">
                <div className="relative pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="relative inline-flex items-center justify-center">
                         <div className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-[var(--color-accent)] z-10 pointer-events-none"></div>
                         <div className="absolute -top-4 -right-4 w-6 h-6 border-t-2 border-r-2 border-[var(--color-accent)] z-10 pointer-events-none"></div>
                         <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b-2 border-l-2 border-[var(--color-accent)] z-10 pointer-events-none"></div>
                         <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-[var(--color-accent)] z-10 pointer-events-none"></div>
                        <img 
                            src={item.src} 
                            alt={item.title} 
                            className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] block"
                        />
                    </div>
                </div>
                <div className="flex-none flex flex-col items-center justify-center pointer-events-auto">
                    <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase mb-1">// FOCUS_MODE_ACTIVE</span>
                    <h2 className="text-xl font-bold uppercase text-[var(--text-main)] tracking-tight text-center">{item.title}</h2>
                    <div className="flex gap-2 mt-1 flex-wrap justify-center">
                        {item.tags?.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="px-2 py-0.5 border border-[var(--text-dim)] text-[var(--text-dim)] font-mono text-[10px] uppercase">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
            <button onClick={onClose} className="absolute top-8 right-8 pointer-events-auto p-2 border border-[var(--text-dim)] text-[var(--text-dim)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all rounded-full z-[110]">
                <X size={24} />
            </button>
        </motion.div>
    );
};
