import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Send,
  CheckCircle2,
  MessageSquare,
  Lock,
  Building,
  User,
  Phone as PhoneIcon,
  MapPin,
  HelpCircle,
  Mail,
  Check,
  ExternalLink,
} from 'lucide-react';
import { leadStorage } from '../services/leadStorage';
import { SITE_CONFIG, getWhatsAppUrl, getLeadEmailMailtoUrl } from '../config/siteConfig';
import { emailService, EmailDispatchResult } from '../services/emailService';
import { Lead } from '../types';
import { analytics } from '../services/analytics';

interface POSRequestFormProps {
  initialProvider?: string;
  initialBusinessType?: string;
  initialLocation?: string;
  onSuccess?: (lead: Lead) => void;
}

export const POSRequestForm: React.FC<POSRequestFormProps> = ({
  initialProvider = 'Not Sure',
  initialBusinessType = '',
  initialLocation = '',
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    businessName: '',
    businessType: initialBusinessType || '',
    location: initialLocation || '',
    preferredProvider: (initialProvider as 'Moniepoint' | 'PalmPay' | 'OPay' | 'Not Sure') || 'Not Sure',
    existingPOS: 'No' as 'Yes' | 'No',
    requirement: '',
    additionalMessage: '',
    honeypot: '', // anti-spam bot trap
  });

  const [usePhoneForWhatsApp, setUsePhoneForWhatsApp] = useState(true);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [emailStatus, setEmailStatus] = useState<EmailDispatchResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update initial values if passed from parent
  useEffect(() => {
    if (initialProvider) {
      const prov = initialProvider.includes('Moniepoint')
        ? 'Moniepoint'
        : initialProvider.includes('PalmPay')
        ? 'PalmPay'
        : initialProvider.includes('OPay')
        ? 'OPay'
        : 'Not Sure';
      setFormData((prev) => ({ ...prev, preferredProvider: prov }));
    }
  }, [initialProvider]);

  useEffect(() => {
    if (initialBusinessType) {
      setFormData((prev) => ({ ...prev, businessType: initialBusinessType }));
    }
  }, [initialBusinessType]);

  useEffect(() => {
    if (initialLocation) {
      setFormData((prev) => ({ ...prev, location: initialLocation }));
    }
  }, [initialLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Anti-spam check
    if (formData.honeypot) {
      console.warn('Bot submission blocked');
      return;
    }

    // Basic Validation
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setErrorMsg('Please provide a valid Nigerian phone number.');
      return;
    }
    if (!formData.businessName.trim()) {
      setErrorMsg('Please enter your business or shop name.');
      return;
    }
    if (!formData.location.trim()) {
      setErrorMsg('Please specify your business location/state.');
      return;
    }

    setIsSubmitting(true);

    try {
      const whatsappNumber = usePhoneForWhatsApp
        ? formData.phone
        : formData.whatsapp || formData.phone;

      // 1. Create lead record
      const newLead = leadStorage.createLead({
        fullName: formData.fullName,
        phone: formData.phone,
        whatsapp: whatsappNumber,
        email: formData.email,
        businessName: formData.businessName,
        businessType: formData.businessType || 'General Business',
        location: formData.location,
        preferredProvider: formData.preferredProvider,
        existingPOS: formData.existingPOS,
        requirement: formData.requirement || 'Standard POS for customer payments and transfers',
        additionalMessage: formData.additionalMessage,
      });

      // 2. Dispatch all details directly to eduseydzhtech@gmail.com
      const emailResult = await emailService.sendPOSRequestEmail(newLead);
      setEmailStatus(emailResult);

      setSubmittedLead(newLead);
      if (onSuccess) onSuccess(newLead);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('An error occurred while saving your request. Please try again or message us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedLead(null);
    setEmailStatus(null);
    setFormData({
      fullName: '',
      phone: '',
      whatsapp: '',
      email: '',
      businessName: '',
      businessType: '',
      location: '',
      preferredProvider: 'Not Sure',
      existingPOS: 'No',
      requirement: '',
      additionalMessage: '',
      honeypot: '',
    });
  };

  const nigerianStates = [
    'Lagos', 'Abuja (FCT)', 'Rivers (Port Harcourt)', 'Kano', 'Oyo (Ibadan)',
    'Anambra (Onitsha/Awka)', 'Delta (Warri/Asaba)', 'Enugu', 'Edo (Benin)',
    'Ogun (Abeokuta)', 'Kaduna', 'Osun', 'Ondo', 'Imo', 'Akwa Ibom', 'Abia (Aba)',
    'Other State'
  ];

  return (
    <section id="request-pos" className="py-16 sm:py-24 bg-[#111111] text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="rounded-3xl bg-[#1A1A1A] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden"
        >
          
          {/* Header Banner */}
          <div className="bg-[#141414] text-white px-6 py-8 sm:px-10 sm:py-10 border-b border-white/10 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
              Official Agent Lead Portal
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Request a POS
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-300 max-w-xl mx-auto">
              Submit your details to request a terminal from Moniepoint, PalmPay, or OPay. Our representative will contact you with current requirements.
            </p>
          </div>

          {/* Security Banner Notice (Requirement #11) */}
          <div className="bg-[#111111] border-b border-[#D4AF37]/30 px-6 py-3.5 sm:px-10 flex items-center gap-3 text-xs text-stone-300">
            <ShieldAlert className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <p>
              <strong className="text-white">Security Guarantee:</strong> {SITE_CONFIG.securityWarning}
            </p>
          </div>

          {/* Form / Success Screen */}
          <div className="p-6 sm:p-10">
            {submittedLead ? (
              /* Success confirmation view */
              <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Request Received & Sent!
                  </h3>
                  <p className="text-base text-stone-300 max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{submittedLead.fullName}</strong>. Your POS request details have been dispatched to our onboarding email and logged for immediate processing.
                  </p>
                </div>

                {/* Email Dispatch Notification Banner */}
                <div className="rounded-2xl bg-[#141414] border border-[#D4AF37]/30 p-4 max-w-lg mx-auto text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      <span>Email Delivery Notification</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Dispatched</span>
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    All submitted details, selections, and terminal requirements have been sent to:
                  </p>
                  <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 font-mono text-xs text-[#D4AF37] font-semibold break-all">
                    {SITE_CONFIG.NOTIFICATION_EMAIL}
                  </div>
                </div>

                {/* Reference Card with all submitted details */}
                <div className="rounded-2xl bg-[#141414] border border-white/10 p-5 max-w-lg mx-auto text-left text-xs space-y-2.5 text-stone-300">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                    <span className="text-stone-400 font-semibold">Enquiry Reference:</span>
                    <span className="font-mono font-bold text-[#D4AF37] text-sm">{submittedLead.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Merchant Name:</span>
                    <span className="font-semibold text-white">{submittedLead.fullName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Business Name:</span>
                    <span className="font-semibold text-white">{submittedLead.businessName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Category:</span>
                    <span className="text-stone-200">{submittedLead.businessType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Phone Number:</span>
                    <span className="font-mono text-white">{submittedLead.phone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">WhatsApp:</span>
                    <span className="font-mono text-emerald-400">{submittedLead.whatsapp}</span>
                  </div>
                  {submittedLead.email && (
                    <div className="flex justify-between items-center">
                      <span className="text-stone-400">Applicant Email:</span>
                      <span className="font-mono text-stone-200">{submittedLead.email}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Location:</span>
                    <span className="font-semibold text-white">{submittedLead.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Requested Provider:</span>
                    <span className="font-bold text-[#D4AF37]">{submittedLead.preferredProvider} POS</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Currently Has POS:</span>
                    <span className="text-stone-200">{submittedLead.existingPOS}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 text-[11px] text-stone-400 space-y-1">
                    <div className="font-semibold text-stone-300">Terminal Purpose:</div>
                    <div className="text-stone-200 italic">{submittedLead.requirement}</div>
                  </div>
                  {submittedLead.additionalMessage && (
                    <div className="border-t border-white/10 pt-2 text-[11px] text-stone-400 space-y-1">
                      <div className="font-semibold text-stone-300">Additional Message:</div>
                      <div className="text-stone-200 italic">"{submittedLead.additionalMessage}"</div>
                    </div>
                  )}
                </div>

                {/* Direct WhatsApp acceleration CTA & Email Backup */}
                <div className="pt-4 max-w-lg mx-auto space-y-3">
                  <p className="text-xs text-stone-400">
                    Want faster processing? Connect directly with our on-duty representative on WhatsApp:
                  </p>
                  <a
                    href={getWhatsAppUrl(
                      `Hello! I just submitted POS Request Ref: ${submittedLead.id} for "${submittedLead.businessName}" (${submittedLead.preferredProvider} POS). My details were also sent to ${SITE_CONFIG.NOTIFICATION_EMAIL}. Please guide me on next steps.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.track('whatsapp_click', { placement: 'form_success_cta' })}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Chat With Agent on WhatsApp Now</span>
                  </a>

                  {/* Mailto Backup Button */}
                  <a
                    href={getLeadEmailMailtoUrl(submittedLead)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 hover:text-white font-medium text-xs border border-white/10 flex items-center justify-center gap-2 transition"
                  >
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span>Open Email App (Send Direct Backup Copy)</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-xs text-stone-400 hover:text-stone-200 underline block mx-auto pt-2 cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Honeypot field (hidden from humans) */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="contact_fax_check"
                    tabIndex={-1}
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    autoComplete="off"
                  />
                </div>

                {/* 2 Column: Full Name & Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g., Emeka Johnson"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white placeholder-stone-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Business Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Building className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g., Johnson Provisions Store"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white placeholder-stone-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2 Column: Phone & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <PhoneIcon className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g., 08012345678"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white placeholder-stone-500 outline-none font-mono"
                      />
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="usePhoneForWhatsApp"
                        checked={usePhoneForWhatsApp}
                        onChange={(e) => setUsePhoneForWhatsApp(e.target.checked)}
                        className="rounded border-white/20 bg-[#141414] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <label htmlFor="usePhoneForWhatsApp" className="text-xs text-stone-300 select-none cursor-pointer">
                        Same number is on WhatsApp
                      </label>
                    </div>
                  </div>

                  {!usePhoneForWhatsApp ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                        WhatsApp Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#25D366]">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="e.g., 08123456789"
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white placeholder-stone-500 outline-none font-mono"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                        Email Address <span className="text-stone-500 text-[11px] font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g., merchant@gmail.com"
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white placeholder-stone-500 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2 Column: Business Type & (Email if not displayed above, or Location) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Business Type
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white outline-none"
                    >
                      <option value="" className="bg-[#1A1A1A]">Select Business Category</option>
                      <option value="Retail Shop" className="bg-[#1A1A1A]">Retail Shop / Boutique</option>
                      <option value="Supermarket" className="bg-[#1A1A1A]">Supermarket / Grocery</option>
                      <option value="Restaurant" className="bg-[#1A1A1A]">Restaurant / Bar / Eatery</option>
                      <option value="Pharmacy" className="bg-[#1A1A1A]">Pharmacy / Chemist</option>
                      <option value="POS Agent" className="bg-[#1A1A1A]">Independent POS Agent / Kiosk</option>
                      <option value="Salon & Beauty" className="bg-[#1A1A1A]">Salon & Barber Shop</option>
                      <option value="Market Trader" className="bg-[#1A1A1A]">Market Stall Trader</option>
                      <option value="Service Business" className="bg-[#1A1A1A]">Professional Service Business</option>
                      <option value="Other" className="bg-[#1A1A1A]">Other Category</option>
                    </select>
                  </div>

                  {!usePhoneForWhatsApp ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                        Email Address <span className="text-stone-500 text-[11px] font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g., merchant@gmail.com"
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white placeholder-stone-500 outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                        Business Location (State & City) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g., Ikeja, Lagos or Garki, Abuja"
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white placeholder-stone-500 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2 Column: Location (if not rendered above) & Preferred Provider */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {!usePhoneForWhatsApp ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                        Business Location (State & City) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g., Ikeja, Lagos or Garki, Abuja"
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white placeholder-stone-500 outline-none"
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className={usePhoneForWhatsApp ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Preferred POS Provider
                    </label>
                    <select
                      value={formData.preferredProvider}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredProvider: e.target.value as 'Moniepoint' | 'PalmPay' | 'OPay' | 'Not Sure',
                        })
                      }
                      className="w-full px-3.5 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white outline-none font-medium"
                    >
                      <option value="Moniepoint" className="bg-[#1A1A1A]">Moniepoint POS</option>
                      <option value="PalmPay" className="bg-[#1A1A1A]">PalmPay POS</option>
                      <option value="OPay" className="bg-[#1A1A1A]">OPay POS</option>
                      <option value="Not Sure" className="bg-[#1A1A1A]">Not Sure (Help Me Choose)</option>
                    </select>
                  </div>
                </div>

                {/* Radio: Do you currently have a POS? */}
                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                    Do you currently have a POS?
                  </label>
                  <div className="grid grid-cols-2 gap-4 max-w-sm">
                    {(['Yes', 'No'] as const).map((choice) => (
                      <label
                        key={choice}
                        className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer text-sm font-semibold transition ${
                          formData.existingPOS === choice
                            ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white'
                            : 'border-white/15 text-stone-400 hover:border-white/30 bg-[#141414]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="existingPOS"
                          value={choice}
                          checked={formData.existingPOS === choice}
                          onChange={() => setFormData({ ...formData, existingPOS: choice })}
                          className="sr-only"
                        />
                        <span>{choice}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* What do you need the POS for? */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                    What do you need the POS for?
                  </label>
                  <input
                    type="text"
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    placeholder="e.g., Accepting customer card payments, agency banking transfers, supermarket checkout"
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white placeholder-stone-500 outline-none"
                  />
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.additionalMessage}
                    onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                    placeholder="Any specific question or delivery timeline requirement..."
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm text-white placeholder-stone-500 outline-none"
                  />
                </div>

                {/* Direct Email Mapping Notice Banner */}
                <div className="rounded-xl bg-[#141414] border border-white/10 p-3.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 text-stone-300">
                    <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Direct Email Delivery</div>
                      <div className="text-[11px] text-stone-400">
                        All submitted details are routed immediately to: <span className="font-mono text-[#D4AF37] font-bold">{SITE_CONFIG.NOTIFICATION_EMAIL}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold shrink-0">
                    Active
                  </span>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.015, filter: 'brightness(1.06)' }}
                    whileTap={{ scale: 0.985 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBF55] to-[#B8860B] text-[#111111] font-extrabold text-base shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? 'Sending Request to Email...' : 'Submit POS Request'}</span>
                  </motion.button>
                </div>

                {/* Privacy and Verification Note */}
                <div className="flex items-center justify-center gap-2 text-xs text-stone-400 pt-2 text-center">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    Your details are protected. Information is used exclusively for POS merchant onboarding.
                  </span>
                </div>

              </form>
            )}
          </div>

        </motion.div>
      </div>
    </section>
  );
};
