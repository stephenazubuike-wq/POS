import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Shield, MessageSquare, Zap, Building2 } from 'lucide-react';
import { POSTerminalVisual } from './POSTerminalVisual';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';
import { analytics } from '../services/analytics';

interface HeroProps {
  onOpenRequestForm: () => void;
  onScrollToComparison: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRequestForm, onScrollToComparison }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-[#111111] text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background ambient lighting with subtle pulsing animation */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-1/4 -z-0 h-96 w-96 rounded-full bg-[#D4AF37]/15 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-20 left-10 -z-0 h-80 w-80 rounded-full bg-[#B8860B]/15 blur-[100px] pointer-events-none"
      />

      {/* Subtle geometric grid line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            
            {/* Trust Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Independent Authorized Merchant Agent in Nigeria</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Get the <span className="gold-text-gradient">Right POS</span> for Your Business
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="text-base sm:text-lg lg:text-xl text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Compare POS options from leading providers and get the terminal that fits your business needs. Fast, simple and convenient.
            </motion.p>

            {/* Key Provider Mini Badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-stone-400"
            >
              <span className="font-medium text-stone-300">Access terminals from:</span>
              <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-200 font-semibold hover:border-[#D4AF37]/40 transition">
                Moniepoint POS
              </span>
              <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-200 font-semibold hover:border-[#D4AF37]/40 transition">
                PalmPay POS
              </span>
              <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-200 font-semibold hover:border-[#D4AF37]/40 transition">
                OPay POS
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5"
            >
              <motion.button
                id="hero-primary-cta"
                whileHover={{ scale: 1.03, boxShadow: '0 20px 25px -5px rgba(212, 175, 55, 0.35)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  analytics.track('cta_click', { label: 'Hero Get a POS' });
                  onOpenRequestForm();
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBF55] to-[#B8860B] text-[#111111] font-extrabold text-base shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-3 transition cursor-pointer"
              >
                <span>Get a POS</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                id="hero-secondary-cta"
                whileHover={{ scale: 1.02, borderColor: '#D4AF37' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  analytics.track('cta_click', { label: 'Hero Compare POS Options' });
                  onScrollToComparison();
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-base border border-[#D4AF37]/40 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Compare POS Options</span>
              </motion.button>
            </motion.div>

            {/* Quick WhatsApp alternative link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-xs text-stone-400 pt-1"
            >
              <span>Prefer WhatsApp?</span>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.track('whatsapp_click', { placement: 'hero_link' })}
                className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold group"
              >
                <MessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Chat directly with our POS specialist</span>
              </a>
            </motion.div>

            {/* Trust statement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-4 border-t border-white/10 max-w-2xl"
            >
              <div className="flex items-start gap-2 text-xs text-stone-400 leading-relaxed text-left">
                <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-stone-300 font-semibold">Trust Statement:</strong>{' '}
                  POS solutions for shops, supermarkets, restaurants, pharmacies, agents, entrepreneurs and growing businesses.
                </p>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: POS Terminal Visual Interactive Card with floating animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full flex justify-center"
            >
              <POSTerminalVisual />
            </motion.div>
            <div className="mt-4 text-center">
              <p className="text-[11px] text-stone-400">
                Interactive preview • Dual 4G SIM & Wi-Fi • High-speed thermal printer
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
