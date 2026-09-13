import React from 'react';
import { motion } from 'motion/react';
import { Layers, CheckCircle, UserCheck, Target, Smartphone, MapPin } from 'lucide-react';
import { WHY_CHOOSE_US_POINTS } from '../config/siteConfig';

export const WhyChooseUs: React.FC = () => {
  const icons = [
    <Layers className="w-6 h-6 text-[#D4AF37]" />,
    <CheckCircle className="w-6 h-6 text-[#D4AF37]" />,
    <UserCheck className="w-6 h-6 text-[#D4AF37]" />,
    <Target className="w-6 h-6 text-[#D4AF37]" />,
    <Smartphone className="w-6 h-6 text-[#D4AF37]" />,
    <MapPin className="w-6 h-6 text-[#D4AF37]" />,
  ];

  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-[#161616] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            The Independent Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Get Your POS Through Us?
          </h2>
          <p className="mt-3 text-base text-stone-400">
            We bridge the gap between business owners and top payment providers across Nigeria.
          </p>
        </motion.div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US_POINTS.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-2xl bg-[#1A1A1A] p-7 border border-white/10 shadow-lg shadow-black/30 hover:shadow-xl hover:border-[#D4AF37]/60 transition-colors duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#222222] border border-white/5 flex items-center justify-center mb-5 shadow-sm group-hover:border-[#D4AF37]/40 group-hover:scale-105 transition-all">
                  {icons[idx]}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-[#D4AF37] font-semibold">
                <span>Verified Merchant Service</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
