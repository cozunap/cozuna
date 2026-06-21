import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { getDictionary } from "@/lib/dictionaries";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  // Basic metadata matching language
  const title = lang === 'es' ? "COzuna Web Design & Printing" : "COzuna Web Design & Printing";
  const description = lang === 'es' 
    ? "Servicios económicos de Impresión, Diseño Gráfico y Diseño Web para Empresas y Particulares." 
    : "Affordable Printing, Graphic Design, and Web Design Services for Businesses and Individuals.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
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
  const dict = await getDictionary(lang as 'en' | 'es');

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen flex flex-col`} suppressHydrationWarning>
        <Navbar lang={lang} dict={dict} />
        <div className="flex-grow flex flex-col">{children}</div>
        <Footer lang={lang} dict={dict} />
        <BackToTop />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
