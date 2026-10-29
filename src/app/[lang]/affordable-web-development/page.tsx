import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MonitorSmartphone, Code, Search, Rocket, MapPin, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const title = lang === 'fr'
    ? "Conception de Sites Web Abordables | NYC, NJ, RI & République Dominicaine | COzuna"
    : lang === 'es' 
    ? "Diseño Web Económico para Pequeñas Empresas | NYC, NJ, RI y Rep. Dominicana | COzuna" 
    : "Affordable Web Design for Small Businesses | NYC, NJ, RI & Dominican Republic | COzuna";

  const description = lang === 'fr'
    ? "Développement web abordable et conception de sites sur mesure à New York, New Jersey, Rhode Island et République Dominicaine. Sites ultra-rapides dès 950 $."
    : lang === 'es' 
    ? "Servicios de diseño web económico y desarrollo a medida en New York City, New Jersey, Rhode Island y República Dominicana. Sitios ultrarrápidos desde $950." 
    : "Affordable custom web design and modern development for small businesses across New York City, New Jersey, Rhode Island, and the Dominican Republic. Fast delivery from $950.";

  return {
    title,
    description,
    keywords: "affordable web design new york, web designer new jersey, custom website rhode island, diseno web santo domingo, diseno web santiago rd, small business website designer nyc, boutique web design",
    alternates: {
      canonical: `https://cozuna.com/${lang}/affordable-web-development`,
      languages: {
        'en': 'https://cozuna.com/en/affordable-web-development',
        'es': 'https://cozuna.com/es/affordable-web-development',
        'fr': 'https://cozuna.com/fr/affordable-web-development',
        'x-default': 'https://cozuna.com/en/affordable-web-development'
      }
    }
  };
}

