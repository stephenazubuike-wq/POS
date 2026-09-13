import { POSProviderInfo } from '../types';

export const SITE_CONFIG = {
  brandName: 'GOLDPOS',
  tagline: 'Independent POS Merchant & Business Solution Specialist',
  subheading: 'Helping Nigerian businesses acquire and deploy reliable POS terminals from leading providers.',
  
  // SINGLE CONFIGURATION VARIABLE FOR WHATSAPP (As specified in requirement #12)
  WHATSAPP_NUMBER: '2348124707269',
  WHATSAPP_DISPLAY: '+234 812 470 7269',
  DEFAULT_WHATSAPP_MESSAGE: 'Hello, I would like to get a POS. Please help me choose the right option for my business.',
  
  // Contact info placeholders (easily editable)
  PHONE_NUMBER: '+234 812 470 7269',
  PHONE_NUMBER_RAW: '+2348124707269',
  EMAIL: 'eduseydzhtech@gmail.com',
  NOTIFICATION_EMAIL: 'eduseydzhtech@gmail.com',
  BUSINESS_LOCATION: 'Lagos, Nigeria (Nationwide deployment across all 36 states & FCT)',
  BUSINESS_HOURS: 'Monday – Saturday: 8:00 AM – 6:30 PM (WAT)',
  
  // Color palette constants
  colors: {
    primaryGold: '#D4AF37',
    darkGold: '#B8860B',
    deepBlack: '#111111',
    charcoal: '#1C1C1C',
    white: '#FFFFFF',
    lightBg: '#FAFAF7',
  },

  // Independent Merchant Transparency Notice
  independentDisclaimer:
    'We are an independent POS merchant/agent. Moniepoint, PalmPay and OPay are separate providers. Availability, approval, fees, transaction charges and service terms are determined by the respective providers and may change.',
    
  securityWarning:
    'Security Notice: Never share your PIN, OTP, password, banking credentials, BVN or card details with anyone. Our representatives will NEVER ask for these.',
};

export const POS_PROVIDERS: POSProviderInfo[] = [
  {
    id: 'moniepoint',
    name: 'Moniepoint',
    brandTitle: 'Moniepoint POS',
    tagline: 'High reliability & everyday business transaction management',
    description:
      'A reliable POS solution suitable for businesses that need convenient payments and everyday transaction services.',
    features: [
      'POS payment acceptance',
      'Transfer services',
      'Cash withdrawal',
      'Transaction management',
      'Business payment services',
    ],
    bestFor: 'Supermarkets, busy retail stores, fuel stations & high-volume merchants',
    networkType: 'Dual 4G SIM & Wi-Fi connectivity',
    batteryLife: 'Long-lasting rechargeable battery',
    printer: 'High-speed thermal receipt printer',
    ratesNote: 'Contact us for current rates and requirements.',
    badge: 'Popular Choice',
    colorHex: '#0052FF',
    disclaimer:
      'Availability, fees, requirements and service terms are subject to Moniepoint current policies.',
  },
  {
    id: 'palmpay',
    name: 'PalmPay',
    brandTitle: 'PalmPay POS',
    tagline: 'Flexible payment workflows & seamless merchant transactions',
    description:
      'A convenient POS solution for merchants looking for flexible payment and transaction services.',
    features: [
      'POS payment acceptance',
      'Transfers',
      'Cash withdrawal',
      'Merchant transactions',
      'Business payment services',
    ],
    bestFor: 'Boutiques, pharmacies, restaurants, salons & neighborhood stores',
    networkType: 'Fast 4G connectivity',
    batteryLife: 'Durable all-day merchant battery',
    printer: 'Integrated fast thermal printer',
    ratesNote: 'Contact us for current rates and requirements.',
    badge: 'Flexible & Fast',
    colorHex: '#673AB7',
    disclaimer:
      'Availability, fees, requirements and service terms are subject to PalmPay current policies.',
  },
  {
    id: 'opay',
    name: 'OPay',
    brandTitle: 'OPay POS',
    tagline: 'Everyday customer payments with fast transaction turnaround',
    description:
      'A convenient POS option designed to help merchants manage everyday customer transactions.',
    features: [
      'POS payment acceptance',
      'Transfers',
      'Cash withdrawal',
      'Merchant transactions',
      'Business payment services',
    ],
    bestFor: 'Daily neighborhood merchants, retail stores, food vendors & agents',
    networkType: 'Reliable 4G network support',
    batteryLife: 'Heavy-duty commercial battery',
    printer: 'Clear thermal paper receipt support',
    ratesNote: 'Contact us for current rates and requirements.',
    badge: 'Fast Setup',
    colorHex: '#10B981',
    disclaimer:
      'Availability, fees, requirements and service terms are subject to OPay current policies.',
  },
];

