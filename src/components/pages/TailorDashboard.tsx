import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStage } from '../../types';
import {
  Scissors,
  CheckCircle2,
  Clock,
  IndianRupee,
  TrendingUp,
  Package,
  Plus,
  Send,
  User,
  ArrowRight,
  Filter,
  FileText,
  Calendar,
  AlertCircle,
  Camera,
  Layers,
  ChevronRight,
  Eye,
  Check,
  X
} from 'lucide-react';

export const TailorDashboard: React.FC = () => {
  const {
    orders,
    currentTailor,
    updateOrderStatus,
    sendQuotation,
    addPortfolioImage,
    setSelectedOrderId,
    setCurrentPage,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'kanban' | 'requests' | 'portfolio' | 'earnings'>('kanban');
  const [selectedOrderForQuote, setSelectedOrderForQuote] = useState<Order | null>(null);

  // Quote generator fields
  const [quoteFields, setQuoteFields] = useState({
    baseStitching: 350,
    designCharges: 150,
    materialCharges: 100,
    alterationCharges: 50,
    notes: 'Premium cotton lining with custom piping included.'
  });

  // New portfolio item
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [portfolioCategory, setPortfolioCategory] = useState('Blouse');
  const [portfolioUrl, setPortfolioUrl] = useState('https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80');

  const KANBAN_COLUMNS: { stage: OrderStage; label: string; color: string }[] = [
    { stage: 'Request Submitted', label: 'New Requests', color: 'border-blue-400 bg-blue-50/40 text-blue-800' },
    { stage: 'Cutting', label: 'Cutting & Prep', color: 'border-amber-400 bg-amber-50/40 text-amber-800' },
    { stage: 'Stitching', label: 'Active Stitching', color: 'border-[#9E2A2B] bg-[#9E2A2B]/10 text-[#9E2A2B]' },
    { stage: 'Ready for Pickup', label: 'Ready for Pickup', color: 'border-purple-400 bg-purple-50/40 text-purple-800' },
    { stage: 'Completed', label: 'Delivered / Completed', color: 'border-emerald-400 bg-emerald-50/40 text-emerald-800' }
  ];

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForQuote) return;

    sendQuotation(selectedOrderForQuote.id, quoteFields);
    setSelectedOrderForQuote(null);
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioTitle) {
      showToast('Please enter a title for your garment photo', 'warning');
      return;
    }
    addPortfolioImage({
      url: portfolioUrl,
      title: portfolioTitle,
      category: portfolioCategory
    });
    setPortfolioTitle('');
  };

  const pendingRequests = orders.filter(
    o => o.status === 'Request Submitted' || o.quotation?.status === 'Pending'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Studio Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#9E2A2B] uppercase tracking-wider">
              Artisan Workshop Console
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Live & Accepting Orders
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E2229] mt-1">
            Tailor Business Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Studio: <strong className="text-stone-900">{currentTailor.name}</strong> • Proprietor: {currentTailor.ownerName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('portfolio')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
          >
            <Camera className="w-4 h-4 text-stone-600" />
            <span>Upload Work Photo</span>
          </button>
          <button
            onClick={() => setCurrentPage('tailor-profile')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold shadow-md shadow-[#9E2A2B]/20 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>View Public Storefront</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards as requested */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Active Orders</span>
            <Scissors className="w-4 h-4 text-[#9E2A2B]" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-stone-900">
            {orders.filter(o => o.status !== 'Completed').length}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            ↑ 3 in active stitching right now
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Pending Requests</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-stone-900">
            {pendingRequests.length}
          </div>
          <span className="text-[11px] text-amber-600 font-semibold block">
            Awaiting quotation / approval
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Completed This Month</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-stone-900">
            38
          </div>
          <span className="text-[11px] text-stone-500 font-semibold block">
            99.2% on-time delivery rate
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Total Earnings</span>
            <IndianRupee className="w-4 h-4 text-[#9E2A2B]" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-[#9E2A2B]">
            ₹42,500
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            +18% compared to last month
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-6 overflow-x-auto text-xs font-bold">
        {[
          { id: 'kanban', label: `Kanban Order Flow (${orders.length})` },
          { id: 'requests', label: `New Incoming Requests (${pendingRequests.length})` },
          { id: 'portfolio', label: `Portfolio Photos (${currentTailor.portfolioImages.length})` },
          { id: 'earnings', label: 'Earnings & Payouts' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#9E2A2B] text-[#9E2A2B]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Kanban Board Section */}
      {activeTab === 'kanban' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-stone-500">
              Easily update garment status by clicking stage change arrows directly on each order card.
            </p>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
              Live Real-Time Workshop Sync
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {KANBAN_COLUMNS.map(col => {
              const colOrders = orders.filter(o => {
                if (col.stage === 'Request Submitted') {
                  return o.status === 'Request Submitted' || o.status === 'Measurement Confirmed' || o.status === 'Quote Sent';
                }
                return o.status === col.stage;
              });

              return (
                <div
                  key={col.stage}
                  className="bg-stone-100/70 rounded-2xl p-3 border border-stone-200/80 flex flex-col min-w-[240px] space-y-3"
                >
                  <div className="flex items-center justify-between px-1">
                    <h4 className="text-xs font-bold text-stone-800">{col.label}</h4>
                    <span className="text-[10px] font-mono font-bold bg-white text-stone-600 px-2 py-0.5 rounded-full border border-stone-200">
                      {colOrders.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {colOrders.length === 0 ? (
                      <div className="text-center py-8 text-[11px] text-stone-400 italic">
                        No orders in this stage
                      </div>
                    ) : (
                      colOrders.map(ord => (
                        <div
                          key={ord.id}
                          className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold text-[#9E2A2B]">
                              #{ord.id}
                            </span>
                            <span className="text-[10px] font-bold text-stone-900 font-mono">
                              ₹{ord.amount}
                            </span>
                          </div>

                          <div>
                            <h5 className="text-xs font-bold text-stone-900 leading-snug">
                              {ord.garment} ({ord.serviceType})
                            </h5>
                            <p className="text-[11px] text-stone-500 mt-0.5">
                              Customer: {ord.customerName}
                            </p>
                          </div>

                          <div className="text-[10px] bg-stone-50 p-2 rounded-lg text-stone-600 border border-stone-100 line-clamp-2">
                            "{ord.requirements}"
                          </div>

                          <div className="text-[10px] flex justify-between text-stone-400 font-mono pt-1 border-t border-stone-100">
                            <span>Due: {ord.estimatedCompletion}</span>
                            <span className={ord.paymentStatus === 'Paid' ? 'text-emerald-600 font-bold' : 'text-amber-600'}>
                              {ord.paymentStatus}
                            </span>
                          </div>

                          {/* Quick Stage Move Actions */}
                          <div className="flex items-center justify-between gap-1 pt-1">
                            <button
                              onClick={() => {
                                setSelectedOrderId(ord.id);
                                setCurrentPage('track-order');
                              }}
                              className="text-[10px] font-bold text-stone-500 hover:text-stone-900"
                            >
                              Details
                            </button>

                            <div className="flex items-center gap-1">
                              {col.stage === 'Request Submitted' && (
                                <button
                                  onClick={() => setSelectedOrderForQuote(ord)}
                                  className="px-2 py-1 rounded bg-amber-500 hover:bg-amber-600 text-stone-950 text-[10px] font-bold"
                                >
                                  Send Quote
                                </button>
                              )}

                              {ord.status !== 'Completed' && (
                                <button
                                  onClick={() => {
                                    const nextStages: Record<OrderStage, OrderStage> = {
                                      'Request Submitted': 'Cutting',
                                      'Measurement Confirmed': 'Cutting',
                                      'Quote Sent': 'Cutting',
                                      'Cutting': 'Stitching',
                                      'Stitching': 'Alteration',
                                      'Alteration': 'Ready for Pickup',
                                      'Ready for Pickup': 'Completed',
                                      'Completed': 'Completed'
                                    };
                                    const next = nextStages[ord.status];
                                    updateOrderStatus(ord.id, next, `Moved to ${next} by studio master.`);
                                  }}
                                  className="px-2 py-1 rounded bg-[#9E2A2B] hover:bg-[#822223] text-white text-[10px] font-bold flex items-center gap-0.5"
                                >
                                  <span>Advance</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. New Requests Section */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Incoming Tailoring Requests & Quotations
          </h3>

          <div className="space-y-4">
            {pendingRequests.map(req => (
              <div
                key={req.id}
                className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#9E2A2B] bg-[#9E2A2B]/10 px-2.5 py-0.5 rounded-full">
                      #{req.id}
                    </span>
                    <span className="text-xs font-bold text-stone-800">
                      {req.customerName} ({req.customerPhone})
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Placed on {req.orderDate}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    {req.serviceType} — {req.garment}
                  </h4>

                  <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
                    <strong>Requirements:</strong> {req.requirements}
                  </p>

                  <div className="text-xs text-stone-500">
                    <strong>Measurements:</strong> {req.measurementsSummary} • <strong>Delivery:</strong> {req.deliveryOption}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedOrderForQuote(req)}
                    className="px-5 py-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Generate & Send Quote</span>
                  </button>
                  <button
                    onClick={() => {
                      updateOrderStatus(req.id, 'Cutting', 'Studio accepted custom order directly and prepared fabric for cutting.');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Direct Accept Order</span>
                  </button>
                  <button
                    onClick={() => {
                      showToast(`Order #${req.id} declined`, 'info');
                    }}
                    className="px-5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    <span>Decline Request</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Portfolio Management Tab */}
      {activeTab === 'portfolio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Add New Garment to Studio Showcase
            </h3>
            <p className="text-xs text-stone-500">
              Upload photos of recently completed customer stitches to attract more local clients.
            </p>

            <form onSubmit={handleAddPortfolio} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                  Garment Name / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Peacock Hand Embroidery Bridal Blouse"
                  value={portfolioTitle}
                  onChange={e => setPortfolioTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                  Category
                </label>
                <select
                  value={portfolioCategory}
                  onChange={e => setPortfolioCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
                >
                  <option value="Blouse">Blouse</option>
                  <option value="Bridal">Bridal Wear</option>
                  <option value="Kurti">Kurti & Salwar</option>
                  <option value="Men Formal">Men's Formal</option>
                  <option value="Kids & Festive">Kids & Festive</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                  Garment Photo URL
                </label>
                <input
                  type="text"
                  value={portfolioUrl}
                  onChange={e => setPortfolioUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Publish to Studio Profile</span>
              </button>
            </form>
          </div>

          {/* Right Gallery */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Current Live Portfolio ({currentTailor.portfolioImages.length} items)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currentTailor.portfolioImages.map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-stone-200 group relative aspect-square">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-2 flex flex-col justify-end text-white">
                    <span className="text-[9px] uppercase font-bold text-amber-400">{img.category}</span>
                    <p className="text-[11px] font-bold truncate">{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Earnings Tab */}
      {activeTab === 'earnings' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Studio Payouts & Commission Breakdown
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Direct UPI and Bank transfers deposited every Tuesday.
              </p>
            </div>
            <button
              onClick={() => showToast('Payout scheduled to Indian Overseas Bank A/C ending in 8912', 'success')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
            >
              Request Instant Withdrawal (₹14,200)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-stone-400 font-bold uppercase text-[10px]">Net Available Balance</span>
              <div className="text-2xl font-extrabold text-stone-900 font-mono mt-1">₹14,200</div>
              <span className="text-[10px] text-emerald-700 font-semibold">Ready for payout</span>
            </div>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-stone-400 font-bold uppercase text-[10px]">Escrow In Progress</span>
              <div className="text-2xl font-extrabold text-amber-700 font-mono mt-1">₹8,450</div>
              <span className="text-[10px] text-stone-500">Held safely until customer delivery</span>
            </div>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-stone-400 font-bold uppercase text-[10px]">Lifetime Platform Earnings</span>
              <div className="text-2xl font-extrabold text-[#9E2A2B] font-mono mt-1">₹1,84,300</div>
              <span className="text-[10px] text-stone-500">Across 248 total customer orders</span>
            </div>
          </div>
        </div>
      )}

      {/* Quotation Generator Modal as explicitly requested in Section 10 */}
      {selectedOrderForQuote && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSendQuote}
            className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold text-[#9E2A2B] uppercase tracking-wider">
                  Quotation Generator
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Itemized Quote for Order #{selectedOrderForQuote.id}
                </h3>
                <p className="text-xs text-stone-500">
                  Client: {selectedOrderForQuote.customerName} ({selectedOrderForQuote.garment})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrderForQuote(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Exactly matching quotation items in prompt:
                Base stitching: ₹350
                Design charges: ₹150
                Material / lining: ₹100
                Alteration: ₹50
                Total: ₹650 */}
            <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-stone-700">Base Stitching (₹)</label>
                <input
                  type="number"
                  value={quoteFields.baseStitching}
                  onChange={e => setQuoteFields({ ...quoteFields, baseStitching: Number(e.target.value) })}
                  className="w-28 p-2 rounded-lg bg-white border border-stone-300 font-mono font-bold text-right"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-semibold text-stone-700">Design / Neck Cutout Charges (₹)</label>
                <input
                  type="number"
                  value={quoteFields.designCharges}
                  onChange={e => setQuoteFields({ ...quoteFields, designCharges: Number(e.target.value) })}
                  className="w-28 p-2 rounded-lg bg-white border border-stone-300 font-mono font-bold text-right"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-semibold text-stone-700">Material / Premium Lining (₹)</label>
                <input
                  type="number"
                  value={quoteFields.materialCharges}
                  onChange={e => setQuoteFields({ ...quoteFields, materialCharges: Number(e.target.value) })}
                  className="w-28 p-2 rounded-lg bg-white border border-stone-300 font-mono font-bold text-right"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-semibold text-stone-700">Alteration Guarantee (₹)</label>
                <input
                  type="number"
                  value={quoteFields.alterationCharges}
                  onChange={e => setQuoteFields({ ...quoteFields, alterationCharges: Number(e.target.value) })}
                  className="w-28 p-2 rounded-lg bg-white border border-stone-300 font-mono font-bold text-right"
                />
              </div>

              <div className="pt-2 border-t border-stone-300 flex items-center justify-between font-bold text-sm">
                <span className="text-stone-900">Total Quotation Price:</span>
                <span className="font-mono text-base font-extrabold text-[#9E2A2B]">
                  ₹{quoteFields.baseStitching + quoteFields.designCharges + quoteFields.materialCharges + quoteFields.alterationCharges}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Tailor Note for Customer
              </label>
              <textarea
                rows={2}
                value={quoteFields.notes}
                onChange={e => setQuoteFields({ ...quoteFields, notes: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 font-medium text-stone-800 focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedOrderForQuote(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold shadow-sm"
              >
                Send Official Quotation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
