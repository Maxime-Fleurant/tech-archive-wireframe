
import React, { useEffect, useState, useMemo } from 'react';
import { StickerFragile, StickerRecycle, StickerUmbrella, StickerUp, StickerFlame, StickerHands } from './StickerIcons';

// --- SUB-COMPONENTS FOR HERO ---

export const SensorField: React.FC<{ 
    label: string; 
    targetValue: number; 
    unit: string; 
    color: string; 
    delay: number; 
}> = ({ label, targetValue, unit, color, delay }) => {
    const [active, setActive] = useState(false);
    const [displayValue, setDisplayValue] = useState(0);
    const [labelOpacity, setLabelOpacity] = useState('opacity-30'); 
    const [valueOpacity, setValueOpacity] = useState('opacity-0');

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setLabelOpacity('animate-[sensor-blink_0.5s_steps(2)_forwards]');
            setValueOpacity('animate-[sensor-blink_0.5s_steps(2)_forwards]');
            
            let current = 0;
            const step = targetValue / 20; 
            const interval = setInterval(() => {
                current += step;
                if (current >= targetValue) {
                    current = targetValue;
                    setActive(true); 
                    clearInterval(interval);
                }
                setDisplayValue(current);
            }, 30); 

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(startTimer);
    }, [delay, targetValue]);

    useEffect(() => {
        if (!active) return;
        const noiseInterval = setInterval(() => {
            const variance = targetValue * 0.02; 
            const noise = (Math.random() - 0.5) * variance;
            setDisplayValue(targetValue + noise);
        }, 2000); 
        return () => clearInterval(noiseInterval);
    }, [active, targetValue]);

    return (
        <div className="flex items-center font-mono tracking-wider gap-[1.5cqi]">
            <span className={`text-[var(--text-dim)] font-bold transition-opacity duration-300 text-[1.4cqi] ${active ? 'opacity-100' : labelOpacity}`}>
                {label}
            </span>
            <span className={`${color} tabular-nums text-[1.4cqi] ${active ? 'opacity-100' : valueOpacity}`}>
                {displayValue.toFixed(2)} {unit}
            </span>
        </div>
    );
};

