import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  Check,
  X,
  IndianRupee,
  MapPin,
  Building,
  CheckCircle2,
  ExternalLink,
  Search
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    tailors,
    orders,
    verifyTailor,
    showToast,
    setCurrentPage
  } = useApp();

  const [activeTab, setActiveTab] = useState<'verifications' | 'orders' | 'payouts'>('verifications');
  const [searchFilter, setSearchFilter] = useState('');

  const pendingTailors = tailors.filter(t => t.verificationStatus === 'pending');
  const verifiedTailors = tailors.filter(t => t.verificationStatus === 'verified');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#9E2A2B] uppercase tracking-wider">
              Network Operations & Quality Assurance
            </span>
            <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Super Admin View
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E2229] mt-1">
            Local Tailor Connect — Platform Administration
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Oversee tailor studio verifications, manage escrow transactions, and maintain community craftsmanship standards.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('customer-dashboard')}
          className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors w-fit"
        >
          Exit Admin View
        </button>
      </div>

      {/* 4 Admin Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Registered Tailors</span>
            <Building className="w-4 h-4 text-[#9E2A2B]" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-stone-900">
            {tailors.length + 42}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            {pendingTailors.length} awaiting verification
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Platform Active Orders</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-stone-900">
            124
          </div>
          <span className="text-[11px] text-stone-500 font-semibold block">
            Across 14 Tamil Nadu towns
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Gross Merchandise (GMV)</span>
            <IndianRupee className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-stone-900">
            ₹1,82,400
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            5% platform fee sustained
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Quality Rating</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-stone-900">
            4.85 / 5.0
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            0.4% dispute rate
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-6 text-xs font-bold overflow-x-auto">
        {[
          { id: 'verifications', label: `Tailor Verifications (${pendingTailors.length} Pending)` },
          { id: 'orders', label: `All Platform Orders (${orders.length})` },
          { id: 'payouts', label: 'Escrow Settlements' }
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

      {/* Tab 1: Verifications Queue */}
      {activeTab === 'verifications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Pending Tailor Studio Verifications
            </h3>
            <span className="text-xs text-stone-500">
              Check trade license and workshop quality standards
            </span>
          </div>

          {pendingTailors.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-stone-300 text-xs text-stone-500">
              All tailor verification requests have been audited!
            </div>
          ) : (
            <div className="space-y-4">
              {pendingTailors.map(t => (
                <div
                  key={t.id}
                  className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-stone-200"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-lg font-bold text-stone-900">{t.name}</h4>
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          Pending Audit
                        </span>
                      </div>
                      <p className="text-xs text-stone-500">
                        Proprietor: <strong>{t.ownerName}</strong> • {t.yearsOfExperience} yrs exp • Phone: {t.phone}
                      </p>
                      <p className="text-xs text-stone-600">
                        📍 {t.address}, {t.city}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {t.specializations.map((s, i) => (
                          <span key={i} className="text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => verifyTailor(t.id)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve Studio & Badge</span>
                    </button>
                    <button
                      onClick={() => {
                        showToast(`Application for ${t.name} rejected.`, 'warning');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-rose-600 text-xs font-bold transition-all"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Already Verified Table */}
          <div className="pt-6 space-y-3">
            <h4 className="font-serif text-base font-bold text-stone-900">
              Active Verified Studios ({verifiedTailors.length})
            </h4>
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 font-bold text-stone-700">
                  <tr>
                    <th className="p-3">Studio Name</th>
                    <th className="p-3">Owner</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3">Orders Finished</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {verifiedTailors.map(vt => (
                    <tr key={vt.id} className="hover:bg-stone-50/70">
                      <td className="p-3 font-bold text-stone-900">{vt.name}</td>
                      <td className="p-3 text-stone-600">{vt.ownerName}</td>
                      <td className="p-3 text-stone-600">{vt.city}</td>
                      <td className="p-3 font-bold text-amber-600">⭐ {vt.rating} ({vt.reviewCount})</td>
                      <td className="p-3 font-mono">{vt.ordersCompleted} orders</td>
                      <td className="p-3">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          ✓ Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Monitor */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Platform-wide Order Log
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 font-bold text-stone-700">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Tailor</th>
                  <th className="p-3">Garment</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-stone-50/70">
                    <td className="p-3 font-mono font-bold text-[#9E2A2B]">#{o.id}</td>
                    <td className="p-3 font-semibold text-stone-900">{o.customerName}</td>
                    <td className="p-3 text-stone-600">{o.tailorName}</td>
                    <td className="p-3 text-stone-800">{o.garment}</td>
                    <td className="p-3 font-mono font-bold text-stone-900">₹{o.amount}</td>
                    <td className="p-3">
                      <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[11px] font-medium">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          o.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Escrow Settlements */}
      {activeTab === 'payouts' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4 text-xs">
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Automated Escrow Bank Settlements
          </h3>
          <p className="text-stone-500">
            Escrow balance is released 24 hours after the customer confirms the trial fitting without any alterations raised.
          </p>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900">
            <strong>Active Escrow Pool: ₹82,450</strong>
            <p className="mt-1 text-emerald-800">
              All transactions protected under RBI-compliant merchant nodal banking.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
