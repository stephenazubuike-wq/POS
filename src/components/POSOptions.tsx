import React from 'react';
import { motion } from 'motion/react';
import { Check, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';
import { POS_PROVIDERS, SITE_CONFIG } from '../config/siteConfig';
import { analytics } from '../services/analytics';

interface POSOptionsProps {
  onRequestProvider: (providerName: string) => void;
}

export const POSOptions: React.FC<POSOptionsProps> = ({ onRequestProvider }) => {
  return (
    <section id="pos-options" className="py-16 sm:py-24 bg-[#111111] text-white border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available Terminals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose Your POS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-400">
            Explore POS options from trusted payment providers and choose what works best for your business.
          </p>
        </motion.div>

        {/* 3 Premium Cards with Staggered Entrance & Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POS_PROVIDERS.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative rounded-3xl bg-[#1A1A1A] p-7 sm:p-8 border border-white/10 shadow-xl shadow-black/40 hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Accent bar */}
              <div className="absolute top-0 inset-x-8 h-1 rounded-b bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header with Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Payment Terminal
                  </span>
                  {provider.badge && (
                    <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-[11px] font-bold">
                      {provider.badge}
                    </span>
                  )}
                </div>

                {/* Card Title */}
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                  {provider.brandTitle}
                </h3>

                {/* Description */}
                <p className="text-sm text-stone-300 leading-relaxed min-h-[50px] mb-6">
                  {provider.description}
                </p>

                {/* Rates / Charges Note */}
                <div className="rounded-xl bg-[#141414] border border-white/10 p-3.5 mb-6 text-xs text-stone-400 flex flex-col gap-1 group-hover:border-[#D4AF37]/30 transition-colors">
                  <span className="font-semibold text-stone-200">Rates & Terms:</span>
                  <span className="text-stone-400 italic">
                    {provider.ratesNote}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    Core Capabilities
                  </span>
                  {provider.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-stone-300">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Subtitle */}
              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    analytics.track('provider_selection', { provider: provider.name });
                    onRequestProvider(provider.name);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:brightness-105 active:scale-[0.98] text-[#111111] font-bold text-sm shadow-md shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Request {provider.brandTitle}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <p className="mt-3 text-center text-[11px] text-stone-500">
                  {provider.disclaimer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mandatory Section Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 rounded-2xl bg-[#1A1A1A] border border-[#D4AF37]/30 p-4 max-w-4xl mx-auto flex items-start gap-3 text-xs text-stone-300 leading-relaxed shadow-lg"
        >
          <ShieldAlert className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Official Policy Disclaimer:</strong> Availability, fees, requirements and service terms are subject to the respective provider's current policies. As an independent POS merchant/agent, we facilitate onboarding and terminal deployment through official merchant partner channels.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
