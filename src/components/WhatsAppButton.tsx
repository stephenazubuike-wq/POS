import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X } from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';
import { analytics } from '../services/analytics';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end"
    >
      {/* Tooltip bubble on desktop */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mb-2 hidden sm:flex items-center gap-2 bg-[#111111] text-white text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-[#D4AF37]/40"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Need a POS fast? <strong>Chat with us on WhatsApp</strong></span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-white ml-1 cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => analytics.track('whatsapp_click', { placement: 'floating_button' })}
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-2xl shadow-black/50 transition-colors border-2 border-white/20"
        aria-label="Chat With Us on WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 group-hover:opacity-75 animate-ping -z-10" />
        
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="tracking-wide">Chat With Us</span>
      </motion.a>
    </motion.div>
  );
};
