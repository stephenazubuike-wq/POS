import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  Search,
  Filter,
  Download,
  Eye,
  PlusCircle,
  MessageSquare,
  Phone,
  CheckCircle2,
  Clock,
  User,
  Building,
  MapPin,
  Trash2,
  X,
  Shield,
  ArrowLeft,
  RefreshCw,
  Mail,
} from 'lucide-react';
import { leadStorage } from '../services/leadStorage';
import { emailService } from '../services/emailService';
import { Lead, LeadStatus } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

const ADMIN_PASSCODE = 'admin123'; // Default demo admin passkey for evaluation

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('goldpos_admin_auth') === 'true';
    }
    return false;
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('All');

  // Modal states
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const loadLeads = () => {
    setLeads(leadStorage.getLeads());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (passwordInput === ADMIN_PASSCODE || passwordInput === 'goldpos2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('goldpos_admin_auth', 'true');
      setPasswordInput('');
    } else {
      setAuthError('Incorrect administrator passcode. Please check and retry.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('goldpos_admin_auth');
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    const success = leadStorage.updateLeadStatus(leadId, newStatus);
    if (success) {
      loadLeads();
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
      showToast(`Status updated to ${newStatus}`);
    }
  };

  const handleAddNote = (leadId: string) => {
    if (!newNoteText.trim()) return;
    const success = leadStorage.addLeadNote(leadId, newNoteText, 'Agent Stephen');
    if (success) {
      setNewNoteText('');
      loadLeads();
      const updated = leadStorage.getLeads().find((l) => l.id === leadId);
      if (updated) setSelectedLead(updated);
      showToast('Note added successfully');
    }
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm('Are you sure you want to remove this lead enquiry?')) {
      leadStorage.deleteLead(leadId);
      loadLeads();
      setSelectedLead(null);
      showToast('Lead removed');
    }
  };

  // Status badge styling helper
  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Contacted':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Qualified':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'POS Requested':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Processing':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Not Interested':
      case 'Closed':
        return 'bg-stone-800 text-stone-400 border-stone-700';
      default:
        return 'bg-stone-800 text-stone-300 border-stone-700';
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProvider =
      providerFilter === 'All' || lead.preferredProvider === providerFilter;

    const matchesStatus =
      statusFilter === 'All' || lead.status === statusFilter;

    const matchesBusinessType =
      businessTypeFilter === 'All' || lead.businessType === businessTypeFilter;

    return matchesSearch && matchesProvider && matchesStatus && matchesBusinessType;
  });

  // Metrics counters
  const metrics = {
    total: leads.length,
    newLeads: leads.filter((l) => l.status === 'New').length,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    qualified: leads.filter((l) => l.status === 'Qualified').length,
    posRequests: leads.filter((l) => l.status === 'POS Requested').length,
    completed: leads.filter((l) => l.status === 'Completed').length,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1C1C1C] border border-[#D4AF37]/30 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37] mx-auto flex items-center justify-center shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {SITE_CONFIG.brandName} Agent Portal
            </h2>
            <p className="text-xs text-stone-400">
              Authorized admin access required to manage merchant leads and confidential inquiries.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                Admin Access Passcode
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter passcode (e.g. admin123)"
                className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm font-mono"
              />
              <div className="mt-2 text-[11px] text-stone-500 flex justify-between">
                <span>Demo passcode: <code className="text-[#D4AF37] font-bold">admin123</code></span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:brightness-105 active:scale-98 text-[#111111] font-bold text-sm shadow-md transition cursor-pointer"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onBackToSite}
              className="text-xs text-stone-400 hover:text-white flex items-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#141414] text-[#D4AF37] border border-[#D4AF37]/50 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="bg-[#141414] text-white border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/15 text-stone-300 hover:text-white transition cursor-pointer"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">
                  {SITE_CONFIG.brandName} Admin
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold border border-[#D4AF37]/40">
                  Lead Management
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-medium">
                  <Mail className="w-2.5 h-2.5" />
                  <span>Forwarding: {SITE_CONFIG.NOTIFICATION_EMAIL}</span>
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                Secure merchant enquiry & onboarding database
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => leadStorage.exportLeadsCSV()}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Metric Cards (Requirement #19) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[11px] font-bold uppercase text-stone-400">Total Leads</div>
            <div className="text-2xl font-black text-white mt-1">{metrics.total}</div>
          </div>
          <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[11px] font-bold uppercase text-blue-400">New Leads</div>
            <div className="text-2xl font-black text-blue-400 mt-1">{metrics.newLeads}</div>
          </div>
          <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[11px] font-bold uppercase text-amber-400">Contacted</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{metrics.contacted}</div>
          </div>
          <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[11px] font-bold uppercase text-indigo-400">Qualified</div>
            <div className="text-2xl font-black text-indigo-400 mt-1">{metrics.qualified}</div>
          </div>
          <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[11px] font-bold uppercase text-purple-400">POS Requests</div>
            <div className="text-2xl font-black text-purple-400 mt-1">{metrics.posRequests}</div>
          </div>
          <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[11px] font-bold uppercase text-emerald-400">Completed</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{metrics.completed}</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#1A1A1A] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-md space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            
            {/* Search */}
            <div className="sm:col-span-4 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search name, phone, business, state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-[#141414] border border-white/15 text-xs text-white placeholder-stone-500 focus:border-[#D4AF37] outline-none"
              />
            </div>

            {/* Provider Filter */}
            <div className="sm:col-span-3">
              <select
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-white/15 text-xs text-white outline-none focus:border-[#D4AF37]"
              >
                <option value="All">All Providers</option>
                <option value="Moniepoint">Moniepoint</option>
                <option value="PalmPay">PalmPay</option>
                <option value="OPay">OPay</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="sm:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-white/15 text-xs text-white outline-none focus:border-[#D4AF37]"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="POS Requested">POS Requested</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Not Interested">Not Interested</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Refresh / Reset button */}
            <div className="sm:col-span-2 flex items-center justify-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setProviderFilter('All');
                  setStatusFilter('All');
                  loadLeads();
                }}
                className="w-full sm:w-auto px-3 py-2 rounded-xl border border-white/15 hover:bg-white/10 text-xs text-stone-300 flex items-center justify-center gap-1 cursor-pointer transition"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

          </div>
        </div>

        {/* Leads Table (Requirement #19) */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#141414] text-stone-400 text-xs font-bold uppercase tracking-wider border-b border-white/10">
                  <th className="py-3.5 px-4">Lead / Name</th>
                  <th className="py-3.5 px-4">Business & Type</th>
                  <th className="py-3.5 px-4">Phone / WhatsApp</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Provider</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition">
                      
                      {/* Name & ID */}
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div>{lead.fullName}</div>
                        <div className="text-[10px] text-stone-400 font-mono font-medium">{lead.id}</div>
                      </td>

                      {/* Business */}
                      <td className="py-3.5 px-4 text-stone-300">
                        <div className="font-medium text-white">{lead.businessName}</div>
                        <div className="text-[10px] text-stone-400 font-medium">{lead.businessType}</div>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4 font-mono text-stone-300">
                        <div>{lead.phone}</div>
                        <div className="text-[10px] text-emerald-400 font-semibold">WA: {lead.whatsapp}</div>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 text-stone-400">
                        {lead.location}
                      </td>

                      {/* Preferred Provider */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-[#242424] border border-white/10 font-semibold text-[#D4AF37]">
                          {lead.preferredProvider}
                        </span>
                      </td>

                      {/* Status dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className={`px-2 py-1 rounded-lg border text-[11px] font-bold outline-none cursor-pointer ${getStatusBadge(
                            lead.status
                          )}`}
                        >
                          <option value="New" className="bg-[#1A1A1A] text-white">New</option>
                          <option value="Contacted" className="bg-[#1A1A1A] text-white">Contacted</option>
                          <option value="Qualified" className="bg-[#1A1A1A] text-white">Qualified</option>
                          <option value="POS Requested" className="bg-[#1A1A1A] text-white">POS Requested</option>
                          <option value="Processing" className="bg-[#1A1A1A] text-white">Processing</option>
                          <option value="Completed" className="bg-[#1A1A1A] text-white">Completed</option>
                          <option value="Not Interested" className="bg-[#1A1A1A] text-white">Not Interested</option>
                          <option value="Closed" className="bg-[#1A1A1A] text-white">Closed</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-stone-400 whitespace-nowrap">
                        {lead.date}
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg bg-[#242424] hover:bg-[#2C2C2C] text-stone-300 border border-white/10 transition cursor-pointer"
                            title="View Lead Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Hello ${lead.fullName}, this is ${SITE_CONFIG.brandName} POS merchant support regarding your ${lead.preferredProvider} POS request for ${lead.businessName}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 transition cursor-pointer"
                            title="Message on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded-lg bg-blue-950/40 hover:bg-blue-900/50 text-blue-400 border border-blue-500/30 transition cursor-pointer"
                            title="Call Merchant"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-950/40 text-stone-500 hover:text-rose-400 transition cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-stone-500">
                      No leads match the specified criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* View Lead Details & Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#1A1A1A] rounded-3xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden text-white animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#141414] text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                  {selectedLead.preferredProvider.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedLead.businessName}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Lead ID: <span className="font-mono text-[#D4AF37]">{selectedLead.id}</span> • Registered {selectedLead.date}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
              
              {/* Status Selector in Modal */}
              <div className="flex items-center justify-between bg-[#141414] p-3.5 rounded-xl border border-white/10">
                <span className="font-bold text-stone-300">Lead Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                  className={`px-3 py-1.5 rounded-lg border font-bold text-xs outline-none cursor-pointer ${getStatusBadge(
                    selectedLead.status
                  )}`}
                >
                  <option value="New" className="bg-[#1A1A1A] text-white">New</option>
                  <option value="Contacted" className="bg-[#1A1A1A] text-white">Contacted</option>
                  <option value="Qualified" className="bg-[#1A1A1A] text-white">Qualified</option>
                  <option value="POS Requested" className="bg-[#1A1A1A] text-white">POS Requested</option>
                  <option value="Processing" className="bg-[#1A1A1A] text-white">Processing</option>
                  <option value="Completed" className="bg-[#1A1A1A] text-white">Completed</option>
                  <option value="Not Interested" className="bg-[#1A1A1A] text-white">Not Interested</option>
                  <option value="Closed" className="bg-[#1A1A1A] text-white">Closed</option>
                </select>
              </div>

              {/* Grid of details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#141414] p-4 rounded-xl border border-white/10">
                <div>
                  <span className="block text-stone-400 font-semibold uppercase text-[10px]">Merchant Name</span>
                  <span className="text-white font-bold text-sm">{selectedLead.fullName}</span>
                </div>
                <div>
                  <span className="block text-stone-400 font-semibold uppercase text-[10px]">Phone</span>
                  <span className="text-white font-bold font-mono">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="block text-stone-400 font-semibold uppercase text-[10px]">WhatsApp</span>
                  <span className="text-emerald-400 font-bold font-mono">{selectedLead.whatsapp}</span>
                </div>
                {selectedLead.email && (
                  <div>
                    <span className="block text-stone-400 font-semibold uppercase text-[10px]">Applicant Email</span>
                    <span className="text-white font-mono text-xs">{selectedLead.email}</span>
                  </div>
                )}
                <div>
                  <span className="block text-stone-400 font-semibold uppercase text-[10px]">Business Type</span>
                  <span className="text-stone-300 font-medium">{selectedLead.businessType}</span>
                </div>
                <div>
                  <span className="block text-stone-400 font-semibold uppercase text-[10px]">Location</span>
                  <span className="text-stone-300 font-medium">{selectedLead.location}</span>
                </div>
                <div>
                  <span className="block text-stone-400 font-semibold uppercase text-[10px]">Has Existing POS?</span>
                  <span className="text-stone-300 font-medium">{selectedLead.existingPOS}</span>
                </div>
              </div>

              {/* Requirement & Message */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#141414] border border-white/10">
                  <span className="block font-bold text-[#D4AF37] text-[11px] mb-1">What POS is needed for:</span>
                  <p className="text-stone-300 leading-relaxed">{selectedLead.requirement || 'Not specified'}</p>
                </div>

                {selectedLead.additionalMessage && (
                  <div className="p-3.5 rounded-xl bg-[#141414] border border-white/10">
                    <span className="block font-bold text-[#D4AF37] text-[11px] mb-1">Additional Customer Message:</span>
                    <p className="text-stone-300 leading-relaxed italic">"{selectedLead.additionalMessage}"</p>
                  </div>
                )}
              </div>

              {/* Internal Notes History (Requirement #19) */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>Agent Follow-up Notes</span>
                  <span className="text-stone-400 font-normal">({selectedLead.notes.length})</span>
                </h4>

                {/* Add note input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an internal follow-up note (e.g. called merchant, KYC pending)..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddNote(selectedLead.id);
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#141414] border border-white/15 text-xs text-white placeholder-stone-500 focus:border-[#D4AF37] outline-none"
                  />
                  <button
                    onClick={() => handleAddNote(selectedLead.id)}
                    className="px-4 py-2 rounded-xl bg-[#242424] hover:bg-[#2C2C2C] text-[#D4AF37] border border-[#D4AF37]/30 font-bold text-xs transition cursor-pointer"
                  >
                    Add Note
                  </button>
                </div>

                {/* Notes list */}
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedLead.notes.length > 0 ? (
                    selectedLead.notes.map((note) => (
                      <div key={note.id} className="p-3 rounded-xl bg-[#141414] border border-white/10 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-stone-400 font-medium">
                          <span className="text-stone-300">{note.author}</span>
                          <span>{note.date}</span>
                        </div>
                        <p className="text-stone-200">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-stone-500 italic py-2 text-center">
                      No follow-up notes recorded yet.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="bg-[#141414] px-6 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://wa.me/${selectedLead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedLead.fullName}, this is ${SITE_CONFIG.brandName} POS merchant services regarding your ${selectedLead.preferredProvider} POS application for ${selectedLead.businessName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat On WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={async () => {
                    showToast('Sending to eduseydzhtech@gmail.com...');
                    const res = await emailService.sendPOSRequestEmail(selectedLead);
                    if (res.success) {
                      showToast('Delivered to eduseydzhtech@gmail.com!');
                    } else {
                      showToast('Delivery note logged (Mailto ready)');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  title="Forward complete details to eduseydzhtech@gmail.com"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Forward to eduseydzhtech@gmail.com</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-[#242424] hover:bg-[#2C2C2C] text-stone-300 border border-white/10 font-semibold text-xs transition cursor-pointer"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