export const COMPARISON_FEATURES = [
  {
    feature: 'Payment Acceptance (Cards/NFC)',
    moniepoint: 'Supported',
    palmpay: 'Supported',
    opay: 'Supported',
  },
  {
    feature: 'Bank Transfer Services',
    moniepoint: 'Supported',
    palmpay: 'Supported',
    opay: 'Supported',
  },
  {
    feature: 'Cash In / Cash Out (Withdrawal)',
    moniepoint: 'Supported',
    palmpay: 'Supported',
    opay: 'Supported',
  },
  {
    feature: 'Terminal Connectivity',
    moniepoint: '4G LTE + Wi-Fi',
    palmpay: '4G LTE Cellular',
    opay: '4G LTE Cellular',
  },
  {
    feature: 'Receipt Printer',
    moniepoint: 'Thermal Fast Roll',
    palmpay: 'Thermal Fast Roll',
    opay: 'Thermal Fast Roll',
  },
  {
    feature: 'POS Availability',
    moniepoint: 'Confirm current availability',
    palmpay: 'Confirm current availability',
    opay: 'Confirm current availability',
  },
  {
    feature: 'Pricing & Charges',
    moniepoint: 'Contact us for current rates and requirements',
    palmpay: 'Contact us for current rates and requirements',
    opay: 'Contact us for current rates and requirements',
  },
  {
    feature: 'Merchant Support',
    moniepoint: 'Dedicated agent assistance',
    palmpay: 'Dedicated agent assistance',
    opay: 'Dedicated agent assistance',
  },
];

export const BUSINESS_TYPES = [
  { id: 'retail', name: 'Retail Shops', desc: 'Accept swift card payments from daily shoppers.' },
  { id: 'supermarket', name: 'Supermarkets', desc: 'Fast checkout lanes with reliable thermal receipts.' },
  { id: 'restaurant', name: 'Restaurants & Bars', desc: 'Table-side payments and quick customer receipts.' },
  { id: 'pharmacy', name: 'Pharmacies', desc: 'Instant card and transfer confirmation for patients.' },
  { id: 'boutique', name: 'Boutiques & Fashion', desc: 'Sleek, modern terminals for premium store counters.' },
  { id: 'pos_agent', name: 'POS Agents', desc: 'Reliable cash withdrawal & transfer services for customers.' },
  { id: 'salon', name: 'Salons & Barbers', desc: 'Convenient non-cash options for beauty and grooming.' },
  { id: 'small_biz', name: 'Small Businesses', desc: 'Upgrade from personal transfers to a verified merchant POS.' },
  { id: 'market', name: 'Market Traders', desc: 'Durable battery life for outdoor market counters.' },
  { id: 'service', name: 'Service Businesses', desc: 'Professional on-the-go payment collection for services.' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Choose Your POS',
    description: 'Tell us what type of business you operate and what you need.',
  },
  {
    step: '02',
    title: 'Submit Your Request',
    description: 'Complete our simple POS request form with your basic business details.',
  },
  {
    step: '03',
    title: 'We Contact You',
    description: 'Our representative contacts you to confirm your requirements and availability.',
  },
  {
    step: '04',
    title: 'Get Your POS',
    description: "Complete the provider's required process and receive your POS when approved.",
  },
];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: 'Multiple POS Options',
    description: 'Access POS options from multiple providers in one place.',
  },
  {
    title: 'Simple Process',
    description: 'We make the POS request process straightforward and easy to understand.',
  },
  {
    title: 'Personal Assistance',
    description: 'Get direct assistance instead of trying to figure everything out alone.',
  },
  {
    title: 'Business-Focused',
    description: 'We help merchants choose a POS solution based on their business needs.',
  },
  {
    title: 'Convenient',
    description: 'Start your request online and continue the process through WhatsApp or phone.',
  },
  {
    title: 'Local Support',
    description: 'Get direct assistance from a local POS representative.',
  },
];

