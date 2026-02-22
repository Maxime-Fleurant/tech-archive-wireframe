import React from 'react';
import { Copyright, Globe, Database, Server } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-main)] border-t border-[var(--border-main)] text-[var(--text-main)] transition-colors duration-300">
      {/* Top Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[var(--border-main)]">
        <div className="p-8 border-r border-[var(--border-main)] hover:bg-[var(--bg-secondary)] transition-colors">
            <h4 className="font-mono text-xs text-[var(--text-dim)] mb-2 uppercase">Database Status</h4>
            <div className="flex items-center gap-2 text-[var(--color-accent)]">
                <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
                <span className="font-bold">OPERATIONAL</span>
            </div>
        </div>
        <div className="p-8 border-r border-[var(--border-main)] hover:bg-[var(--bg-secondary)] transition-colors">
             <h4 className="font-mono text-xs text-[var(--text-dim)] mb-2 uppercase">Total Artifacts</h4>
             <div className="flex items-center gap-2">
                <Database size={16} />
                <span className="font-bold text-xl">4,092</span>
            </div>
        </div>
        <div className="p-8 border-r border-[var(--border-main)] hover:bg-[var(--bg-secondary)] transition-colors">
            <h4 className="font-mono text-xs text-[var(--text-dim)] mb-2 uppercase">Registered Brands</h4>
             <div className="flex items-center gap-2">
                <Globe size={16} />
                <span className="font-bold text-xl">142</span>
            </div>
        </div>
        <div className="p-8 hover:bg-[var(--bg-secondary)] transition-colors">
            <h4 className="font-mono text-xs text-[var(--text-dim)] mb-2 uppercase">Server Load</h4>
             <div className="flex items-center gap-2 text-blue-400">
                <Server size={16} />
                <span className="font-bold text-xl">12%</span>
            </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8 gap-12 lg:gap-8">
        <div className="space-y-4">
            <h3 className="font-bold uppercase tracking-tight text-lg">The Tech Archive</h3>
            <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed max-w-xs">
                A non-profit digital preservation initiative dedicated to documenting the industrial design evolution of consumer electronics from 1950 to present day.
            </p>
        </div>

        <div>
            <h4 className="font-mono text-xs text-[var(--text-dim)] uppercase mb-4">Sitemap</h4>
            <ul className="space-y-2 font-mono text-xs text-[var(--text-muted)]">
                <li><a href="#" className="hover:text-[var(--text-main)] hover:underline">About the Project</a></li>
                <li><a href="#" className="hover:text-[var(--text-main)] hover:underline">Membership Tier</a></li>
                <li><a href="#" className="hover:text-[var(--text-main)] hover:underline">Submission Guidelines</a></li>
                <li><a href="#" className="hover:text-[var(--text-main)] hover:underline">API Documentation</a></li>
            </ul>
        </div>

        <div>
            <h4 className="font-mono text-xs text-[var(--text-dim)] uppercase mb-4">Connect</h4>
             <ul className="space-y-2 font-mono text-xs text-[var(--text-muted)]">
                <li><a href="#" className="hover:text-[var(--text-main)] hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:text-[var(--text-main)] hover:underline">Twitter / X</a></li>
                <li><a href="#" className="hover:text-[var(--text-main)] hover:underline">Discord Community</a></li>
                <li><a href="#" className="hover:text-[var(--text-main)] hover:underline">Newsletter</a></li>
            </ul>
        </div>

        <div>
            <h4 className="font-mono text-xs text-[var(--text-dim)] uppercase mb-4">Newsletter</h4>
            <div className="flex flex-col gap-2">
                <input 
                    type="email" 
                    placeholder="EMAIL_ADDRESS" 
                    className="bg-transparent border border-[var(--border-main)] px-4 py-2 font-mono text-xs text-[var(--text-main)] focus:border-[var(--color-accent)] focus:outline-none placeholder-[var(--text-dim)]"
                />
                <button className="bg-[var(--text-main)] text-[var(--bg-main)] border border-[var(--text-main)] px-4 py-2 font-bold text-xs hover:bg-[var(--color-accent)] hover:text-[var(--bg-main)] hover:border-[var(--color-accent)] transition-colors uppercase">
                    Subscribe
                </button>
            </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-main)] p-4 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-[var(--text-dim)] uppercase">
        <div className="flex items-center gap-2">
            <Copyright size={10} />
            <span>2024 THE TECH ARCHIVE. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex gap-4">
            <a href="#" className="hover:text-[var(--color-accent)]">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-accent)]">Terms of Use</a>
            <a href="#" className="hover:text-[var(--color-accent)]">Cookie Settings</a>
        </div>
        <div>
            DESIGNED FOR CHROME v120+ // 1920x1080
        </div>
      </div>
    </footer>
  );
};

export default Footer;