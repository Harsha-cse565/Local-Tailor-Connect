import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStage } from '../../types';
import {
  Package,
  CheckCircle2,
  Clock,
  Scissors,
  Phone,
  MessageCircle,
  CreditCard,
  FileText,
  MapPin,
  Calendar,
  AlertCircle,
  Truck,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  X
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const {
    orders,
    selectedOrderId,
    setSelectedOrderId,
    setCurrentPage,
    navigateToPayment,
    respondToQuotation
  } = useApp();

  const order = orders.find(o => o.id === selectedOrderId) || orders[0];
  const [showQuotationModal, setShowQuotationModal] = useState(false);

  const STAGES_TIMELINE: OrderStage[] = [
    'Request Submitted',
    'Measurement Confirmed',
    'Quote Sent',
    'Cutting',
    'Stitching',
    'Alteration',
    'Ready for Pickup',
    'Completed'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Bar with Back and Order Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setCurrentPage('customer-dashboard')}
          className="flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {orders.length > 1 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-400">Viewing order:</span>
            <select
              value={order.id}
              onChange={e => setSelectedOrderId(e.target.value)}
              className="bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 font-mono font-bold text-stone-800"
            >
              {orders.map(o => (
                <option key={o.id} value={o.id}>
                  {o.id} ({o.garment} - {o.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Order Card Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#9E2A2B] bg-[#9E2A2B]/10 px-3 py-1 rounded-full">
                Order #{order.id}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                {order.paymentStatus}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
              {order.serviceType}: {order.garment} Stitching
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Placed on {order.orderDate} • Delivery via {order.deliveryOption}
            </p>
          </div>

          <div className="sm:text-right">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Estimated Completion
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900 text-[#9E2A2B] mt-0.5">
              {order.estimatedCompletion}
            </div>
            <span className="text-[11px] text-stone-500 block">Guaranteed Fitting</span>
          </div>
        </div>

        {/* Tailor Contact Info Box */}
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#9E2A2B] flex items-center justify-center font-bold font-serif text-base shrink-0">
              {order.tailorName[0]}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400">Assigned Studio</span>
              <h4 className="font-bold text-stone-900 text-sm">{order.tailorName}</h4>
              <p className="text-[11px] text-stone-500">{order.tailorAddress}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${order.tailorPhone}`}
              className="px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              <span>Call Tailor</span>
            </a>
            <button
              onClick={() => setCurrentPage('messages')}
              className="px-3.5 py-2 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Message Tailor</span>
            </button>
          </div>
        </div>

        {/* Visual Progress Timeline (Matching prompt) */}
        <div className="space-y-4 pt-2">
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Real-Time Workshop Progress
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {STAGES_TIMELINE.map((stageName, idx) => {
              const historyItem = order.history.find(h => h.stage === stageName);
              const isPast = order.currentStageIndex > idx;
              const isCurrent = order.currentStageIndex === idx;
              const isFuture = order.currentStageIndex < idx;

              return (
                <div key={stageName} className="relative flex items-start gap-4">
                  {/* Timeline Dot Indicator */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border-2 transition-all ${
                      isPast
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-amber-500 border-amber-500 text-stone-950 font-bold ring-4 ring-amber-100 animate-pulse'
                        : 'bg-white border-stone-300 text-stone-300'
                    }`}
                  >
                    {isPast ? '✓' : isCurrent ? '●' : '○'}
                  </div>

                  {/* Content for this stage */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4
                        className={`text-xs sm:text-sm font-bold ${
                          isCurrent
                            ? 'text-[#9E2A2B] text-base'
                            : isPast
                            ? 'text-stone-900'
                            : 'text-stone-400'
                        }`}
                      >
                        {stageName}
                      </h4>
                      {historyItem && (
                        <span className="text-[11px] font-mono text-stone-500">
                          {historyItem.timestamp}
                        </span>
                      )}
                    </div>

                    {historyItem?.note && (
                      <p className="text-xs text-stone-600 mt-1 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                        {historyItem.note}
                      </p>
                    )}

                    {/* If stage is Quote Sent and pending customer response */}
                    {stageName === 'Quote Sent' && order.quotation?.status === 'Pending' && (
                      <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                        <div className="flex justify-between text-xs font-bold text-amber-900">
                          <span>Quotation #{order.quotation.id} awaiting approval:</span>
                          <span className="font-mono text-sm">₹{order.quotation.total}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => respondToQuotation(order.id, true)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-xs hover:bg-emerald-700"
                          >
                            Accept Quote & Begin Work
                          </button>
                          <button
                            onClick={() => respondToQuotation(order.id, false)}
                            className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Specifications & Quotation Summary */}
        <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
              Requirements & Measurements
            </span>
            <p className="text-stone-800 font-medium leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
              {order.requirements}
            </p>
            <div className="text-[11px] text-stone-500">
              <strong>Measurements Used:</strong> {order.measurementsSummary}
            </div>
          </div>

          <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <div className="flex justify-between text-stone-500">
              <span>Order Amount:</span>
              <strong className="font-mono text-stone-900 text-sm">₹{order.amount}</strong>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Payment Status:</span>
              <span className={`font-bold ${order.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-700'}`}>
                {order.paymentStatus} {order.paymentMethod ? `via ${order.paymentMethod}` : ''}
              </span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Delivery Address:</span>
              <span className="font-medium text-stone-800 text-right max-w-xs truncate">
                {order.deliveryAddress || 'Pickup from Studio'}
              </span>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              {order.quotation && (
                <button
                  onClick={() => setShowQuotationModal(true)}
                  className="flex-1 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#9E2A2B]" />
                  <span>View Quotation</span>
                </button>
              )}

              {order.paymentStatus !== 'Paid' ? (
                <button
                  onClick={() => navigateToPayment(order.id)}
                  className="flex-1 py-2 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Make Payment</span>
                </button>
              ) : (
                <div className="w-full text-center py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl">
                  ✓ Payment Completed ({order.paymentMethod})
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quotation Details Modal */}
      {showQuotationModal && order.quotation && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Digital Quotation
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  #{order.quotation.id}
                </h3>
              </div>
              <button
                onClick={() => setShowQuotationModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Customer:</span>
                <span className="font-bold text-stone-900">{order.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Service:</span>
                <span className="font-bold text-stone-900">Custom {order.garment}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Base Stitching:</span>
                <span className="font-mono font-bold text-stone-800">₹{order.quotation.baseStitching}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Design / Piping Charges:</span>
                <span className="font-mono font-bold text-stone-800">₹{order.quotation.designCharges}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Lining & Padding Material:</span>
                <span className="font-mono font-bold text-stone-800">₹{order.quotation.materialCharges}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Alteration Guarantee:</span>
                <span className="font-mono font-bold text-stone-800">₹{order.quotation.alterationCharges}</span>
              </div>
              <div className="flex justify-between py-2 pt-3 border-t-2 border-stone-900 font-bold text-sm">
                <span className="text-stone-900">Total Quotation Amount:</span>
                <span className="font-mono text-[#9E2A2B] text-base">₹{order.quotation.total}</span>
              </div>
            </div>

            {order.quotation.notes && (
              <p className="text-[11px] text-stone-500 italic bg-stone-50 p-2.5 rounded-xl">
                Note from tailor: "{order.quotation.notes}"
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowQuotationModal(false)}
                className="px-5 py-2.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold hover:bg-stone-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
