"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Calendar,
  Copy,
  Check,
  ChevronDown,
  User,
  Briefcase,
  GraduationCap,
  Headphones,
  Send,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { PageSEO } from '../../components/common/PageSEO';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/common/Button';
import { useSiteData } from '../../context/SiteDataContext';

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const TOPICS = [
  { id: 'advisory', label: 'Programme Advisory & Syllabus', icon: GraduationCap },
  { id: 'career', label: '1-on-1 Career Consultation', icon: Briefcase },
  { id: 'enterprise', label: 'Enterprise & Team Training', icon: Sparkles },
  { id: 'billing', label: 'Fees, Billing & Scholarships', icon: Headphones },
  { id: 'other', label: 'General Inquiries', icon: MessageSquare },
];

const EXPERIENCE_LEVELS = [
  'Beginner / Student',
  'Junior Developer (1-2 yrs)',
  'Mid-Level / Senior (3+ yrs)',
  'Non-Tech Career Switcher',
  'Engineering Manager / Lead',
];

const FAQS = [
  {
    question: 'How quickly will an advisor respond to my inquiry?',
    answer:
      'Our academic advisory desk operates Monday through Friday, 8:00 AM to 7:00 PM EST. Most inquiries submitted during business hours receive a personalized response within 2 hours. Messages received over the weekend are answered by Monday morning.',
  },
  {
    question: 'Can I speak directly with a course mentor or instructor?',
    answer:
      'Yes! If you have in-depth technical questions about syllabus prerequisites or production project stacks, our team can arrange a complimentary 15-minute diagnostic call with one of our lead instructors.',
  },
  {
    question: 'Do you offer team packages or corporate cohort training?',
    answer:
      'Absolutely. We work with engineering, product, and data teams of all sizes to create custom cohort curricula, private workshops, and skill-gap training programs with dedicated mentor reviews.',
  },
  {
    question: 'What if I am not sure which programme fits my current background?',
    answer:
      'That is exactly what our advisory team is here for. Simply share your background and target career objectives in the contact form, and we will send you a tailored roadmap matching your experience level.',
  },
  {
    question: 'Are there flexible payment options or scholarship support?',
    answer:
      'Yes, we provide interest-free installment options, merit-based tuition support, and employer tuition reimbursement documentation for eligible candidates.',
  },
];

