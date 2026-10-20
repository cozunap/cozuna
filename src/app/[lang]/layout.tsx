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
  
  // Localized metadata targeting New York market
  const title = lang === 'fr'
    ? "Conception de sites Web à New York | COzuna"
    : lang === 'es'
    ? "Diseño Web en New York | COzuna Web Agency"
    : "Web Design New York NY | COzuna Web Design Agency";

  const description = lang === 'fr'
    ? "Services professionnels et abordables de conception de sites Web, design graphique, image de marque et impression pour entreprises à New York."
    : lang === 'es'
    ? "Servicios profesionales y económicos de diseño web, diseño gráfico e impresión para empresas en New York."
    : "Professional and affordable custom web design, branding, graphic design, and commercial printing services tailored for businesses in New York.";

  return {
    metadataBase: new URL('https://cozuna.com'),
    title,
    description,
    keywords: "affordable web development, affordable web design, small business web design, custom website solutions, professional website designer, cheap web designers, global web development agency, diseño web económico, desarrollo web a medida, agencias de diseño web, creador de paginas web baratas, COzuna web design",
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
                "@type": "Organization",
                "name": "COzuna Web Design Agency",
                "image": "https://cozuna.com/assets/images/2024/10/main-photo.webp",
                "description": "Affordable custom Web Design, Web Development, Graphic Design, and Printing services.",
                "url": "https://cozuna.com",
                "telephone": "+14383939465",
                "email": "ozunaprinting@gmail.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "516 W 136th St Apt. #3",
                  "addressLocality": "New York",
                  "addressRegion": "NY",
                  "postalCode": "10031",
                  "addressCountry": "US"
                },
                "areaServed": [
                  { "@type": "City", "name": "New York" },
                  { "@type": "State", "name": "New York" },
                  { "@type": "Country", "name": "US" }
                ],
                "sameAs": [
                  "https://www.behance.net/cozuna"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Services",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Design & Development" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphic Design" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "High Quality Printing" } }
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
