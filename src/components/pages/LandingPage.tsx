import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  Clock,
  Scissors,
  CheckCircle2,
  ArrowRight,
  Star,
  Layers,
  Smartphone,
  ChevronRight,
  HeartHandshake,
  Award,
  Users
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    setCurrentPage,
    setRole,
    userLocation,
    setUserLocation,
    pincode,
    setPincode,
    setSelectedServiceFilter,
    setSearchQuery,
    tailors
  } = useApp();

  const [inputPincode, setInputPincode] = useState(pincode);
  const [selectedService, setSelectedService] = useState('All');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPincode) setPincode(inputPincode);
    if (selectedService !== 'All') setSelectedServiceFilter(selectedService);
    setCurrentPage('find-tailors');
  };

  const POPULAR_SERVICES = [
    {
      title: 'Blouse Stitching',
      subtitle: 'Princess cut, boat-neck, Aari & bridal embroidery',
      price: '₹350',
      time: '3–4 days',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      tag: 'Most Popular'
    },
    {
      title: 'Saree Alteration & Falls',
      subtitle: 'Pico, falls stitching, border re-stitching, pleating',
      price: '₹180',
      time: '1–2 days',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      tag: 'Express Service'
    },
    {
      title: 'Men’s Tailoring',
      subtitle: 'Bespoke formal shirts, trousers, safari suits & blazers',
      price: '₹350',
      time: '2–4 days',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
      tag: 'Precision Fit'
    },
    {
      title: 'Women’s Tailoring',
      subtitle: 'Salwar suits, designer kurtis, Anarkalis & festive sets',
      price: '₹450',
      time: '3–5 days',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      tag: 'Custom Craft'
    },
    {
      title: 'Kids & Teens Wear',
      subtitle: 'Traditional Pattu Pavadai, festive kurtas & school uniforms',
      price: '₹300',
      time: '3 days',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
      tag: 'Festive Special'
    },
    {
      title: 'Custom Designs & Gowns',
      subtitle: 'Indo-western gowns, lehenga cholis & evening wear',
      price: '₹1,200',
      time: '5–7 days',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
      tag: 'Couture Studio'
    }
  ];

  const HOW_IT_WORKS_STEPS = [
    {
      step: '01',
      title: '1. Find a Tailor',
      desc: 'Discover verified local tailors near you with real portfolios, reviews, and turnaround estimates.',
      icon: Search
    },
    {
      step: '02',
      title: '2. Share Your Requirements',
      desc: 'Pick your garment style, attach reference images, and select your saved digital measurements.',
      icon: Layers
    },
    {
      step: '03',
      title: '3. Track Your Order',
      desc: 'Know exactly what stage your garment is in: cutting, stitching, alteration, or ready for pickup.',
      icon: Clock
    },
    {
      step: '04',
      title: '4. Get the Perfect Fit',
      desc: 'Collect directly or opt for doorstep delivery. Enjoy guaranteed fitting and hassle-free alterations.',
      icon: CheckCircle2
    }
  ];

  const WHY_US_ITEMS = [
    {
      title: 'Verified Local Tailors',
      desc: 'Every tailor is manually vetted with verified shop identity, physical premises, and craft portfolio.',
      icon: ShieldCheck
    },
    {
      title: 'Reusable Measurements Vault',
      desc: 'Save your measurements once. Reorder anytime for blouses, kurtis, or trousers with 1 click.',
      icon: Scissors
    },
    {
      title: 'Transparent Pricing & Quotes',
      desc: 'Get itemized digital quotations before stitching starts. No surprise charges or hidden fees.',
      icon: Award
    },
    {
      title: 'Real-Time Order Tracking',
      desc: 'From fabric inspection and pattern cutting to final hem stitching, track your order stage by stage.',
      icon: Smartphone
    },
    {
      title: 'Secure Online & UPI Payments',
      desc: 'Pay safely via Google Pay, PhonePe, Cards, or choose Cash on Pickup after trial fitting.',
      icon: HeartHandshake
    },
    {
      title: 'Direct Tailor Messaging',
      desc: 'Chat directly with your master tailor, request neck adjustments, and send reference sketches instantly.',
      icon: Users
    }
  ];

  const TESTIMONIALS = [
    {
      name: 'Priya Sharma',
      city: 'Pudukkottai',
      role: 'Software Consultant',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      garment: 'Silk Saree Blouse',
      comment:
        '“Finding a trustworthy tailor when I moved to Pudukkottai was so stressful until I found Lakshmi Stitching Studio here. The digital measurement profile saved my measurements perfectly and the boat-neck blouse fit like a glove on the very first try!”'
    },
    {
      name: 'Dr. Vigneshwaran K.',
      city: 'Trichy',
      role: 'Physician',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      garment: 'Formal Shirts & Trousers',
      comment:
        '“Classic Men’s Tailors delivered three formal shirts in 4 days. The canvas collar fusing and armhole fit are way superior to readymade luxury brands. The live order tracking kept me updated throughout.”'
    },
    {
      name: 'Meenakshi Sundaram',
      city: 'Madurai',
      role: 'College Professor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      garment: 'Bridal Lehenga & Choli',
      comment:
        '“Sri Devi Tailors in Madurai did marvelous Aari hand embroidery for my daughter’s wedding choli. We approved the quotation in the app and received regular workshop photo updates.”'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#FAF7F2] to-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E2A2B]/10 text-[#9E2A2B] text-xs font-bold tracking-wide uppercase">
                <Scissors className="w-3.5 h-3.5" />
                <span>India’s Modern Local Tailoring Platform</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E2229] leading-[1.12] tracking-tight">
                  Find the Right Tailor. <br />
                  <span className="text-[#9E2A2B] italic">Get the Perfect Fit.</span>
                </h1>
                <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                  Discover trusted local tailors, share your measurements, request custom stitching or alterations, and track your order — all in one place.
                </p>
              </div>

              {/* Location & Service Search Bar Card */}
              <form
                onSubmit={handleHeroSearch}
                className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-stone-200/60 border border-stone-200/80 grid grid-cols-1 sm:grid-cols-12 gap-3"
              >
                {/* Location / Pincode */}
                <div className="sm:col-span-5 flex items-center gap-3 px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <MapPin className="w-4 h-4 text-[#9E2A2B] shrink-0" />
                  <div className="w-full">
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Location / Pincode
                    </label>
                    <input
                      type="text"
                      value={inputPincode}
                      onChange={e => setInputPincode(e.target.value)}
                      placeholder="e.g. Pudukkottai or 622001"
                      className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="sm:col-span-4 flex items-center gap-3 px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <Scissors className="w-4 h-4 text-amber-600 shrink-0" />
                  <div className="w-full">
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Service
                    </label>
                    <select
                      value={selectedService}
                      onChange={e => setSelectedService(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Tailoring Services</option>
                      <option value="Blouse Stitching">Blouse Stitching</option>
                      <option value="Saree Alteration">Saree Alteration & Falls</option>
                      <option value="Salwar Stitching">Salwar & Kurti</option>
                      <option value="Men's Tailoring">Men's Shirts & Pants</option>
                      <option value="Lehenga">Lehenga & Bridal</option>
                      <option value="Express Alteration">Express Alteration</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full h-full min-h-[48px] bg-[#9E2A2B] hover:bg-[#822223] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#9E2A2B]/20 transition-all hover:scale-[1.02]"
                  >
                    <Search className="w-4 h-4" />
                    <span>Find Tailors</span>
                  </button>
                </div>
              </form>

              {/* Action Buttons & Matcher */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => setCurrentPage('find-tailors')}
                  className="px-6 py-3.5 rounded-xl bg-[#1E2229] hover:bg-black text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Browse Nearby Studios</span>
                </button>

                <button
                  onClick={() => setCurrentPage('smart-match')}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-sm font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-stone-900" />
                  <span>Smart Tailor Matcher</span>
                </button>

                <button
                  onClick={() => {
                    setRole('tailor');
                    setCurrentPage('register-tailor');
                  }}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-sm font-bold transition-all flex items-center gap-2"
                >
                  <Scissors className="w-4 h-4 text-[#9E2A2B]" />
                  <span>Become a Partner Tailor</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-stone-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Digital Measurement Vault</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Doorstep Pickup & Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Guaranteed Alteration</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80"
                    alt="Master Indian tailor handcrafting custom attire"
                    className="w-full h-[420px] sm:h-[480px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating Caption inside image */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="font-serif text-lg font-bold">Lakshmi Stitching Studio</p>
                    <p className="text-xs text-stone-200">Bespoke Silk Blouses & Traditional Attire • Pudukkottai</p>
                  </div>
                </div>

                {/* Floating Floating Order Tracking Card */}
                <div 
                  onClick={() => setCurrentPage('track-order')}
                  className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-stone-200/80 max-w-xs cursor-pointer hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center justify-between gap-3 pb-2 border-b border-stone-100">
                    <span className="text-[10px] font-mono font-bold bg-[#9E2A2B]/10 text-[#9E2A2B] px-2 py-0.5 rounded">
                      Order #LTC-10482
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      Stitching
                    </span>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#9E2A2B]">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Blouse Stitching</h4>
                      <p className="text-[11px] text-stone-500">Ready by 18 Sep 2026</p>
                    </div>
                  </div>
                </div>

                {/* Floating Rating Pill */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-stone-200 flex items-center gap-2">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-stone-900">4.8 / 5.0</div>
                    <div className="text-[10px] text-stone-500">12,400+ Fittings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Indicators Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E2229] text-white rounded-3xl p-8 sm:p-10 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-stone-800">
          <div className="pt-4 md:pt-0">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-400">500+</div>
            <div className="text-xs sm:text-sm font-medium text-stone-300 mt-1">Verified Tailor Studios</div>
          </div>
          <div className="pt-4 md:pt-0">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-white">10,000+</div>
            <div className="text-xs sm:text-sm font-medium text-stone-300 mt-1">Orders Handcrafted</div>
          </div>
          <div className="pt-4 md:pt-0">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-400">4.8 / 5</div>
            <div className="text-xs sm:text-sm font-medium text-stone-300 mt-1">Average Fitting Rating</div>
          </div>
          <div className="pt-4 md:pt-0">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-white">50+</div>
            <div className="text-xs sm:text-sm font-medium text-stone-300 mt-1">Cities Across Tamil Nadu</div>
          </div>
        </div>
      </section>

      {/* 3. Popular Tailoring Services */}
      <section id="services-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#9E2A2B] uppercase tracking-wider">
              Tailoring Categories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E2229] mt-1">
              Popular Custom Services
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-xl">
              From traditional bridal blouses with intricate Aari embroidery to crisp formal menswear and same-day alterations.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('find-tailors')}
            className="self-start md:self-auto flex items-center gap-2 text-xs font-bold text-[#9E2A2B] hover:text-[#822223] transition-colors"
          >
            <span>Explore All 24 Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {POPULAR_SERVICES.map((serv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img
                  src={serv.image}
                  alt={serv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#9E2A2B] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {serv.tag}
                </span>
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                  Est. {serv.time}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#9E2A2B] transition-colors">
                      {serv.title}
                    </h3>
                    <span className="text-xs font-extrabold text-[#9E2A2B] bg-amber-50 px-2 py-0.5 rounded">
                      From {serv.price}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                    {serv.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedServiceFilter(serv.title);
                      setCurrentPage('find-tailors');
                    }}
                    className="text-xs font-bold text-stone-700 hover:text-[#9E2A2B] flex items-center gap-1"
                  >
                    <span>View Tailors</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSearchQuery(serv.title);
                      setCurrentPage('request-service');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-semibold shadow-xs"
                  >
                    Request Stitch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works-section" className="bg-[#FAF7F2] py-16 sm:py-20 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#9E2A2B] uppercase tracking-wider">
              Simple & Seamless
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E2229] mt-1">
              How Local Tailor Connect Works
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Transforming traditional neighborhood tailoring into an effortless digital journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm relative group hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#9E2A2B] flex items-center justify-center group-hover:bg-[#9E2A2B] group-hover:text-white transition-colors shadow-xs">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-2xl font-bold text-stone-300">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-[11px] font-bold text-[#9E2A2B]">
                    <span>Step details</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Why Local Tailor Connect Section */}
      <section id="why-us-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#9E2A2B] uppercase tracking-wider">
            Trust & Precision
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E2229] mt-1">
            Why Choose Local Tailor Connect?
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            We preserve the personal artisan craft of your local neighborhood tailor while giving you modern convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US_ITEMS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-[#9E2A2B]/40 hover:shadow-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#9E2A2B]/10 text-[#9E2A2B] flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section className="bg-stone-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Customer Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Loved by Thousands Across Tamil Nadu
            </h2>
            <p className="text-sm text-stone-400 mt-2">
              Real feedback from customers who found their perfect fit with our verified partner tailors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-stone-800/80 rounded-2xl p-6 sm:p-7 border border-stone-700/80 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-block text-[11px] font-semibold bg-stone-700 text-amber-300 px-2.5 py-0.5 rounded-full">
                    {t.garment}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                    {t.comment}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-700">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/50"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[10px] text-stone-400">
                      {t.role} • {t.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Become a Partner Tailor CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#9E2A2B] to-[#7E1F20] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              <Scissors className="w-3.5 h-3.5" /> For Local Tailors & Boutiques
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold leading-tight">
              Grow Your Tailoring Business with Direct Orders
            </h2>
            <p className="text-sm text-stone-200 leading-relaxed">
              Join 500+ verified master tailors. Receive custom stitching orders, send instant digital quotations, schedule customer appointments, and manage workflows online.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setRole('tailor');
                  setCurrentPage('register-tailor');
                }}
                className="px-6 py-3.5 rounded-xl bg-white text-[#9E2A2B] hover:bg-stone-100 text-sm font-bold shadow-lg transition-all"
              >
                Register Your Shop Now (Free)
              </button>
              <button
                onClick={() => {
                  setRole('tailor');
                  setCurrentPage('tailor-dashboard');
                }}
                className="px-6 py-3.5 rounded-xl bg-black/30 hover:bg-black/40 text-white text-sm font-semibold border border-white/20 transition-all"
              >
                View Demo Tailor Studio
              </button>
            </div>
          </div>
          {/* Background Decorative Icon */}
          <Scissors className="absolute -bottom-10 -right-10 w-80 h-80 text-white/5 pointer-events-none rotate-12" />
        </div>
      </section>
    </div>
  );
};
