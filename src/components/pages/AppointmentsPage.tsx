import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle2,
  User,
  Scissors,
  Home,
  Building,
  Plus,
  ArrowLeft,
  X
} from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const {
    tailors,
    selectedTailorId,
    appointments,
    createAppointment,
    setCurrentPage,
    showToast
  } = useApp();

  const [selectedTailor, setSelectedTailor] = useState<string>(
    selectedTailorId || tailors[0].id
  );
  const [serviceType, setServiceType] = useState<string>('Measurement Taking');
  const [appointmentType, setAppointmentType] = useState<'Studio Visit' | 'Home Visit'>('Studio Visit');
  const [date, setDate] = useState<string>('2026-09-15');
  const [timeSlot, setTimeSlot] = useState<string>('11:30 AM');
  const [address, setAddress] = useState<string>('Flat 3B, Sri Krishna Apts, Pudukkottai');
  const [notes, setNotes] = useState<string>('Need measurements for 2 silk blouses and 1 festive kurti set.');

  const TIME_SLOTS = [
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM'
  ];

  const tailorObj = tailors.find(t => t.id === selectedTailor) || tailors[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAppointment({
      tailorId: tailorObj.id,
      tailorName: tailorObj.name,
      serviceType,
      date,
      timeSlot,
      type: appointmentType,
      address: appointmentType === 'Home Visit' ? address : tailorObj.address,
      notes
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-[#9E2A2B] uppercase tracking-wider">
            In-Person Studio & Home Consultations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E2229] mt-1">
            Book Fitting & Measurement Appointment
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Schedule a dedicated slot for accurate body measurements, trial fitting, or fabric advice.
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
        {/* Left Form: Booking Wizard */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Schedule Your Session
            </h3>

            {/* Select Tailor Studio */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Select Tailor Studio
              </label>
              <select
                value={selectedTailor}
                onChange={e => setSelectedTailor(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-300 font-bold text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
              >
                {tailors.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.city} • {t.distanceKm} km away)
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Reason for Appointment
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Measurement Taking',
                  'Trial Fitting',
                  'Fabric Consultation',
                  'Express Alteration'
                ].map(srv => (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => setServiceType(srv)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      serviceType === srv
                        ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 font-bold text-[#9E2A2B]'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            {/* Studio Visit vs Home Visit */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Appointment Location
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setAppointmentType('Studio Visit')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    appointmentType === 'Studio Visit'
                      ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#9E2A2B]" />
                  <div>
                    <h5 className="font-bold text-stone-900 text-xs">Studio Visit</h5>
                    <span className="text-[10px] text-stone-500">Visit {tailorObj.name}</span>
                  </div>
                </div>

                <div
                  onClick={() => setAppointmentType('Home Visit')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    appointmentType === 'Home Visit'
                      ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Home className="w-5 h-5 text-amber-600" />
                  <div>
                    <h5 className="font-bold text-stone-900 text-xs">Home Visit</h5>
                    <span className="text-[10px] text-stone-500">Tailor visits doorstep (+₹100)</span>
                  </div>
                </div>
              </div>
            </div>

            {appointmentType === 'Home Visit' && (
              <div className="space-y-1 text-xs">
                <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                  Your Home Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-800 focus:outline-none focus:border-[#9E2A2B]"
                />
              </div>
            )}

            {/* Date & Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 font-bold focus:outline-none focus:border-[#9E2A2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                  Select Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 font-bold focus:outline-none focus:border-[#9E2A2B]"
                >
                  {TIME_SLOTS.map(ts => (
                    <option key={ts} value={ts}>
                      {ts}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Special Instructions
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Mention if you are bringing unstitched cloth, or require specific neck measurements..."
                className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-800 focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#9E2A2B]/20 transition-all flex items-center justify-center gap-2"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Confirm & Reserve Appointment Slot</span>
            </button>
          </form>
        </div>

        {/* Right List: Booked Appointments */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Your Scheduled Appointments ({appointments.length})
            </h3>

            {appointments.length === 0 ? (
              <div className="text-center py-8 text-xs text-stone-400 italic">
                No active appointments scheduled.
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map(apt => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-[#9E2A2B]">
                        #{apt.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          apt.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-stone-900">
                        {apt.serviceType} with {apt.tailorName}
                      </h5>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-stone-400" />
                        <span>
                          {apt.date} at {apt.timeSlot}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-600">
                      📍 <strong>{apt.type}:</strong> {apt.address}
                    </p>

                    {apt.notes && (
                      <p className="text-[10px] text-stone-400 italic">
                        "{apt.notes}"
                      </p>
                    )}

                    <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs">
                      <button
                        onClick={() => {
                          showToast('Appointment rescheduled. We notified the tailor studio.', 'info');
                        }}
                        className="text-[11px] font-bold text-stone-600 hover:text-stone-900"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => {
                          showToast('Appointment cancelled successfully.', 'warning');
                        }}
                        className="text-[11px] font-bold text-rose-600 hover:text-rose-800"
                      >
                        Cancel Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
