"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import RichTextEditor from './RichTextEditor';

interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
}

export default function CustomPagesManager() {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');

  const fetchPages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'customPages'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CustomPage[];
      setPages(data);
    } catch (error) {
      console.error('Error fetching custom pages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this page? It will instantly break any links pointing to it.')) {
      await deleteDoc(doc(db, 'customPages', id));
      fetchPages();
    }
  };

  const openEditor = (page?: CustomPage) => {
    if (page) {
      setEditingId(page.id);
      setTitle(page.title);
      setSlug(page.slug);
      setContent(page.content);
    } else {
      setEditingId(null);
      setTitle('');
      setSlug('');
      setContent('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      alert('Please fill out all fields.');
      return;
    }

    setIsSaving(true);
    try {
      const pageData = {
        title,
        slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        content,
        updatedAt: serverTimestamp()
      };

      if (editingId) {
        await updateDoc(doc(db, 'customPages', editingId), pageData);
      } else {
        await addDoc(collection(db, 'customPages'), {
          ...pageData,
          createdAt: serverTimestamp()
        });
      }

      setIsModalOpen(false);
      fetchPages();
    } catch (error: any) {
      console.error(error);
      alert(`Error saving page: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Dynamic Pages</h2>
          <p className="text-zinc-400 text-sm">Create brand new custom pages (e.g., Privacy Policy, Terms of Service).</p>
        </div>
        <button 
          onClick={() => openEditor()}
          className="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-xl flex items-center transition-colors shadow-lg shadow-brand-primary/20 whitespace-nowrap"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Page
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-zinc-500">Loading pages...</div>
      ) : pages.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-xl">No custom pages found. Create one to get started!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="py-4 px-4 font-medium">Page Title</th>
                <th className="py-4 px-4 font-medium">URL Path</th>
                <th className="py-4 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                  <td className="py-4 px-4 text-white font-medium">{page.title}</td>
                  <td className="py-4 px-4 text-brand-primary">/en/{page.slug}</td>
                  <td className="py-4 px-4 text-right">
                    <button onClick={() => openEditor(page)} className="text-zinc-400 hover:text-brand-primary mr-4 transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(page.id)} className="text-zinc-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl rounded-2xl shadow-2xl my-8">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-2xl font-bold text-white">{editingId ? 'Edit Page' : 'Create New Page'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Page Title *</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none" required placeholder="e.g. Privacy Policy" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">URL Slug *</label>
                  <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none" required placeholder="e.g. privacy-policy" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Page Content *</label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>

              <div className="pt-4 flex justify-end gap-4 border-t border-zinc-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl text-zinc-400 hover:text-white transition-colors font-medium">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center">
                  {isSaving ? 'Saving...' : 'Publish Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
