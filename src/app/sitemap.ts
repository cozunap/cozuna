import { MetadataRoute } from 'next';
import { getPortfolioProjects } from '@/lib/cms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cozuna.com';
  
  // Base routes
  const staticPaths = ['', '/about-us', '/services', '/what-we-do', '/get-a-quote', '/affordable-web-development'];
  const languages = ['en', 'es', 'fr'];
  
  let routes: MetadataRoute.Sitemap = [];

  // Generate static routes for all languages
  languages.forEach((lang) => {
    staticPaths.forEach((route) => {
      const alternates: Record<string, string> = {};
      languages.forEach((l) => {
        alternates[l] = `${baseUrl}/${l}${route}`;
      });
      // Add x-default for the root/redirecting page
      alternates['x-default'] = `${baseUrl}/en${route}`;

      routes.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  // Fetch dynamic projects
  try {
    const projects = await getPortfolioProjects();
    
    // Generate dynamic routes for all languages
    languages.forEach((lang) => {
      projects.forEach((project: any) => {
        const alternates: Record<string, string> = {};
        languages.forEach((l) => {
          alternates[l] = `${baseUrl}/${l}/what-we-do/${project.slug}`;
        });
        alternates['x-default'] = `${baseUrl}/en/what-we-do/${project.slug}`;

        routes.push({
          url: `${baseUrl}/${lang}/what-we-do/${project.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: alternates,
          },
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
              const docId = doc.name?.split('/').pop();
              const finalSlug = slugField || docId;
              
              if (finalSlug) {
                const alternates: Record<string, string> = {};
                languages.forEach((l) => {
                  alternates[l] = `${baseUrl}/${l}/blog/${finalSlug}`;
                });
                alternates['x-default'] = `${baseUrl}/en/blog/${finalSlug}`;

                routes.push({
                  url: `${baseUrl}/${lang}/blog/${finalSlug}`,
                  lastModified: new Date(),
                  changeFrequency: 'weekly',
                  priority: 0.7,
                  alternates: {
                    languages: alternates,
                  },
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
