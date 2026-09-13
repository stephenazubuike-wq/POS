import React, { useState } from 'react';
import { Wifi, Signal, CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const POSTerminalVisual: React.FC = () => {
  const [activeProvider, setActiveProvider] = useState<'Moniepoint' | 'PalmPay' | 'OPay'>('Moniepoint');

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px]">
      {/* Subtle gold ambient glow behind terminal */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/20 via-[#B8860B]/10 to-transparent blur-2xl rounded-full -z-10" />

      {/* POS Terminal Body */}
      <div className="relative rounded-[32px] bg-[#1A1A1A] p-4 sm:p-5 shadow-2xl shadow-black/60 border border-[#D4AF37]/30 text-white">
        {/* Receipt paper output slot */}
        <div className="mx-auto mb-3 h-2 w-32 rounded-full bg-[#111111] border-b border-[#333333] shadow-inner" />
        
        {/* Receipt Mock Paper Coming Out */}
        <div className="mx-auto mb-2 -mt-1 w-28 rounded-t bg-stone-100 text-stone-800 px-2 py-1 shadow-md text-[9px] font-mono border-t border-dashed border-stone-400">
          <div className="text-center font-bold text-[8px] text-[#B8860B] tracking-wider">{SITE_CONFIG.brandName} VERIFIED</div>
          <div className="flex justify-between border-b border-stone-300 pb-0.5 mt-0.5">
            <span>TERMINAL</span>
            <span className="font-semibold">{activeProvider.toUpperCase()}</span>
          </div>
          <div className="text-center text-[7px] text-stone-500 pt-0.5">FAST NATIONWIDE DISPATCH</div>
        </div>

        {/* Terminal Screen Bezel */}
        <div className="rounded-[22px] bg-[#0D0D0D] p-3 border border-white/10 shadow-inner">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-2 text-[10px] text-stone-400 mb-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white">09:41</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1 rounded">4G LTE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3 text-emerald-400" />
              <Wifi className="w-3 h-3 text-emerald-400" />
              <div className="w-4 h-2 rounded-sm border border-stone-400 flex items-center p-0.5">
                <div className="w-full h-full bg-[#D4AF37] rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Interactive Provider Switch Tabs inside POS screen */}
          <div className="grid grid-cols-3 gap-1 mb-2 bg-[#1C1C1C] p-1 rounded-xl">
            {(['Moniepoint', 'PalmPay', 'OPay'] as const).map((prov) => (
              <button
                key={prov}
                onClick={() => setActiveProvider(prov)}
                className={`py-1 text-[11px] font-medium rounded-lg transition-all ${
                  activeProvider === prov
                    ? 'bg-[#D4AF37] text-[#111111] font-bold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {prov}
              </button>
            ))}
          </div>

          {/* Screen Content - Transaction Display */}
          <div className="rounded-xl bg-gradient-to-b from-[#181818] to-[#121212] p-3.5 border border-white/5 text-center">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-medium mb-2">
              <ShieldCheck className="w-3 h-3" />
              <span>Ready for Transactions</span>
            </div>

            <div className="text-[11px] text-stone-400">Total Amount</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white my-0.5">
              ₦ 25,000<span className="text-base text-stone-400">.00</span>
            </div>

            <div className="mt-2.5 rounded-lg bg-[#222222] p-2 flex items-center justify-between text-left text-[10px]">
              <div>
                <span className="block text-stone-400">Selected Provider</span>
                <span className="font-semibold text-[#D4AF37]">{activeProvider} POS</span>
              </div>
              <div className="text-right">
                <span className="block text-stone-400">Card & Transfer</span>
                <span className="text-emerald-400 flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Instant
                </span>
              </div>
            </div>
          </div>

          {/* Contactless tap indicator */}
          <div className="mt-2.5 flex items-center justify-center gap-2 text-stone-400 text-[10px]">
            <div className="w-6 h-4 rounded border border-stone-600 flex items-center justify-center">
              <CreditCard className="w-3 h-3 text-[#D4AF37]" />
            </div>
            <span>Insert Card or Tap for NFC Payment</span>
          </div>
        </div>

        {/* Physical Keypad Simulation */}
        <div className="mt-3 grid grid-cols-3 gap-1.5 px-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CANCEL', '0', 'ENTER'].map((key) => {
            const isCancel = key === 'CANCEL';
            const isEnter = key === 'ENTER';
            return (
              <div
                key={key}
                className={`h-8 sm:h-9 rounded-lg flex items-center justify-center text-xs font-semibold shadow-sm transition ${
                  isEnter
                    ? 'bg-emerald-700/80 text-white text-[9px]'
                    : isCancel
                    ? 'bg-rose-900/80 text-white text-[9px]'
                    : 'bg-[#262626] text-stone-200 border border-white/5'
                }`}
              >
                {key}
              </div>
            );
          })}
        </div>

        {/* EMV Card Chip Reader Slot at Bottom */}
        <div className="mt-3 flex justify-center">
          <div className="h-1.5 w-24 rounded-full bg-black border border-stone-700" />
        </div>

        {/* Badge on Terminal */}
        <div className="mt-2 text-center text-[9px] tracking-widest text-[#D4AF37] font-semibold">
          ✦ MULTI-PROVIDER MERCHANT TERMINAL ✦
        </div>
      </div>
    </div>
  );
};
