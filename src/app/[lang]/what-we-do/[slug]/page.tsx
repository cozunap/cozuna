import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const runtime = 'edge';
export const revalidate = 60;

export default async function CaseStudyPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params;
  let projectData = null;

  try {
    const q = query(collection(db, "projects"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      projectData = querySnapshot.docs[0].data();
    }
  } catch (error) {
    console.error("Error fetching project:", error);
  }

  // Fallback check for the dummy route "la-casa-del-mofongo"
  if (!projectData && slug === "la-casa-del-mofongo") {
    projectData = {
      title: "La Casa Del Mofongo MD",
      category: "Web & Print",
      image: "/assets/images/2024/10/la-casa-del-mofongo.webp",
      description: "A complete digital transformation for one of the most beloved local restaurants. We upgraded their brand identity, redesigned their menus for better legibility, and built a blazing fast web presence.",
      challenge: "The restaurant was relying on an outdated visual system that didn't reflect the high quality of their food. Customers were struggling to read the old menus, and their online presence was practically non-existent.",
      solution: "We started by refreshing their core brand colors and typography. Then, we designed and printed highly durable, modern menus. Finally, we developed a responsive website that showcases their dishes and makes it easy for customers to find their location and hours.",
      gallery: [
        "/assets/images/2024/10/la-casa-del-mofongo.webp"
      ]
    };
  }

  if (!projectData) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 w-full">
        
        {/* Back Link */}
        <Link href="/what-we-do" className="inline-flex items-center text-zinc-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-16">
          <p className="text-brand-primary text-sm font-bold tracking-wider uppercase mb-4">{projectData.category}</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">{projectData.title}</h1>
          {projectData.description && (
            <p className="text-xl text-zinc-300 leading-relaxed max-w-3xl">
              {projectData.description}
            </p>
          )}
        </div>

        {/* Main Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-24 border border-zinc-800 bg-zinc-900">
          <Image 
            src={projectData.image} 
            alt={projectData.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Two Column Layout for Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {projectData.challenge && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-zinc-900 text-brand-primary w-10 h-10 rounded-full flex items-center justify-center mr-4 border border-zinc-800">01</span>
                The Challenge
              </h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                {projectData.challenge}
              </p>
            </div>
          )}

          {projectData.solution && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-brand-primary text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-brand-primary/20">02</span>
                Our Solution
              </h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                {projectData.solution}
              </p>
            </div>
          )}
        </div>

        {/* Gallery */}
        {projectData.gallery && projectData.gallery.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Project Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projectData.gallery.map((img: string, i: number) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                  <Image src={img} alt={`${projectData.title} gallery image ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
