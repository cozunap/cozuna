import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cozuna.com';
  
  // Base routes
  const routes = ['', '/about-us', '/services', '/what-we-do', '/get-a-quote'].map((route) => ({
    url: `${baseUrl}/en${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Spanish routes
  const esRoutes = ['', '/about-us', '/services', '/what-we-do', '/get-a-quote'].map((route) => ({
    url: `${baseUrl}/es${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes, ...esRoutes];
}
