import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, Target, BarChart, PenTool } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const title = lang === 'es' 
    ? "Diseño de Landing Pages de Alta Conversión | COzuna" 
    : "High-Converting Landing Page Design | COzuna";
  const description = lang === 'es' 
    ? "Diseño de landing pages optimizadas para conversiones, leads y ventas. Perfectas para campañas de Google Ads y Facebook Ads." 
    : "Landing page design optimized for conversions, leads, and sales. Perfect for your Google Ads and Facebook Ads campaigns.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/landing-page-design`
    }
  };
}

export default async function LandingPageDesign({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const content = lang === 'es' ? {
    title: "Landing Pages de Alta Conversión",
    subtitle: "Convierte tus clics en clientes. Diseñamos páginas de aterrizaje súper rápidas, persuasivas y enfocadas 100% en generar ventas y leads.",
    features: [
      { title: "Diseño Persuasivo", description: "Copywriting y estructura visual que guía hacia la acción.", icon: PenTool },
      { title: "Velocidad Extrema", description: "Carga en milisegundos para evitar que el usuario abandone.", icon: Zap },
      { title: "Enfoque en ROI", description: "Ideales para rentabilizar tus campañas de Google o Facebook Ads.", icon: Target },
      { title: "Análisis de Datos", description: "Listas para integrarse con Google Analytics y Pixel.", icon: BarChart },
    ],
    cta: "Lanza tu Campaña"
  } : {
    title: "High-Converting Landing Pages",
    subtitle: "Turn clicks into customers. We design lightning-fast, persuasive landing pages focused 100% on generating sales and leads.",
    features: [
      { title: "Persuasive Design", description: "Copywriting and visual structure that guides users to take action.", icon: PenTool },
      { title: "Extreme Speed", description: "Loads in milliseconds to prevent user drop-off.", icon: Zap },
      { title: "ROI Focused", description: "Ideal for maximizing returns on your Google or Facebook Ads campaigns.", icon: Target },
      { title: "Data Analytics", description: "Ready to integrate with Google Analytics and Facebook Pixel.", icon: BarChart },
    ],
    cta: "Launch Your Campaign"
  };

  return (
    <div className="bg-zinc-950 py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
            {content.title}
          </h1>
          <p className="text-lg leading-8 text-zinc-400 mb-10">
            {content.subtitle}
          </p>
          <div className="flex justify-center">
            <Link 
              href={`/${lang}/get-a-quote`} 
              className="rounded-full bg-brand-primary px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-all flex items-center gap-2"
            >
              {content.cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-2xl lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {content.features.map((feature) => (
              <div key={feature.title} className="flex flex-col bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon className="h-5 w-5 flex-none text-brand-primary" aria-hidden="true" />
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
