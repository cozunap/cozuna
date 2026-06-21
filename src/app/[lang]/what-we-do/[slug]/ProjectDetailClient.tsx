"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
  
  // Combine main image and gallery for the lightbox
  const allImages = [project.image, ...(project.gallery || [])];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % allImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

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
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-balance">
            {project.title}
          </h1>
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
              <div 
                className="w-full aspect-square bg-zinc-900 border border-zinc-800 relative cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setLightboxIndex(0)}
              >
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  className="object-cover"
                />
              </div>
              {/* Gallery Images */}
              {project.gallery?.map((img, idx) => (
                <div 
                  key={idx} 
                  className="w-full aspect-square bg-zinc-900 border border-zinc-800 relative cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setLightboxIndex(idx + 1)}
                >
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
              <div 
                className="w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setLightboxIndex(0)}
              >
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  width={2880}
                  height={1600}
                  unoptimized={true}
                  className="w-full h-auto block"
                  style={{ imageRendering: "high-quality" as any }}
                />
              </div>
              {project.gallery?.map((img, idx) => (
                <div 
                  key={idx} 
                  className="w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setLightboxIndex(idx + 1)}
                >
                  <Image 
                    src={img} 
                    alt={`${project.title} screenshot ${idx + 1}`} 
                    width={2880}
                    height={1600}
                    unoptimized={true}
                    className="w-full h-auto block"
                    style={{ imageRendering: "high-quality" as any }}
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 md:top-8 md:right-8 z-50 text-zinc-400 hover:text-white bg-black/50 hover:bg-black rounded-full p-2 transition-all"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous Button */}
            {allImages.length > 1 && (
              <button 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white bg-black/30 hover:bg-black/80 rounded-full p-3 transition-all"
                onClick={prevImage}
              >
                <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
              </button>
            )}

            {/* Image Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={allImages[lightboxIndex]} 
                alt={`${project.title} fullscreen view ${lightboxIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-zinc-400 font-medium tracking-widest text-sm">
                  {lightboxIndex + 1} / {allImages.length}
                </div>
              )}
            </motion.div>

            {/* Next Button */}
            {allImages.length > 1 && (
              <button 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white bg-black/30 hover:bg-black/80 rounded-full p-3 transition-all"
                onClick={nextImage}
              >
                <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
