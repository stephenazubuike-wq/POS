import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, Headphones, FileCheck2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#111111] text-white border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Transparency & Security</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Your Business. Your Transactions. <span className="gold-text-gradient">Your Choice.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300">
            We operate with complete clarity so you can make informed decisions for your payment operations.
          </p>
        </motion.div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-[#1A1A1A] p-6 border border-white/10 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Clear Provider Distinction</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                We represent and facilitate onboarding for multiple separate payment networks, ensuring you receive unbiased options.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#D4AF37] font-semibold">
              Independent Representation
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-[#1A1A1A] p-6 border border-white/10 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Transparent Information</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                No artificial fee promises or invented discounts. All rates and requirements reflect actual provider policies.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#D4AF37] font-semibold">
              Zero Hidden Clauses
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-[#1A1A1A] p-6 border border-white/10 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Strict Privacy Protocols</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                We never ask for your banking PINs, OTPs, BVN, or passwords. Your business enquiry details remain confidential.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#D4AF37] font-semibold">
              Protected Enquiries
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.4 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-[#1A1A1A] p-6 border border-white/10 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Direct Local Assistance</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Speak directly with an accessible representative who understands the Nigerian business operating landscape.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#D4AF37] font-semibold">
              Personal Representative
            </div>
          </motion.div>

        </div>

        {/* Mandatory Independent Merchant Disclaimer Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl bg-gradient-to-r from-[#1E1E1E] to-[#141414] p-6 sm:p-8 border border-[#D4AF37]/30 max-w-4xl mx-auto text-center space-y-3 shadow-lg"
        >
          <div className="text-xs uppercase font-bold text-[#D4AF37] tracking-widest">
            Merchant & Agent Regulatory Clarification
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            "{SITE_CONFIG.independentDisclaimer}"
          </p>
          <div className="text-[11px] text-stone-500 pt-1">
            All brand trademarks, trade names, and logos are property of their respective owners.
          </div>
        </motion.div>

      </div>
    </section>
  );
};
