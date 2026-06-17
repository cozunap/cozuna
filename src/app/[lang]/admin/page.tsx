'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Trash2, Edit, X, UploadCloud } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  challenge?: string;
  solution?: string;
  image: string;
  gallery?: string[];
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/en/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteDoc(doc(db, 'projects', id));
      fetchProjects();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadToCloudflare = async (file: File) => {
    // 1. Request Direct Upload URL from our secure API
    const res = await fetch('/api/upload-url', { method: 'POST' });
    const data = await res.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to get upload URL');
    }

    // 2. Upload directly to Cloudflare
    const formData = new FormData();
    formData.append('file', file);

    const uploadRes = await fetch(data.uploadURL, {
      method: 'POST',
      body: formData,
    });

    const uploadData = await uploadRes.json();
    if (!uploadData.success) {
      throw new Error('Failed to upload image to Cloudflare');
    }

    // 3. Return the formatted delivery URL
    // eJfkbxcvXp804aif1wioXw is the public delivery hash for COZUNA
    return `https://imagedelivery.net/eJfkbxcvXp804aif1wioXw/${data.id}/public`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !category || !description || !selectedFile) {
      alert('Please fill out all required fields and select an image.');
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload the image to Cloudflare Images
      const imageUrl = await uploadToCloudflare(selectedFile);

      // 2. Save project data to Firestore
      await addDoc(collection(db, 'projects'), {
        title,
        slug,
        category,
        description,
        challenge,
        solution,
        image: imageUrl,
        createdAt: serverTimestamp()
      });

      // 3. Reset form and refresh
      setIsModalOpen(false);
      setTitle('');
      setSlug('');
      setCategory('');
      setDescription('');
      setChallenge('');
      setSolution('');
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchProjects();
    } catch (error: any) {
      console.error(error);
      alert(`Error saving project: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-zinc-950 p-6 md:p-12 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-zinc-400">Manage your portfolio projects directly from here.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-4 md:mt-0 flex items-center text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>

          {/* Project List */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Your Projects</h2>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-xl flex items-center transition-colors shadow-lg shadow-brand-primary/20"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Project
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12 text-zinc-500">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">No projects found. Add one to get started!</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400">
                      <th className="py-4 px-4 font-medium">Image</th>
                      <th className="py-4 px-4 font-medium">Title</th>
                      <th className="py-4 px-4 font-medium">Category</th>
                      <th className="py-4 px-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                        <td className="py-4 px-4">
                          <div className="relative w-16 h-12 rounded overflow-hidden bg-zinc-800">
                            {project.image && <Image src={project.image} alt={project.title} fill className="object-cover" />}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-white font-medium">{project.title}</td>
                        <td className="py-4 px-4 text-zinc-400">{project.category}</td>
                        <td className="py-4 px-4 text-right">
                          <button className="text-zinc-400 hover:text-brand-primary mr-4 transition-colors">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(project.id)}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* New Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl my-8">
              <div className="flex justify-between items-center p-6 border-b border-zinc-800">
                <h3 className="text-2xl font-bold text-white">Create New Project</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                
                {/* Image Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Main Cover Image *</label>
                  <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:bg-zinc-800/50 transition-colors relative">
                    {previewUrl ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                        <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                      </div>
                    ) : (
                      <UploadCloud className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <p className="text-zinc-400 text-sm">
                      {selectedFile ? selectedFile.name : 'Click or drag an image here to upload directly to Cloudflare'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Project Title *</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none" required placeholder="e.g. Acme Corp Rebrand" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">URL Slug *</label>
                    <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none" required placeholder="e.g. acme-corp-rebrand" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Category *</label>
                  <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none" required placeholder="e.g. Web Design & Branding" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Short Description *</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none" required placeholder="Brief overview of the project..."></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">The Challenge (Optional)</label>
                    <textarea value={challenge} onChange={(e) => setChallenge(e.target.value)} rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">The Solution (Optional)</label>
                    <textarea value={solution} onChange={(e) => setSolution(e.target.value)} rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"></textarea>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-4 border-t border-zinc-800">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl text-zinc-400 hover:text-white transition-colors font-medium">Cancel</button>
                  <button type="submit" disabled={isUploading} className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center">
                    {isUploading ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div> Uploading...</>
                    ) : 'Publish Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminGuard>
  );
}