export default async function AffordableWebDevelopment({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const content = lang === 'fr' ? {
    badge: "New York • New Jersey • Rhode Island • République Dominicaine",
    title: "Conception de Sites Web Abordables & Haute Conversion",
    subtitle: "Des sites Web modernes sur mesure conçus pour transformer vos visiteurs en clients payants. Créés avec Next.js pour une vitesse maximale et un référencement Google optimal.",
    priceTag: "Projets à partir de 950 $ • Livraison en 2 à 4 semaines",
    features: [
      { title: "Design Sur Mesure", description: "Zéro modèle générique. Une identité visuelle unique conçue pour votre marque.", icon: MonitorSmartphone },
      { title: "Vitesse Next.js & React", description: "Temps de chargement instantané pour un score Google PageSpeed de 95+.", icon: Zap },
      { title: "Optimisé SEO & AEO", description: "Positionnez-vous sur Google, Google Maps et les moteurs de recherche IA comme SearchGPT.", icon: Search },
      { title: "Garantie & Support", description: "Code propre, sécurisé et formation complète pour gérer votre contenu.", icon: ShieldCheck },
    ],
    marketsTitle: "Zones d'Intervention Prioritaires",
    markets: [
      { name: "New York City (NYC)", desc: "Manhattan, Brooklyn, Queens, Bronx, Staten Island" },
      { name: "New Jersey", desc: "Jersey City, Newark, Paterson, Elizabeth & environs" },
      { name: "Rhode Island", desc: "Providence, Warwick, Cranston & tout l'État" },
      { name: "République Dominicaine", desc: "Santo Domingo, Santiago de los Caballeros, Punta Cana" }
    ],
    cta: "Obtenir une Soumission Gratuite"
  } : lang === 'es' ? {
    badge: "New York • New Jersey • Rhode Island • República Dominicana",
    title: "Diseño Web Económico y de Alta Conversión para Pequeñas Empresas",
    subtitle: "Páginas web personalizadas de alta gama que se ajustan a tu presupuesto. Diseñadas en Next.js para máxima velocidad, ventas y posicionamiento orgánico en Google.",
    priceTag: "Proyectos desde $950 • Entrega en 2 a 4 semanas",
    features: [
      { title: "Diseño 100% Personalizado", description: "Cero plantillas genéricas. Cada sitio web se crea desde cero para reflejar tu marca.", icon: MonitorSmartphone },
      { title: "Velocidad Extrema Next.js", description: "Carga en milisegundos con rendimiento 95+ en Google Core Web Vitals.", icon: Zap },
      { title: "Optimizado para SEO y AEO", description: "Atrae clientes orgánicos en Google Search, Google Maps y motores de IA (ChatGPT, Gemini).", icon: Search },
      { title: "Soporte y Garantía Total", description: "Código moderno, seguro y acompañamiento continuo para hacer crecer tu empresa.", icon: ShieldCheck },
    ],
    marketsTitle: "Mercados Principales que Atendemos",
    markets: [
      { name: "New York City (NYC)", desc: "Manhattan, Brooklyn, Queens, Bronx y Staten Island" },
      { name: "New Jersey", desc: "Jersey City, Newark, Paterson, Elizabeth y todo el estado" },
      { name: "Rhode Island", desc: "Providence, Warwick, Cranston y áreas metropolitanas" },
      { name: "República Dominicana", desc: "Santo Domingo, Santiago, Punta Cana y cobertura nacional" }
    ],
    cta: "Solicita tu Cotización Gratis"
  } : {
    badge: "New York • New Jersey • Rhode Island • Dominican Republic",
    title: "Affordable Custom Web Design Built to Convert Visitors into Clients",
    subtitle: "Premium, custom-crafted websites tailored for growing small businesses. Engineered with Next.js for lightning-fast speeds and top organic rankings on Google and AI search engines.",
    priceTag: "Custom Websites From $950 • Turnaround in 2 to 4 Weeks",
    features: [
      { title: "100% Custom Architecture", description: "No generic templates or bloated builders. Custom UI designed specifically for your brand.", icon: MonitorSmartphone },
      { title: "Next.js Edge Performance", description: "Loads in milliseconds for 95+ Google PageSpeed and Core Web Vitals scores.", icon: Zap },
      { title: "Built-In SEO & AEO", description: "Rank organically across Google Search, Google Maps, and AI answer engines like SearchGPT.", icon: Search },
      { title: "Security & Ongoing Support", description: "Clean, bulletproof code with full client support and easy content updates.", icon: ShieldCheck },
    ],
    marketsTitle: "Primary Service Regions",
    markets: [
      { name: "New York City (NYC)", desc: "Manhattan, Brooklyn, Queens, The Bronx, Staten Island" },
      { name: "New Jersey", desc: "Jersey City, Newark, Paterson, Elizabeth & statewide" },
      { name: "Rhode Island", desc: "Providence, Warwick, Cranston & statewide" },
      { name: "Dominican Republic", desc: "Santo Domingo, Santiago de los Caballeros, Punta Cana" }
    ],
    cta: "Get Your Free Quote Today"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Web Design & Development",
    "serviceType": "Web Development",
    "provider": {
      "@type": "ProfessionalService",
      "name": "COzuna Web Design Agency",
      "url": "https://cozuna.com",
      "telephone": "+16468831869",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "516 W 136th St Apt.",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "10031",
        "addressCountry": "US"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "New York City" },
      { "@type": "State", "name": "New Jersey" },
      { "@type": "State", "name": "Rhode Island" },
      { "@type": "Country", "name": "Dominican Republic" }
    ],
    "offers": {
      "@type": "Offer",
      "price": "950.00",
      "priceCurrency": "USD",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "url": `https://cozuna.com/${lang}/affordable-web-development`
    }
  };

  return (
    <div className="bg-zinc-950 py-20 sm:py-28 flex-grow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header / Hero */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Geo Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{content.badge}</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 text-balance">
            {content.title}
          </h1>

          <p className="text-lg leading-8 text-zinc-300 mb-6 text-balance font-light">
            {content.subtitle}
          </p>

          <p className="text-sm font-semibold text-cyan-300 mb-8 tracking-wide">
            {content.priceTag}
          </p>

          <div className="flex justify-center">
            <Link 
              href={`/${lang}/get-a-quote`} 
              className="rounded-full bg-brand-primary px-8 py-4 text-sm font-bold tracking-wide uppercase text-white shadow-xl shadow-brand-primary/30 hover:bg-blue-600 hover:scale-[1.03] transition-all flex items-center gap-2"
            >
              {content.cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mx-auto mt-20 max-w-2xl lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
            {content.features.map((feature) => (
              <div key={feature.title} className="flex flex-col bg-zinc-900/80 p-8 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="p-2.5 rounded-xl bg-brand-primary/15 text-brand-primary">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-zinc-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Localized Focus Regions */}
        <div className="mx-auto mt-20 max-w-4xl bg-zinc-900/60 rounded-3xl border border-zinc-800/80 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{content.marketsTitle}</h2>
            <p className="text-sm text-zinc-400">Tailored digital architecture designed to help businesses dominate their local search radius.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.markets.map((market) => (
              <div key={market.name} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-white">{market.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{market.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
