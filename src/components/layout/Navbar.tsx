import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Scissors, 
  MapPin, 
  Bell, 
  User, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    currentPage,
    setCurrentPage,
    userLocation,
    setUserLocation,
    pincode,
    setPincode,
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    navigateToTrackOrder
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read && (
    role === 'admin' ? n.recipientRole === 'admin' :
    role === 'tailor' ? n.recipientRole === 'tailor' :
    n.recipientRole === 'customer'
  )).length;

  const relevantNotifications = notifications.filter(n => 
    role === 'admin' ? n.recipientRole === 'admin' :
    role === 'tailor' ? n.recipientRole === 'tailor' :
    n.recipientRole === 'customer'
  );

  const CITIES = [
    { city: 'Pudukkottai', pin: '622001', state: 'Tamil Nadu' },
    { city: 'Trichy', pin: '620002', state: 'Tamil Nadu' },
    { city: 'Madurai', pin: '625001', state: 'Tamil Nadu' },
    { city: 'Chennai', pin: '600017', state: 'Tamil Nadu' },
    { city: 'Coimbatore', pin: '641002', state: 'Tamil Nadu' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Demo Bar / Quick Role Switcher Banner */}
      <div className="bg-[#1E2229] text-stone-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#9E2A2B] text-white">
              DEMO MODE
            </span>
            <span className="text-stone-300 hidden sm:inline">
              Switch role to experience Customer, Tailor, or Admin view:
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <button
              onClick={() => setRole('customer')}
              className={`px-2.5 py-0.5 rounded transition-all text-xs flex items-center gap-1 ${
                role === 'customer'
                  ? 'bg-amber-500 text-stone-900 font-bold shadow-xs'
                  : 'hover:bg-white/10 text-stone-300'
              }`}
            >
              <User className="w-3 h-3" /> Customer (Priya)
            </button>
            <span className="text-stone-600">|</span>
            <button
              onClick={() => setRole('tailor')}
              className={`px-2.5 py-0.5 rounded transition-all text-xs flex items-center gap-1 ${
                role === 'tailor'
                  ? 'bg-amber-500 text-stone-900 font-bold shadow-xs'
                  : 'hover:bg-white/10 text-stone-300'
              }`}
            >
              <Scissors className="w-3 h-3" /> Tailor (Lakshmi)
            </button>
            <span className="text-stone-600">|</span>
            <button
              onClick={() => setRole('admin')}
              className={`px-2.5 py-0.5 rounded transition-all text-xs flex items-center gap-1 ${
                role === 'admin'
                  ? 'bg-amber-500 text-stone-900 font-bold shadow-xs'
                  : 'hover:bg-white/10 text-stone-300'
              }`}
            >
              <ShieldCheck className="w-3 h-3" /> Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#9E2A2B] to-[#C84B31] flex items-center justify-center text-white shadow-md shadow-[#9E2A2B]/20 group-hover:scale-105 transition-transform">
              <Scissors className="w-6 h-6 rotate-[-15deg]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1E2229]">
                  Local Tailor <span className="text-[#9E2A2B]">Connect</span>
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium tracking-wide hidden sm:block">
                “Your perfect fit, just around the corner.”
              </p>
            </div>
          </div>

          {/* Location Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100/80 hover:bg-stone-200/70 border border-stone-200 text-xs font-semibold text-stone-800 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#9E2A2B]" />
              <span>{userLocation} ({pincode})</span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>

            {locationDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50">
                <p className="text-[11px] font-semibold text-stone-400 px-3 py-1.5 uppercase tracking-wider">
                  Select Location or Pincode
                </p>
                {CITIES.map(c => (
                  <button
                    key={c.city}
                    onClick={() => {
                      setUserLocation(c.city);
                      setPincode(c.pin);
                      setLocationDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                      userLocation === c.city ? 'bg-amber-50 text-[#9E2A2B] font-bold' : 'hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div>
                      <span className="font-medium">{c.city}</span>
                      <span className="text-[11px] text-stone-400 block">{c.state}</span>
                    </div>
                    <span className="font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded text-[10px]">
                      {c.pin}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => setCurrentPage('landing')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === 'landing' ? 'text-[#9E2A2B] font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('find-tailors')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === 'find-tailors' ? 'text-[#9E2A2B] font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Find Tailors
            </button>
            <button
              onClick={() => setCurrentPage('smart-match')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                currentPage === 'smart-match' ? 'text-[#9E2A2B] font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Smart Match
            </button>
            <button
              onClick={() => {
                setCurrentPage('landing');
                setTimeout(() => {
                  document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => {
                setCurrentPage('landing');
                setTimeout(() => {
                  document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                setCurrentPage('landing');
                setTimeout(() => {
                  document.getElementById('why-us-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              About
            </button>
          </nav>

          {/* Action CTAs and Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl hover:bg-stone-100 text-stone-700 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#9E2A2B] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-stone-900">Notifications</h4>
                      {unreadCount > 0 && (
                        <span className="text-xs bg-[#9E2A2B]/10 text-[#9E2A2B] font-semibold px-2 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-[#9E2A2B] hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-stone-100 mt-2">
                    {relevantNotifications.length === 0 ? (
                      <div className="text-center py-6 text-stone-400 text-xs">
                        No notifications at the moment.
                      </div>
                    ) : (
                      relevantNotifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.orderId) {
                              navigateToTrackOrder(n.orderId);
                              setNotificationsOpen(false);
                            }
                          }}
                          className={`p-3 rounded-xl transition-colors cursor-pointer text-left ${
                            n.read ? 'hover:bg-stone-50 opacity-80' : 'bg-amber-50/50 hover:bg-amber-50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-xs text-stone-900">{n.title}</span>
                            <span className="text-[10px] text-stone-400 whitespace-nowrap">{n.timestamp}</span>
                          </div>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role-Specific Portal Button */}
            {role === 'customer' ? (
              <button
                onClick={() => setCurrentPage('customer-dashboard')}
                className="flex items-center gap-2 bg-[#9E2A2B] hover:bg-[#822223] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-[#9E2A2B]/20 transition-all hover:shadow-lg"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">My Dashboard</span>
                <span className="sm:hidden">Dashboard</span>
              </button>
            ) : role === 'tailor' ? (
              <button
                onClick={() => setCurrentPage('tailor-dashboard')}
                className="flex items-center gap-2 bg-[#9E2A2B] hover:bg-[#822223] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-[#9E2A2B]/20 transition-all hover:shadow-lg"
              >
                <Scissors className="w-4 h-4" />
                <span>Tailor Studio</span>
              </button>
            ) : role === 'admin' ? (
              <button
                onClick={() => setCurrentPage('admin-dashboard')}
                className="flex items-center gap-2 bg-[#1E2229] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Panel</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage('login-customer')}
                  className="px-3 py-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-950"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage('find-tailors')}
                  className="bg-[#9E2A2B] hover:bg-[#822223] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-[#9E2A2B]/20 transition-all"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          {/* Location for mobile */}
          <div className="p-3 bg-stone-50 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9E2A2B]" />
              <span className="font-semibold text-stone-800">{userLocation} ({pincode})</span>
            </div>
            <select
              value={userLocation}
              onChange={e => {
                const found = CITIES.find(c => c.city === e.target.value);
                if (found) {
                  setUserLocation(found.city);
                  setPincode(found.pin);
                }
              }}
              className="bg-white border border-stone-300 rounded px-2 py-1 text-xs"
            >
              {CITIES.map(c => (
                <option key={c.city} value={c.city}>{c.city}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setCurrentPage('landing'); setMobileMenuOpen(false); }}
              className="p-2.5 text-left rounded-lg bg-stone-50 text-xs font-semibold text-stone-800"
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentPage('find-tailors'); setMobileMenuOpen(false); }}
              className="p-2.5 text-left rounded-lg bg-stone-50 text-xs font-semibold text-stone-800"
            >
              Find Tailors
            </button>
            <button
              onClick={() => { setCurrentPage('smart-match'); setMobileMenuOpen(false); }}
              className="p-2.5 text-left rounded-lg bg-amber-50 text-xs font-semibold text-amber-900"
            >
              Smart Match
            </button>
            <button
              onClick={() => { setCurrentPage('measurements'); setMobileMenuOpen(false); }}
              className="p-2.5 text-left rounded-lg bg-stone-50 text-xs font-semibold text-stone-800"
            >
              My Measurements
            </button>
          </div>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => { setCurrentPage('customer-dashboard'); setMobileMenuOpen(false); }}
              className="w-full text-center py-2.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold"
            >
              Customer Dashboard
            </button>
            <button
              onClick={() => { setCurrentPage('tailor-dashboard'); setMobileMenuOpen(false); }}
              className="w-full text-center py-2.5 rounded-xl bg-[#9E2A2B] text-white text-xs font-bold"
            >
              Tailor Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
