import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldCheck,
  Scissors,
  Calendar,
  Send,
  MessageCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  Share2,
  Bookmark
} from 'lucide-react';

export const TailorProfilePage: React.FC = () => {
  const {
    selectedTailorId,
    tailors,
    reviews,
    setCurrentPage,
    navigateToRequestService,
    setSelectedOrderId,
    showToast
  } = useApp();

  const tailor = tailors.find(t => t.id === selectedTailorId) || tailors[0];
  const tailorReviews = reviews.filter(r => r.tailorId === tailor.id);

  const [activeTab, setActiveTab] = useState<'services' | 'portfolio' | 'reviews' | 'about'>('services');
  const [selectedPortfolioImg, setSelectedPortfolioImg] = useState<{ url: string; title: string; category: string } | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => setCurrentPage('find-tailors')}
        className="flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Tailors List</span>
      </button>

      {/* Header Banner & Shop Identity */}
      <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
        {/* Cover Photo */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-100">
          <img
            src={tailor.shopImageUrl}
            alt={tailor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => {
                setIsSaved(!isSaved);
                showToast(isSaved ? 'Removed from saved tailors' : 'Saved to your favorites!', 'info');
              }}
              className="p-2.5 rounded-xl bg-white/90 backdrop-blur-md text-stone-800 hover:bg-white transition-colors shadow-xs"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#9E2A2B] text-[#9E2A2B]' : ''}`} />
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Studio link copied to clipboard!', 'success');
              }}
              className="p-2.5 rounded-xl bg-white/90 backdrop-blur-md text-stone-800 hover:bg-white transition-colors shadow-xs"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={tailor.avatarUrl}
                alt={tailor.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-xl"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {tailor.name}
                  </h1>
                  {tailor.verificationStatus === 'verified' && (
                    <span className="flex items-center gap-1 text-[11px] font-bold bg-emerald-500/90 text-white px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Studio
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-200 mt-1">
                  Proprietor: {tailor.ownerName} • {tailor.yearsOfExperience} Years of Master Experience
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 mt-2">
                  <span className="flex items-center font-bold text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400 mr-1 inline" />
                    {tailor.rating} ({tailor.reviewCount} customer reviews)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {tailor.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick CTAs on Banner */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setSelectedOrderId('LTC-10482');
                  setCurrentPage('messages');
                }}
                className="px-4 py-2.5 rounded-xl bg-white/90 hover:bg-white text-stone-900 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#9E2A2B]" />
                <span>Message Tailor</span>
              </button>
              <button
                onClick={() => setCurrentPage('appointments')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
              <button
                onClick={() => navigateToRequestService(tailor.id)}
                className="px-5 py-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-[#9E2A2B]/40"
              >
                <Send className="w-4 h-4" />
                <span>Request Service</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 px-6 overflow-x-auto">
          {[
            { id: 'services', label: 'Services & Pricing' },
            { id: 'portfolio', label: `Portfolio & Gallery (${tailor.portfolioImages.length})` },
            { id: 'reviews', label: `Reviews & Ratings (${tailor.reviewCount})` },
            { id: 'about', label: 'About Studio' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#9E2A2B] text-[#9E2A2B]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Services & Pricing Tab */}
          {activeTab === 'services' && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Stitching & Alteration Price List
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Transparent baseline pricing. Exact quote provided based on embroidery, lining, and custom neck patterns.
                </p>
              </div>

              {/* Responsive Pricing Table */}
              <div className="overflow-x-auto rounded-2xl border border-stone-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-700 font-bold border-b border-stone-200">
                    <tr>
                      <th className="py-3.5 px-4">Service</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4 text-right">Starting Price</th>
                      <th className="py-3.5 px-4">Estimated Time</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {tailor.services.map((serv, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-stone-900">
                          <div>{serv.name}</div>
                          {serv.description && (
                            <span className="text-[10px] text-stone-400 font-normal block">
                              {serv.description}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-stone-600">
                          <span className="bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                            {serv.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#9E2A2B] text-sm">
                          ₹{serv.startingPrice}
                        </td>
                        <td className="py-3.5 px-4 text-stone-600 font-medium">
                          {serv.estimatedTime}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => navigateToRequestService(tailor.id, serv.name)}
                            className="px-3 py-1.5 rounded-lg bg-[#9E2A2B] hover:bg-[#822223] text-white font-bold text-[11px] shadow-xs"
                          >
                            Order
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-start gap-3">
                <Scissors className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong>Need custom Aari embroidery or urgent 24-hour express stitching?</strong>
                  <p className="mt-0.5 text-amber-800">
                    You can specify custom neck cutouts, sleeve borders, cup padding, and urgent delivery dates inside the custom request form.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Portfolio & Gallery Tab */}
          {activeTab === 'portfolio' && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Completed Garments & Workshop Portfolio
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Authentic images of custom garments handcrafted right inside {tailor.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tailor.portfolioImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPortfolioImg(img)}
                    className="relative rounded-2xl overflow-hidden border border-stone-200 group cursor-pointer aspect-4/3"
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-500/90 text-stone-950 px-2 py-0.5 rounded">
                        {img.category}
                      </span>
                      <h4 className="text-xs font-bold mt-1 leading-snug">{img.title}</h4>
                    </div>
                    <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Reviews & Ratings Tab */}
          {activeTab === 'reviews' && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    Customer Experience & Reviews
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Based on {tailor.reviewCount} verified tailoring orders.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-extrabold text-stone-900 font-serif">
                    {tailor.rating}
                  </div>
                  <div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <div className="text-[11px] text-stone-500">100% Verified Customers</div>
                  </div>
                </div>
              </div>

              {/* Category Breakdown Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                {[
                  { name: 'Stitching Quality', score: 4.9 },
                  { name: 'Garment Fitting', score: 4.9 },
                  { name: 'Delivery Timeliness', score: 4.7 },
                  { name: 'Tailor Communication', score: 4.8 },
                  { name: 'Value for Money', score: 4.8 }
                ].map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-stone-700">
                      <span>{cat.name}</span>
                      <span className="text-stone-900">{cat.score} / 5.0</span>
                    </div>
                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full"
                        style={{ width: `${(cat.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Individual Reviews List */}
              <div className="space-y-4 divide-y divide-stone-100">
                {tailorReviews.map(rev => (
                  <div key={rev.id} className="pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#9E2A2B] text-white flex items-center justify-center font-bold text-xs">
                          {rev.customerName[0]}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900">{rev.customerName}</div>
                          <div className="text-[10px] text-stone-400">
                            {rev.customerLocation || tailor.city} • {rev.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <span className="inline-block text-[10px] font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                      {rev.garment}
                    </span>
                    <p className="text-xs text-stone-600 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. About Tab */}
          {activeTab === 'about' && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                About {tailor.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {tailor.about}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
                    Shop Address
                  </span>
                  <p className="font-semibold text-stone-800">{tailor.address}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
                    Working Hours
                  </span>
                  <p className="font-semibold text-stone-800">{tailor.workingHours}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
                    Phone Contact
                  </span>
                  <p className="font-semibold text-stone-800">{tailor.phone}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
                    Specializations
                  </span>
                  <p className="font-semibold text-stone-800">{tailor.specializations.join(', ')}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Quick Booking / Studio Overview Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Studio Quick Booking
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-stone-500">Starting Price</span>
                <span className="font-bold text-stone-900 font-mono text-sm">₹{tailor.startingPrice}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-stone-500">Average Turnaround</span>
                <span className="font-bold text-stone-900">2–4 Days</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-stone-500">Home Fabric Pickup</span>
                <span className="font-bold text-emerald-700">Available in {tailor.city}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-stone-500">Doorstep Delivery</span>
                <span className="font-bold text-emerald-700">Yes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Orders Handled</span>
                <span className="font-bold text-stone-900">{tailor.ordersCompleted}+ Finished</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigateToRequestService(tailor.id)}
                className="w-full py-3 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold shadow-md shadow-[#9E2A2B]/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Stitching Request</span>
              </button>

              <button
                onClick={() => setCurrentPage('appointments')}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Fitting Appointment</span>
              </button>

              <button
                onClick={() => {
                  setSelectedOrderId('LTC-10482');
                  setCurrentPage('messages');
                }}
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with {tailor.ownerName}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Lightbox Modal */}
      {selectedPortfolioImg && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl space-y-4 p-4">
            <div className="flex justify-between items-center px-2">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  {selectedPortfolioImg.category}
                </span>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {selectedPortfolioImg.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedPortfolioImg(null)}
                className="text-stone-400 hover:text-stone-800 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>
            <img
              src={selectedPortfolioImg.url}
              alt={selectedPortfolioImg.title}
              className="w-full h-80 sm:h-96 object-cover rounded-2xl"
            />
            <div className="flex justify-end gap-2 px-2">
              <button
                onClick={() => {
                  setSelectedPortfolioImg(null);
                  navigateToRequestService(tailor.id, selectedPortfolioImg.title);
                }}
                className="px-4 py-2 rounded-xl bg-[#9E2A2B] text-white text-xs font-bold"
              >
                Request Similar Design
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
