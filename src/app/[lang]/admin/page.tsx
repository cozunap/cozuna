'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Trash2, Edit } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  return (
    <AdminGuard>
      <div className="min-h-screen bg-zinc-950 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
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

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Your Projects</h2>
              <button 
                onClick={() => alert('Add Project functionality to be implemented in details.')}
                className="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-xl flex items-center transition-colors"
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
                      <th className="py-4 px-4 font-medium">Title</th>
                      <th className="py-4 px-4 font-medium">Category</th>
                      <th className="py-4 px-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
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
      </div>
    </AdminGuard>
  );
}
