"use client";
import React, { createContext, useContext, useState } from 'react';
import { X, CheckCircle2, ArrowRight, Lock, Calendar, BookOpen } from 'lucide-react';
import { Button } from './Button';

type ModalState =
  | { type: 'none' }
  | { type: 'auth'; initialMode: 'login' | 'signup' }
  | { type: 'workshop'; workshopTitle: string; workshopDate: string; instructor: string }
  | { type: 'enroll'; courseTitle: string; price: number };

interface ActionModalContextType {
  openAuthModal: (mode?: 'login' | 'signup') => void;
  openWorkshopModal: (workshopTitle: string, workshopDate: string, instructor: string) => void;
  openEnrollModal: (courseTitle: string, price: number) => void;
  closeModal: () => void;
}

const ActionModalContext = createContext<ActionModalContextType | undefined>(undefined);

export function useActionModal() {
  const ctx = useContext(ActionModalContext);
  if (!ctx) {
    throw new Error('useActionModal must be used within ActionModalProvider');
  }
  return ctx;
}

export function ActionModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: 'none' });
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setEmail('');
    setFullName('');
    setPassword('');
    setSubmitted(false);
    setError('');
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    resetForm();
    setAuthMode(mode);
    setModal({ type: 'auth', initialMode: mode });
  };

  const openWorkshopModal = (workshopTitle: string, workshopDate: string, instructor: string) => {
    resetForm();
    setModal({ type: 'workshop', workshopTitle, workshopDate, instructor });
  };

  const openEnrollModal = (courseTitle: string, price: number) => {
    resetForm();
    setModal({ type: 'enroll', courseTitle, price });
  };

  const closeModal = () => {
    setModal({ type: 'none' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid work or personal email address.');
      return;
    }
    if ((modal.type === 'workshop' || modal.type === 'enroll' || authMode === 'signup') && !fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <ActionModalContext.Provider
      value={{ openAuthModal, openWorkshopModal, openEnrollModal, closeModal }}
    >
      {children}

      {modal.type !== 'none' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl">
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="py-4 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {modal.type === 'auth'
                    ? authMode === 'login'
                      ? 'Welcome back to Appic Skill'
                      : 'Your learner account is ready'
                    : modal.type === 'workshop'
                    ? 'Workshop seat reserved'
                    : 'Enrollment request confirmed'}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {modal.type === 'auth'
                    ? `We have authenticated ${email}. You can now access course previews, saved syllabi, and workshop reminders.`
                    : modal.type === 'workshop'
                    ? `Your calendar invitation and live lab link for "${modal.workshopTitle}" have been sent to ${email}.`
                    : `We have sent the syllabus onboarding guide and payment link for "${modal.courseTitle}" to ${email}.`}
                </p>
                <div className="mt-6">
                  <Button variant="primary" className="w-full" onClick={closeModal}>
                    Continue Exploring
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {modal.type === 'auth' && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Appic Skill Learner Portal</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {authMode === 'login' ? 'Sign in to your account' : 'Create your learner account'}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600">
                      {authMode === 'login'
                        ? 'Access your self-paced modules, project reviews, and workshop links.'
                        : 'Start learning with industry mentors and hands-on engineering & design labs.'}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('login');
                          setError('');
                        }}
                        className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          authMode === 'login'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('signup');
                          setError('');
                        }}
                        className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          authMode === 'signup'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Get Started
                      </button>
                    </div>
                  </>
                )}

                {modal.type === 'workshop' && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Live Interactive Workshop · {modal.workshopDate}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Reserve Your Live Seat</h3>
                    <p className="mt-1.5 text-sm text-slate-600">
                      {modal.workshopTitle} with <span className="font-medium text-slate-900">{modal.instructor}</span>
                    </p>
                  </>
                )}

                {modal.type === 'enroll' && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Self-Paced Programme Enrollment</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{modal.courseTitle}</h3>
                    <p className="mt-1.5 text-sm text-slate-600">
                      Full lifetime access, mentor code/design reviews, and verified certificate ·{' '}
                      <span className="font-semibold text-slate-900 tabular-nums">₹{modal.price}</span>
                    </p>
                  </>
                )}

                <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                  {(modal.type !== 'auth' || authMode === 'signup') && (
                    <div>
                      <label htmlFor="modal-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  {modal.type === 'auth' && (
                    <div>
                      <label htmlFor="modal-password" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Password
                      </label>
                      <input
                        id="modal-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  )}

                  {error && (
                    <p className="text-xs font-medium text-red-600" role="alert">
                      {error}
                    </p>
                  )}

                  <Button type="submit" variant="primary" className="w-full">
                    <span>
                      {modal.type === 'auth'
                        ? authMode === 'login'
                          ? 'Sign In to Portal'
                          : 'Create Free Account'
                        : modal.type === 'workshop'
                        ? 'Confirm Free Workshop Seat'
                        : `Proceed to Enrollment (₹${modal.price})`}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </ActionModalContext.Provider>
  );
}
