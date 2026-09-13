import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS, getWhatsAppUrl } from '../config/siteConfig';
import { analytics } from '../services/analytics';

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#161616] text-white border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-stone-400">
            Clear answers regarding POS terminals, providers, and our merchant agent services.
          </p>
        </motion.div>

        {/* 10 FAQs Accordion */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="rounded-2xl bg-[#1A1A1A] border border-white/10 shadow-md overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-stone-100 text-base sm:text-lg group-hover:text-[#D4AF37] transition-colors">
                    {idx + 1}. {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`w-7 h-7 rounded-full bg-[#242424] flex items-center justify-center shrink-0 ${
                      isOpen ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-stone-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 sm:pb-6 text-sm sm:text-base text-stone-300 leading-relaxed border-t border-white/5 pt-3">
                        <p>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Extra Assistance Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-2xl bg-[#1A1A1A] border border-white/10 p-6 text-center text-sm text-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
        >
          <span>Have a question not listed here?</span>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={getWhatsAppUrl('Hello, I have a specific question about POS terminals for my business.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.track('whatsapp_click', { placement: 'faq_footer' })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#242424] text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#2C2C2C] font-semibold text-xs transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask Us Directly on WhatsApp</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};
