import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MeasurementProfile } from '../../types';
import {
  Ruler,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Lock,
  Copy,
  Info,
  HelpCircle,
  Scissors
} from 'lucide-react';

export const MeasurementsPage: React.FC = () => {
  const { measurements, saveMeasurement, deleteMeasurement, showToast, setCurrentPage } = useApp();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<MeasurementProfile>>({
    title: 'Traditional Wear',
    category: 'Blouse',
    bust: 34,
    waist: 28,
    hip: 36,
    shoulder: 14,
    sleeveLength: 17,
    blouseLength: 14,
    armhole: 15.5,
    frontNeckDepth: 6.5,
    backNeckDepth: 8.5,
    notes: 'Prefer comfortable padding and deep round back neck with tassels.'
  });

  const startEdit = (m: MeasurementProfile) => {
    setEditingId(m.id);
    setIsCreatingNew(false);
    setFormData(m);
  };

  const startCreate = () => {
    setIsCreatingNew(true);
    setEditingId(null);
    setFormData({
      title: 'New Custom Profile',
      category: 'Blouse',
      bust: 34,
      waist: 28,
      hip: 36,
      shoulder: 14,
      sleeveLength: 16,
      blouseLength: 14,
      armhole: 15.5,
      frontNeckDepth: 6.5,
      backNeckDepth: 8,
      notes: ''
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showToast('Please enter a profile title', 'warning');
      return;
    }

    saveMeasurement(
      {
        title: formData.title || 'My Measurement Profile',
        category: formData.category || 'Blouse',
        bust: Number(formData.bust) || 0,
        waist: Number(formData.waist) || 0,
        hip: Number(formData.hip) || 0,
        shoulder: Number(formData.shoulder) || 0,
        sleeveLength: Number(formData.sleeveLength) || 0,
        blouseLength: Number(formData.blouseLength) || 0,
        armhole: Number(formData.armhole) || 0,
        frontNeckDepth: Number(formData.frontNeckDepth) || 0,
        backNeckDepth: Number(formData.backNeckDepth) || 0,
        chest: Number(formData.chest) || 0,
        inseam: Number(formData.inseam) || 0,
        shirtLength: Number(formData.shirtLength) || 0,
        pantLength: Number(formData.pantLength) || 0,
        notes: formData.notes || ''
      },
      editingId || undefined
    );

    setEditingId(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Reassurance */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-[#9E2A2B] uppercase tracking-wider">
            Reusable Digital Fitting
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E2229] mt-1">
            My Measurement Profile
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Save and reuse your body dimensions across different tailors and styles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGuideModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-stone-600" />
            <span>How to Measure Guide</span>
          </button>
          <button
            onClick={startCreate}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#9E2A2B]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Profile</span>
          </button>
        </div>
      </div>

      {/* Security Reassurance Notice as requested */}
      <div className="bg-emerald-900 text-emerald-50 p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 shadow-sm border border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Private & Encrypted Measurement Vault</h4>
            <p className="text-[11px] text-emerald-200">
              “Your measurements are securely stored and can be reused for future orders.”
            </p>
          </div>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-800/80 text-emerald-200 px-2.5 py-1 rounded-full hidden sm:inline">
          Tamper-Proof
        </span>
      </div>

      {/* Form Card if Creating or Editing */}
      {(isCreatingNew || editingId) && (
        <form
          onSubmit={handleSave}
          className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#9E2A2B] shadow-xl space-y-6 animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              {isCreatingNew ? 'Create New Measurement Profile' : `Edit Profile: ${formData.title}`}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsCreatingNew(false);
                setEditingId(null);
              }}
              className="text-xs text-stone-400 hover:text-stone-700 font-bold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Profile Title (e.g. Traditional Wear, Office Wear)
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Garment Category
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
              >
                <option value="Blouse">Blouse / Choli</option>
                <option value="Kurti">Kurti / Salwar</option>
                <option value="Saree/Choli">Saree / Lehenga Set</option>
                <option value="Men Shirt">Men's Shirt</option>
                <option value="Men Pant">Men's Pant</option>
                <option value="General">General / Custom</option>
              </select>
            </div>
          </div>

          {/* Measurements Grid */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Core Body Dimensions (in inches)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              {[
                { key: 'bust', label: 'Bust / Chest' },
                { key: 'waist', label: 'Waist' },
                { key: 'hip', label: 'Hip' },
                { key: 'shoulder', label: 'Shoulder Width' },
                { key: 'sleeveLength', label: 'Sleeve Length' },
                { key: 'blouseLength', label: 'Garment Length' },
                { key: 'armhole', label: 'Armhole Circumference' },
                { key: 'frontNeckDepth', label: 'Front Neck Depth' },
                { key: 'backNeckDepth', label: 'Back Neck Depth' }
              ].map(f => (
                <div key={f.key} className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-600">{f.label}</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.25"
                      value={(formData as any)[f.key] || ''}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          [f.key]: Number(e.target.value)
                        })
                      }
                      className="w-full p-2 pr-7 rounded-lg bg-white border border-stone-300 text-xs font-bold text-stone-900 focus:outline-none focus:border-[#9E2A2B]"
                    />
                    <span className="absolute right-2 top-2 text-[10px] text-stone-400 font-mono">in</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Special Tailoring Notes & Preferences
            </label>
            <textarea
              rows={3}
              value={formData.notes || ''}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Prefer slightly loose armhole, always add built-in cup padding, deep back neck with dori."
              className="w-full p-3 rounded-xl border border-stone-300 text-xs font-medium text-stone-800 focus:outline-none focus:border-[#9E2A2B]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsCreatingNew(false);
                setEditingId(null);
              }}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold shadow-md shadow-[#9E2A2B]/20"
            >
              Save Profile
            </button>
          </div>
        </form>
      )}

      {/* Profiles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {measurements.map(profile => (
          <div
            key={profile.id}
            className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                    {profile.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mt-1">
                    {profile.title}
                  </h3>
                  <span className="text-[10px] text-stone-400">
                    Updated on {profile.updatedAt}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEdit(profile)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                    title="Edit profile"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {measurements.length > 1 && (
                    <button
                      onClick={() => deleteMeasurement(profile.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Exact Specs Checklist Matching Prompt */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-2xl border border-stone-100 font-mono">
                {profile.bust && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Bust:</span>
                    <strong className="text-stone-900">{profile.bust} in</strong>
                  </div>
                )}
                {profile.waist && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Waist:</span>
                    <strong className="text-stone-900">{profile.waist} in</strong>
                  </div>
                )}
                {profile.hip && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Hip:</span>
                    <strong className="text-stone-900">{profile.hip} in</strong>
                  </div>
                )}
                {profile.shoulder && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Shoulder:</span>
                    <strong className="text-stone-900">{profile.shoulder} in</strong>
                  </div>
                )}
                {profile.sleeveLength && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Sleeve:</span>
                    <strong className="text-stone-900">{profile.sleeveLength} in</strong>
                  </div>
                )}
                {profile.blouseLength && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Length:</span>
                    <strong className="text-stone-900">{profile.blouseLength} in</strong>
                  </div>
                )}
              </div>

              {profile.notes && (
                <p className="text-[11px] text-stone-500 italic bg-amber-50/50 p-2.5 rounded-xl border border-amber-100 leading-relaxed">
                  "{profile.notes}"
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                onClick={() => startEdit(profile)}
                className="text-xs font-bold text-stone-700 hover:text-[#9E2A2B] transition-colors"
              >
                Edit Measurements
              </button>
              <button
                onClick={() => {
                  setCurrentPage('request-service');
                  showToast(`Selected "${profile.title}" for next order!`, 'info');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#9E2A2B] hover:bg-[#822223] text-white text-xs font-bold shadow-xs transition-colors"
              >
                Use in New Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Measurement Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-stone-100">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                How to Take Accurate Blouse & Garment Measurements
              </h3>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-600 leading-relaxed max-h-96 overflow-y-auto pr-1">
              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <strong className="text-stone-900 block">1. Bust / Chest</strong>
                <p>Wrap the measuring tape around the fullest part of your bust. Keep the tape level across your shoulder blades.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <strong className="text-stone-900 block">2. Waist</strong>
                <p>Measure right around your natural waistline, where you want the lower rim of the blouse or waistband to rest.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <strong className="text-stone-900 block">3. Shoulder Width</strong>
                <p>Measure from the tip of one shoulder joint across the back of the neck to the tip of the opposite shoulder.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <strong className="text-stone-900 block">4. Sleeve Length</strong>
                <p>From shoulder bone downwards. Short sleeves (5–7 in), Elbow length (10–12 in), 3/4th (15–17 in), Full (20–22 in).</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <strong className="text-stone-900 block">5. Blouse Length</strong>
                <p>From high shoulder point (beside collarbone) down to desired bottom hem (typically 13.5 to 15 inches).</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2 rounded-xl bg-[#9E2A2B] text-white text-xs font-bold"
              >
                Got It, Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
