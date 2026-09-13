import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Shield, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';
import { analytics } from '../services/analytics';

interface NavbarProps {
  onOpenRequestForm: (provider?: string) => void;
  onOpenAdmin: () => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRequestForm,
  onOpenAdmin,
  onOpenQuiz,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'POS Options', href: '#pos-options' },
    { label: 'Comparison', href: '#comparison' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#111111]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-[#D4AF37]/20 py-3'
          : 'bg-[#111111] border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 text-white group cursor-pointer focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center font-black text-[#111111] shadow-md shadow-[#D4AF37]/30 group-hover:scale-105 transition-transform">
            GP
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
              {SITE_CONFIG.brandName}
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            </span>
            <span className="text-[10px] tracking-wider text-stone-400 uppercase font-medium">
              Merchant Agent
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-stone-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="hover:text-[#D4AF37] transition-colors relative py-1 hover:border-b-2 hover:border-[#D4AF37]"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              analytics.track('quiz_start_nav');
              onOpenQuiz();
            }}
            className="text-xs px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/25 transition font-semibold"
          >
            Find My Best POS
          </button>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.track('whatsapp_click', { placement: 'navbar' })}
            className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:border-[#D4AF37]/40 transition"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => {
              analytics.track('cta_click', { label: 'Get a POS Navbar' });
              onOpenRequestForm();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:brightness-105 active:scale-[0.98] text-[#111111] font-bold text-sm shadow-md shadow-[#D4AF37]/20 flex items-center gap-2 transition"
          >
            <span>Get a POS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => {
              analytics.track('cta_click', { label: 'Get a POS Nav Mobile' });
              onOpenRequestForm();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#D4AF37] text-[#111111] font-bold text-xs shadow"
          >
            Get a POS
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#111111] border-b border-[#D4AF37]/20 px-4 pt-3 pb-6 space-y-3 overflow-hidden"
          >
            <div className="flex flex-col space-y-2 pt-2 border-t border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-white/5 hover:text-[#D4AF37] transition"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full py-2.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>⚡ Find My Best POS (Quiz)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRequestForm();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#111111] font-bold text-base shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get a POS Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  analytics.track('whatsapp_click', { placement: 'mobile_nav' });
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-medium text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="pt-2 flex items-center justify-between text-xs text-stone-500 px-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Independent Merchant Agent
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="text-stone-400 hover:text-[#D4AF37] underline cursor-pointer"
                >
                  Agent Portal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