export default function ContactPage() {
  const { addInquiry, settings } = useSiteData();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0].label);
  const [experienceLevel, setExperienceLevel] = useState(EXPERIENCE_LEVELS[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [inquiryId, setInquiryId] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid work or personal email address.';
    }

    if (phone.trim() && phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid phone number (or leave blank).';
    }

    if (!message.trim() || message.trim().length < 15) {
      newErrors.message = 'Please enter at least 15 characters so we can understand your goals.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const generatedId = addInquiry({
        fullName,
        email,
        phone,
        topic: selectedTopic,
        experienceLevel,
        message,
      });
      setInquiryId(generatedId);
      setSubmitted(true);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageSEO
        title="Contact Us – Academic Advisory & Support | Appic Skill"
        description="Connect directly with Appic Skill academic mentors for curriculum recommendations, syllabus reviews, 1-on-1 consultations, and enterprise team training."
      />

      {/* Classic Elevated Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-12 pb-16 lg:pt-16 lg:pb-20">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-b from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-2xs backdrop-blur-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Advisory Desk Active · Typical Response &lt; 2 Hours</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Let’s Talk About Your <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Learning & Career Goals
              </span>
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Have questions regarding course curricula, prerequisites, live mentor sessions, or custom team workshops? Our academic advisors are here to help you make informed decisions.
            </p>

            {/* Micro Highlights Pill Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Zero Sales Pressure</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Same-Day Response</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-purple-600" />
                <span>Mentor-Led Guidance</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content: Form + Advisory Channels */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            
            {/* Left 7 Columns: Interactive Classic Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-lg shadow-slate-200/40 relative overflow-hidden">
                {/* Decorative top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

                {submitted ? (
                  /* Success Confirmation Screen */
                  <div className="py-10 text-center space-y-6">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-sm animate-in zoom-in-95 duration-200">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        Inquiry Reference #{inquiryId}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                        Thank You, {fullName}!
                      </h2>
                      <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
                        We have successfully received your inquiry regarding <span className="font-semibold text-slate-900">{selectedTopic}</span>.
                      </p>
                    </div>

                    {/* Summary box */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 max-w-md mx-auto text-left text-xs sm:text-sm space-y-2.5 text-slate-700">
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500">Target Track:</span>
                        <span className="font-semibold text-slate-900">{selectedTopic}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500">Contact Email:</span>
                        <span className="font-semibold text-slate-900">{email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Expected Reply:</span>
                        <span className="font-semibold text-emerald-700">Within 24 Hours (Business Day)</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Button
                        variant="primary"
                        href="/courses"
                        size="md"
                        className="w-full sm:w-auto"
                      >
                        <span>Explore Programmes</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => {
                          setSubmitted(false);
                          setFullName('');
                          setEmail('');
                          setPhone('');
                          setMessage('');
                          setErrors({});
                        }}
                        className="w-full sm:w-auto"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Active Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Send className="h-4 w-4 text-blue-600" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                          Send a Direct Message
                        </h2>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Fill out the details below and an academic advisor will get back to you promptly.
                      </p>
                    </div>

                    {/* Topic Chips */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2.5">
                        Select Topic of Inquiry *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {TOPICS.map((topic) => {
                          const isSelected = selectedTopic === topic.label;
                          const Icon = topic.icon;
                          return (
                            <button
                              key={topic.id}
                              type="button"
                              onClick={() => setSelectedTopic(topic.label)}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 ring-2 ring-blue-600 ring-offset-1'
                                  : 'bg-slate-50 text-slate-700 border border-slate-200/90 hover:bg-slate-100 hover:text-slate-900'
                              }`}
                            >
                              <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                              <span>{topic.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name & Email Fields */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-fullname"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                            <User className="h-4 w-4" />
                          </div>
                          <input
                            id="contact-fullname"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            aria-invalid={!!errors.fullName}
                            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                              errors.fullName
                                ? 'border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20'
                                : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                            }`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                            <Mail className="h-4 w-4" />
                          </div>
                          <input
                            id="contact-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="rahul@example.com"
                            aria-invalid={!!errors.email}
                            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                              errors.email
                                ? 'border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20'
                                : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Experience Level */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Phone / WhatsApp (Optional)
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                            <Phone className="h-4 w-4" />
                          </div>
                          <input
                            id="contact-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            aria-invalid={!!errors.phone}
                            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                              errors.phone
                                ? 'border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20'
                                : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-experience"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Current Experience Level
                        </label>
                        <div className="relative">
                          <select
                            id="contact-experience"
                            value={experienceLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}
                            className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 focus:outline-none cursor-pointer transition-all"
                          >
                            {EXPERIENCE_LEVELS.map((level) => (
                              <option key={level} value={level}>
                                {level}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-semibold text-slate-700"
                        >
                          How Can We Help You? *
                        </label>
                        <span className="text-2xs text-slate-400">
                          {message.length} characters (min 15)
                        </span>
                      </div>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about the courses you're interested in, your target roles, or specific questions about the curriculum..."
                        aria-invalid={!!errors.message}
                        className={`w-full rounded-xl border p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                          errors.message
                            ? 'border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20'
                            : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto shadow-md shadow-blue-600/20"
                      >
                        <span>Submit Inquiry</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>

                      <p className="text-xs text-slate-500">
                        🔒 Information kept strictly confidential. No spam, ever.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-6">

              {/* Card 1: Direct Support Channels */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900">
                    Direct Advisory Channels
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Open Now
                  </span>
                </div>

                <div className="mt-5 space-y-4 text-sm">
                  {/* Email row with quick copy */}
                  <div className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 transition-colors hover:bg-blue-50/40 hover:border-blue-200/60">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-700">
                          <Mail className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500">Academic & Admissions Email</p>
                          <a
                            href="mailto:support@appicskill.edu"
                            className="font-semibold text-slate-900 hover:text-blue-600 transition-colors block"
                          >
                            support@appicskill.edu
                          </a>
                          <p className="text-xs text-slate-500">admissions@appicskill.edu</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('support@appicskill.edu')}
                        title="Copy email address"
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                      >
                        {copiedEmail ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Phone Row */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 transition-colors hover:bg-blue-50/40 hover:border-blue-200/60">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100/70 text-indigo-700">
                        <Phone className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500">Advisory Helpline</p>
                        <a
                          href="tel:+14158904320"
                          className="font-semibold text-slate-900 hover:text-blue-600 transition-colors block tabular-nums"
                        >
                          +1 (415) 890-4320
                        </a>
                        <p className="text-xs text-slate-500">Mon–Fri · 8:00 AM – 7:00 PM EST</p>
                      </div>
                    </div>
                  </div>

                  {/* Studio / Office Row */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 transition-colors hover:bg-blue-50/40 hover:border-blue-200/60">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100/70 text-purple-700">
                        <MapPin className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500">Main Studio & HQ</p>
                        <p className="font-semibold text-slate-900">
                          548 Market Street, Suite 420
                        </p>
                        <p className="text-xs text-slate-500">
                          San Francisco, CA 94104 (Remote-First Global Faculty)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hours Row */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100/70 text-emerald-700">
                        <Clock className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500">Advisory Schedule</p>
                        <p className="font-semibold text-slate-900">
                          Mon – Fri: 8:00 AM – 7:00 PM EST
                        </p>
                        <p className="text-xs text-slate-500">
                          Sat: 9:00 AM – 2:00 PM EST (Live Clinics Desk)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: 1-on-1 Discovery Call Card (Classic Dark Luxury Accent) */}
              <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-7 border border-slate-800 shadow-xl relative overflow-hidden space-y-4">
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800/60">
                    <Calendar className="h-3.5 w-3.5" />
                    15-Min Live Session
                  </span>
                  <Sparkles className="h-4 w-4 text-amber-400" />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white leading-snug">
                    Prefer a Live 1-on-1 Consultation?
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Schedule a complimentary diagnostic video call with a senior mentor. We’ll review your portfolio goals, curriculum tracks, and industry pathways.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="mailto:support@appicskill.edu?subject=Request%201-on-1%20Mentor%20Advisory%20Call"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-sm"
                  >
                    <span>Request Discovery Call</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-2xs text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>100% Free · No sales pitch · Practitioner-led feedback</span>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </section>

      {/* Classic FAQ Section */}
      <section className="py-14 lg:py-20 bg-white border-t border-slate-200/80">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
                <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Common Questions Before Getting in Touch
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Quick answers to common questions about admissions, advisory calls, and enterprise cohorts.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 transition-all duration-150 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-sm sm:text-base gap-4"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Support Callout */}
            <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 text-center space-y-2">
              <p className="text-sm font-bold text-slate-900">
                Have a different question not listed here?
              </p>
              <p className="text-xs text-slate-600">
                Drop us a line directly at{' '}
                <a
                  href="mailto:support@appicskill.edu"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  support@appicskill.edu
                </a>{' '}
                or reach out through the form above.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
