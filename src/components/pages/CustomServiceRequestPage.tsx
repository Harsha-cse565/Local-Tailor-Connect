import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scissors,
  CheckCircle2,
  Upload,
  ArrowRight,
  ArrowLeft,
  Ruler,
  Truck,
  FileText,
  Sparkles,
  Image as ImageIcon,
  Send,
  Building
} from 'lucide-react';

export const CustomServiceRequestPage: React.FC = () => {
  const {
    tailors,
    selectedTailorId,
    measurements,
    createOrder,
    navigateToTrackOrder,
    setCurrentPage,
    showToast
  } = useApp();

  const tailor = tailors.find(t => t.id === selectedTailorId) || tailors[0];

  // Multi-step state (1 to 7)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form data
  const [serviceType, setServiceType] = useState<'New Clothing' | 'Alteration' | 'Repair' | 'Custom Design'>('New Clothing');
  const [garment, setGarment] = useState<string>('Blouse');
  const [requirements, setRequirements] = useState<string>('Need a boat-neck blouse with elbow-length sleeves, subtle golden piping, and built-in cup padding.');
  const [referenceImages, setReferenceImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'
  ]);
  const [measurementMode, setMeasurementMode] = useState<'saved' | 'custom'>('saved');
  const [selectedMeasurementProfileId, setSelectedMeasurementProfileId] = useState<string>(
    measurements[0]?.id || ''
  );
  const [customMeasurements, setCustomMeasurements] = useState({
    bust: 34,
    waist: 28,
    hip: 36,
    shoulder: 14,
    sleeveLength: 17,
    blouseLength: 14,
    notes: ''
  });
  const [deliveryOption, setDeliveryOption] = useState<'Pickup from tailor' | 'Home delivery' | 'Customer pickup'>('Home delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('Flat 3B, Sri Krishna Apartments, Gandhi Nagar, Pudukkottai - 622001');

  const GARMENT_OPTIONS = [
    { name: 'Blouse', category: 'Women', icon: '👘' },
    { name: 'Saree', category: 'Women', icon: '🥻' },
    { name: 'Kurti', category: 'Women', icon: '👗' },
    { name: 'Salwar', category: 'Women', icon: '✨' },
    { name: 'Lehenga', category: 'Bridal', icon: '👑' },
    { name: 'Shirt', category: 'Men', icon: '👔' },
    { name: 'Pant', category: 'Men', icon: '👖' },
    { name: 'Suit', category: 'Men', icon: '🤵' },
    { name: 'Dress', category: 'Women', icon: '🌸' }
  ];

  const REFERENCE_PRESETS = [
    {
      title: 'Boat Neck Golden Piping',
      url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Princess Cut Classic',
      url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Zari Yoke Kurti',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Formal Egyptian Cotton Shirt',
      url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitOrder = () => {
    const selectedProf = measurements.find(m => m.id === selectedMeasurementProfileId);
    const measurementsSummary =
      measurementMode === 'saved' && selectedProf
        ? `${selectedProf.title} (Bust: ${selectedProf.bust || '-'}, Waist: ${selectedProf.waist || '-'}, Shoulder: ${selectedProf.shoulder || '-'})`
        : `Custom: Bust: ${customMeasurements.bust}", Waist: ${customMeasurements.waist}", Shoulder: ${customMeasurements.shoulder}", Sleeve: ${customMeasurements.sleeveLength}"`;

    const newOrderId = createOrder({
      tailorId: tailor.id,
      tailorName: tailor.name,
      serviceType,
      garment,
      requirements,
      referenceImages,
      measurementsSummary,
      deliveryOption,
      deliveryAddress: deliveryOption === 'Home delivery' ? deliveryAddress : undefined,
      amount: garment === 'Blouse' ? 650 : garment === 'Lehenga' ? 1800 : 450
    });

    navigateToTrackOrder(newOrderId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Breadcrumb & Tailor Selection Reminder */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={tailor.avatarUrl}
            alt={tailor.name}
            className="w-12 h-12 rounded-xl object-cover border border-stone-200"
          />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#9E2A2B]">
              Submitting Order To
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">{tailor.name}</h3>
            <p className="text-[11px] text-stone-500">{tailor.city} • Est. 3–4 Days</p>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('find-tailors')}
          className="text-xs font-bold text-stone-600 hover:text-stone-900 underline"
        >
          Change Studio
        </button>
      </div>

      {/* 7-Step Progress Bar Indicator */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700">
          <span className="text-[#9E2A2B]">Step {currentStep} of 7</span>
          <span className="text-stone-500">
            {currentStep === 1 && 'Select Service'}
            {currentStep === 2 && 'Select Garment'}
            {currentStep === 3 && 'Requirements & Specifications'}
            {currentStep === 4 && 'Upload Reference'}
            {currentStep === 5 && 'Body Measurements'}
            {currentStep === 6 && 'Delivery Option'}
            {currentStep === 7 && 'Review & Submit Request'}
          </span>
        </div>

        <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#9E2A2B] to-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-stone-400">
          <span className={currentStep >= 1 ? 'text-[#9E2A2B] font-bold' : ''}>Service</span>
          <span className={currentStep >= 2 ? 'text-[#9E2A2B] font-bold' : ''}>Garment</span>
          <span className={currentStep >= 3 ? 'text-[#9E2A2B] font-bold' : ''}>Details</span>
          <span className={currentStep >= 4 ? 'text-[#9E2A2B] font-bold' : ''}>Photos</span>
          <span className={currentStep >= 5 ? 'text-[#9E2A2B] font-bold' : ''}>Measure</span>
          <span className={currentStep >= 6 ? 'text-[#9E2A2B] font-bold' : ''}>Delivery</span>
          <span className={currentStep >= 7 ? 'text-[#9E2A2B] font-bold' : ''}>Review</span>
        </div>
      </div>

      {/* Step Contents Container */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm min-h-[420px] flex flex-col justify-between space-y-6">
        {/* Step 1: Select Service */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Step 1 — Select Service Type
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Choose the primary tailoring work you need completed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: 'New Clothing',
                  title: 'New Clothing',
                  desc: 'Bespoke stitching from fresh unstitched fabric provided by you or tailor'
                },
                {
                  id: 'Alteration',
                  title: 'Alteration',
                  desc: 'Waist adjustment, length hemming, sleeve shortening or fitting refinement'
                },
                {
                  id: 'Repair',
                  title: 'Repair & Reinforcement',
                  desc: 'Zipper replacement, hook stitching, torn seam fixing or pleat restoration'
                },
                {
                  id: 'Custom Design',
                  title: 'Custom Couture & Bridal Design',
                  desc: 'Full bespoke bridal wear, Aari embroidery, custom pattern making'
                }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => setServiceType(opt.id as any)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    serviceType === opt.id
                      ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-stone-900 text-base">{opt.title}</h4>
                    {serviceType === opt.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#9E2A2B]" />
                    )}
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Garment */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Step 2 — Select Garment
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Which garment would you like {tailor.name} to work on?
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {GARMENT_OPTIONS.map(g => (
                <div
                  key={g.name}
                  onClick={() => setGarment(g.name)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-2 ${
                    garment === g.name
                      ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-3xl">{g.icon}</span>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-sm">{g.name}</h4>
                    <span className="text-[10px] text-stone-400">{g.category}</span>
                  </div>
                  {garment === g.name && (
                    <span className="text-[10px] font-bold text-[#9E2A2B] bg-white px-2 py-0.5 rounded-full shadow-xs">
                      Selected
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Requirements */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Step 3 — Requirements & Styling Details
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Describe your desired neck pattern, sleeve length, cup padding, borders, or any specific instructions.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Describe your requirements…
              </label>
              <textarea
                rows={5}
                value={requirements}
                onChange={e => setRequirements(e.target.value)}
                placeholder="Example: Need a boat-neck blouse with elbow-length sleeves, subtle golden piping, and built-in cup padding for my sister’s wedding reception."
                className="w-full p-4 rounded-2xl border border-stone-300 focus:border-[#9E2A2B] focus:ring-1 focus:ring-[#9E2A2B] text-xs sm:text-sm font-medium text-stone-800 leading-relaxed focus:outline-none"
              />
            </div>

            {/* Quick Inspiration Pills */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-stone-500">Quick suggestions:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Add bra cups / padding',
                  'Elbow length sleeves',
                  'Deep round back neck with dori',
                  'Princess cut with piping',
                  'Hook opening in front',
                  'Side zipper opening',
                  'Pico & falls stitching'
                ].map(chip => (
                  <button
                    key={chip}
                    onClick={() => setRequirements(prev => prev + ` • ${chip}`)}
                    className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1 rounded-lg transition-colors"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Upload Reference */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Step 4 — Upload Reference & Fabric Photos
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Attach reference sketches, Pinterest photos, or a photo of your unstitched fabric.
              </p>
            </div>

            {/* Simulated Upload Box */}
            <div className="border-2 border-dashed border-stone-300 rounded-3xl p-8 text-center hover:border-[#9E2A2B] transition-colors bg-stone-50/50 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#9E2A2B] flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-stone-800">
                Drag and drop your photos here, or click to browse
              </h4>
              <p className="text-[11px] text-stone-500">
                Supports JPG, PNG, WEBP up to 10MB
              </p>
              <button
                type="button"
                onClick={() => {
                  showToast('Sample design reference attached!', 'success');
                }}
                className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 shadow-xs"
              >
                Select Files from Device
              </button>
            </div>

            {/* Or Select from Curated Presets */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Or select from design inspirations:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {REFERENCE_PRESETS.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setReferenceImages([preset.url]);
                      showToast(`Selected "${preset.title}" as reference`, 'info');
                    }}
                    className={`rounded-xl overflow-hidden border-2 cursor-pointer transition-all aspect-square relative group ${
                      referenceImages.includes(preset.url)
                        ? 'border-[#9E2A2B] ring-2 ring-[#9E2A2B]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-2 text-white text-[10px] font-bold">
                      {preset.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Measurements */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Step 5 — Select Body Measurements
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Reuse your saved digital measurement profile or enter fresh numbers.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex gap-3">
              <button
                onClick={() => setMeasurementMode('saved')}
                className={`flex-1 py-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                  measurementMode === 'saved'
                    ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 text-[#9E2A2B]'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Ruler className="w-4 h-4" />
                <span>Use Saved Measurements Vault</span>
              </button>
              <button
                onClick={() => setMeasurementMode('custom')}
                className={`flex-1 py-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                  measurementMode === 'custom'
                    ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 text-[#9E2A2B]'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span>Enter New Measurements</span>
              </button>
            </div>

            {/* Saved Profile Picker */}
            {measurementMode === 'saved' ? (
              <div className="space-y-3">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Choose from your saved profiles:
                </label>
                <div className="space-y-2">
                  {measurements.map(prof => (
                    <div
                      key={prof.id}
                      onClick={() => setSelectedMeasurementProfileId(prof.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        selectedMeasurementProfileId === prof.id
                          ? 'border-[#9E2A2B] bg-[#9E2A2B]/5'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-stone-900 text-sm">
                            {prof.title}
                          </h4>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                            {prof.category}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          Bust: {prof.bust || '-'} in • Waist: {prof.waist || '-'} in • Shoulder: {prof.shoulder || '-'} in • Sleeve: {prof.sleeveLength || '-'} in
                        </p>
                      </div>
                      {selectedMeasurementProfileId === prof.id && (
                        <CheckCircle2 className="w-5 h-5 text-[#9E2A2B]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Custom Inputs */
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-stone-50 p-5 rounded-2xl border border-stone-200">
                {[
                  { key: 'bust', label: 'Bust / Chest (in)' },
                  { key: 'waist', label: 'Waist (in)' },
                  { key: 'hip', label: 'Hip (in)' },
                  { key: 'shoulder', label: 'Shoulder Width (in)' },
                  { key: 'sleeveLength', label: 'Sleeve Length (in)' },
                  { key: 'blouseLength', label: 'Garment Length (in)' }
                ].map(field => (
                  <div key={field.key} className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-600 uppercase">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={(customMeasurements as any)[field.key]}
                      onChange={e =>
                        setCustomMeasurements({
                          ...customMeasurements,
                          [field.key]: Number(e.target.value)
                        })
                      }
                      className="w-full p-2 rounded-xl bg-white border border-stone-300 text-xs font-bold text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 6: Delivery */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Step 6 — Delivery & Collection Options
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                How would you prefer to send fabric and receive your finished garment?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'Pickup from tailor',
                  title: 'Store Trial & Pickup',
                  desc: 'Visit studio in person for trial fitting before final collection'
                },
                {
                  id: 'Home delivery',
                  title: 'Home Delivery',
                  desc: 'Delivered securely to your doorstep wrapped in protective garment cover'
                },
                {
                  id: 'Customer pickup',
                  title: 'Express Counter Pickup',
                  desc: 'Quick pickup directly from the studio counter once marked ready'
                }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => setDeliveryOption(opt.id as any)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-2 ${
                    deliveryOption === opt.id
                      ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-stone-900 text-sm">{opt.title}</h4>
                    {deliveryOption === opt.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#9E2A2B]" />
                    )}
                  </div>
                  <p className="text-xs text-stone-500">{opt.desc}</p>
                </div>
              ))}
            </div>

            {deliveryOption === 'Home delivery' && (
              <div className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Delivery Address
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs font-medium text-stone-800 focus:outline-none focus:border-[#9E2A2B]"
                />
              </div>
            )}
          </div>
        )}

        {/* Step 7: Review & Submit */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Step 7 — Review Request Summary
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Please verify all order specifications before sending to {tailor.name}.
              </p>
            </div>

            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-stone-200">
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Studio</span>
                  <p className="font-bold text-stone-900">{tailor.name}</p>
                </div>
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Service</span>
                  <p className="font-bold text-stone-900">{serviceType}</p>
                </div>
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Garment</span>
                  <p className="font-bold text-stone-900">{garment}</p>
                </div>
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Estimated Date</span>
                  <p className="font-bold text-stone-900">18 Sep 2026</p>
                </div>
              </div>

              <div>
                <span className="text-stone-400 font-bold uppercase text-[10px]">Your Requirements</span>
                <p className="font-medium text-stone-800 mt-1 leading-relaxed">{requirements}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Measurements</span>
                  <p className="font-medium text-stone-800 mt-0.5">
                    {measurementMode === 'saved'
                      ? measurements.find(m => m.id === selectedMeasurementProfileId)?.title
                      : `Custom (${customMeasurements.bust}" Bust, ${customMeasurements.waist}" Waist)`}
                  </p>
                </div>
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Delivery Method</span>
                  <p className="font-medium text-stone-800 mt-0.5">{deliveryOption}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <span className="text-stone-600 font-semibold">Estimated Base Price:</span>
                <span className="font-mono text-base font-extrabold text-[#9E2A2B]">
                  ₹{garment === 'Blouse' ? 650 : garment === 'Lehenga' ? 1800 : 450} (Subject to tailor quote)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Bottom Navigation Buttons */}
        <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-stone-400'
                : 'hover:bg-stone-50 text-stone-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#9E2A2B]/20"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitOrder}
              className="px-8 py-3 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-[#9E2A2B]/30"
            >
              <Send className="w-4 h-4" />
              <span>Submit Request to Tailor</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
