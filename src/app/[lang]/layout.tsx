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
    ? "COzuna Web Design Agency | Diseño y Desarrollo Web Económico en RD" 
    : "COzuna Web Design Agency | Affordable Web Design & Development in NY & MD";
  const description = lang === 'es' 
    ? "Servicios económicos de diseño web, desarrollo a medida, diseño gráfico y de impresión de alta calidad en República Dominicana." 
    : "Affordable custom Web Design, Web Development, Graphic Design, and high-quality Printing services for businesses in New York (NY) and Maryland (MD).";

  return {
    metadataBase: new URL('https://cozuna.com'),
    title,
    description,
    keywords: "affordable web design New York, best web development agency NY, cheap web designers Maryland, custom web development MD, small business website design NY, ecommerce web development New York, premium web design services MD, diseño web económico República Dominicana, desarrollo de páginas web RD, agencias de diseño web en Santo Domingo, creador de paginas web baratas, desarrollo web a medida República Dominicana, diseño gráfico e impresión RD, diseño de tiendas online RD, COzuna web design, affordable web design and development",
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
      url: "https://cozuna.com",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "COzuna Web Design Agency",
              "image": "https://cozuna.com/assets/images/2024/10/main-photo.webp",
              "description": "Affordable custom Web Design, Web Development, Graphic Design, and Printing services.",
              "url": "https://cozuna.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "addressCountry": "US"
              },
              "areaServed": [
                { "@type": "State", "name": "New York" },
                { "@type": "State", "name": "Maryland" },
                { "@type": "Country", "name": "Dominican Republic" }
              ],
              "priceRange": "$$",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Design & Development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphic Design" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "High Quality Printing" } }
                ]
              }
            })
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
