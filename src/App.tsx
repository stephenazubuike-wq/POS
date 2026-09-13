import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { POSOptions } from './components/POSOptions';
import { ProviderComparison } from './components/ProviderComparison';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TargetCustomers } from './components/TargetCustomers';
import { POSRequestForm } from './components/POSRequestForm';
import { TrustSection } from './components/TrustSection';
import { FAQAccordion } from './components/FAQAccordion';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileBottomBar } from './components/MobileBottomBar';
import { RecommendationQuiz } from './components/RecommendationQuiz';
import { PrivacyModal } from './components/PrivacyModal';
import { AdminDashboard } from './components/AdminDashboard';
import { QuizState } from './types';
import { analytics } from './services/analytics';

export default function App() {
  const [view, setView] = useState<'storefront' | 'admin'>('storefront');
  const [selectedProvider, setSelectedProvider] = useState<string>('Not Sure');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [privacyModalType, setPrivacyModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToRequestForm = (provider?: string) => {
    if (provider) {
      setSelectedProvider(provider);
    }
    const formElement = document.getElementById('request-pos');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToComparison = () => {
    const comparisonElement = document.getElementById('comparison');
    if (comparisonElement) {
      comparisonElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBusinessTypeSelect = (bizType: string) => {
    setSelectedBusinessType(bizType);
    scrollToRequestForm();
  };

  const handleApplyWithQuizData = (quizData: QuizState) => {
    if (quizData.businessType) setSelectedBusinessType(quizData.businessType);
    if (quizData.location) setSelectedLocation(quizData.location);
    scrollToRequestForm();
  };

  if (view === 'admin') {
    return <AdminDashboard onBackToSite={() => setView('storefront')} />;
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenRequestForm={() => scrollToRequestForm()}
        onOpenAdmin={() => setView('admin')}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenRequestForm={() => scrollToRequestForm()}
          onScrollToComparison={scrollToComparison}
        />

        {/* POS Options Section */}
        <POSOptions
          onRequestProvider={(provider) => scrollToRequestForm(provider)}
        />

        {/* Side-by-Side Comparison Section */}
        <ProviderComparison
          onOpenQuiz={() => setIsQuizOpen(true)}
          onRequestProvider={(provider) => scrollToRequestForm(provider)}
        />

        {/* How It Works (4 Steps) */}
        <HowItWorks />

        {/* Target Customers (10 Business Types) */}
        <TargetCustomers
          onSelectBusinessType={handleBusinessTypeSelect}
        />

        {/* Why Choose Us (6 Cards) */}
        <WhyChooseUs />

        {/* POS Request Form (Core Lead Generation) */}
        <POSRequestForm
          initialProvider={selectedProvider}
          initialBusinessType={selectedBusinessType}
          initialLocation={selectedLocation}
        />

        {/* Trust & Transparency Section */}
        <TrustSection />

        {/* FAQ Accordion */}
        <FAQAccordion />

        {/* Contact Section */}
        <ContactSection
          onOpenRequestForm={() => scrollToRequestForm()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={(type) => setPrivacyModalType(type)}
        onOpenAdmin={() => setView('admin')}
      />

      {/* Floating Desktop & Mobile WhatsApp CTA Button */}
      <WhatsAppButton />

      {/* Mobile-Only Sticky Bottom Bar */}
      <MobileBottomBar
        onOpenRequestForm={() => scrollToRequestForm()}
      />

      {/* Interactive Recommendation Quiz Modal */}
      <RecommendationQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onApplyWithQuizData={handleApplyWithQuizData}
      />

      {/* Privacy Policy / Terms Modal */}
      <PrivacyModal
        isOpen={privacyModalType !== null}
        onClose={() => setPrivacyModalType(null)}
        type={privacyModalType || 'privacy'}
      />
    </div>
  );
}
