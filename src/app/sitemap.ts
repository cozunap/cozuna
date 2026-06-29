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

  // Fetch blog posts
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (projectId && apiKey) {
      const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/posts?key=${apiKey}`,
        { next: { revalidate: 60 } }
      );
      if (res.ok) {
        const json = await res.json();
        if (json.documents) {
          languages.forEach((lang) => {
            json.documents.forEach((doc: any) => {
              const slugField = doc.fields?.slug?.stringValue;
              if (slugField) {
                routes.push({
                  url: `${baseUrl}/${lang}/blog/${slugField}`,
                  lastModified: new Date(),
                  changeFrequency: 'weekly',
                  priority: 0.7,
                });
              }
            });
          });
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch blog posts for sitemap:", error);
  }

  return routes;
}
