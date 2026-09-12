import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  SlidersHorizontal,
  Check,
  Calendar,
  Send,
  ExternalLink,
  Navigation,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Scissors
} from 'lucide-react';

export const FindTailorsPage: React.FC = () => {
  const {
    tailors,
    userLocation,
    pincode,
    navigateToTailorProfile,
    navigateToRequestService,
    setCurrentPage,
    setSelectedTailorId
  } = useApp();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [minRating, setMinRating] = useState<number>(4.0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);
  const [onlyHomePickup, setOnlyHomePickup] = useState(false);
  const [onlyDelivery, setOnlyDelivery] = useState(false);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [selectedPinTailorId, setSelectedPinTailorId] = useState<string>('tailor-1');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const ALL_SPECIALIZATIONS = [
    'All',
    'Blouse Stitching',
    'Bridal Wear',
    'Saree Kuchu & Fall',
    'Salwar Kameez',
    'Formal Shirts',
    'Alterations',
    'Lehengas'
  ];

  const filteredTailors = useMemo(() => {
    return tailors.filter(t => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        t.city.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        t.specializations.some(s => s.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        t.services.some(s => s.name.toLowerCase().includes(searchKeyword.toLowerCase()));

      const matchesSpec =
        selectedSpecialization === 'All' ||
        t.specializations.some(s => s.toLowerCase().includes(selectedSpecialization.toLowerCase()));

      const matchesDistance = t.distanceKm <= maxDistance;
      const matchesRating = t.rating >= minRating;
      const matchesPrice = t.startingPrice <= maxPrice;
      const matchesToday = !onlyAvailableToday || t.availableToday;
      const matchesPickup = !onlyHomePickup || t.homePickupAvailable;
      const matchesDelivery = !onlyDelivery || t.deliveryAvailable;
      const matchesExp = t.yearsOfExperience >= minExperience;

      return (
        matchesSearch &&
        matchesSpec &&
        matchesDistance &&
        matchesRating &&
        matchesPrice &&
        matchesToday &&
        matchesPickup &&
        matchesDelivery &&
        matchesExp
      );
    });
  }, [
    tailors,
    searchKeyword,
    selectedSpecialization,
    maxDistance,
    minRating,
    maxPrice,
    onlyAvailableToday,
    onlyHomePickup,
    onlyDelivery,
    minExperience
  ]);

  const activePinTailor = tailors.find(t => t.id === selectedPinTailorId) || filteredTailors[0] || tailors[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-[#9E2A2B] uppercase tracking-wider">
            Explore Verified Artisans
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E2229] mt-1">
            Find the perfect tailor near you
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Showing verified studios in <span className="font-bold text-stone-800">{userLocation} ({pincode})</span> and surrounding areas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('smart-match')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Find My Best Match (AI)</span>
          </button>
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Search Bar */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-200 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 flex items-center gap-3 px-3 py-2 w-full">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            placeholder="Search by service, tailor name, or location (e.g. Blouse, Lakshmi, Madurai)..."
            className="w-full text-xs sm:text-sm font-medium text-stone-800 bg-transparent focus:outline-none placeholder:text-stone-400"
          />
        </div>
        {searchKeyword && (
          <button
            onClick={() => setSearchKeyword('')}
            className="text-xs text-stone-400 hover:text-stone-700 font-medium px-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Interactive Map-Style Section with Pins */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 relative overflow-hidden shadow-xl border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-lg font-bold text-white">
              Nearby Tailor Studios Map
            </h3>
            <span className="text-xs text-stone-400">
              ({filteredTailors.length} active within {maxDistance} km)
            </span>
          </div>
          <span className="text-[11px] text-amber-400 bg-stone-800/80 px-3 py-1 rounded-full">
            📍 Click any marker on the map to preview studio
          </span>
        </div>

        {/* Map Canvas Mock with Stylized Grid & Interactive Location Pins */}
        <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-[#23272F] overflow-hidden border border-stone-700/60 flex items-center justify-center">
          {/* Stylized streets grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 Q200,60 400,120 T800,100" fill="none" stroke="#D4A373" strokeWidth="2" strokeDasharray="4,4" />
            <path d="M100,0 Q160,180 300,280" fill="none" stroke="#D4A373" strokeWidth="2" strokeDasharray="4,4" />
            <path d="M500,280 Q650,150 800,200" fill="none" stroke="#D4A373" strokeWidth="2" strokeDasharray="4,4" />
          </svg>

          {/* User Location Center Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none">
            <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400 animate-ping absolute" />
            <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-[10px] shadow-lg">
              You
            </div>
            <span className="text-[10px] font-bold text-blue-200 mt-1 bg-black/60 px-2 py-0.5 rounded">
              {userLocation}
            </span>
          </div>

          {/* Pins for Each Tailor */}
          {filteredTailors.map((tailor, idx) => {
            const positions = [
              { top: '35%', left: '42%' },
              { top: '28%', left: '68%' },
              { top: '65%', left: '32%' },
              { top: '62%', left: '60%' },
              { top: '20%', left: '25%' },
              { top: '75%', left: '78%' }
            ];
            const pos = positions[idx % positions.length];
            const isSelected = selectedPinTailorId === tailor.id;

            return (
              <button
                key={tailor.id}
                onClick={() => setSelectedPinTailorId(tailor.id)}
                style={{ top: pos.top, left: pos.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group transition-transform ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-lg border transition-all ${
                    isSelected
                      ? 'bg-[#9E2A2B] text-white border-amber-400 ring-2 ring-amber-400'
                      : 'bg-white text-stone-900 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-amber-500" />
                  <span>{tailor.name.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-80">({tailor.distanceKm}km)</span>
                </div>
                <div className="w-2 h-2 bg-[#9E2A2B] rotate-45 -mt-1 shadow-sm" />
              </button>
            );
          })}

          {/* Active Tailor Floating Card on bottom right of map */}
          {activePinTailor && (
            <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-xs bg-white/95 backdrop-blur-md text-stone-900 p-3 rounded-2xl shadow-xl border border-stone-200 z-30 animate-in fade-in">
              <div className="flex items-center gap-3">
                <img
                  src={activePinTailor.avatarUrl}
                  alt={activePinTailor.name}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {activePinTailor.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                    <span className="flex items-center text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 inline mr-0.5" />
                      {activePinTailor.rating} ({activePinTailor.reviewCount})
                    </span>
                    <span>•</span>
                    <span>{activePinTailor.distanceKm} km away</span>
                  </div>
                  <p className="text-[10px] text-stone-600 mt-0.5">
                    Starts at ₹{activePinTailor.startingPrice}
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => navigateToTailorProfile(activePinTailor.id)}
                  className="flex-1 py-1 text-center bg-[#9E2A2B] text-white text-[11px] font-bold rounded-lg hover:bg-[#822223]"
                >
                  View Profile
                </button>
                <button
                  onClick={() => navigateToRequestService(activePinTailor.id)}
                  className="flex-1 py-1 text-center bg-amber-500 text-stone-950 text-[11px] font-bold rounded-lg hover:bg-amber-600"
                >
                  Request Stitch
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Two-Column Layout: Left Filters, Right Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filters Panel */}
        <div
          className={`lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-6 ${
            showFiltersMobile ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-serif font-bold text-stone-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#9E2A2B]" /> Filter Tailors
            </h3>
            <button
              onClick={() => {
                setSelectedSpecialization('All');
                setMaxDistance(10);
                setMinRating(4.0);
                setMaxPrice(1000);
                setOnlyAvailableToday(false);
                setOnlyHomePickup(false);
                setOnlyDelivery(false);
                setMinExperience(0);
                setSearchKeyword('');
              }}
              className="text-xs text-[#9E2A2B] hover:underline font-medium"
            >
              Reset All
            </button>
          </div>

          {/* Specialization Chips */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Specialization
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_SPECIALIZATIONS.map(spec => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialization(spec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedSpecialization === spec
                      ? 'bg-[#9E2A2B] text-white font-bold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span>Maximum Distance</span>
              <span className="text-[#9E2A2B]">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={maxDistance}
              onChange={e => setMaxDistance(Number(e.target.value))}
              className="w-full accent-[#9E2A2B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>1 km</span>
              <span>10 km</span>
              <span>25 km</span>
            </div>
          </div>

          {/* Starting Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span>Starting Price Range</span>
              <span className="text-[#9E2A2B]">Up to ₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="150"
              max="1500"
              step="50"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#9E2A2B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>₹150</span>
              <span>₹750</span>
              <span>₹1,500</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Minimum Rating
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[4.0, 4.5, 4.7, 4.9].map(r => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-colors flex items-center justify-center gap-1 ${
                    minRating === r
                      ? 'bg-amber-500 text-stone-950 border-amber-500'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>{r}+</span>
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Tailor Experience
            </label>
            <select
              value={minExperience}
              onChange={e => setMinExperience(Number(e.target.value))}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800"
            >
              <option value={0}>Any Experience</option>
              <option value={5}>5+ Years in Tailoring</option>
              <option value={10}>10+ Years Master Artisans</option>
              <option value={15}>15+ Years Heritage Master</option>
            </select>
          </div>

          {/* Availability & Delivery Checkboxes */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <label className="flex items-center gap-2.5 text-xs font-medium text-stone-800 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyAvailableToday}
                onChange={e => setOnlyAvailableToday(e.target.checked)}
                className="w-4 h-4 rounded text-[#9E2A2B] accent-[#9E2A2B]"
              />
              <span>Available Today for Urgent Orders</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs font-medium text-stone-800 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyHomePickup}
                onChange={e => setOnlyHomePickup(e.target.checked)}
                className="w-4 h-4 rounded text-[#9E2A2B] accent-[#9E2A2B]"
              />
              <span>Home Fabric Pickup Available</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs font-medium text-stone-800 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyDelivery}
                onChange={e => setOnlyDelivery(e.target.checked)}
                className="w-4 h-4 rounded text-[#9E2A2B] accent-[#9E2A2B]"
              />
              <span>Doorstep Finished Delivery</span>
            </label>
          </div>
        </div>

        {/* Right Tailor Cards Listing */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>
              Found <strong className="text-stone-900">{filteredTailors.length}</strong> matching tailors
            </span>
            <span>Sorted by closest distance</span>
          </div>

          {filteredTailors.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300 space-y-4">
              <Scissors className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-stone-800">
                No tailors matched your exact filters
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try widening your distance limit or clearing specific specialization filters.
              </p>
              <button
                onClick={() => {
                  setMaxDistance(25);
                  setSelectedSpecialization('All');
                  setSearchKeyword('');
                }}
                className="px-4 py-2 rounded-xl bg-[#9E2A2B] text-white text-xs font-bold shadow-xs"
              >
                Expand Search Range
              </button>
            </div>
          ) : (
            filteredTailors.map(tailor => (
              <div
                key={tailor.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:shadow-xl transition-all space-y-5 group"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Avatar & Title */}
                  <div className="flex items-center gap-4">
                    <img
                      src={tailor.avatarUrl}
                      alt={tailor.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3
                          onClick={() => navigateToTailorProfile(tailor.id)}
                          className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#9E2A2B] transition-colors cursor-pointer"
                        >
                          {tailor.name}
                        </h3>
                        {tailor.verificationStatus === 'verified' && (
                          <span title="Verified Studio">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-stone-500 mt-1">
                        <span className="flex items-center font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                          {tailor.rating} ({tailor.reviewCount} reviews)
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          {tailor.distanceKm} km away • {tailor.city}
                        </span>
                        <span>•</span>
                        <span>{tailor.yearsOfExperience} yrs exp</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Availability Tag */}
                  <div className="sm:text-right">
                    <div className="text-xs font-bold text-stone-500">Starting from</div>
                    <div className="text-2xl font-extrabold text-[#9E2A2B] font-mono">
                      ₹{tailor.startingPrice}
                    </div>
                    {tailor.availableToday && (
                      <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                        ● Available Today
                      </span>
                    )}
                  </div>
                </div>

                {/* Specialization Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-stone-500 mr-1">Specializes in:</span>
                  {tailor.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 px-2.5 py-1 rounded-lg font-medium transition-colors"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* About Excerpt */}
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                  {tailor.about}
                </p>

                {/* Services Micro-Table / Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {tailor.services.slice(0, 4).map((s, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <span className="font-medium text-stone-800 block truncate">{s.name}</span>
                      <span className="text-[11px] font-bold text-[#9E2A2B]">₹{s.startingPrice}</span>
                      <span className="text-[10px] text-stone-400 block">({s.estimatedTime})</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
                  <div className="flex items-center gap-4 text-xs text-stone-500">
                    {tailor.homePickupAvailable && (
                      <span className="flex items-center gap-1 text-emerald-700 font-medium">
                        ✓ Home Pickup
                      </span>
                    )}
                    {tailor.deliveryAvailable && (
                      <span className="flex items-center gap-1 text-emerald-700 font-medium">
                        ✓ Doorstep Delivery
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateToTailorProfile(tailor.id)}
                      className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTailorId(tailor.id);
                        setCurrentPage('appointments');
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Slot</span>
                    </button>
                    <button
                      onClick={() => navigateToRequestService(tailor.id)}
                      className="px-5 py-2 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Service</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
