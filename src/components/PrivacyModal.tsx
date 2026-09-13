import React from 'react';
import { X, ShieldCheck, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#1A1A1A] rounded-3xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-stone-200">
        
        {/* Header */}
        <div className="bg-[#141414] text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy & Data Protection' : 'Terms & Merchant Conditions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Alert Header */}
        <div className="bg-rose-950/40 border-b border-rose-800/40 px-6 py-3.5 flex items-start gap-3 text-xs text-rose-200">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-rose-300">Critical Security Guarantee:</strong> We will NEVER ask you to provide your OTP, PIN, password, or banking login credentials through this website or over any phone/WhatsApp communication.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-5 text-sm text-stone-300 max-h-[65vh] overflow-y-auto leading-relaxed">
          {type === 'privacy' ? (
            <>
              <div>
                <h4 className="font-bold text-white text-base mb-1">1. Information Collection</h4>
                <p>
                  {SITE_CONFIG.brandName} collects standard business enquiry information submitted voluntarily by prospective merchants, including business name, contact person, phone number, WhatsApp contact, business category, and state/location.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">2. Purpose of Information Use</h4>
                <p className="mb-2">Customer information submitted through this website is collected strictly for:</p>
                <ul className="space-y-1.5 list-disc pl-5 text-stone-300">
                  <li>Responding to POS enquiries and answering merchant questions.</li>
                  <li>Processing POS terminal acquisition requests with our representative.</li>
                  <li>Providing customer support and onboarding assistance.</li>
                  <li>Legitimate business communication regarding device status and logistics.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">3. Zero Banking Credentials Policy</h4>
                <p>
                  This website does not solicit, collect, or store any sensitive banking credentials (including BVN, NIN, card CVV/CVC, debit card PINs, online banking passwords, or one-time passcodes).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">4. Third-Party Payment Providers</h4>
                <p>
                  Moniepoint, PalmPay, and OPay are independent financial technology and payment service providers. Once you decide on a terminal, final onboarding and KYC verification occur through the respective provider’s authorized merchant verification channels.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-bold text-white text-base mb-1">1. Independent Merchant Agent Status</h4>
                <p>
                  {SITE_CONFIG.brandName} is an independent POS merchant/agent. This website is not operated by, owned by, or part of Moniepoint Inc., PalmPay Limited, or OPay Digital Services Limited.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">2. Pricing, Rates & Service Terms</h4>
                <p>
                  Terminal availability, terminal leasing/purchase costs, caution fees, daily targets, and transaction charges are determined exclusively by the respective providers and are subject to their official terms and policies.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">3. Merchant Responsibility</h4>
                <p>
                  Merchants are responsible for maintaining the physical security of any deployed terminal and adhering to standard Central Bank of Nigeria (CBN) and payment industry guidelines regarding customer card data protection.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#141414] px-6 py-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#242424] hover:bg-[#2C2C2C] text-[#D4AF37] border border-[#D4AF37]/30 font-semibold text-xs transition cursor-pointer"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
