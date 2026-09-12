import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  QrCode,
  Smartphone,
  Building,
  DollarSign,
  IndianRupee,
  FileCheck,
  Receipt
} from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const {
    orders,
    selectedOrderId,
    processPayment,
    navigateToTrackOrder,
    setCurrentPage,
    showToast
  } = useApp();

  const order = orders.find(o => o.id === selectedOrderId) || orders[0];

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Netbanking' | 'Cash on Delivery'>('UPI');
  const [upiId, setUpiId] = useState('priya.sharma@okaxis');
  const [selectedUpiApp, setSelectedUpiApp] = useState('Google Pay');
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    name: 'Priya Sharma',
    expiry: '12/28',
    cvv: '•••'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const basePrice = order ? order.amount : 650;
  const designFee = 150;
  const liningFee = 100;
  const platformFee = 0;
  const totalPayable = basePrice;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    setIsProcessing(true);
    setTimeout(() => {
      processPayment(order.id, paymentMethod);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Breadcrumb */}
      <button
        onClick={() => (order ? navigateToTrackOrder(order.id) : setCurrentPage('customer-dashboard'))}
        className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Order Tracking</span>
      </button>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#9E2A2B] uppercase tracking-wider">
          Secure Tailor Escrow Checkout
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-[#1E2229]">
          Complete Payment for Order #{order?.id}
        </h1>
        <p className="text-xs text-stone-500">
          Funds are held securely in local escrow and only released to {order?.tailorName} once you confirm a satisfactory fitting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Payment Methods */}
        <div className="md:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Select Payment Method
          </h3>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'UPI', label: 'UPI / QR', icon: '📱' },
              { id: 'Card', label: 'Cards', icon: '💳' },
              { id: 'Netbanking', label: 'Net Banking', icon: '🏦' },
              { id: 'Cash on Delivery', label: 'Pay on Trial', icon: '💵' }
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPaymentMethod(m.id as any)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  paymentMethod === m.id
                    ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 font-bold text-[#9E2A2B]'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className="text-xl">{m.icon}</span>
                <span className="text-xs">{m.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handlePay} className="space-y-4 pt-2">
            {/* UPI Option */}
            {paymentMethod === 'UPI' && (
              <div className="space-y-4 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
                <span className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                  Instant UPI Apps
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {['Google Pay', 'PhonePe', 'Paytm'].map(app => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setSelectedUpiApp(app)}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                        selectedUpiApp === app
                          ? 'border-[#9E2A2B] bg-white text-[#9E2A2B] shadow-xs'
                          : 'border-stone-200 bg-white/70 text-stone-600'
                      }`}
                    >
                      {app}
                    </button>
                  ))}
                </div>

                <div className="space-y-1 pt-2">
                  <label className="font-bold text-stone-600 block text-[10px] uppercase">
                    Or Enter VPA / UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-stone-300 font-mono text-xs font-bold text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
                  />
                </div>
              </div>
            )}

            {/* Card Option */}
            {paymentMethod === 'Card' && (
              <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 uppercase text-[10px]">Card Number</label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white border border-stone-300 font-mono text-xs font-bold text-stone-900 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-600 uppercase text-[10px]">Valid Thru</label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white border border-stone-300 font-mono text-xs font-bold text-stone-900 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-stone-600 uppercase text-[10px]">CVV</label>
                    <input
                      type="password"
                      value={cardDetails.cvv}
                      onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white border border-stone-300 font-mono text-xs font-bold text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Cash / Trial Option */}
            {paymentMethod === 'Cash on Delivery' && (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <strong>Pay Upon Satisfactory Fitting:</strong>
                <p className="text-amber-800">
                  Pay cash or scan tailor's UPI QR code directly at your doorstep or studio counter after trying on your garment.
                </p>
              </div>
            )}

            {/* Escrow Guarantee Badge */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                <strong>100% Fit Guarantee:</strong> 1 free complimentary adjustment alteration if the fit isn't spot-on.
              </span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#9E2A2B]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing ? 'Verifying with Bank...' : `Authorize Payment of ₹${totalPayable}`}
              </span>
            </button>
          </form>
        </div>

        {/* Right 5 Cols: Itemized Summary */}
        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Order Breakdown
          </h3>

          <div className="space-y-2.5 text-xs divide-y divide-stone-100">
            <div className="flex justify-between pt-1">
              <span className="text-stone-500">Service:</span>
              <span className="font-bold text-stone-900">{order?.serviceType} ({order?.garment})</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-stone-500">Tailor Studio:</span>
              <span className="font-bold text-stone-900">{order?.tailorName}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-stone-500">Estimated Delivery:</span>
              <span className="font-bold text-stone-900">{order?.estimatedCompletion}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-stone-500">Base Stitching & Finishing:</span>
              <span className="font-mono text-stone-800 font-bold">₹{basePrice - 100}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-stone-500">Lining & Custom Details:</span>
              <span className="font-mono text-stone-800 font-bold">₹100</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-stone-500">Platform Escrow Protection:</span>
              <span className="text-emerald-700 font-bold">FREE (₹0)</span>
            </div>
            <div className="flex justify-between pt-3 text-sm font-bold border-t-2 border-stone-900">
              <span className="text-stone-900">Total Payable:</span>
              <span className="font-mono text-base font-extrabold text-[#9E2A2B]">
                ₹{totalPayable}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                Transaction Successful
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Payment Authorized!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                ₹{totalPayable} held in Escrow for Order #{order?.id}. {order?.tailorName} has been notified to finish and prepare your garment.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl text-xs space-y-1 text-left font-mono">
              <div className="flex justify-between text-stone-500">
                <span>Ref Number:</span>
                <span className="font-bold text-stone-900">TXN-892184129</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Payment Mode:</span>
                <span className="font-bold text-stone-900">{paymentMethod}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                if (order) navigateToTrackOrder(order.id);
              }}
              className="w-full py-3 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold shadow-md shadow-[#9E2A2B]/20"
            >
              View Order Progress Live
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
