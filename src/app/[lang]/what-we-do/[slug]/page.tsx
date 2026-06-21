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
  return <ProjectDetailClient lang={resolvedParams.lang} slug={resolvedParams.slug} />;
}
