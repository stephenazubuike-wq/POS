import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPARISON_FEATURES } from '../config/siteConfig';
import { analytics } from '../services/analytics';

interface ProviderComparisonProps {
  onOpenQuiz: () => void;
  onRequestProvider: (providerName: string) => void;
}

export const ProviderComparison: React.FC<ProviderComparisonProps> = ({
  onOpenQuiz,
  onRequestProvider,
}) => {
  return (
    <section id="comparison" className="py-16 sm:py-20 bg-[#161616] border-y border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            Side-by-Side Evaluation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Which POS Is Right for You?
          </h2>
          <p className="mt-3 text-base text-stone-400">
            Compare key capabilities across our partner merchant terminal networks.
          </p>
        </motion.div>

        {/* Comparison Table for Desktop & Scrollable Tablet */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-2xl border border-white/10 shadow-xl shadow-black/40 bg-[#1A1A1A]"
        >
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-[#111111] text-white">
                <th className="py-4 px-6 text-sm font-bold w-1/4">Terminal Feature</th>
                <th className="py-4 px-6 text-sm font-bold w-1/4 text-center border-l border-white/10">
                  <div className="text-base text-[#D4AF37]">Moniepoint POS</div>
                  <div className="text-[11px] text-stone-400 font-normal">Merchant Solution</div>
                </th>
                <th className="py-4 px-6 text-sm font-bold w-1/4 text-center border-l border-white/10">
                  <div className="text-base text-[#D4AF37]">PalmPay POS</div>
                  <div className="text-[11px] text-stone-400 font-normal">Flexible Payments</div>
                </th>
                <th className="py-4 px-6 text-sm font-bold w-1/4 text-center border-l border-white/10">
                  <div className="text-base text-[#D4AF37]">OPay POS</div>
                  <div className="text-[11px] text-stone-400 font-normal">Everyday Merchant</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {COMPARISON_FEATURES.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${idx % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#161616]'} hover:bg-[#202020] transition-colors`}
                >
                  <td className="py-4 px-6 font-semibold text-stone-200 flex items-center gap-2">
                    <span>{row.feature}</span>
                  </td>
                  <td className="py-4 px-6 text-center border-l border-white/10">
                    <span className="inline-flex items-center gap-1 font-medium text-stone-300">
                      {row.moniepoint === 'Supported' ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                          <span>Supported</span>
                        </>
                      ) : (
                        <span className="text-stone-300 bg-white/5 px-2.5 py-1 rounded-md text-xs border border-white/5">
                          {row.moniepoint}
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center border-l border-white/10">
                    <span className="inline-flex items-center gap-1 font-medium text-stone-300">
                      {row.palmpay === 'Supported' ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                          <span>Supported</span>
                        </>
                      ) : (
                        <span className="text-stone-300 bg-white/5 px-2.5 py-1 rounded-md text-xs border border-white/5">
                          {row.palmpay}
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center border-l border-white/10">
                    <span className="inline-flex items-center gap-1 font-medium text-stone-300">
                      {row.opay === 'Supported' ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                          <span>Supported</span>
                        </>
                      ) : (
                        <span className="text-stone-300 bg-white/5 px-2.5 py-1 rounded-md text-xs border border-white/5">
                          {row.opay}
                        </span>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Bottom Quick Action Row */}
              <tr className="bg-[#141414]">
                <td className="py-4 px-6 font-bold text-stone-200">Select Provider</td>
                <td className="py-4 px-6 text-center border-l border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onRequestProvider('Moniepoint')}
                    className="w-full py-2 px-3 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Choose Moniepoint
                  </motion.button>
                </td>
                <td className="py-4 px-6 text-center border-l border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onRequestProvider('PalmPay')}
                    className="w-full py-2 px-3 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Choose PalmPay
                  </motion.button>
                </td>
                <td className="py-4 px-6 text-center border-l border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onRequestProvider('OPay')}
                    className="w-full py-2 px-3 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Choose OPay
                  </motion.button>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* CTA "Help Me Choose" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#111111] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#D4AF37]/30 shadow-xl"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold flex items-center justify-center sm:justify-start gap-2">
              <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
              <span>Not sure which terminal fits your daily volume?</span>
            </h3>
            <p className="text-sm text-stone-300">
              Answer 5 quick questions in 60 seconds and let our recommendation system find your ideal match.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 10px 20px -5px rgba(212, 175, 55, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              analytics.track('cta_click', { label: 'Help Me Choose Quiz' });
              onOpenQuiz();
            }}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#111111] font-bold text-sm shadow-lg shadow-[#D4AF37]/25 flex items-center gap-2 transition cursor-pointer"
          >
            <span>Help Me Choose</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
