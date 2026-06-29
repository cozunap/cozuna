import { MetadataRoute } from 'next';
import { getPortfolioProjects } from '@/lib/cms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cozuna.com';
  
  // Base routes
  const staticPaths = ['', '/about-us', '/services', '/what-we-do', '/get-a-quote'];
  const languages = ['en', 'es', 'fr'];
  
  let routes: MetadataRoute.Sitemap = [];

  // Generate static routes for all languages
  languages.forEach((lang) => {
    staticPaths.forEach((route) => {
      routes.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  // Fetch dynamic projects
  try {
    const projects = await getPortfolioProjects();
    
    // Generate dynamic routes for all languages
    languages.forEach((lang) => {
      projects.forEach((project: any) => {
        routes.push({
          url: `${baseUrl}/${lang}/what-we-do/${project.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    });
  } catch (error) {
    console.error("Failed to fetch projects for sitemap:", error);
  }

  return routes;
}
