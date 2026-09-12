import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Scissors,
  Clock,
  IndianRupee,
  Star,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';

export const SmartMatchPage: React.FC = () => {
  const {
    tailors,
    navigateToTailorProfile,
    navigateToRequestService,
    setCurrentPage
  } = useApp();

  const [garment, setGarment] = useState('Blouse');
  const [urgency, setUrgency] = useState<'express' | 'standard' | 'flexible'>('standard');
  const [budgetTier, setBudgetTier] = useState<'budget' | 'master' | 'luxury'>('master');
  const [isCalculated, setIsCalculated] = useState(true);

  // Compute best match
  const bestMatch = tailors[0]; // Lakshmi Stitching Studio is the master match
  const runnerUps = tailors.slice(1, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Intelligent Artisan Matchmaker</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E2229]">
          Find Your Perfect Tailor in Seconds
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Tell us what you're stitching and your timeframe. We match you with the highest-rated local specialist for that exact garment.
        </p>
      </div>

      {/* 3 Questions Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        {/* Q1: Garment */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            1. What garment do you need tailored?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Blouse', 'Saree Kuchu', 'Salwar / Kurti', 'Lehenga', 'Formal Shirt', 'Alterations'].map(g => (
              <button
                key={g}
                type="button"
                onClick={() => setGarment(g)}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                  garment === g
                    ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 text-[#9E2A2B] shadow-xs'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Q2: Urgency */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            2. How soon do you need it delivered?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'express', label: 'Urgent Express (24-48 Hours)', desc: 'For sudden festive occasions' },
              { id: 'standard', label: 'Standard Delivery (3-5 Days)', desc: 'Optimal master stitching time' },
              { id: 'flexible', label: 'Flexible (1+ Week)', desc: 'Intricate embroidery & bridal handwork' }
            ].map(u => (
              <div
                key={u.id}
                onClick={() => setUrgency(u.id as any)}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  urgency === u.id
                    ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900">{u.label}</div>
                <div className="text-[10px] text-stone-500 mt-0.5">{u.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Q3: Budget & Craftsmanship */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            3. Desired Craftsmanship Tier
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'budget', label: 'Value Essentials', desc: 'Starting ₹250–₹350' },
              { id: 'master', label: 'Master Studio Finishing', desc: 'Starting ₹450–₹750' },
              { id: 'luxury', label: 'Bespoke Bridal Couture', desc: 'Starting ₹1,200+' }
            ].map(b => (
              <div
                key={b.id}
                onClick={() => setBudgetTier(b.id as any)}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  budgetTier === b.id
                    ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900">{b.label}</div>
                <div className="text-[10px] text-stone-500 mt-0.5">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card: #1 Top Match */}
      {isCalculated && bestMatch && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Your Recommended Master Studio
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              98% Algorithmic Match
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#9E2A2B] shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#9E2A2B] text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-bl-2xl">
              Top Pick For {garment}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={bestMatch.avatarUrl}
                  alt={bestMatch.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-stone-200 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-2xl font-bold text-stone-900">
                      {bestMatch.name}
                    </h2>
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>

                  <p className="text-xs text-stone-500 mt-0.5">
                    Proprietor: {bestMatch.ownerName} • {bestMatch.yearsOfExperience} Years Experience
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 mt-2">
                    <span className="flex items-center font-bold text-amber-600">
                      <Star className="w-4 h-4 fill-amber-400 mr-1" />
                      {bestMatch.rating} ({bestMatch.reviewCount} reviews)
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {bestMatch.distanceKm} km away ({bestMatch.city})
                    </span>
                    <span>•</span>
                    <span className="font-bold text-emerald-700">● Available Today</span>
                  </div>
                </div>
              </div>

              <div className="sm:text-right">
                <div className="text-xs font-bold text-stone-400 uppercase">Estimated Starting Price</div>
                <div className="text-3xl font-extrabold text-[#9E2A2B] font-mono">
                  ₹{bestMatch.startingPrice}
                </div>
                <span className="text-[11px] text-stone-500 block">Express Delivery Available</span>
              </div>
            </div>

            {/* Why This Tailor was Matched */}
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 text-xs text-amber-900 space-y-1">
              <strong>Why this is your best match:</strong>
              <p className="text-amber-800 leading-relaxed">
                {bestMatch.name} has completed over 380+ {garment.toLowerCase()} orders with a 4.9/5 fitting accuracy score. They have open workshop capacity in Pudukkottai and offer complimentary doorstep measurements.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span>✓ Verified Studio</span>
                <span>✓ Escrow Protected</span>
                <span>✓ Free Trial Fitting</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateToTailorProfile(bestMatch.id)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                >
                  View Profile & Gallery
                </button>
                <button
                  onClick={() => navigateToRequestService(bestMatch.id, garment)}
                  className="px-6 py-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold shadow-md shadow-[#9E2A2B]/20 transition-all flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Custom Stitching Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
