'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Save, UploadCloud } from 'lucide-react';
import Image from 'next/image';

const PAGES = ['home', 'about', 'services', 'portfolio', 'contact'];
const LANGUAGES = ['en', 'es', 'fr'];

export default function PagesManager() {
  const [activePage, setActivePage] = useState('home');
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState('en');

  // Fetch data when page changes
  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'pages', activePage);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setData({}); // Empty state
        }
      } catch (err) {
        console.error('Error fetching page:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, [activePage]);

  const handleTextChange = (field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      [field]: {
        ...(prev[field] || {}),
        [activeLang]: value
      }
    }));
  };

  const handleSimpleChange = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const savePage = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'pages', activePage), {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });
      alert('Page saved successfully! Changes are now live.');
    } catch (err) {
      console.error(err);
      alert('Failed to save page.');
    } finally {
      setSaving(false);
    }
  };

  const uploadToCloudflare = async (file: File) => {
    const res = await fetch('/api/upload-url', { method: 'POST' });
    const { success, uploadURL, id, error } = await res.json();
    if (!success) throw new Error(error || 'Failed to get upload URL');

    const formData = new FormData();
    formData.append('file', file);

    const uploadRes = await fetch(uploadURL, { method: 'POST', body: formData });
    const uploadData = await uploadRes.json();
    if (!uploadData.success) throw new Error('Failed to upload image');

    return `https://imagedelivery.net/eJfkbxcvXp804aif1wioXw/${id}/public`;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const url = await uploadToCloudflare(file);
        handleSimpleChange(field, url);
      } catch (err) {
        alert('Image upload failed.');
      }
    }
  };

  const renderField = (label: string, field: string, type: 'text' | 'textarea' | 'image' | 'select' | 'range' = 'text', options?: { label: string, value: string }[]) => {
    if (type === 'image') {
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>
          <div className="border-2 border-dashed border-zinc-700 rounded-xl p-4 text-center relative hover:bg-zinc-800/50 transition-colors">
            {data[field] ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-2">
                <img src={data[field]} alt="preview" className="object-cover w-full h-full" />
              </div>
            ) : (
              <UploadCloud className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
            )}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, field)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <p className="text-zinc-400 text-xs mt-2">Click to replace image</p>
          </div>
        </div>
      );
    }

    if (type === 'select' && options) {
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>
          <select
            value={data[field] || options[0].value}
            onChange={(e) => handleSimpleChange(field, e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    }

    if (type === 'range') {
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-400 mb-2">{label} ({data[field] ?? 40}%)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={data[field] ?? 40}
            onChange={(e) => handleSimpleChange(field, parseInt(e.target.value))}
            className="w-full accent-brand-primary"
          />
        </div>
      );
    }

    const value = data[field]?.[activeLang] || '';

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => handleTextChange(field, e.target.value)}
            rows={4}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => handleTextChange(field, e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
          />
        )}
      </div>
    );
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden mb-12">
      <div className="flex border-b border-zinc-800">
        {PAGES.map(p => (
          <button
            key={p}
            onClick={() => setActivePage(p)}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors uppercase tracking-wider text-sm ${activePage === p ? 'bg-brand-primary text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center py-12 text-zinc-500">Loading page data...</div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs text-zinc-500">Language</h3>
              <div className="flex flex-col gap-2">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`text-left px-4 py-3 rounded-xl transition-all ${activeLang === lang ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400 hover:bg-zinc-800/50 border border-transparent'}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white capitalize">{activePage} Page Content</h2>
                <button
                  onClick={savePage}
                  disabled={saving}
                  className="bg-brand-primary hover:bg-brand-secondary text-white px-6 py-2 rounded-xl flex items-center font-bold transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              {/* Dynamic Forms based on activePage */}
              {activePage === 'home' && (
                <div className="space-y-4">
                  {renderField('Hero Title', 'heroTitle', 'text')}
                  {renderField('Hero Subtitle', 'heroSubtitle', 'textarea')}
                  <hr className="border-zinc-800 my-8" />
                  <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs text-zinc-500">Hero Background</h3>
                  {renderField('Hero Media Type', 'heroMediaType', 'select', [
                    { label: 'Video', value: 'video' },
                    { label: 'Image', value: 'image' }
                  ])}
                  {data.heroMediaType === 'image' && renderField('Hero Background Image', 'heroImage', 'image')}
                  {(!data.heroMediaType || data.heroMediaType === 'video') && renderField('Hero Video URL (MP4)', 'heroVideo', 'text')}
                  {renderField('Overlay Opacity (Darkness)', 'heroOverlayOpacity', 'range')}
                </div>
              )}

              {activePage === 'about' && (
                <div className="space-y-4">
                  {renderField('Hero Title', 'heroTitle', 'text')}
                  {renderField('Philosophy Title', 'philosophyTitle', 'text')}
                  {renderField('Main Image', 'image', 'image')}
                </div>
              )}

              {activePage === 'services' && (
                <div className="space-y-4">
                  {renderField('Hero Title', 'heroTitle', 'text')}
                  {renderField('Hero Subtitle', 'heroSubtitle', 'textarea')}
                  {renderField('Hero Background Image', 'heroImage', 'image')}
                  <hr className="border-zinc-800 my-8" />
                  <p className="text-sm text-zinc-400 mb-2">Since Services have multiple cards, please edit the main text below. The dynamic cards manager will be added in phase 2.</p>
                  {renderField('Services Description (Rich Text)', 'servicesContent', 'textarea')}
                </div>
              )}

              {activePage === 'portfolio' && (
                <div className="space-y-4">
                  {renderField('Hero Title', 'heroTitle', 'text')}
                  {renderField('Hero Subtitle', 'heroSubtitle', 'textarea')}
                  {renderField('Hero Background Image', 'heroImage', 'image')}
                </div>
              )}

              {activePage === 'contact' && (
                <div className="space-y-4">
                  {renderField('Hero Title', 'heroTitle', 'text')}
                  {renderField('Hero Subtitle', 'heroSubtitle', 'textarea')}
                  {renderField('Hero Background Image', 'heroImage', 'image')}
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
