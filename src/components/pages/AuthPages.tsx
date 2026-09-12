import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scissors,
  User,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';

export const AuthPages: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    setCurrentPage,
    registerTailor,
    showToast
  } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [roleMode, setRoleMode] = useState<'customer' | 'tailor'>('customer');

  // Customer Login State
  const [phoneOrEmail, setPhoneOrEmail] = useState('priya.sharma@example.com');
  const [password, setPassword] = useState('••••••••');

  // Tailor Registration State
  const [tailorForm, setTailorForm] = useState({
    name: 'Sri Meenakshi Tailoring Works',
    ownerName: 'M. Senthil Kumar',
    phone: '+91 94432 18920',
    email: 'senthil.tailor@example.com',
    city: 'Pudukkottai',
    address: '42 South Raja Street, Pudukkottai',
    yearsOfExperience: 14,
    startingPrice: 300,
    specializations: 'Blouse Stitching, Saree Kuchu, Salwar Kameez',
    about: 'Experienced custom tailoring studio established in 2012 with 3 master cutting artisans.'
  });

  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole('customer');
    showToast('Logged in successfully as Customer!', 'success');
    setCurrentPage('customer-dashboard');
  };

  const handleTailorRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerTailor({
      name: tailorForm.name,
      ownerName: tailorForm.ownerName,
      phone: tailorForm.phone,
      email: tailorForm.email,
      city: tailorForm.city,
      address: tailorForm.address,
      yearsOfExperience: Number(tailorForm.yearsOfExperience),
      startingPrice: Number(tailorForm.startingPrice),
      specializations: tailorForm.specializations.split(',').map(s => s.trim()),
      about: tailorForm.about
    });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 bg-[#9E2A2B]/10 rounded-2xl flex items-center justify-center mx-auto text-[#9E2A2B]">
          <Scissors className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-3xl font-extrabold text-[#1E2229]">
          {authMode === 'login' ? 'Sign in to Local Tailor Connect' : 'Join Our Artisan Network'}
        </h1>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Connecting customers with verified neighborhood tailor studios for custom-fit clothing.
        </p>
      </div>

      {/* Role Picker (Customer vs Tailor Partner) */}
      <div className="flex bg-stone-100 p-1 rounded-2xl">
        <button
          onClick={() => setRoleMode('customer')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            roleMode === 'customer'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <User className="w-4 h-4 text-[#9E2A2B]" />
          <span>I am a Customer</span>
        </button>

        <button
          onClick={() => setRoleMode('tailor')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            roleMode === 'tailor'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Building className="w-4 h-4 text-amber-600" />
          <span>I am a Tailor / Studio</span>
        </button>
      </div>

      {/* Toggle Login / Register */}
      <div className="flex justify-center gap-4 text-xs font-bold border-b border-stone-200 pb-2">
        <button
          onClick={() => setAuthMode('login')}
          className={`${authMode === 'login' ? 'text-[#9E2A2B] border-b-2 border-[#9E2A2B]' : 'text-stone-400'}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setAuthMode('register')}
          className={`${authMode === 'register' ? 'text-[#9E2A2B] border-b-2 border-[#9E2A2B]' : 'text-stone-400'}`}
        >
          {roleMode === 'tailor' ? 'Register Tailor Studio' : 'Create Customer Account'}
        </button>
      </div>

      {/* Auth Form Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
        {authMode === 'login' ? (
          <form onSubmit={handleCustomerLogin} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Email or Mobile Number
              </label>
              <input
                type="text"
                required
                value={phoneOrEmail}
                onChange={e => setPhoneOrEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Password / OTP
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white font-bold text-xs shadow-md shadow-[#9E2A2B]/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Sign In as {roleMode === 'customer' ? 'Customer' : 'Tailor Partner'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  if (roleMode === 'customer') {
                    setCurrentRole('customer');
                    setCurrentPage('customer-dashboard');
                    showToast('Quick Demo login as Customer Priya Sharma!', 'info');
                  } else {
                    setCurrentRole('tailor');
                    setCurrentPage('tailor-dashboard');
                    showToast('Quick Demo login as Master Tailor Lakshmi!', 'info');
                  }
                }}
                className="text-[11px] font-bold text-amber-700 hover:underline"
              >
                ⚡ Instant One-Click Demo Login
              </button>
            </div>
          </form>
        ) : roleMode === 'tailor' ? (
          /* Tailor Partner Onboarding Form */
          <form onSubmit={handleTailorRegister} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Tailoring Shop / Studio Name
              </label>
              <input
                type="text"
                required
                value={tailorForm.name}
                onChange={e => setTailorForm({ ...tailorForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 font-bold text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                  Proprietor / Master Name
                </label>
                <input
                  type="text"
                  required
                  value={tailorForm.ownerName}
                  onChange={e => setTailorForm({ ...tailorForm, ownerName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  required
                  value={tailorForm.yearsOfExperience}
                  onChange={e => setTailorForm({ ...tailorForm, yearsOfExperience: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={tailorForm.phone}
                  onChange={e => setTailorForm({ ...tailorForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                  City / Town
                </label>
                <input
                  type="text"
                  required
                  value={tailorForm.city}
                  onChange={e => setTailorForm({ ...tailorForm, city: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Full Street Address
              </label>
              <input
                type="text"
                required
                value={tailorForm.address}
                onChange={e => setTailorForm({ ...tailorForm, address: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Specializations (comma separated)
              </label>
              <input
                type="text"
                value={tailorForm.specializations}
                onChange={e => setTailorForm({ ...tailorForm, specializations: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Brief Workshop Bio
              </label>
              <textarea
                rows={2}
                value={tailorForm.about}
                onChange={e => setTailorForm({ ...tailorForm, about: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white font-bold text-xs shadow-md shadow-[#9E2A2B]/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Submit Studio Application for Verification</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Customer Registration */
          <form onSubmit={handleCustomerLogin} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Full Name
              </label>
              <input
                type="text"
                required
                defaultValue="Priya Sharma"
                className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                Mobile Number
              </label>
              <input
                type="text"
                required
                defaultValue="+91 98401 23456"
                className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white font-bold text-xs shadow-md shadow-[#9E2A2B]/20 transition-all"
            >
              Register Customer Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
