import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, MessageSquare, RefreshCw, FileText } from 'lucide-react';
import { QuizState } from '../types';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';
import { analytics } from '../services/analytics';

interface RecommendationQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyWithQuizData: (quizData: QuizState) => void;
}

const INITIAL_QUIZ: QuizState = {
  businessType: '',
  dailyTransactions: '',
  servicesNeeded: '',
  location: '',
  hasExistingPOS: '',
};

export const RecommendationQuiz: React.FC<RecommendationQuizProps> = ({
  isOpen,
  onClose,
  onApplyWithQuizData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizState>(INITIAL_QUIZ);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
      analytics.track('quiz_completion', {
        businessType: answers.businessType,
        dailyTransactions: answers.dailyTransactions,
        servicesNeeded: answers.servicesNeeded,
        location: answers.location,
        hasExistingPOS: answers.hasExistingPOS,
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setAnswers(INITIAL_QUIZ);
    setCurrentStep(1);
    setIsFinished(false);
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!answers.businessType;
      case 2:
        return !!answers.dailyTransactions;
      case 3:
        return !!answers.servicesNeeded;
      case 4:
        return !!answers.location.trim();
      case 5:
        return !!answers.hasExistingPOS;
      default:
        return false;
    }
  };

  // Pre-fill WhatsApp message with quiz answers
  const whatsappSummaryMessage = `Hello, I just completed your "Find My Best POS" quiz:
- Business: ${answers.businessType || 'General Business'}
- Daily Volume: ${answers.dailyTransactions || 'Not sure'}
- Key Services: ${answers.servicesNeeded || 'All services'}
- Location: ${answers.location || 'Nigeria'}
- Existing POS: ${answers.hasExistingPOS || 'No'}

Please advise on the most suitable POS terminal (Moniepoint, PalmPay, or OPay) for my setup.`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-xl bg-[#1A1A1A] text-white rounded-3xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden"
      >
        
        {/* Modal Header */}
        <div className="bg-[#141414] text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
              Interactive Advisor
            </div>
            <h3 className="text-xl font-bold text-white">Find My Best POS</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Close Quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!isFinished && (
          <div className="bg-[#141414] px-6 py-3 border-b border-white/10 flex items-center justify-between text-xs text-stone-400">
            <span>
              Question <strong className="text-white">{currentStep}</strong> of {totalSteps}
            </span>
            <div className="w-36 h-2 bg-[#222222] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!isFinished ? (
            <div>
              {/* Question 1: Business Type */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white">
                    1. What type of business do you operate?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Retail shop',
                      'Supermarket',
                      'Restaurant',
                      'Pharmacy',
                      'POS/agent business',
                      'Online business',
                      'Other',
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setAnswers({ ...answers, businessType: type })}
                        className={`p-3 text-left rounded-xl border text-sm font-medium transition flex items-center justify-between cursor-pointer ${
                          answers.businessType === type
                            ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white font-semibold shadow-sm'
                            : 'border-white/10 hover:border-white/25 text-stone-300 bg-[#141414] hover:bg-[#1E1E1E]'
                        }`}
                      >
                        <span>{type}</span>
                        {answers.businessType === type && (
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2: Daily Transactions */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white">
                    2. How many transactions do you expect daily?
                  </h4>
                  <div className="space-y-2.5">
                    {['Less than 20', '20–50', '50–100', 'More than 100'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setAnswers({ ...answers, dailyTransactions: tier })}
                        className={`w-full p-3.5 text-left rounded-xl border text-sm font-medium transition flex items-center justify-between cursor-pointer ${
                          answers.dailyTransactions === tier
                            ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white font-semibold shadow-sm'
                            : 'border-white/10 hover:border-white/25 text-stone-300 bg-[#141414] hover:bg-[#1E1E1E]'
                        }`}
                      >
                        <span>{tier} transactions per day</span>
                        {answers.dailyTransactions === tier && (
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 3: Services Needed */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white">
                    3. What services do you need most?
                  </h4>
                  <div className="space-y-2.5">
                    {[
                      'Card payments',
                      'Transfers',
                      'Cash withdrawal',
                      'Multiple services',
                      'Not sure',
                    ].map((srv) => (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => setAnswers({ ...answers, servicesNeeded: srv })}
                        className={`w-full p-3.5 text-left rounded-xl border text-sm font-medium transition flex items-center justify-between cursor-pointer ${
                          answers.servicesNeeded === srv
                            ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white font-semibold shadow-sm'
                            : 'border-white/10 hover:border-white/25 text-stone-300 bg-[#141414] hover:bg-[#1E1E1E]'
                        }`}
                      >
                        <span>{srv}</span>
                        {answers.servicesNeeded === srv && (
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 4: Business Location */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white">
                    4. Where is your business located?
                  </h4>
                  <p className="text-xs text-stone-400">
                    Tell us your State and Area/City (e.g., Ikeja, Lagos or Wuse, Abuja).
                  </p>
                  <input
                    type="text"
                    value={answers.location}
                    onChange={(e) => setAnswers({ ...answers, location: e.target.value })}
                    placeholder="e.g., Alaba Market, Lagos or Garki, Abuja"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none text-sm text-white placeholder-stone-500"
                    autoFocus
                  />
                  <div className="flex flex-wrap gap-2 pt-1 text-xs">
                    {['Lagos', 'Abuja (FCT)', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu'].map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setAnswers({ ...answers, location: loc })}
                        className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 cursor-pointer"
                      >
                        + {loc}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 5: Do you already have a POS? */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white">
                    5. Do you already have a POS?
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['Yes', 'No'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAnswers({ ...answers, hasExistingPOS: opt })}
                        className={`p-5 text-center rounded-xl border text-base font-bold transition cursor-pointer ${
                          answers.hasExistingPOS === opt
                            ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white shadow-sm'
                            : 'border-white/10 hover:border-white/25 text-stone-300 bg-[#141414] hover:bg-[#1E1E1E]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Navigation Buttons */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 text-sm font-semibold text-stone-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  disabled={!isCurrentStepValid()}
                  onClick={handleNext}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition ${
                    isCurrentStepValid()
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#111111] hover:brightness-105 shadow-md shadow-[#D4AF37]/20 cursor-pointer'
                      : 'bg-white/10 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  <span>{currentStep === totalSteps ? 'View Recommendation' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Screen (Strictly following requirement #7) */
            <div className="space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  Assessment Complete!
                </h4>
                <div className="mt-4 rounded-2xl bg-[#141414] border border-white/10 p-4 text-stone-300 text-sm leading-relaxed text-left">
                  <p className="font-semibold text-white mb-2">
                    Based on your answers:
                  </p>
                  <p className="text-stone-300 italic mb-3">
                    "Based on your answers, we recommend speaking with our POS representative to determine the most suitable option."
                  </p>
                  <div className="space-y-1 text-xs text-stone-400 border-t border-white/10 pt-2.5">
                    <div>• <strong className="text-white">Business:</strong> {answers.businessType} in {answers.location}</div>
                    <div>• <strong className="text-white">Expected Volume:</strong> {answers.dailyTransactions}</div>
                    <div>• <strong className="text-white">Primary Need:</strong> {answers.servicesNeeded}</div>
                    <div>• <strong className="text-white">Current Terminal:</strong> {answers.hasExistingPOS}</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppUrl(whatsappSummaryMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.track('whatsapp_click', { placement: 'quiz_results' })}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Speak With a POS Expert on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onApplyWithQuizData(answers);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#242424] hover:bg-[#2C2C2C] text-[#D4AF37] border border-[#D4AF37]/30 font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Proceed to Request Form (Details Pre-filled)</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-stone-400 hover:text-stone-200 flex items-center justify-center gap-1 mx-auto pt-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
};
