import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SecurityShield from "@/components/SecurityShield";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary } from "@/lib/dictionaries";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  // Basic metadata matching language
  const title = lang === 'es' 
    ? "COzuna | Diseño Web Económico, Desarrollo y Servicios de Impresión" 
    : "COzuna | Affordable Web Design, Web Development & Printing";
  const description = lang === 'es' 
    ? "Servicios económicos de diseño web, desarrollo a medida, diseño gráfico y de impresión de alta calidad para empresas y particulares." 
    : "Affordable custom Web Design, Web Development, Graphic Design, and high-quality Printing services for businesses and individuals.";

  return {
    title,
    description,
    keywords: "web design, affordable web design, web development, custom websites, SEO, graphic design, printing services, COzuna",
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
          alt: "COzuna Web Design & Printing",
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
        <SecurityShield />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "COzuna Web Design & Printing",
              "image": "https://cozuna.com/assets/images/2024/10/main-photo.webp",
              "description": "Affordable custom Web Design, Web Development, Graphic Design, and Printing services.",
              "url": "https://cozuna.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New Jersey",
                "addressRegion": "NJ",
                "addressCountry": "US"
              },
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
        <div className="flex-grow flex flex-col">{children}</div>
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
