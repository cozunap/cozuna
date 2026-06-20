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
  liveUrl?: string;
  clientName?: string;
  softwareUsed?: string;
  servicesOffered?: string;
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

  const isGraphicDesign = project.category === "Graphic Design / Branding" || project.category === "Graphic Design";

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
        {isGraphicDesign ? (
          /* Graphic Design / Branding Layout */
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >
            {/* Left Column: 2-Column Image Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Image */}
              <div className="w-full aspect-square bg-zinc-900 border border-zinc-800 relative">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  className="object-cover"
                />
              </div>
              {/* Gallery Images */}
              {project.gallery?.map((img, idx) => (
                <div key={idx} className="w-full aspect-square bg-zinc-900 border border-zinc-800 relative cursor-pointer hover:opacity-80 transition-opacity">
                  <Image 
                    src={img} 
                    alt={`${project.title} gallery image ${idx + 1}`} 
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Right Column: Sticky Text */}
            <div className="lg:col-span-4 sticky top-32 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider border-b border-brand-primary pb-2 inline-block">
                  About {project.title}
                </h2>
                <div className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap mt-4">
                  {project.description}
                </div>
              </div>

              {/* Additional Details */}
              {(project.clientName || project.softwareUsed || project.servicesOffered) && (
                <div className="space-y-4 pt-6 border-t border-zinc-800/50">
                  {project.clientName && (
                    <div>
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Client</h3>
                      <p className="text-white font-medium">{project.clientName}</p>
                    </div>
                  )}
                  {project.servicesOffered && (
                    <div>
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Services</h3>
                      <p className="text-white font-medium">{project.servicesOffered}</p>
                    </div>
                  )}
                  {project.softwareUsed && (
                    <div>
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Software</h3>
                      <p className="text-white font-medium">{project.softwareUsed}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Live URL Button */}
              {project.liveUrl && (
                <div className="pt-4 border-t border-zinc-800">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-brand-primary hover:bg-brand-secondary text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-primary/20 hover:scale-105">
                    View Live Website
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* Detailed Case Study Layout (Web Design) */
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative items-start"
          >
            {/* Left Column: Stacked Images (Full Height) */}
            <div className="lg:col-span-8 space-y-12">
              <div className="w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-auto object-cover block"
                />
              </div>
              {project.gallery?.map((img, idx) => (
                <div key={idx} className="w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={img} 
                    alt={`${project.title} screenshot ${idx + 1}`} 
                    className="w-full h-auto object-cover block"
                  />
                </div>
              ))}
            </div>

            {/* Right Column: Sticky Details */}
            <div className="lg:col-span-4 sticky top-32 space-y-12 bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
                <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">{project.description}</p>
              </div>

              {project.challenge && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-red-500/10 text-brand-primary flex items-center justify-center mr-3 text-xs">01</span>
                    The Challenge
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-3 text-xs">02</span>
                    The Solution
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">{project.solution}</p>
                </div>
              )}

              {project.liveUrl && (
                <div className="pt-4 border-t border-zinc-800">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-brand-primary hover:bg-brand-secondary text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-primary/20 hover:scale-105">
                    View Live Website
                  </a>
                </div>
              )}
            </div>
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