export const FAQS = [
  {
    q: 'What is a POS terminal?',
    a: 'A Point of Sale (POS) terminal is a portable electronic device that allows business owners and merchants to accept electronic card payments (Mastercard, Visa, Verve), process transfers, and provide cash withdrawal services to customers securely.',
  },
  {
    q: 'Which POS providers do you offer?',
    a: 'As an independent POS merchant/agent, we assist customers in obtaining terminals from leading payment providers in Nigeria, specifically Moniepoint, PalmPay, and OPay.',
  },
  {
    q: 'Can I choose my preferred POS provider?',
    a: 'Yes! You can choose between Moniepoint, PalmPay, or OPay depending on your business preference and current device availability. If you are not sure, we will advise you based on your daily transaction volume.',
  },
  {
    q: 'How do I request a POS?',
    a: 'Simply fill out our short online POS Request Form or send us a message on WhatsApp. Our representative will contact you promptly to review your business details and guide you through the provider approval process.',
  },
  {
    q: 'What businesses can use a POS?',
    a: 'Retail shops, supermarkets, restaurants, pharmacies, boutiques, beauty salons, fuel stations, independent POS agents, food vendors, and everyday service businesses can all use a POS terminal.',
  },
  {
    q: 'Do I need a registered business?',
    a: 'Requirements vary by provider and terminal tier. Many providers support both registered companies (CAC) and verified individual sole proprietors. Contact us for current requirements.',
  },
  {
    q: 'How long does it take to get a POS?',
    a: 'Approval and delivery timelines depend on the specific provider, required documentation review, and current device availability in your state. Contact us for current information.',
  },
  {
    q: 'How much does a POS cost?',
    a: 'Terminal acquisition costs, caution fees, or lease rates are set by the respective providers and may vary over time. Contact us for the current pricing and requirements.',
  },
  {
    q: 'What are the transaction charges?',
    a: 'Transaction charges and processing fees are determined directly by Moniepoint, PalmPay, and OPay according to their official commercial guidelines. Contact us for the latest schedule of charges.',
  },
  {
    q: 'Can you help me choose the right POS?',
    a: 'Yes, absolutely. You can use our "Find My Best POS" quiz on this website or speak with our representative via WhatsApp, and we will recommend the best fit for your business type and location.',
  },
];

/**
 * Helper to generate pre-filled WhatsApp link
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const number = SITE_CONFIG.WHATSAPP_NUMBER.replace(/\D/g, '');
  const message = encodeURIComponent(customMessage || SITE_CONFIG.DEFAULT_WHATSAPP_MESSAGE);
  return `https://wa.me/${number}?text=${message}`;
}

/**
 * Helper to generate pre-filled mailto link with all POS request details mapped to target email
 */
export function getLeadEmailMailtoUrl(lead: {
  id: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  businessName: string;
  businessType: string;
  location: string;
  preferredProvider: string;
  existingPOS: string;
  requirement: string;
  additionalMessage?: string;
}): string {
  const subject = encodeURIComponent(`🚨 New POS Request Ref [${lead.id}] - ${lead.businessName} (${lead.preferredProvider} POS)`);
  const body = encodeURIComponent(
`NEW POS TERMINAL REQUEST
========================
Lead Reference ID: ${lead.id}
Date & Time: ${new Date().toLocaleString()}

MERCHANT / APPLICANT DETAILS:
- Full Name: ${lead.fullName}
- Phone Number: ${lead.phone}
- WhatsApp Number: ${lead.whatsapp}
- Business Name: ${lead.businessName}
- Business Type: ${lead.businessType}
- Business Location: ${lead.location}

POS SPECIFICATIONS:
- Preferred Provider: ${lead.preferredProvider} POS
- Has Existing POS: ${lead.existingPOS}
- Primary Requirement: ${lead.requirement}
- Additional Message/Notes: ${lead.additionalMessage || 'None'}

Target Delivery Email: ${SITE_CONFIG.NOTIFICATION_EMAIL}
`
  );
  return `mailto:${SITE_CONFIG.NOTIFICATION_EMAIL}?subject=${subject}&body=${body}`;
}

