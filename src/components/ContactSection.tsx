import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';
import { analytics } from '../services/analytics';

interface ContactSectionProps {
  onOpenRequestForm: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenRequestForm }) => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#111111] text-white relative">
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
            Direct Merchant Assistance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Get Your POS?
          </h2>
          <p className="mt-3 text-base text-stone-300">
            Tell us what you need and we'll help you get started.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#D4AF37]/20 shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-bold text-stone-400">Phone Support</div>
              <div className="text-base font-bold text-white mt-1 font-mono">{SITE_CONFIG.PHONE_NUMBER}</div>
              <p className="text-xs text-stone-400 mt-2">Direct call with our onboarding officer</p>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#25D366]/30 shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-bold text-stone-400">WhatsApp</div>
              <div className="text-base font-bold text-white mt-1 font-mono">{SITE_CONFIG.WHATSAPP_DISPLAY || `+${SITE_CONFIG.WHATSAPP_NUMBER}`}</div>
              <p className="text-xs text-stone-400 mt-2">Instant messaging & document guide</p>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10 shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-stone-300 mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-bold text-stone-400">Official Email</div>
              <div className="text-sm font-bold text-white mt-1 break-all">{SITE_CONFIG.EMAIL}</div>
              <p className="text-xs text-stone-400 mt-2">Corporate enquiries & partnerships</p>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.25 }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10 shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-stone-300 mb-4 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-bold text-stone-400">Business Hours</div>
              <div className="text-sm font-bold text-white mt-1">{SITE_CONFIG.BUSINESS_HOURS}</div>
              <p className="text-xs text-stone-400 mt-2">West Africa Time (WAT)</p>
            </motion.div>

            {/* Location Banner (Full Width) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="sm:col-span-2 p-6 rounded-2xl bg-[#1A1A1A] border border-[#D4AF37]/20 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-stone-400">Operational Base & Coverage</div>
                <div className="text-base font-bold text-white mt-0.5">{SITE_CONFIG.BUSINESS_LOCATION}</div>
                <p className="text-xs text-stone-400 mt-1">
                  We coordinate with merchant teams for rapid delivery to your business premises anywhere in Nigeria.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Quick Action Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#1C1C1C] to-[#121212] p-8 border border-[#D4AF37]/30 shadow-2xl space-y-6"
          >
            <h3 className="text-xl font-bold text-white">
              Connect With Our Team Now
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed">
              We respond promptly to assist you in selecting the ideal terminal, checking current availability, and explaining provider documentation.
            </p>

            <div className="space-y-3.5">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${SITE_CONFIG.PHONE_NUMBER_RAW}`}
                onClick={() => analytics.track('phone_click', { placement: 'contact_section' })}
                className="w-full py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 flex items-center justify-center gap-2.5 transition"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call Us ({SITE_CONFIG.PHONE_NUMBER})</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.track('whatsapp_click', { placement: 'contact_section' })}
                className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 10px 20px -5px rgba(212, 175, 55, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  analytics.track('cta_click', { label: 'Contact Section Request POS' });
                  onOpenRequestForm();
                }}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#111111] font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition cursor-pointer"
              >
                <span>Request a POS</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
