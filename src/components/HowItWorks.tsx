import React from 'react';
import { motion } from 'motion/react';
import { HOW_IT_WORKS_STEPS } from '../config/siteConfig';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#111111] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#B8860B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            Simple 4-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-base text-stone-400">
            From initial enquiry to active terminal deployment for your business.
          </p>
        </motion.div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {HOW_IT_WORKS_STEPS.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative rounded-2xl bg-[#1A1A1A] p-6 sm:p-7 border border-[#D4AF37]/20 shadow-lg shadow-black/40 flex flex-col justify-between group hover:border-[#D4AF37]/60 transition-colors"
            >
              {/* Connector line for desktop */}
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-4 w-8 h-[2px] bg-gradient-to-r from-[#D4AF37]/40 to-transparent z-10" />
              )}

              <div>
                {/* Gold Numbered Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-[#111111] font-black text-lg shadow-md shadow-[#D4AF37]/30 mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-stone-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                <span>Step {index + 1} of 4</span>
                <span className="text-[#D4AF37]">Guaranteed follow-up</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
