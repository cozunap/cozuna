import { Metadata } from 'next';
import { getPortfolioProjects } from "@/lib/cms";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const projects = await getPortfolioProjects();
  const project = projects.find((p: any) => p.slug === resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found | COzuna Web Design & Printing",
    };
  }

  const title = `${project.title} | COzuna Web Design & Printing`;
  const description = project.description || `View the ${project.title} project built by COzuna Web Design & Printing.`;
  const image = project.image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    }
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const resolvedParams = await params;
  
  // Fetch project for JSON-LD structured data
  const projects = await getPortfolioProjects();
  const project = projects.find((p: any) => p.slug === resolvedParams.slug);
  
  const title = project ? `${project.title} | COzuna Web Design & Printing` : "Project | COzuna Web Design & Printing";
  const description = project?.description || "View this amazing project built by COzuna Web Design & Printing.";
  const image = project?.image || project?.thumbnail || "https://cozuna.com/assets/images/2024/10/main-photo.webp";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": title,
    "description": description,
    "image": image,
    "url": `https://cozuna.com/${resolvedParams.lang}/what-we-do/${resolvedParams.slug}`,
    "creator": {
      "@type": "Organization",
      "name": "COzuna Web Design & Printing"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient lang={resolvedParams.lang} slug={resolvedParams.slug} />
    </>
  );
}
