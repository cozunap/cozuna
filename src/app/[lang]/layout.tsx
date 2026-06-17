import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { getDictionary } from "@/lib/dictionaries";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "COzuna Web Design & Printing",
  description: "Affordable Printing, Graphic Design, and Web Design Services for Businesses and Individuals.",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'es');

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen flex flex-col`} suppressHydrationWarning>
        <Navbar lang={lang} dict={dict} />
        <div className="flex-grow flex flex-col pt-24">{children}</div>
        <Footer lang={lang} dict={dict} />
        <BackToTop />
      </body>
    </html>
  );
}
