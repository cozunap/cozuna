import type { MetadataRoute } from 'next';

export const runtime = 'edge';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'COzuna Web Agency',
    short_name: 'COzuna',
    description: 'Custom Web Design, Web Development, and High-Converting Digital Solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
