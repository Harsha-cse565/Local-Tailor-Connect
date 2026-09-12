import React from 'react';
import { useApp } from '../../context/AppContext';
import { Scissors, MapPin, Phone, Mail, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setRole } = useApp();

  return (
    <footer className="bg-[#181B20] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9E2A2B] to-[#C84B31] flex items-center justify-center text-white shadow-md">
                <Scissors className="w-5 h-5 rotate-[-15deg]" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Local Tailor <span className="text-amber-500">Connect</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              “Your perfect fit, just around the corner.”
            </p>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Connecting you directly with master local artisans, tailors, and boutique studios across Tamil Nadu & India. Experience precision hand-stitching with digital ease.
            </p>
            <div className="flex items-center gap-3 pt-2 text-stone-400 text-xs">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Verified Tailors
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-400" /> First-Time Fit Promise
              </span>
            </div>
          </div>

          {/* Customer Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wide uppercase">
              For Customers
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setCurrentPage('find-tailors')} className="hover:text-white transition-colors">
                  Find Tailors Near Me
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('smart-match')} className="hover:text-white transition-colors">
                  Smart Tailor Matcher
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('request-service')} className="hover:text-white transition-colors">
                  Request Custom Stitching
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('measurements')} className="hover:text-white transition-colors">
                  Digital Measurement Vault
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('track-order')} className="hover:text-white transition-colors">
                  Live Order Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('login-customer')} className="hover:text-white transition-colors">
                  Customer Sign In
                </button>
              </li>
            </ul>
          </div>

          {/* Tailor Partner Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wide uppercase">
              For Tailors
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => { setRole('tailor'); setCurrentPage('register-tailor'); }} 
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  Register Your Shop (Free)
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('tailor'); setCurrentPage('tailor-dashboard'); }} className="hover:text-white transition-colors">
                  Tailor Studio Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('how-it-works')} className="hover:text-white transition-colors">
                  How Tailor Connect Works
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('tailor'); setCurrentPage('login-tailor'); }} className="hover:text-white transition-colors">
                  Partner Tailor Login
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('admin'); setCurrentPage('admin-dashboard'); }} className="text-stone-500 hover:text-stone-400 transition-colors">
                  Admin Verification Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Cities & Help */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wide uppercase">
              Cities Covered
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-stone-400">
              <span className="px-2 py-1 rounded bg-stone-800 text-stone-300">Pudukkottai</span>
              <span className="px-2 py-1 rounded bg-stone-800 text-stone-300">Trichy</span>
              <span className="px-2 py-1 rounded bg-stone-800 text-stone-300">Madurai</span>
              <span className="px-2 py-1 rounded bg-stone-800 text-stone-300">Chennai</span>
              <span className="px-2 py-1 rounded bg-stone-800 text-stone-300">Coimbatore</span>
              <span className="px-2 py-1 rounded bg-stone-800 text-stone-300">Salem</span>
              <span className="px-2 py-1 rounded bg-stone-800 text-stone-300">Tirunelveli</span>
            </div>
            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>support@localtailor.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+91 1800-419-FITTER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Local Tailor Connect Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-stone-400 cursor-pointer">Security & Measurement Vault</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
