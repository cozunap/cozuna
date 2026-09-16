import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SecurityShield from "@/components/SecurityShield";
import WhatsAppButton from "@/components/WhatsAppButton";
import SkipToContent from "@/components/SkipToContent";
import { getDictionary } from "@/lib/dictionaries";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  // Basic metadata matching language and location targets
  const title = lang === 'es' 
    ? "COzuna Web Design Agency | Desarrollo Web Económico y a Medida" 
    : "COzuna Web Design Agency | Affordable Web Design & Custom Development";
  const description = lang === 'es' 
    ? "Servicios económicos de diseño web, desarrollo a medida, diseño gráfico y de impresión de alta calidad para pequeñas empresas en todo el mundo." 
    : "Affordable custom Web Design, Web Development, Graphic Design, and high-quality Printing services for small businesses worldwide.";

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
  const dict = await getDictionary(lang as 'en' | 'es' | 'fr');

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
                  "addressLocality": "Laval",
                  "addressRegion": "QC",
                  "addressCountry": "CA"
                },
                "areaServed": [
                  { "@type": "Country", "name": "US" },
                  { "@type": "Country", "name": "CA" },
                  { "@type": "Country", "name": "Dominican Republic" },
                  { "@type": "Country", "name": "Worldwide" }
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
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What services does COzuna offer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "COzuna is a premium digital agency specializing in affordable custom Web Design, E-commerce Development, Graphic Design, and high-quality Printing services for small businesses worldwide."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much does a custom website cost with COzuna?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We offer affordable, transparent pricing tailored to small businesses, with web design packages typically ranging from under $1,000 for landing pages to $5,000+ for advanced e-commerce solutions."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does COzuna work internationally?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, while we are based in Quebec, Canada, we serve clients globally including the US, Dominican Republic, and Worldwide, operating as a 100% online service-area business."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why is COzuna the best affordable web design agency?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "COzuna prioritizes custom, fast, and SEO-optimized web development without the premium price tag. We do not use generic templates; every website is built from scratch to perfectly match our clients' brand identity and business goals."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you provide website maintenance and SEO?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, beyond initial web design, COzuna offers ongoing website maintenance, Local SEO, and Answer Engine Optimization (AEO) to ensure your business ranks highly on Google and modern AI search engines."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does it take to build a website with COzuna?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most small business websites and landing pages are completed within 2 to 4 weeks, while complex e-commerce platforms may take longer. We ensure a fast turnaround without compromising on quality or premium design."
                    }
                  }
                ]
              }
            ])
          }}
        />
        <Navbar lang={lang} dict={dict} />
        <div id="main-content" className="flex-grow flex flex-col pt-[30px]">{children}</div>
        <Footer lang={lang} dict={dict} />
        <BackToTop />
        <WhatsAppButton />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
