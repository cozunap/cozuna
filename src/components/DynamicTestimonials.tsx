'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Project {
  id: string;
  title: string;
  clientName?: string;
  testimonial?: string;
  testimonialRole?: string;
  [key: string]: any;
}

export default function DynamicTestimonials() {
  const [testimonials, setTestimonials] = useState<{ text: string, author: string, role: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        
        // Filter projects that have a testimonial and map to our simplified format
        const projectsWithTestimonials = projectsData
          .filter(p => p.testimonial && p.testimonial.trim() !== '')
          .map(p => ({
            text: p.testimonial!,
            author: p.clientName || p.title,
            role: p.testimonialRole || p.category || 'Client'
          }));
          
        setTestimonials(projectsWithTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="w-full py-24 bg-zinc-900 border-t border-zinc-800 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-base font-semibold leading-7 text-brand-primary tracking-widest uppercase">Testimonials</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Trusted by Local Businesses</p>
      </div>
      
      <div className="relative flex overflow-x-hidden w-full group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-900 to-transparent z-10 pointer-events-none"></div>
        
        <div className={`animate-marquee flex gap-6 whitespace-nowrap py-4 min-w-max group-hover:[animation-play-state:paused] ${testimonials.length < 3 ? 'justify-center' : ''}`}>
          {[1, 2].map((loop) => (
            <div key={loop} className="flex gap-6">
              {testimonials.map((item, idx) => (
                <div key={`${loop}-${idx}`} className="w-96 flex-none bg-zinc-950 p-8 rounded-2xl border border-zinc-800 whitespace-normal shadow-lg">
                  <div className="flex gap-1 text-brand-primary mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-300 italic mb-6 leading-relaxed">"{item.text}"</p>
                  <div>
                    <p className="text-white font-bold">{item.author}</p>
                    <p className="text-zinc-500 text-sm">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
