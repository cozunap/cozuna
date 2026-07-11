import { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { ArrowRight, MonitorSmartphone, Code, Search, Rocket } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const title = lang === 'es' 
    ? "Desarrollo Web Económico para Pequeñas Empresas | COzuna" 
    : "Affordable Web Development for Small Businesses | COzuna";
  const description = lang === 'es' 
    ? "Servicios de desarrollo web económico y diseño de sitios web a medida. Hacemos crecer tu negocio con soluciones digitales de alta calidad a precios accesibles." 
    : "Affordable web development and custom web design services. Grow your small business with high-quality digital solutions at budget-friendly prices.";

  return {
    title,
    description,
  };
}

export default async function AffordableWebDevelopment({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const content = lang === 'es' ? {
    title: "Desarrollo Web Económico para Pequeñas Empresas",
    subtitle: "Soluciones web personalizadas de alta calidad que se ajustan a tu presupuesto. Te ayudamos a destacar en línea sin comprometer la calidad.",
    features: [
      { title: "Diseño Personalizado", description: "Sitios web únicos adaptados a tu marca.", icon: MonitorSmartphone },
      { title: "Desarrollo Moderno", description: "Código limpio, rápido y seguro.", icon: Code },
      { title: "Optimizado para SEO", description: "Atrae más tráfico orgánico a tu negocio.", icon: Search },
      { title: "Rápido Lanzamiento", description: "Tu sitio en línea en tiempo récord.", icon: Rocket },
    ],
    cta: "Inicia Tu Proyecto Hoy"
  } : {
    title: "Affordable Web Development for Small Businesses",
    subtitle: "High-quality, custom website solutions that fit your budget. We help you stand out online without compromising on quality.",
    features: [
      { title: "Custom Web Design", description: "Unique websites tailored to your brand.", icon: MonitorSmartphone },
      { title: "Modern Development", description: "Clean, fast, and secure code.", icon: Code },
      { title: "SEO Optimized", description: "Attract more organic traffic to your business.", icon: Search },
      { title: "Fast Launch", description: "Get your site online in record time.", icon: Rocket },
    ],
    cta: "Start Your Project Today"
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
