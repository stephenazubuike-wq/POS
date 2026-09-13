import { Lead, LeadStatus, LeadNote } from '../types';
import { analytics } from './analytics';

const STORAGE_KEY = 'goldpos_merchant_leads_v1';

const INITIAL_SEED_LEADS: Lead[] = [
  {
    id: 'GP-1001',
    date: '2026-09-03',
    fullName: 'Chidi Okonkwo',
    phone: '08034567891',
    whatsapp: '08034567891',
    businessName: 'Okonkwo Superstores Ltd',
    businessType: 'Supermarket',
    location: 'Ikeja, Lagos State',
    preferredProvider: 'Moniepoint',
    existingPOS: 'Yes',
    requirement: 'Need an extra high-volume POS with dual-SIM to avoid network downtime at peak checkout hours.',
    additionalMessage: 'Can we receive the terminal within 24-48 hours once approved?',
    status: 'Qualified',
    assignedAgent: 'Stephen A.',
    notes: [
      {
        id: 'n-1',
        text: 'Spoke with merchant on WhatsApp. They currently do ~80 transactions daily. Recommended Moniepoint Smart POS.',
        date: '2026-09-03 14:20',
        author: 'Stephen A.',
      },
    ],
    createdAt: '2026-09-03T13:15:00Z',
    updatedAt: '2026-09-03T14:20:00Z',
  },
  {
    id: 'GP-1002',
    date: '2026-09-04',
    fullName: 'Fatima Abdullahi',
    phone: '08123456780',
    whatsapp: '08123456780',
    businessName: 'Zaria MedPlus Pharmacy',
    businessType: 'Pharmacy',
    location: 'Wuse 2, Abuja FCT',
    preferredProvider: 'PalmPay',
    existingPOS: 'No',
    requirement: 'Opening our second branch. Need a fast POS machine for card transactions and instant transfer verification.',
    additionalMessage: 'Please let me know the document requirements.',
    status: 'New',
    assignedAgent: 'Unassigned',
    notes: [],
    createdAt: '2026-09-04T09:30:00Z',
    updatedAt: '2026-09-04T09:30:00Z',
  },
  {
    id: 'GP-1003',
    date: '2026-09-02',
    fullName: 'Blessing Adeyemi',
    phone: '09056781234',
    whatsapp: '09056781234',
    businessName: 'Bella Couture & Fabrics',
    businessType: 'Boutiques',
    location: 'Lekki Phase 1, Lagos',
    preferredProvider: 'OPay',
    existingPOS: 'No',
    requirement: 'Looking for a compact, reliable terminal that fits on boutique counters.',
    additionalMessage: 'Prefer fast dispatch.',
    status: 'POS Requested',
    assignedAgent: 'Stephen A.',
    notes: [
      {
        id: 'n-2',
        text: 'Document requirements sent to client via WhatsApp. Client submitted utility bill and valid ID.',
        date: '2026-09-02 16:45',
        author: 'Stephen A.',
      },
    ],
    createdAt: '2026-09-02T11:10:00Z',
    updatedAt: '2026-09-02T16:45:00Z',
  },
  {
    id: 'GP-1004',
    date: '2026-09-01',
    fullName: 'Emeka Nwosu',
    phone: '07033445566',
    whatsapp: '07033445566',
    businessName: 'Apex Point Agribusiness & Agent',
    businessType: 'POS Agents',
    location: 'Port Harcourt, Rivers State',
    preferredProvider: 'Moniepoint',
    existingPOS: 'Yes',
    requirement: 'Expanding agency banking kiosk services in Trans-Amadi.',
    additionalMessage: 'Already have 1 POS, need 2 more.',
    status: 'Completed',
    assignedAgent: 'Stephen A.',
    notes: [
      {
        id: 'n-3',
        text: 'Terminal delivered and activated successfully. Merchant onboarded.',
        date: '2026-09-02 10:00',
        author: 'Stephen A.',
      },
    ],
    createdAt: '2026-09-01T08:00:00Z',
    updatedAt: '2026-09-02T10:00:00Z',
  },
];

export class LeadStorageService {
  private getStoredLeads(): Lead[] {
    if (typeof window === 'undefined') return INITIAL_SEED_LEADS;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_LEADS));
        return INITIAL_SEED_LEADS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read leads from localStorage:', e);
      return INITIAL_SEED_LEADS;
    }
  }

  private saveLeads(leads: Lead[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to save leads to localStorage:', e);
    }
  }

  getLeads(): Lead[] {
    return this.getStoredLeads();
  }

  createLead(data: {
    fullName: string;
    phone: string;
    whatsapp: string;
    businessName: string;
    businessType: string;
    location: string;
    preferredProvider: 'Moniepoint' | 'PalmPay' | 'OPay' | 'Not Sure';
    existingPOS: 'Yes' | 'No';
    requirement: string;
    additionalMessage?: string;
  }): Lead {
    const leads = this.getStoredLeads();
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const newId = `GP-${1000 + leads.length + 1}`;

    const newLead: Lead = {
      id: newId,
      date: dateStr,
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      whatsapp: data.whatsapp.trim() || data.phone.trim(),
      businessName: data.businessName.trim(),
      businessType: data.businessType,
      location: data.location.trim(),
      preferredProvider: data.preferredProvider,
      existingPOS: data.existingPOS,
      requirement: data.requirement.trim(),
      additionalMessage: data.additionalMessage?.trim() || '',
      status: 'New',
      assignedAgent: 'Unassigned',
      notes: [],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    leads.unshift(newLead);
    this.saveLeads(leads);

    analytics.track('pos_request_submission', {
      leadId: newLead.id,
      provider: newLead.preferredProvider,
      businessType: newLead.businessType,
      location: newLead.location,
    });

    return newLead;
  }

  updateLeadStatus(id: string, newStatus: LeadStatus): boolean {
    const leads = this.getStoredLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return false;

    leads[index].status = newStatus;
    leads[index].updatedAt = new Date().toISOString();
    this.saveLeads(leads);
    return true;
  }

  addLeadNote(id: string, noteText: string, author = 'Admin'): boolean {
    const leads = this.getStoredLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1 || !noteText.trim()) return false;

    const newNote: LeadNote = {
      id: `note-${Date.now()}`,
      text: noteText.trim(),
      date: new Date().toLocaleString(),
      author,
    };

    leads[index].notes.unshift(newNote);
    leads[index].updatedAt = new Date().toISOString();
    this.saveLeads(leads);
    return true;
  }

  deleteLead(id: string): boolean {
    const leads = this.getStoredLeads();
    const filtered = leads.filter((l) => l.id !== id);
    if (filtered.length === leads.length) return false;

    this.saveLeads(filtered);
    return true;
  }

  exportLeadsCSV(): void {
    const leads = this.getStoredLeads();
    const headers = [
      'Lead ID',
      'Date',
      'Full Name',
      'Phone',
      'WhatsApp',
      'Business Name',
      'Business Type',
      'Location',
      'Preferred Provider',
      'Existing POS',
      'Status',
      'Requirement',
    ];

    const rows = leads.map((l) => [
      l.id,
      l.date,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.whatsapp}"`,
      `"${l.businessName.replace(/"/g, '""')}"`,
      `"${l.businessType}"`,
      `"${l.location.replace(/"/g, '""')}"`,
      `"${l.preferredProvider}"`,
      l.existingPOS,
      l.status,
      `"${l.requirement.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `goldpos_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const leadStorage = new LeadStorageService();
