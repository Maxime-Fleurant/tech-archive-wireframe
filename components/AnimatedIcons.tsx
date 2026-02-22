import React from 'react';

export const AudioIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="12" y="8" width="40" height="48" rx="2" />
    <circle cx="32" cy="20" r="4" />
    <circle cx="32" cy="42" r="10" className="anim-speaker-cone" />
    <circle cx="32" cy="42" r="14" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

export const ComputingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M8 12h48v32H8z" />
    <path d="M12 44v8h40v-8" />
    <path d="M4 60h56" />
    <rect x="14" y="18" width="36" height="20" strokeWidth="1" />
    <path d="M18 24h8" className="group-hover:animate-pulse" />
    <path d="M18 30h24" className="group-hover:animate-pulse" style={{ animationDelay: '0.1s' }} />
  </svg>
);

export const ImagingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="8" y="16" width="48" height="36" rx="2" />
    <path d="M22 16l4-6h12l4 6" />
    <circle cx="32" cy="34" r="10" />
    <circle cx="32" cy="34" r="6" className="anim-aperture" strokeWidth="1" />
    <circle cx="50" cy="22" r="2" />
  </svg>
);

export const GamingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="16" y="8" width="32" height="48" rx="2" />
    <rect x="22" y="14" width="20" height="16" strokeWidth="1" />
    <path d="M26 40h4v4h-4z" />
    <path d="M22 42h12" />
    <path d="M28 38v8" />
    <circle cx="40" cy="44" r="2" className="group-hover:fill-current group-hover:animate-pulse" />
    <circle cx="36" cy="48" r="2" className="group-hover:fill-current group-hover:animate-pulse" style={{ animationDelay: '0.2s' }} />
  </svg>
);

export const TelephonyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="20" y="10" width="24" height="44" rx="2" />
    <path d="M30 14h4" />
    <rect x="24" y="18" width="16" height="14" strokeWidth="1" />
    <g className="opacity-0 group-hover:opacity-100 transition-opacity">
        <path d="M50 20a10 10 0 0 1 0 10" className="anim-signal-3" />
        <path d="M48 22a6 6 0 0 1 0 6" className="anim-signal-2" />
        <path d="M46 24a2 2 0 0 1 0 2" className="anim-signal-1" />
    </g>
    <circle cx="32" cy="46" r="2" />
  </svg>
);

export const InputIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <g className="anim-key">
        <rect x="12" y="20" width="40" height="24" rx="2" />
        <text x="32" y="38" fontSize="10" textAnchor="middle" fill="currentColor" stroke="none" className="font-mono">CTRL</text>
    </g>
    <path d="M8 50h48" strokeWidth="1" />
  </svg>
);

export const OutputIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M16 28h32v24H16z" />
    <path d="M12 28h40v12H12z" />
    <path d="M22 28V16h20v12" className="anim-paper-feed" />
    <path d="M18 42h28" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

export const StorageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="12" y="10" width="40" height="44" rx="1" />
    <path d="M18 10v12h28V10" />
    <rect x="24" y="32" width="16" height="22" strokeWidth="1" />
    {/* Shutter */}
    <rect x="20" y="10" width="14" height="20" fill="var(--bg-main)" className="anim-floppy-shutter" />
    <path d="M24 14h6" className="anim-floppy-shutter" />
  </svg>
);

export const AccessoriesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
     <rect x="16" y="24" width="32" height="24" />
     <path d="M16 24l8-8h16l8 8" />
     <path d="M32 24v24" strokeWidth="1" />
     <path d="M16 24l32 24" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-opacity" />
     <path d="M48 24l-32 24" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-opacity" />
  </svg>
);

export const PrototypesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="12" y="12" width="40" height="40" strokeDasharray="4 4" className="group-hover:animate-spin-slow" />
    <path d="M12 12l40 40" />
    <path d="M52 12l-40 40" />
    <circle cx="32" cy="32" r="4" className="group-hover:fill-current" />
  </svg>
);
