import React from 'react';
import { Shield, Lock, ArrowUp } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface FooterProps {
  onOpenPrivacy: (type: 'privacy' | 'terms') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0B0B] text-stone-400 border-t border-white/10 pt-16 pb-28 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center font-black text-[#111111]">
                GP
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                {SITE_CONFIG.brandName}
              </span>
            </div>
            
            <p className="text-sm text-stone-300 max-w-sm leading-relaxed">
              Helping businesses access POS solutions from leading payment providers.
            </p>

            <div className="pt-2 text-xs text-stone-500 space-y-1">
              <div>Lagos, Nigeria • Nationwide Terminal Support</div>
              <div>Dedicated Onboarding Specialist</div>
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#home" className="hover:text-white transition">Home</a>
              <a href="#pos-options" className="hover:text-white transition">POS Options</a>
              <a href="#comparison" className="hover:text-white transition">Comparison</a>
              <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
              <a href="#why-choose-us" className="hover:text-white transition">Why Choose Us</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
              <a href="#contact" className="hover:text-white transition">Contact Us</a>
              <button
                onClick={() => onOpenPrivacy('privacy')}
                className="text-left hover:text-white transition"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onOpenPrivacy('terms')}
                className="text-left hover:text-white transition"
              >
                Terms & Conditions
              </button>
              <button
                onClick={onOpenAdmin}
                className="text-left text-stone-400 hover:text-[#D4AF37] font-semibold transition"
              >
                Admin Lead Portal
              </button>
            </div>
          </div>

          {/* Provider Scope Notice (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Partner Networks
            </h4>
            <ul className="text-xs space-y-2 text-stone-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Moniepoint Merchant Services</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>PalmPay Agent Network</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>OPay Merchant Business Solutions</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Mandatory Independent Provider Disclaimer (Requirement #16) */}
        <div className="py-6 border-b border-white/10 text-center">
          <p className="text-xs text-stone-400 max-w-4xl mx-auto leading-relaxed">
            <strong>Provider Disclaimer:</strong> Moniepoint, PalmPay and OPay are independent payment service providers. This website is operated independently by a POS merchant/agent and is not the official website of any of these providers.
          </p>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {currentYear} {SITE_CONFIG.brandName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Independent POS Merchant/Agent</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-stone-400 hover:text-white transition"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
