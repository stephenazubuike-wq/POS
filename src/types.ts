export type ProviderId = 'moniepoint' | 'palmpay' | 'opay' | 'not_sure';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'POS Requested'
  | 'Processing'
  | 'Completed'
  | 'Not Interested'
  | 'Closed';

export interface LeadNote {
  id: string;
  text: string;
  date: string;
  author: string;
}

export interface Lead {
  id: string;
  date: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  businessName: string;
  businessType: string;
  location: string;
  preferredProvider: 'Moniepoint' | 'PalmPay' | 'OPay' | 'Not Sure';
  existingPOS: 'Yes' | 'No';
  requirement: string;
  additionalMessage?: string;
  status: LeadStatus;
  assignedAgent: string;
  notes: LeadNote[];
  createdAt: string;
  updatedAt: string;
}

export interface POSProviderInfo {
  id: ProviderId;
  name: string;
  brandTitle: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
  networkType: string;
  batteryLife: string;
  printer: string;
  ratesNote: string;
  badge?: string;
  colorHex: string;
  disclaimer: string;
}

export interface QuizState {
  businessType: string;
  dailyTransactions: string;
  servicesNeeded: string;
  location: string;
  hasExistingPOS: string;
}

export interface AnalyticsEvent {
  event: string;
  params?: Record<string, string | number | boolean>;
  timestamp: number;
}
