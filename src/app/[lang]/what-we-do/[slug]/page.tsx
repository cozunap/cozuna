import ProjectDetailClient from "./ProjectDetailClient";

export default async function ProjectDetail({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const resolvedParams = await params;
  return <ProjectDetailClient lang={resolvedParams.lang} slug={resolvedParams.slug} />;
}
