import React from 'react';
import { motion } from 'motion/react';
import {
  ShoppingBag,
  ShoppingCart,
  Utensils,
  Pill,
  Sparkles,
  Store,
  Scissors,
  Briefcase,
  Layers,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_TYPES } from '../config/siteConfig';
import { analytics } from '../services/analytics';

interface TargetCustomersProps {
  onSelectBusinessType: (businessType: string) => void;
}

export const TargetCustomers: React.FC<TargetCustomersProps> = ({ onSelectBusinessType }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'retail':
        return <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />;
      case 'supermarket':
        return <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />;
      case 'restaurant':
        return <Utensils className="w-5 h-5 text-[#D4AF37]" />;
      case 'pharmacy':
        return <Pill className="w-5 h-5 text-[#D4AF37]" />;
      case 'boutique':
        return <Sparkles className="w-5 h-5 text-[#D4AF37]" />;
      case 'pos_agent':
        return <Store className="w-5 h-5 text-[#D4AF37]" />;
      case 'salon':
        return <Scissors className="w-5 h-5 text-[#D4AF37]" />;
      case 'small_biz':
        return <Briefcase className="w-5 h-5 text-[#D4AF37]" />;
      case 'market':
        return <Layers className="w-5 h-5 text-[#D4AF37]" />;
      case 'service':
      default:
        return <Wrench className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#111111] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            Tailored Industry Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            POS Solutions for Different Businesses
          </h2>
          <p className="mt-3 text-base text-stone-400">
            Whether you manage high checkout volumes or offer specialized neighborhood services.
          </p>
        </motion.div>

        {/* 10 Business Type Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {BUSINESS_TYPES.map((biz, idx) => (
            <motion.button
              key={biz.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                analytics.track('cta_click', { label: `Business Type: ${biz.name}` });
                onSelectBusinessType(biz.name);
              }}
              className="group p-4 sm:p-5 rounded-2xl bg-[#1A1A1A] border border-white/10 hover:border-[#D4AF37] hover:bg-[#1E1E1E] hover:shadow-lg transition text-left flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#242424] border border-white/10 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  {getIcon(biz.id)}
                </div>
                <h3 className="text-sm font-bold text-stone-100 group-hover:text-[#D4AF37] transition-colors mb-1">
                  {biz.name}
                </h3>
                <p className="text-xs text-stone-400 leading-snug line-clamp-2">
                  {biz.desc}
                </p>
              </div>

              <div className="mt-3 text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Select</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectBusinessType('General Business')}
            className="px-8 py-3.5 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] font-bold text-sm shadow-md transition inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Get a POS for My Business</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
