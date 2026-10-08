"use client";
import React, { useState } from 'react';
import {
  Mail,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Trash2,
  ExternalLink,
  ChevronRight,
  User,
  Sparkles,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useSiteData, Inquiry } from '../../../context/SiteDataContext';

export default function AdminInquiriesPage() {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useSiteData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const statuses: ('All' | Inquiry['status'])[] = ['All', 'New', 'Contacted', 'In Progress', 'Resolved'];

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.phone && inq.phone.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const countNew = inquiries.filter((i) => i.status === 'New').length;
  const countContacted = inquiries.filter((i) => i.status === 'Contacted').length;
  const countInProgress = inquiries.filter((i) => i.status === 'In Progress').length;
  const countResolved = inquiries.filter((i) => i.status === 'Resolved').length;

  const handleStatusChange = (id: string, status: Inquiry['status']) => {
    updateInquiryStatus(id, status);
    if (activeInquiry && activeInquiry.id === id) {
      setActiveInquiry({ ...activeInquiry, status });
    }
  };

  const getStatusBadge = (status: Inquiry['status']) => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            New Lead
          </span>
        );
      case 'Contacted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
            Contacted
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            In Progress
          </span>
        );
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            Resolved
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-md text-3xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
            CRM & Admissions
          </span>
          <span className="text-slate-400 text-xs">• Real-time Sync</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Learner Inquiries & Leads
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Review, triage, and respond to incoming inquiries from the public Contact page and course consultations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">New Leads</span>
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          </div>
          <p className="text-2xl font-black text-blue-600">{countNew}</p>
          <p className="text-3xs text-slate-400 mt-1">Awaiting first response</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Contacted</span>
            <Phone className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-purple-600">{countContacted}</p>
          <p className="text-3xs text-slate-400 mt-1">Outreached via mail/call</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">In Progress</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-600">{countInProgress}</p>
          <p className="text-3xs text-slate-400 mt-1">Active evaluation</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-600">{countResolved}</p>
          <p className="text-3xs text-slate-400 mt-1">Enrolled or closed</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, email, topic, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-transparent'
              }`}
            >
              {st} {st !== 'All' && `(${inquiries.filter((i) => i.status === st).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table / Feed */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        {filteredInquiries.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No Inquiries Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'All'
                ? 'Try adjusting your search criteria or status filter.'
                : 'No inquiries have been received yet. Test by submitting the contact form on /contact.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-3xs">
                <tr>
                  <th className="px-5 py-3.5">Learner</th>
                  <th className="px-5 py-3.5">Topic & Background</th>
                  <th className="px-5 py-3.5">Message Snippet</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Received</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                    onClick={() => setActiveInquiry(inq)}
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                        <span>{inq.fullName}</span>
                      </div>
                      <div className="text-slate-500 text-3xs mt-0.5">{inq.email}</div>
                      {inq.phone && (
                        <div className="text-slate-400 text-3xs flex items-center gap-1 mt-0.5">
                          <Phone className="w-2.5 h-2.5" />
                          <span>{inq.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-800 block">{inq.topic}</span>
                      <span className="text-3xs text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 inline-block mt-1">
                        {inq.experienceLevel}
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <p className="line-clamp-2 text-slate-600 text-2xs leading-relaxed">
                        {inq.message}
                      </p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {getStatusBadge(inq.status)}
                    </td>
                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap text-3xs">
                      {inq.createdAt}
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActiveInquiry(inq)}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-3xs font-semibold transition-colors"
                        >
                          View & Reply
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(inq.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detailed Lead Drawer / Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xs font-mono text-slate-400">ID: {activeInquiry.id}</span>
                  {getStatusBadge(activeInquiry.status)}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{activeInquiry.fullName}</h2>
              </div>
              <button
                onClick={() => setActiveInquiry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-3xs font-bold text-slate-500 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${activeInquiry.email}`}
                    className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1.5 mt-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {activeInquiry.email}
                  </a>
                </div>

                <div>
                  <span className="text-3xs font-bold text-slate-500 uppercase tracking-wider block">
                    Phone / WhatsApp
                  </span>
                  {activeInquiry.phone ? (
                    <a
                      href={`tel:${activeInquiry.phone}`}
                      className="text-sm font-semibold text-slate-800 hover:text-blue-600 flex items-center gap-1.5 mt-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {activeInquiry.phone}
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 mt-1 block">Not provided</span>
                  )}
                </div>

                <div>
                  <span className="text-3xs font-bold text-slate-500 uppercase tracking-wider block">
                    Consultation Topic
                  </span>
                  <span className="text-sm font-semibold text-slate-800 mt-1 block">
                    {activeInquiry.topic}
                  </span>
                </div>

                <div>
                  <span className="text-3xs font-bold text-slate-500 uppercase tracking-wider block">
                    Experience Level
                  </span>
                  <span className="text-sm font-semibold text-slate-800 mt-1 block">
                    {activeInquiry.experienceLevel}
                  </span>
                </div>
              </div>

              {/* Inquiry Message */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Message Content
                </label>
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                  {activeInquiry.message}
                </div>
                <div className="text-3xs text-slate-400 mt-1.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Received on {activeInquiry.createdAt}
                </div>
              </div>

              {/* Status Update Actions */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Change Status
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['New', 'Contacted', 'In Progress', 'Resolved'] as Inquiry['status'][]).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(activeInquiry.id, st)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          activeInquiry.status === st
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  deleteInquiry(activeInquiry.id);
                  setActiveInquiry(null);
                }}
                className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Lead
              </button>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${activeInquiry.email}?subject=Appic%20Skill%20Admissions%20-%20Regarding%20${encodeURIComponent(
                    activeInquiry.topic
                  )}`}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Send Email Reply
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Inquiry Lead?</h3>
            <p className="text-xs text-slate-600 mb-6">
              This action cannot be undone. Are you sure you want to remove this learner lead record?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteInquiry(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
