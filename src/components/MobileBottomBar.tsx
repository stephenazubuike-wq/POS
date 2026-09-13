import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';
import { analytics } from '../services/analytics';

interface MobileBottomBarProps {
  onOpenRequestForm: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenRequestForm }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-[#111111]/95 backdrop-blur-md border-t border-[#D4AF37]/30 p-2.5 shadow-2xl">
      <div className="grid grid-cols-2 gap-2">
        {/* WhatsApp CTA */}
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.track('whatsapp_click', { placement: 'mobile_bottom_bar' })}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-emerald-900/60 border border-[#25D366]/50 text-[#25D366] font-bold text-xs active:scale-95 transition"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>WhatsApp Chat</span>
        </a>

        {/* Primary Form CTA */}
        <button
          onClick={() => {
            analytics.track('cta_click', { label: 'Mobile Sticky Bottom Get a POS' });
            onOpenRequestForm();
          }}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#111111] font-extrabold text-xs shadow-md active:scale-95 transition cursor-pointer"
        >
          <span>Get a POS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
