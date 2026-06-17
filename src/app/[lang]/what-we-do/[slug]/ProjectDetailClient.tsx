"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

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

export default function ProjectDetailClient({ lang, slug }: { lang: string; slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const q = query(collection(db, "projects"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setProject({ id: doc.id, ...doc.data() } as Project);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
        <p className="text-zinc-400 mb-8">We couldn't find the project you're looking for.</p>
        <Link href={`/${lang}/what-we-do`} className="bg-brand-primary text-white px-6 py-3 rounded-full font-bold hover:bg-brand-secondary transition-colors">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const hasGallery = project.gallery && project.gallery.length > 0;

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-32">
      <article className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-brand-primary text-sm font-bold tracking-wider uppercase mb-6">
            {project.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 text-balance">
            {project.title}
          </h1>
          <p className="text-xl text-zinc-400 font-light leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Dynamic Content Rendering */}
        {hasGallery ? (
          /* Gallery Layout (Graphic Design) */
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {project.gallery?.map((img, idx) => (
              <div key={idx} className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group cursor-pointer hover:shadow-2xl hover:shadow-brand-primary/10 transition-all">
                <Image 
                  src={img} 
                  alt={`${project.title} gallery image ${idx + 1}`} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
            ))}
          </motion.div>
        ) : (
          /* Detailed Case Study Layout (Web Design) */
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-16"
          >
            {/* Main Hero Image */}
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>

            {/* Challenge & Solution Grid */}
            {(project.challenge || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {project.challenge && (
                  <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-red-500/10 text-brand-primary flex items-center justify-center mr-3 text-sm">01</span>
                      The Challenge
                    </h3>
                    <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-3 text-sm">02</span>
                      The Solution
                    </h3>
                    <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">{project.solution}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Back Button */}
        <div className="mt-24 text-center">
          <Link href={`/${lang}/what-we-do`} className="inline-flex items-center text-zinc-400 hover:text-white transition-colors font-semibold">
            <span aria-hidden="true" className="mr-2">←</span> Back to all projects
          </Link>
        </div>

      </article>
    </main>
  );
}
