import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  Upload,
  MessageSquare,
  ThumbsUp,
  Camera,
  ArrowLeft
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const {
    tailors,
    reviews,
    addReview,
    currentUser,
    setCurrentPage,
    showToast
  } = useApp();

  const [selectedTailorId, setSelectedTailorId] = useState(tailors[0].id);
  const [garment, setGarment] = useState('Silk Saree Blouse');
  const [comment, setComment] = useState('Stitching was extraordinarily neat! The boat neckline and cup padding were executed flawlessly without any tightness.');
  const [overallRating, setOverallRating] = useState(5);

  const [aspectRatings, setAspectRatings] = useState({
    quality: 5,
    fitting: 5,
    delivery: 5,
    communication: 5,
    value: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Please add a comment about your experience', 'warning');
      return;
    }

    addReview({
      tailorId: selectedTailorId,
      customerName: currentUser.name,
      customerLocation: 'Pudukkottai',
      rating: overallRating,
      comment,
      garment,
      date: 'Today'
    });

    setComment('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-[#9E2A2B] uppercase tracking-wider">
            Verified Community Feedback
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E2229] mt-1">
            Tailor Reviews & Fitting Feedback
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Read transparent reviews from real customers or share your own tailoring experience.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('customer-dashboard')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Write Review Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Write a Tailoring Review
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Select Tailor Studio
              </label>
              <select
                value={selectedTailorId}
                onChange={e => setSelectedTailorId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 font-bold text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
              >
                {tailors.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.city})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Garment Type
              </label>
              <input
                type="text"
                value={garment}
                onChange={e => setGarment(e.target.value)}
                placeholder="e.g. Silk Saree Blouse, Bridal Lehenga"
                className="w-full p-2.5 rounded-xl border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            {/* Overall Star Picker */}
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Overall Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setOverallRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= overallRating ? 'fill-amber-400' : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-stone-800 ml-2">
                  {overallRating}.0 / 5.0
                </span>
              </div>
            </div>

            {/* Detailed Aspect Ratings matching prompt */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-700 uppercase text-[9px] block">
                Aspect Ratings
              </span>
              {[
                { key: 'quality', label: 'Stitching Quality' },
                { key: 'fitting', label: 'Fitting Accuracy' },
                { key: 'delivery', label: 'Delivery Time' },
                { key: 'communication', label: 'Communication' },
                { key: 'value', label: 'Value for Money' }
              ].map(asp => (
                <div key={asp.key} className="flex items-center justify-between">
                  <span className="text-stone-600 text-[11px]">{asp.label}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() =>
                          setAspectRatings({ ...aspectRatings, [asp.key]: s })
                        }
                        className={`w-5 h-5 rounded text-[10px] font-bold ${
                          (aspectRatings as any)[asp.key] >= s
                            ? 'bg-amber-400 text-stone-950'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Your Review
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-800 focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white font-bold text-xs shadow-xs transition-all"
            >
              Submit Verified Review
            </button>
          </form>
        </div>

        {/* Right 7 Cols: Reviews Listing */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Recent Verified Experiences ({reviews.length})
            </h3>
            <span className="text-xs text-stone-400">100% Genuine Stitches</span>
          </div>

          <div className="space-y-4">
            {reviews.map(rev => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-100 text-[#9E2A2B] flex items-center justify-center font-bold text-xs font-serif">
                      {rev.customerName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-stone-900 text-xs">{rev.customerName}</h5>
                        <span className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified Customer
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-400">
                        {rev.customerLocation} • {rev.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{rev.rating}.0</span>
                  </div>
                </div>

                <span className="inline-block text-[10px] font-bold bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                  Garment: {rev.garment}
                </span>

                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
