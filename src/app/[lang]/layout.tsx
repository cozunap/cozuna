import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecurityShield from "@/components/SecurityShield";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyCallBar from "@/components/MobileStickyCallBar";
import SkipToContent from "@/components/SkipToContent";
import { getDictionary } from "@/lib/dictionaries";
import { getAEOFAQs } from "@/lib/cms";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  // Localized metadata targeting New York City, New Jersey, Rhode Island & Dominican Republic
  const title = lang === 'fr'
    ? "Conception Web & Impression | New York, New Jersey, Rhode Island | COzuna"
    : lang === 'es'
    ? "Diseño Web e Imprenta en New York, New Jersey, Rhode Island y Rep. Dominicana | COzuna"
    : "Web Design & Printing | NYC, New Jersey, Rhode Island & Dominican Republic | COzuna";

  const description = lang === 'fr'
    ? "Agence professionnelle de conception de sites Web sur mesure, e-commerce, design graphique et impression haute fidélité desservant New York City, New Jersey, Rhode Island et la République Dominicaine."
    : lang === 'es'
    ? "Agencia líder en diseño de páginas web a medida, tiendas online, diseño gráfico e imprenta comercial para empresas en New York City, New Jersey, Rhode Island y República Dominicana."
    : "Top-rated custom web design, high-converting e-commerce, graphic design, and commercial printing services serving businesses across New York City, New Jersey, Rhode Island, and the Dominican Republic.";

  return {
    metadataBase: new URL('https://cozuna.com'),
    title,
    description,
    keywords: "web design new york city, web design new jersey, web design rhode island, diseno web dominican republic, diseno web santo domingo, diseno web santiago, affordable web development nyc, small business web design, diseno web economico, desarrollo web a medida, imprenta comercial new york, COzuna web design",
    alternates: {
      canonical: `https://cozuna.com/${lang}`,
      languages: {
        'en': 'https://cozuna.com/en',
        'es': 'https://cozuna.com/es',
        'fr': 'https://cozuna.com/fr',
        'x-default': 'https://cozuna.com/en'
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/icon', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon', type: 'image/png' },
      ],
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
      url: `https://cozuna.com/${lang}`,
      siteName: "COzuna",
      images: [
        {
          url: "https://cozuna.com/assets/images/2024/10/main-photo.webp",
          width: 1200,
          height: 630,
          alt: "COzuna Web Design Agency",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://cozuna.com/assets/images/2024/10/main-photo.webp"],
    }
  };
}

export const runtime = 'edge';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const [dict, faqs] = await Promise.all([
    getDictionary(lang as 'en' | 'es' | 'fr'),
    getAEOFAQs(lang)
  ]);

  const faqEntities = faqs.map((faq: any) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }));

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen flex flex-col`} suppressHydrationWarning>
        <SkipToContent />
        <SecurityShield />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "COzuna Web Design Agency",
                "image": "https://cozuna.com/assets/images/2024/10/main-photo.webp",
                "description": "Affordable custom Web Design, Web Development, Graphic Design, and Commercial Printing services serving New York City, New Jersey, Rhode Island, and the Dominican Republic.",
                "url": "https://cozuna.com",
                "telephone": "+16468831869",
                "email": "ozunaprinting@gmail.com",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "516 W 136th St Apt.",
                  "addressLocality": "New York",
                  "addressRegion": "NY",
                  "postalCode": "10031",
                  "addressCountry": "US"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 40.8207,
                  "longitude": -73.9535
                },
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "09:00",
                    "closes": "18:00"
                  }
                ],
                "areaServed": [
                  { "@type": "City", "name": "New York City" },
                  { "@type": "State", "name": "New York" },
                  { "@type": "State", "name": "New Jersey" },
                  { "@type": "State", "name": "Rhode Island" },
                  { "@type": "Country", "name": "Dominican Republic" },
                  { "@type": "Country", "name": "United States" }
                ],
                "sameAs": [
                  "https://www.behance.net/cozuna"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Services",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Design & Development" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-Commerce Web Design" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Identity & Graphic Design" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Printing & Custom Signage" } }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqEntities
              }
            ])
          }}
        />
        <Navbar lang={lang} dict={dict} />
        <div id="main-content" className="flex-grow flex flex-col">{children}</div>
        <Footer lang={lang} dict={dict} />
        <WhatsAppButton />
        <MobileStickyCallBar lang={lang} />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <script
          src="/widget.js"
          data-api="/api/chat"
          data-lead="/api/lead"
          data-lang={lang}
          defer
        />
      </body>
    </html>
  );
}
