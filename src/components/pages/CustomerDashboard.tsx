import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  Ruler,
  Heart,
  Clock,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Scissors,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    orders,
    measurements,
    tailors,
    setCurrentPage,
    navigateToTrackOrder,
    navigateToTailorProfile,
    setSelectedOrderId
  } = useApp();

  const activeOrders = orders.filter(o => o.status !== 'Completed');
  const pastOrders = orders.filter(o => o.status === 'Completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-stone-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Customer Sanctuary
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
              Welcome back, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Track your custom garments, manage your body measurements vault, and discover skilled neighborhood artisans.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentPage('find-tailors')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Scissors className="w-4 h-4" />
              <span>Book New Stitch</span>
            </button>
            <button
              onClick={() => setCurrentPage('smart-match')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Matchmaker</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Stats & Quick Access Cards matching prompt */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => {
            if (activeOrders.length > 0) {
              navigateToTrackOrder(activeOrders[0].id);
            }
          }}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-[#9E2A2B] transition-all cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Active Orders</span>
            <Package className="w-4 h-4 text-[#9E2A2B] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-stone-900">
            {activeOrders.length}
          </div>
          <span className="text-[11px] text-amber-600 font-semibold block">
            {activeOrders.length > 0 ? 'In workshop progress' : 'No active orders'}
          </span>
        </div>

        <div
          onClick={() => setCurrentPage('measurements')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-[#9E2A2B] transition-all cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Saved Measurements</span>
            <Ruler className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-stone-900">
            {measurements.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            Digital fitting profiles stored
          </span>
        </div>

        <div
          onClick={() => setCurrentPage('find-tailors')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-[#9E2A2B] transition-all cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Favorite Tailors</span>
            <Heart className="w-4 h-4 text-[#9E2A2B] fill-[#9E2A2B] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-stone-900">
            {tailors.length}
          </div>
          <span className="text-[11px] text-stone-500 font-semibold block">
            Verified local artisans in network
          </span>
        </div>
      </div>

      {/* Main Grid: Active Orders & Recommended Tailors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Active & Past Orders */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Active Tailoring Orders ({activeOrders.length})
            </h3>
            <button
              onClick={() => setCurrentPage('find-tailors')}
              className="text-xs font-bold text-[#9E2A2B] hover:underline"
            >
              + Start New Request
            </button>
          </div>

          {activeOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-stone-300 space-y-3">
              <Package className="w-10 h-10 text-stone-300 mx-auto" />
              <h4 className="font-serif text-base font-bold text-stone-800">
                You have no active orders in progress
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Ready to get your blouse, dress, or festive outfit stitched?
              </p>
              <button
                onClick={() => setCurrentPage('find-tailors')}
                className="px-5 py-2 rounded-xl bg-[#9E2A2B] text-white text-xs font-bold shadow-xs"
              >
                Find a Neighborhood Tailor
              </button>
            </div>
          ) : (
            activeOrders.map(order => {
              const progressPercentage = Math.round(((order.currentStageIndex + 1) / 8) * 100);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#9E2A2B] bg-[#9E2A2B]/10 px-2.5 py-0.5 rounded-full">
                          Order #{order.id}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {order.paymentStatus}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-stone-900 mt-1">
                        {order.serviceType}: {order.garment}
                      </h4>
                      <p className="text-xs text-stone-500">
                        Tailor: <strong className="text-stone-800">{order.tailorName}</strong> ({order.tailorAddress})
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <div className="text-[10px] font-bold uppercase text-stone-400">
                        Estimated Delivery
                      </div>
                      <div className="font-serif font-bold text-stone-900 text-sm">
                        {order.estimatedCompletion}
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#9E2A2B]">
                        Amount: ₹{order.amount}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar & Status */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-stone-600">
                        Current Status: <strong className="text-[#9E2A2B]">{order.status}</strong>
                      </span>
                      <span className="text-stone-500 font-mono">{progressPercentage}% Complete</span>
                    </div>
                    <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#9E2A2B] to-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Requirements Snippet */}
                  <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100 italic">
                    "{order.requirements}"
                  </p>

                  {/* Action Buttons matching prompt */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
                    <span className="text-xs text-stone-500">
                      Delivery: <strong className="text-stone-700">{order.deliveryOption}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setCurrentPage('messages');
                        }}
                        className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-stone-600" />
                        <span>Message Tailor</span>
                      </button>
                      <button
                        onClick={() => navigateToTrackOrder(order.id)}
                        className="px-5 py-2 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <span>Track Order</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Past Orders Section */}
          {pastOrders.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Completed Orders History
              </h3>
              <div className="space-y-3">
                {pastOrders.map(ord => (
                  <div
                    key={ord.id}
                    className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <span className="font-mono text-[10px] font-bold text-stone-400">#{ord.id}</span>
                      <h5 className="font-bold text-stone-900">{ord.garment} Stitching</h5>
                      <p className="text-stone-500">{ord.tailorName} • Completed {ord.orderDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-stone-900">₹{ord.amount}</span>
                      <button
                        onClick={() => navigateToTrackOrder(ord.id)}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px]"
                      >
                        View Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Measurement Shortcuts & Recommendations */}
        <div className="lg:col-span-4 space-y-6">
          {/* Saved Measurements Shortcut Box */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#9E2A2B]" /> My Measurements
              </h3>
              <button
                onClick={() => setCurrentPage('measurements')}
                className="text-xs font-bold text-[#9E2A2B] hover:underline"
              >
                Manage Vault
              </button>
            </div>

            <div className="space-y-2">
              {measurements.slice(0, 2).map(m => (
                <div
                  key={m.id}
                  onClick={() => setCurrentPage('measurements')}
                  className="p-3 bg-stone-50 rounded-xl border border-stone-100 hover:bg-stone-100/80 cursor-pointer transition-colors text-xs"
                >
                  <div className="flex justify-between font-bold text-stone-800">
                    <span>{m.title}</span>
                    <span className="text-[10px] text-stone-400 font-normal">{m.category}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 font-mono">
                    Bust: {m.bust || '-'} in • Waist: {m.waist || '-'} in • Shoulder: {m.shoulder || '-'} in
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage('measurements')}
              className="w-full py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
            >
              + Add New Profile
            </button>
          </div>

          {/* Recommended Nearby Tailors */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900">
              Recommended Tailors Near You
            </h3>

            <div className="space-y-4">
              {tailors.slice(0, 3).map(t => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 pb-3 border-b border-stone-100 last:border-0 last:pb-0"
                >
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5
                      onClick={() => navigateToTailorProfile(t.id)}
                      className="text-xs font-bold text-stone-900 truncate hover:text-[#9E2A2B] cursor-pointer"
                    >
                      {t.name}
                    </h5>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                      <span className="font-bold text-stone-800">{t.rating}</span>
                      <span>•</span>
                      <span>{t.distanceKm} km away</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#9E2A2B] font-bold block mt-0.5">
                      Starts ₹{t.startingPrice}
                    </span>
                  </div>
                  <button
                    onClick={() => navigateToTailorProfile(t.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold shrink-0"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage('find-tailors')}
              className="w-full py-2 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white font-bold text-xs shadow-xs transition-colors"
            >
              Explore All Studios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
