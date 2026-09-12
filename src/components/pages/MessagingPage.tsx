import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Send,
  Paperclip,
  Phone,
  Image as ImageIcon,
  CheckCircle2,
  Calendar,
  CreditCard,
  FileText,
  Clock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const MessagingPage: React.FC = () => {
  const {
    messages,
    sendMessage,
    orders,
    selectedOrderId,
    setSelectedOrderId,
    currentRole,
    currentUser,
    setCurrentPage,
    navigateToTrackOrder
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const orderMessages = messages.filter(m => m.orderId === activeOrder?.id);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeOrder) return;

    sendMessage(
      activeOrder.id,
      inputMessage.trim(),
      currentRole === 'tailor' ? 'tailor' : 'customer'
    );
    setInputMessage('');
  };

  const quickReplies =
    currentRole === 'customer'
      ? [
          'Can we schedule a fitting trial tomorrow?',
          'Will the neckline be boat-neck with piping?',
          'Can you also provide fabric lining?',
          'When can I expect home delivery?'
        ]
      : [
          'Fabric cutting is completed, starting stitching.',
          'Your blouse is ready for trial fitting!',
          'Please confirm the back neck depth.',
          'Quotation has been updated.'
        ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() =>
            setCurrentPage(
              currentRole === 'tailor' ? 'tailor-dashboard' : 'customer-dashboard'
            )
          }
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs text-stone-500">
          Logged in as: <strong className="text-stone-800 capitalize">{currentRole}</strong>
        </span>
      </div>

      {/* Main Messaging Container */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Sidebar: Orders Conversations List */}
        <div className="md:col-span-4 border-r border-stone-200 p-4 space-y-3 bg-stone-50/50">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="font-serif font-bold text-stone-900 text-sm">
              Order Conversations
            </h3>
            <span className="text-[10px] font-mono font-bold bg-white text-stone-600 px-2 py-0.5 rounded-full border border-stone-200">
              {orders.length}
            </span>
          </div>

          <div className="space-y-2">
            {orders.map(o => {
              const isSelected = o.id === activeOrder?.id;
              const lastMsg = messages
                .filter(m => m.orderId === o.id)
                .slice(-1)[0];

              return (
                <div
                  key={o.id}
                  onClick={() => setSelectedOrderId(o.id)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-[#9E2A2B] shadow-xs'
                      : 'bg-white/60 border-stone-200/80 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#9E2A2B]">
                      #{o.id}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {lastMsg?.timestamp || o.orderDate}
                    </span>
                  </div>

                  <h5 className="font-bold text-stone-900 text-xs mt-1 truncate">
                    {currentRole === 'tailor' ? o.customerName : o.tailorName}
                  </h5>

                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {lastMsg ? lastMsg.text : `${o.garment} • ${o.status}`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Active Chat Window */}
        <div className="md:col-span-8 flex flex-col justify-between bg-white">
          {/* Chat Header with Order Summary */}
          {activeOrder && (
            <div className="p-4 border-b border-stone-200 flex items-center justify-between gap-4 bg-stone-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#9E2A2B] font-serif font-bold text-base flex items-center justify-center">
                  {currentRole === 'tailor'
                    ? activeOrder.customerName[0]
                    : activeOrder.tailorName[0]}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                    {currentRole === 'tailor'
                      ? activeOrder.customerName
                      : activeOrder.tailorName}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500">
                    <span>Order #{activeOrder.id}</span>
                    <span>•</span>
                    <span className="text-[#9E2A2B] font-semibold">{activeOrder.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateToTrackOrder(activeOrder.id)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-800 text-[11px] font-bold hover:bg-stone-50 transition-colors"
                >
                  Order Details
                </button>
                <button
                  onClick={() => setCurrentPage('appointments')}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-[11px] font-bold transition-colors flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Fitting Slot</span>
                </button>
              </div>
            </div>
          )}

          {/* Messages Stream */}
          <div className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[380px] flex-1">
            {orderMessages.length === 0 ? (
              <div className="text-center py-12 text-xs text-stone-400 italic">
                No messages yet. Send a greeting or ask a question below!
              </div>
            ) : (
              orderMessages.map(msg => {
                const isMe =
                  (currentRole === 'customer' && msg.senderRole === 'customer') ||
                  (currentRole === 'tailor' && msg.senderRole === 'tailor');

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-stone-400 mb-1 px-1 font-mono">
                      {msg.senderName} • {msg.timestamp}
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl max-w-sm sm:max-w-md text-xs leading-relaxed ${
                        isMe
                          ? 'bg-[#9E2A2B] text-white rounded-br-xs shadow-xs'
                          : 'bg-stone-100 text-stone-800 rounded-bl-xs border border-stone-200/60'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Reply Chips */}
          <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0">
              Quick:
            </span>
            {quickReplies.map((qr, idx) => (
              <button
                key={idx}
                onClick={() => setInputMessage(qr)}
                className="text-[11px] bg-white hover:bg-stone-200 text-stone-700 px-3 py-1 rounded-full border border-stone-200 whitespace-nowrap transition-colors"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 border-t border-stone-200 flex items-center gap-2">
            <button
              type="button"
              className="p-2 text-stone-400 hover:text-stone-700 rounded-xl transition-colors"
              title="Attach garment or sketch image"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Type your message, alterations request, or fitting question..."
              className="flex-1 text-xs sm:text-sm font-medium text-stone-800 px-3 py-2 bg-stone-50 rounded-xl focus:outline-none focus:bg-white border border-stone-200 focus:border-[#9E2A2B]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