export const SysBusCore: React.FC = () => {
    const ledColors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-amber-500'];
    const hexStream = "0F 1A 2C 5B 9D 44 8A E1 00 FF A3 22 5C 8B 1F 3A 9C E4 0D 22 88 55 11 00 FF AA BB CC DD EE 11 22 33 44 55";
    const statusLabels = ["PWR", "LNK", "TX", "RX", "ERR"];

    const getBgFromText = (cls: string) => {
        if (cls.includes('cyan')) return 'bg-cyan-400';
        if (cls.includes('emerald')) return 'bg-emerald-500';
        if (cls.includes('amber')) return 'bg-amber-500';
        if (cls.includes('rose')) return 'bg-rose-500';
        return 'bg-gray-500';
    };

    return (
        <div className="w-full relative flex flex-col gap-[2.5cqi]">
            <div className="flex gap-[2.5cqi] items-stretch justify-between h-auto">
                <div className="flex flex-col flex-none items-start gap-0 min-w-0 pb-[0.4cqi]">
                    <div className="w-full border-b-[0.15cqi] border-[var(--border-main)] pb-[0.4cqi] mb-[1cqi] h-[2.5cqi]">
                        <span className="font-mono text-[1.1cqi] text-[var(--text-dim)] uppercase tracking-wider block text-left opacity-30 animate-[sensor-blink_0.5s_steps(2)_forwards]" style={{ animationDelay: '2s' }}>
                            ADDR.HEX
                        </span>
                    </div>
                    <div className="grid grid-cols-4 gap-[0.8cqi] items-center justify-center pt-[0.5cqi]">
                        {[...Array(24)].map((_, i) => { 
                            const color = ledColors[i % 4];
                            const seed = (i * 17) % 10;
                            let duration = seed < 3 ? 2.0 + (i % 3) : (seed < 6 ? 4.0 + (i % 2) : 6.0 + (i % 4));
                            return (
                                <div key={i} className="w-[2cqi] h-[2cqi] rounded-[0.2cqi] bg-[var(--bg-secondary)] relative overflow-hidden shrink-0">
                                    <div className={`absolute inset-0 ${color} opacity-0`} style={{ animation: `led-on 0.5s steps(1) ${2.0 + (i * 0.05)}s forwards, led-noise ${duration}s steps(1) ${4.2}s infinite` }} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-grow flex flex-col gap-0 min-w-0">
                    <div className="w-full border-b-[0.15cqi] border-[var(--border-main)] pb-[0.4cqi] mb-[1cqi] h-[2.5cqi]">
                         <span className="font-mono text-[1.1cqi] text-[var(--text-dim)] uppercase tracking-wider block text-left opacity-30 animate-[sensor-blink_0.5s_steps(2)_forwards]" style={{ animationDelay: '2.2s' }}>
                            CORE.THREADS
                         </span>
                    </div>
                    <div className="flex flex-col gap-[0.6cqi] w-full flex-grow relative">
                        {[
                            { id: 'KERNEL', color: 'text-cyan-400', speed: '20s', data: "INIT_BOOT_SEQ LOAD_KERNEL_OK SYS_RDY VFS_MOUNT_ROOT_RO ALLOC_PAGES_OK" },
                            { id: 'BINARY', color: 'text-emerald-500', speed: '30s', binary: true },
                            { id: 'MEMORY', color: 'text-amber-500', speed: '25s', data: hexStream },
                            { id: 'ERROR', color: 'text-rose-500', speed: '0s', static: true }
                        ].map((lane, i) => {
                            const binaryData = "011001 001110 111000 000111 101010 010101 110011";
                            const laneContent = lane.binary ? binaryData : lane.data;
                            const entranceDelay = `${2.4 + (i * 0.1)}s`;
                            
                            return (
                                <div key={i} className="flex-1 flex items-center gap-[2cqi] overflow-hidden relative group/thread bg-black px-[1cqi] w-full min-h-[2.8cqi]">
                                    <span className={`font-mono text-[1.2cqi] whitespace-nowrap min-w-[5cqi] ${lane.color} opacity-0 animate-[fadeIn_0.5s_ease_forwards] z-20`} style={{ animationDelay: entranceDelay }}>
                                        {lane.id}
                                    </span>
                                    <div className="flex-grow overflow-hidden relative h-full flex items-center opacity-0 animate-[fadeIn_0.5s_ease_forwards]" style={{ animationDelay: entranceDelay }}>
                                        <div className="absolute inset-y-0 left-0 w-[2.5cqi] bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                                        <div className="absolute inset-y-0 right-0 w-[2.5cqi] bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
                                        {lane.static ? (
                                            <div className="font-mono text-[1.35cqi] text-rose-500 tracking-widest flex gap-[0.8cqi] items-center w-full font-bold">
                                                CRIT_PROCESS_HK <span className="animate-[led-noise_0.2s_steps(1)_infinite] w-[0.8cqi] h-[0.8cqi] bg-rose-500 block"></span>
                                            </div>
                                        ) : (
                                            <div className={`whitespace-nowrap font-mono text-[1.35cqi] ${lane.color} opacity-90 animate-slide-hex flex font-medium w-max`} style={{ animationDuration: lane.speed }}>
                                                <span className="mr-[3cqi]">{laneContent}</span>
                                                <span className="mr-[3cqi]">{laneContent}</span>
                                                <span className="mr-[3cqi]">{laneContent}</span>
                                                <span className="mr-[3cqi]">{laneContent}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`w-[0.5cqi] h-[1.2cqi] ${getBgFromText(lane.color)} opacity-0 animate-[fadeIn_0.5s_ease_forwards] shrink-0 rounded-[0.1cqi]`} style={{ animationDelay: entranceDelay }}></div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-col flex-none items-end gap-0 min-w-0 flex">
                     <div className="w-full border-b-[0.15cqi] border-[var(--border-main)] pb-[0.4cqi] mb-[1cqi] h-[2.5cqi] flex justify-end">
                        <span className="font-mono text-[1.1cqi] text-[var(--text-dim)] uppercase tracking-wider block text-right opacity-30 animate-[sensor-blink_0.5s_steps(2)_forwards]" style={{ animationDelay: '2.4s' }}>
                            STATUS
                        </span>
                     </div>
                     <div className="flex flex-col gap-[0.9cqi] w-full pt-[0.5cqi] pb-[0.4cqi]">
                        {[0, 1, 2, 3, 4].map((i) => {
                            let colorClass = 'bg-green-500';
                            if (i === 2 || i === 3) colorClass = 'bg-amber-500';
                            if (i === 4) colorClass = 'bg-red-500';
                            return (
                                <div key={i} className="flex items-center justify-end gap-[1.2cqi] w-full">
                                    <span className="font-mono text-[0.9cqi] text-[var(--text-dim)] uppercase leading-none opacity-0 animate-[fadeIn_0.5s_ease_forwards]" style={{ animationDelay: `${2.5 + (i * 0.1)}s` }}>
                                        {statusLabels[i]}
                                    </span>
                                    <div className="w-[2cqi] h-[2cqi] rounded-[0.2cqi] bg-[var(--bg-secondary)] relative overflow-hidden shrink-0">
                                        <div className={`absolute inset-0 ${colorClass} opacity-0`} style={{ animation: `led-on 0.4s steps(1) ${2.2 + (i * 0.1)}s forwards, led-noise ${i === 4 ? 0.5 : (3 + i)}s steps(1) ${4.2}s infinite` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="w-full border-t border-dashed border-[var(--border-main)] border-t-[0.2cqi]"></div>

            <div className="flex justify-between items-center px-[0.5cqi]">
                <SensorField label="THROUGHPUT" targetValue={1.52} unit="GB/s" color="text-emerald-500" delay={3500} />
                <div className="h-[1.5cqi] w-[0.15cqi] bg-[var(--border-main)] opacity-0 animate-[fadeIn_0.5s_ease_3s_forwards]"></div>
                <SensorField label="CORE.TEMP" targetValue={45.1} unit="°C" color="text-amber-500" delay={3700} />
                <div className="h-[1.5cqi] w-[0.15cqi] bg-[var(--border-main)] opacity-0 animate-[fadeIn_0.5s_ease_3s_forwards]"></div>
                <SensorField label="VOLTAGE" targetValue={11.81} unit="V" color="text-blue-400" delay={3900} />
            </div>
        </div>
    );
};

export const SystemStatusGrid: React.FC<{ show: boolean, showFooter?: boolean }> = ({ show, showFooter = true }) => (
    <div className={`w-full transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-[var(--bg-main)]">
            
            {/* 1. Thick Top Border (0.8cqi) */}
            <div className="w-full h-[0.8cqi] bg-[var(--text-main)] mb-[1cqi]"></div>

            {/* Header Area */}
            <div className="flex justify-between items-center pb-[1cqi] border-b-[0.1cqi] border-[var(--text-main)] mb-[1cqi]">
                <h3 className="font-bold text-[3.5cqi] leading-none tracking-tighter">ARCHIVE METRICS</h3>
                <div className="bg-[var(--text-main)] text-[var(--bg-main)] px-[0.8cqi] py-[0.2cqi] font-bold text-[1.2cqi]">V.2.0.4</div>
            </div>

            {/* Top Row (Server Load etc) */}
            <div className="grid grid-cols-3 mb-[1cqi]">
                 <div className="flex flex-col gap-[0.2cqi] border-r border-[var(--border-main)] pr-[1cqi]">
                    <span className="font-bold text-[1.2cqi]">Server Load</span>
                    <span className="font-mono text-[1.5cqi] font-bold">12%</span>
                 </div>
                 <div className="flex flex-col gap-[0.2cqi] border-r border-[var(--border-main)] px-[1cqi]">
                    <span className="font-bold text-[1.2cqi]">Database</span>
                    <span className="font-mono text-[1.5cqi] font-bold">4.2 TB</span>
                 </div>
                 <div className="flex flex-col gap-[0.2cqi] pl-[1cqi]">
                    <span className="font-bold text-[1.2cqi]">Uptime</span>
                    <span className="font-mono text-[1.5cqi] font-bold">99.9%</span>
                 </div>
            </div>

            {/* Middle Divider - THIN (0.1cqi) - Matches Header Border */}
            <div className="w-full h-[0.1cqi] bg-[var(--text-main)] my-[1cqi]"></div>

            {/* Detailed Data Grid - 3 Columns */}
            <div className="grid grid-cols-3 gap-y-[0.5cqi]">
                 {[
                    ['Latency', '24ms', 'OK'],
                    ['Nodes', '16', 'ACT'],
                    ['Serving', '1 Unit', '100%'],
                    ['Objects', '4,092', '85%'],
                    ['Brands', '142', '40%'],
                    ['Designers', '89', '25%'],
                    ['Images', '12K+', '92%'],
                    ['Models', '340', '15%'],
                    ['Schematics', '1,202', '60%']
                 ].map(([label, val, pct], i) => {
                    const isLastCol = (i + 1) % 3 === 0;
                    const isFirstCol = i % 3 === 0;
                    const isMiddleCol = i % 3 === 1;
                    
                    return (
                    <div key={i} className={`flex justify-between items-baseline py-[0.3cqi] ${i < 6 ? 'border-b border-[var(--border-main)]' : ''} ${!isLastCol ? 'border-r border-[var(--border-main)]' : ''} ${isFirstCol ? 'pr-[1cqi]' : (isMiddleCol ? 'px-[1cqi]' : 'pl-[1cqi]')}`}>
                        <div className="flex items-baseline gap-[0.5cqi]">
                            {/* Increased Font Size (1.5x of original ~1.1cqi) */}
                            <span className="font-bold text-[1.65cqi] truncate">{label}</span>
                        </div>
                        <div className="flex gap-[1cqi]">
                             <span className="font-mono text-[1.5cqi] text-[var(--text-dim)]">{val}</span>
                             <span className="font-mono text-[1.65cqi] font-bold min-w-[2.5cqi] text-right">{pct}</span>
                        </div>
                    </div>
                 )})}
            </div>

            {/* Bottom Section - MOVED BRANDING HERE (Was in IndustrialLabel header) */}
            <div className="w-full border-b border-[var(--border-main)] mt-[0.5cqi] mb-[1.5cqi]"></div>
            <div className="flex justify-between items-stretch mb-[1.5cqi]">
                <h3 className="font-bold text-[7.8cqi] tracking-tighter leading-[0.85] text-[var(--text-main)]">
                    TECH<br/>ARCHIVE<span className="text-[var(--color-accent)] text-[4cqi] align-top ml-[0.2cqi]">®</span>
                </h3>
                <div className="w-auto aspect-square border-[0.2cqi] border-[var(--text-main)] bg-[var(--bg-main)] text-[var(--text-main)] flex items-center justify-center">
                    <span className="font-bold text-[3.5cqi] tracking-tighter">TA</span>
                </div>
            </div>

            {/* Very Bottom Border - Double Thickness (1.6cqi) */}
            <div className={`w-full h-[1.6cqi] bg-[var(--text-main)]`}></div>
        </div>
    </div>
);

export const LogoAbstract: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 1396.016 377.39066" fill="currentColor" {...props}>
        <g transform="translate(-3711.9266,-1338.5053)">
            <g>
                <path d="m 3689.402,1286.922 c 78.18,0 141.555,-63.363 141.555,-141.524 0,-78.16 -63.375,-141.519 -141.555,-141.519 -78.179,0 -141.554,63.359 -141.554,141.519 0,78.161 63.375,141.524 141.554,141.524" style={{fill:"currentColor",fillOpacity:1,fillRule:"nonzero",stroke:"none"}} transform="scale(1.3333333)" />
                <path d="m 3110.336,1145.398 c 0,-61.636 -39.438,-114.046 -94.453,-133.457 14.746,-5.203 30.59,-8.062 47.101,-8.062 78.18,0 141.555,63.359 141.555,141.519 0,78.161 -63.375,141.524 -141.555,141.524 -16.511,0 -32.355,-2.863 -47.101,-8.063 55.015,-19.398 94.453,-71.808 94.453,-133.461" style={{fill:"currentColor",fillOpacity:1,fillRule:"nonzero",stroke:"none"}} transform="scale(1.3333333)" />
                <path d="m 3342.035,1145.398 c 0,-52.367 -28.476,-98.058 -70.777,-122.539 20.824,-12.05 44.98,-18.98 70.777,-18.98 78.18,0 141.555,63.359 141.555,141.519 0,78.161 -63.375,141.524 -141.555,141.524 -25.797,0 -49.953,-6.934 -70.777,-18.981 42.301,-24.472 70.777,-70.16 70.777,-122.543" style={{fill:"currentColor",fillOpacity:1,fillRule:"nonzero",stroke:"none"}} transform="scale(1.3333333)" />
                <path d="m 2901.824,1145.398 c 0,-70.089 -50.972,-128.238 -117.879,-139.507 7.703,-1.301 15.606,-2.012 23.676,-2.012 78.18,0 141.555,63.359 141.555,141.519 0,78.161 -63.375,141.524 -141.555,141.524 -8.07,0 -15.973,-0.711 -23.676,-2.012 66.907,-11.262 117.879,-69.422 117.879,-139.512" style={{fill:"currentColor",fillOpacity:1,fillRule:"nonzero",stroke:"none"}} transform="scale(1.3333333)" />
            </g>
        </g>
    </svg>
);

export const TechSpecsRow: React.FC<{ show: boolean, className?: string }> = ({ show, className = "" }) => (
    <div className={`w-full flex items-stretch gap-[3cqi] min-h-0 transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'} ${className}`}>
        {/* LEFT AREA: P9/BARCODE + BORDERED GRID CARD - EXTENDED TO FULL WIDTH */}
        <div className="w-full flex gap-[1.5cqi]">
            
            {/* 1. OUTER LEFT COLUMN: BARCODE & P9 - Flex None to wrap P9 width */}
            <div className="flex-none flex flex-col justify-between items-center h-full w-[15%]">
                 {/* Barcode - Fills available top space - NO PADDING to align with top border */}
                 <div className="w-full flex-grow flex flex-col gap-[2px] opacity-80 mb-0 overflow-hidden">
                     {[...Array(60)].map((_, i) => (
                         <div key={i} className="w-full bg-[var(--text-main)] shrink-0" style={{ height: Math.random() > 0.6 ? '0.15cqi' : (Math.random() > 0.3 ? '0.3cqi' : '0.6cqi') }}></div>
                     ))}
                 </div>
                 
                 {/* P9 - Aligned Bottom with Padding Above */}
                 <div className="flex flex-col items-center mt-auto flex-none pt-[1cqi] pb-[0.5cqi]">
                    <span className="font-bold text-[9cqi] leading-[0.8] tracking-tighter text-[var(--text-main)]">P9</span>
                </div>
            </div>

            {/* 2. BORDERED ELEMENT: GRID LAYOUT */}
            {/* EXPANDED COLUMN 1 from 14% to 22% to fit icons better */}
            <div className="flex-1 grid grid-cols-[22%_1fr_25%] grid-rows-[auto_auto_1fr] border-[0.15cqi] border-[var(--text-main)] bg-[var(--bg-main)] text-[var(--text-main)] shadow-[0_0_10px_rgba(var(--text-main),0.1)] rounded-none">
                
                {/* ROW 1: ID (Spans Col 1 & 2) + ULTRA (Col 3) */}
                <div className="col-span-2 border-b-[0.15cqi] border-r-[0.15cqi] border-[var(--text-main)] flex items-center p-[1.5cqi] bg-[var(--bg-main)]">
                     {/* Reduced size 25%: 5cqi -> 3.75cqi */}
                     <span className="font-mono text-[3.75cqi] tracking-tight leading-none">7TS28P0Q2R6X1A984</span>
                </div>
                <div className="col-span-1 border-b-[0.15cqi] border-[var(--text-main)] flex items-center justify-center bg-[var(--text-main)] text-[var(--bg-main)] p-[1.5cqi]">
                     {/* Reduced size 25%: 5cqi -> 3.75cqi */}
                     <span className="font-bold text-[3.75cqi] leading-none">ULTRA</span>
                </div>

                {/* ROW 2/3 LEFT: LOGO (Rowspan 2, Col 1) - REPLACED ICONS WITH VERTICAL SVG */}
                <div className="col-span-1 row-span-2 border-r-[0.15cqi] border-[var(--text-main)] flex flex-col justify-between items-center bg-[var(--bg-secondary)] overflow-hidden relative p-[0.5cqi]">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Rotated 90 degrees to fit vertically. w-[150%] ensures it spans the height effectively. */}
                        <LogoAbstract className="w-[150%] h-auto absolute rotate-90 inset-0 m-auto text-[var(--text-main)]" />
                    </div>
                </div>

                {/* ROW 2 RIGHT: TEXT (Col 2 & 3) */}
                <div className="col-span-2 border-b-[0.15cqi] border-[var(--text-main)] p-[1.5cqi] flex items-start">
                    {/* Reverted to 1.8cqi, Main Color, Extended Text */}
                    <p className="font-mono text-[1.8cqi] leading-[1.1] uppercase text-[var(--text-main)] text-justify">
                        Consumer electronics are artifacts of industrial design. They function not merely as tools, but as cultural mirrors reflecting the technological optimism, material constraints, and aesthetic values of their specific era in history.
                    </p>
                </div>

                {/* ROW 3 RIGHT: FOOTER (Col 2 & 3) */}
                <div className="col-span-2 flex items-start justify-between p-[1.5cqi] bg-[var(--bg-secondary)] overflow-hidden">
                    <div className="flex flex-col leading-none gap-[0.2cqi]">
                        <span className="font-mono text-[2cqi] uppercase text-[var(--text-main)]">SYSTM</span>
                        <span className="font-mono text-[2cqi] uppercase text-[var(--text-main)]">INFO</span>
                    </div>
                    <div className="h-full flex gap-[1cqi] py-[0.1cqi]">
                         {/* Logo 1 - Removed Duplicate */}
                        <div className="h-full aspect-square flex items-center justify-center text-[var(--text-main)]">
                            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" className="w-full h-full">
                                <path d="M25 50 L50 25 L75 50 L50 75 Z" />
                                <path d="M10 50 L50 10 L90 50 L50 90 Z" />
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

export const IndustrialLabel: React.FC = () => {
    return (
        <div className="w-full h-full" style={{ containerType: 'inline-size' }}>
            {/* Normalized Padding to match ManifestoPanel: p-[4.7cqi] */}
            <div className="w-full h-full bg-[var(--bg-main)] flex flex-col p-[4.7cqi] gap-[3cqi]">
                {/* System Metrics stacked at TOP - 100% since P9 Card is removed */}
                <div className="flex-1 min-h-0 overflow-hidden flex flex-col justify-between">
                    <SystemStatusGrid show={true} showFooter={true} />
                </div>
            </div>
        </div>
    );
};

export const SmallCube: React.FC<{ colorClass: string; duration: string; rotDelay: string; show: boolean }> = ({ colorClass, duration, rotDelay, show }) => {
    return (
        <div className={`w-[2.5cqi] h-[2.5cqi] relative transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`} style={{ perspective: '300px', animation: show ? `cube-pop-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards` : 'none', transform: 'scale(0)' }}>
            <div className={`w-full h-full relative ${colorClass}`} style={{ transformStyle: 'preserve-3d', animation: `rotate-cube ${duration} linear infinite`, animationDelay: rotDelay }}>
                <div className={`absolute inset-0 border-[0.05cqi] border-current box-border bg-transparent`} style={{ transform: `rotateY(0deg) translateZ(1.25cqi)` }}></div>
                <div className={`absolute inset-0 border-[0.05cqi] border-current box-border bg-transparent`} style={{ transform: `rotateY(180deg) translateZ(1.25cqi)` }}></div>
                <div className={`absolute inset-0 border-[0.05cqi] border-current box-border bg-transparent`} style={{ transform: `rotateY(90deg) translateZ(1.25cqi)` }}></div>
                <div className={`absolute inset-0 border-[0.05cqi] border-current box-border bg-transparent`} style={{ transform: `rotateY(-90deg) translateZ(1.25cqi)` }}></div>
                <div className={`absolute inset-0 border-[0.05cqi] border-current box-border bg-transparent`} style={{ transform: `rotateX(90deg) translateZ(1.25cqi)` }}></div>
                <div className={`absolute inset-0 border-[0.05cqi] border-current box-border bg-transparent`} style={{ transform: `rotateX(-90deg) translateZ(1.25cqi)` }}></div>
            </div>
        </div>
    );
};

const MANIFESTO_KEYWORDS = [ "digital", "archive", "software", "hardware", "click", "amnesia", "form", "memory", "database", "silicon", "industrial", "design", "language", "tactile", "mechanical", "shutter", "function", "high-fidelity", "schematics", "circuits" ];
const TEXT_P1 = "We preserve the tangible history of the digital age. This is not a store. This is a brutalist archive dedicated to the industrial design language that shaped our modern interface with reality. In a world dissolving into software, we catalog the tactile weight of the hardware that built it. From the mechanical click of a shutter to the cold precision of a beige chassis, these artifacts are not obsolete—they are the archaeological evidence of our digital awakening. We reject the cloud's amnesia. We honor the form, the function, and the failure.";
const TEXT_P2 = "This archive operates as a decentralized memory bank. It relies on operatives like you to upload high-fidelity scans, correct schematics, and document the provenance of every artifact. By contributing, you help build the central visual database of the silicon era, ensuring these machines remain documented long after their circuits have gone cold.";
const TEXT_P3 = "The artifact is a mirror of its moment. We believe that consumer electronics are the truest reflection of history, capturing the collective dreams of a generation in the palm of a hand. We preserve the collision of culture and engineering, documenting how the neon saturation of one decade or the matte austerity of another manifested in physical form. This is an immersive index of the past, reconstructing the look and feel of history through the objects that populated it. The technical is inseparable from the cultural. Observe the style. Feel the weight. Access the moment.";

export const ManifestoPanel = React.memo(() => {
    const [stage, setStage] = useState(0);
    const [blinkIndex, setBlinkIndex] = useState(-1);

    const { p1Segments, p2Segments, p3Segments, totalKeywords } = useMemo(() => {
        const regex = new RegExp(`\\b(${MANIFESTO_KEYWORDS.join('|')})\\b`, 'gi');
        let count = 0;
        const parse = (text: string) => text.split(regex).map((part) => {
             const lower = part.toLowerCase();
             return { text: part, index: MANIFESTO_KEYWORDS.includes(lower) ? count++ : -1, isKey: MANIFESTO_KEYWORDS.includes(lower) };
        });
        return { 
            p1Segments: parse(TEXT_P1), 
            p2Segments: parse(TEXT_P2), 
            p3Segments: parse(TEXT_P3),
            totalKeywords: count 
        };
    }, []);

    useEffect(() => {
        let timer = 500; const timeouts: ReturnType<typeof setTimeout>[] = [];
        timeouts.push(setTimeout(() => setStage(1), timer)); timer += 800; timeouts.push(setTimeout(() => setStage(2), timer)); timer += 200; timeouts.push(setTimeout(() => setStage(3), timer)); timer += 200; timeouts.push(setTimeout(() => setStage(4), timer)); timer += 200; timeouts.push(setTimeout(() => setStage(5), timer)); timer += 400; timeouts.push(setTimeout(() => setStage(6), timer)); timer += 600; timeouts.push(setTimeout(() => setStage(7), timer)); timer += 400; timeouts.push(setTimeout(() => setStage(8), timer)); timer += 700; timeouts.push(setTimeout(() => setStage(9), timer)); timer += 800; timeouts.push(setTimeout(() => setStage(10), timer)); timer += 600; timeouts.push(setTimeout(() => setStage(11), timer)); timer += 800; timeouts.push(setTimeout(() => setStage(12), timer));
        return () => timeouts.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (stage !== 12) return;
        let intervalId: ReturnType<typeof setInterval>;
        let startTimeoutId: ReturnType<typeof setTimeout>;
        const cycleBlink = () => {
             setBlinkIndex(prev => {
                 let nextIdx = Math.floor(Math.random() * totalKeywords);
                 while (totalKeywords > 1 && nextIdx === prev) nextIdx = Math.floor(Math.random() * totalKeywords);
                 return nextIdx;
             });
        };
        startTimeoutId = setTimeout(() => { cycleBlink(); intervalId = setInterval(cycleBlink, 2500); }, 600);
        return () => { clearTimeout(startTimeoutId); clearInterval(intervalId); };
    }, [stage, totalKeywords]);

    const renderSegments = (segments: {text: string, index: number, isKey: boolean}[]) => (
        <>{segments.map((seg, i) => seg.isKey ? <span key={i} className={blinkIndex === seg.index ? 'animate-glitch-word' : ''}>{seg.text}</span> : <span key={i}>{seg.text}</span>)}</>
    );

    return (
        <div className="w-full h-full" style={{ containerType: 'inline-size' }}>
            <div className="w-full h-full flex flex-col relative pointer-events-auto p-[4.7cqi]">
                {/* Header */}
                <div className="flex items-center justify-between pb-[3cqi] mb-[3cqi] relative shrink-0 border-b border-[var(--border-main)]">
                    <div className="flex items-center gap-[2.5cqi]">
                        <h2 className={`font-bold text-[5cqi] text-[var(--text-main)] uppercase tracking-tighter leading-[0.8] ${stage >= 1 ? 'animate-[blink-in_0.5s_steps(2)_forwards]' : 'opacity-0'}`}>MANIFESTO</h2>
                        <div className="flex items-center gap-[1.5cqi]">
                                <SmallCube show={stage >= 2} colorClass="text-red-500" duration="4s" rotDelay="0s" />
                                <SmallCube show={stage >= 3} colorClass="text-green-500" duration="6s" rotDelay="-1s" />
                                <SmallCube show={stage >= 4} colorClass="text-blue-500" duration="5s" rotDelay="-2.5s" />
                                <SmallCube show={stage >= 5} colorClass="text-amber-500" duration="7s" rotDelay="-0.5s" />
                        </div>
                    </div>
                    <div className={`font-mono text-[1.4cqi] text-[var(--text-dim)] flex items-center h-full ${stage >= 1 ? 'animate-[blink-in_0.5s_steps(2)_forwards]' : 'opacity-0'}`}>v.1.0.4</div>
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden h-[0.2cqi]"><div className={`h-full bg-[var(--border-main)] ${stage >= 6 ? 'animate-[line-draw-right_0.5s_ease-out_forwards]' : 'w-0'}`}></div></div>
                </div>

                {/* Text Content */}
                <div className="flex-none flex flex-col min-h-0">
                    <div className="flex-none flex flex-col font-normal leading-[1.4] text-[var(--text-main)] text-justify tracking-tight">
                        {/* Changed font from bold to normal, size reduced to 3cqi (~10% reduction), Increased line-height to 1.4 */}
                        <p className={`text-[3cqi] transition-opacity duration-700 ease-out mb-[1.5cqi] ${stage >= 7 ? 'opacity-100' : 'opacity-0'}`}>{renderSegments(p1Segments)}</p>
                        
                        {/* SYSBUS CORE */}
                        <div className={`w-full my-[1.5cqi] transition-opacity duration-700 ease-out origin-left opacity-100`}>
                            <div className="py-[1cqi] border-y border-[var(--border-main)] bg-[var(--bg-main)]">
                                <SysBusCore />
                            </div>
                        </div>

                        <p className={`text-[3cqi] transition-opacity duration-700 ease-out mb-[1.5cqi] ${stage >= 9 ? 'opacity-100' : 'opacity-0'}`}>{renderSegments(p2Segments)}</p>

                        {/* Dotted Line Separator */}
                        <div className="w-full border-b border-dashed border-[var(--border-main)] border-b-[0.2cqi] my-[2cqi]"></div>

                        <p className={`text-[3cqi] transition-opacity duration-700 ease-out ${stage >= 11 ? 'opacity-100' : 'opacity-0'}`}>{renderSegments(p3Segments)}</p>
                    </div>
                </div>

                {/* FOOTER: P9 Card + Hologram Sticker */}
                <div className={`flex-grow min-h-0 w-full flex items-stretch gap-[2cqi] pt-[2cqi] transition-opacity duration-1000 ${stage >= 12 ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Left: P9 Card Design (TechSpecsRow) */}
                    <div className="flex-1 min-w-0 relative h-full">
                         <TechSpecsRow show={true} className="h-full" />
                    </div>

                    {/* Right: Hologram Sticker */}
                    <div className="flex-none h-full flex items-end">
                        <img 
                            src="https://i.imgur.com/QChZyjJ.png" 
                            alt="Authentic" 
                            className="h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 mix-blend-plus-lighter"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export const LogoScrollPanel = React.memo(({ rowConfigs }: { rowConfigs: any[] }) => {
    return (
        <div className="w-full h-full" style={{ containerType: 'inline-size' }}>
             <div className="w-full h-full flex flex-col relative px-[9.4cqi] py-[4.7cqi]">
                 {/* QUOTE SECTION (Top 30% - Gained Space) */}
                 <div className="flex-[0.3] flex flex-col justify-center items-center text-center relative border-b border-dashed border-[var(--border-main)] mb-[1.5cqi]">
                    <blockquote className="font-bold text-[6cqi] leading-[0.85] text-[var(--text-main)] tracking-tighter mb-[1.5cqi] whitespace-nowrap">
                        "FORM FOLLOWS EMOTION."
                    </blockquote>
                    
                    <div className="flex items-center justify-center">
                        <div className="flex items-center gap-[1.2cqi]">
                            <div className="w-[3cqi] h-[0.2cqi] bg-[var(--text-main)]"></div>
                            <span className="font-mono text-[1.8cqi] font-bold text-[var(--text-main)] uppercase tracking-widest">
                                HARTMUT ESSLINGER
                            </span>
                        </div>
                    </div>
                </div>

                {/* LOGO SCROLL (Bottom 70%) */}
                <div className="flex-[0.7] min-h-0 w-full relative overflow-hidden flex flex-col justify-between">
                    {rowConfigs.map((row) => (
                        <div key={row.key} className="flex-1 min-h-0 w-full relative overflow-hidden flex items-center">
                            {/* Shadows */}
                            <div className="absolute inset-y-0 left-0 w-[5cqi] bg-gradient-to-r from-[var(--bg-main)] from-15% via-[var(--bg-main)]/80 to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute inset-y-0 right-0 w-[5cqi] bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

                            <div className="w-full h-full will-change-transform" style={row.entranceStyle}>
                                <div 
                                    className="flex w-max items-center h-full will-change-transform"
                                    style={row.loopStyle}
                                >
                                    {/* ITEMS */}
                                    {row.items.map((logoData: any, i: number) => (
                                        <div key={`orig-${row.key}-${i}`} className="h-full relative shrink-0 flex items-center justify-center pr-[1.5cqi] group/logo">
                                            {logoData.type === 'component' && logoData.component ? (
                                                <div className="h-[70%] aspect-auto relative z-0">{React.createElement(logoData.component)}</div>
                                            ) : (
                                                <img src={logoData.src} className={`h-[70%] w-auto object-contain relative z-0 ${logoData.className}`} alt={logoData.id} loading="lazy" />
                                            )}
                                        </div>
                                    ))}
                                    {/* CLONES */}
                                    {row.items.map((logoData: any, i: number) => (
                                        <div key={`clone-${row.key}-${i}`} className="h-full relative shrink-0 flex items-center justify-center pr-[1.5cqi] group/logo">
                                            {logoData.type === 'component' && logoData.component ? (
                                                <div className="h-[70%] aspect-auto relative z-0">{React.createElement(logoData.component)}</div>
                                            ) : (
                                                <img src={logoData.src} className={`h-[70%] w-auto object-contain relative z-0 ${logoData.className}`} alt={logoData.id} loading="lazy" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})
