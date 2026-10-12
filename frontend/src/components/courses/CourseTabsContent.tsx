"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  Award,
  Star,
  Sparkles,
  Laptop,
  MessageCircle,
  ShieldCheck,
  Send,
  Plus,
  HelpCircle,
  Settings
} from 'lucide-react';
import { Course, CourseReview } from '../../types/course';
import { useActionModal } from '../common/ActionModalContext';
import { useSiteData } from '../../context/SiteDataContext';
import { getCleanWhatsApp } from '../../lib/utils';

interface TrainingOfferedTabProps {
  course: Course;
}

export function TrainingOfferedTab({ course }: TrainingOfferedTabProps) {
  const { openEnrollModal } = useActionModal();
  const { settings } = useSiteData();

  const trainingData = course.trainingOffered;
  const overview = trainingData?.overview?.trim();
  const highlights = (trainingData?.highlights || []).filter((h) => h && h.trim().length > 0);
  const features = (trainingData?.features || []).filter((f) => f && f.title && f.title.trim().length > 0);
  const batches = (trainingData?.batches || []).filter((b) => b && b.batchType && b.batchType.trim().length > 0);
  const deliverables = (trainingData?.deliverables || []).filter((d) => d && d.trim().length > 0);

  const hasTrainingData = Boolean(
    overview ||
    highlights.length > 0 ||
    features.length > 0 ||
    batches.length > 0 ||
    deliverables.length > 0
  );

  // If Admin has NOT uploaded or configured training data yet for this course
  if (!hasTrainingData) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-8 sm:p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center mx-auto">
            <Laptop className="w-7 h-7" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Training Details Being Finalized
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Official training modes, live interactive schedules, and batch allocations for{' '}
              <span className="font-semibold text-slate-800">{course.title}</span> will be uploaded shortly by the academy administration.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${getCleanWhatsApp(settings?.whatsappNumber)}?text=Hi%20Appic%20Skill,%20I%20want%20to%20know%20the%20training%20details%20and%20batch%20timings%20for%20${encodeURIComponent(course.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => openEnrollModal(course.title, course.price)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Request Batch Availability
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200/60 max-w-sm mx-auto">
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-blue-600 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin: Configure Training Offered from Courses Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // When Admin HAS uploaded and configured training data
  return (
    <div className="space-y-10">
      {/* Program Overview Banner (only if admin provided) */}
      {overview && (
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-xs">
              Training Program Structure
            </span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-full">
              {course.duration} · {course.totalHours} Hours
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Training Model for {course.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {overview}
          </p>
        </div>
      )}

      {/* Key Training Highlights Grid (only if admin added) */}
      {highlights.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>Core Training Highlights</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-xs transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Training Formats & Features (only if admin added) */}
      {features.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Laptop className="w-5 h-5 text-indigo-600" />
            <span>How the Training is Delivered</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feat) => (
              <div
                key={feat.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-indigo-200 hover:shadow-md transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  {feat.badge && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                        {feat.badge}
                      </span>
                    </div>
                  )}
                  <h5 className="text-base font-bold text-slate-900">{feat.title}</h5>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Batch Schedules (only if admin added) */}
      {batches.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Upcoming Training Batches & Timings</span>
            </h4>
            <span className="text-xs font-semibold text-slate-500">Scheduled Batches</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="p-5 rounded-2xl border border-blue-200/80 bg-gradient-to-b from-blue-50/40 to-white shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{batch.batchType}</span>
                  {batch.seatsStatus && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {batch.seatsStatus}
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  {batch.days && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-slate-800">{batch.days}</span>
                    </div>
                  )}
                  {batch.timing && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{batch.timing}</span>
                    </div>
                  )}
                  {batch.mode && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Format: {batch.mode}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => openEnrollModal(course.title, course.price)}
                  className="w-full mt-2 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Reserve Seat in this Batch
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Training Deliverables & Outcomes (only if admin added) */}
      {deliverables.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 space-y-4">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>What You Will Receive Upon Completion</span>
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700">
            {deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Call to Action Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <h4 className="text-lg font-bold">Have Questions About This Training?</h4>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Connect directly with an academic counsellor for syllabus walkthrough and batch assistance.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${getCleanWhatsApp(settings?.whatsappNumber)}?text=Hi%20Appic%20Skill,%20I%20have%20questions%20about%20the%20${encodeURIComponent(course.title)}%20training%20program.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => openEnrollModal(course.title, course.price)}
            className="px-4 py-2.5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 text-xs font-bold transition-colors cursor-pointer"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}

interface ReviewsRatingTabProps {
  course: Course;
  onAddReview?: (newReview: CourseReview) => void;
}

export function ReviewsRatingTab({ course, onAddReview }: ReviewsRatingTabProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newOutcome, setNewOutcome] = useState('');

  // Only real reviews belonging to this course
  const reviewsList: CourseReview[] = course.reviews || [];

  const averageRating =
    reviewsList.length > 0
      ? (reviewsList.reduce((acc, r) => acc + (r.rating || 5), 0) / reviewsList.length).toFixed(1)
      : (course.rating || 5.0).toFixed(1);

  const totalReviewsCount = reviewsList.length > 0 ? reviewsList.length : (course.reviewsCount || 0);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newComment.trim()) return;

    const initials = newStudentName
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const createdReview: CourseReview = {
      id: `rev-${Date.now()}`,
      studentName: newStudentName.trim(),
      studentInitials: initials || 'ST',
      role: newRole.trim() || 'Verified Student',
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      outcomeMetric: newOutcome.trim() || 'Verified Learner',
    };

    if (onAddReview) {
      onAddReview(createdReview);
    }

    setNewStudentName('');
    setNewRole('');
    setNewComment('');
    setNewOutcome('');
    setShowReviewModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Ratings Overview Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="text-center sm:text-left">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {averageRating}
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(Number(averageRating))
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200 fill-slate-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {reviewsList.length > 0
                  ? `Based on ${reviewsList.length} student reviews`
                  : 'No reviews submitted yet'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Student Review</span>
            </button>
            <span className="text-[11px] text-slate-400">Verified student reviews only</span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-slate-900">
            Student Reviews ({reviewsList.length})
          </h4>
        </div>

        {reviewsList.length === 0 ? (
          <div className="p-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto border border-amber-200">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <p className="text-sm font-bold text-slate-800">No reviews published yet for this course</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Be the first to submit a review for this program or manage reviews from the admin panel.
            </p>
            <button
              type="button"
              onClick={() => setShowReviewModal(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Write First Review
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm border border-blue-200">
                      {rev.studentInitials || rev.studentName.charAt(0)}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">{rev.studentName}</h5>
                      <p className="text-xs text-slate-500 font-medium">{rev.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < (rev.rating || 5)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200 fill-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                  "{rev.comment}"
                </p>

                {rev.outcomeMetric && (
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {rev.outcomeMetric}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Write a Student Review</h3>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role / Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Career Outcome / Placed At</label>
                  <input
                    type="text"
                    placeholder="e.g. Placed at Wipro"
                    value={newOutcome}
                    onChange={(e) => setNewOutcome(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        s <= newRating
                          ? 'bg-amber-50 border-amber-300 text-amber-500'
                          : 'bg-slate-50 border-slate-200 text-slate-300'
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                  <span className="font-bold text-slate-700 ml-2">{newRating} Stars</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Review & Feedback *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share how the training, live mentoring, and curriculum helped you..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
