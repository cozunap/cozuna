import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MonitorSmartphone, Code, Search, Rocket, MapPin, CheckCircle2, ShieldCheck, Zap, Building2, Phone } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const title = lang === 'fr'
    ? "Conception de Sites Web à New York City | Agence Web NYC | COzuna"
    : lang === 'es' 
    ? "Diseño de Páginas Web en New York City | Manhattan, Brooklyn, Queens y Bronx | COzuna" 
    : "Custom Web Design New York City | Top NYC Web Design Agency | COzuna";

  const description = lang === 'fr'
    ? "Agence haut de gamme de conception web sur mesure à New York City. Sites Next.js ultra-rapides, design graphique et impression commerciale à Manhattan, Brooklyn, Queens et Bronx."
    : lang === 'es' 
    ? "Agencia líder de diseño web en New York City. Sitios web a medida, e-commerce e imprenta comercial en Manhattan, Brooklyn, Queens, Bronx y Staten Island. Precios desde $950." 
    : "Top NYC custom web design & development agency. High-converting Next.js websites, branding & commercial printing across Manhattan, Brooklyn, Queens, The Bronx & Staten Island.";

  return {
    title,
    description,
    keywords: "web design new york city, custom web design nyc, website designer manhattan, brooklyn web design, queens web development, bronx web designer, affordable web design new york, top nyc web agency, nextjs web design nyc",
    alternates: {
      canonical: `https://cozuna.com/${lang}/web-design-new-york-city`,
      languages: {
        'en': 'https://cozuna.com/en/web-design-new-york-city',
        'es': 'https://cozuna.com/es/web-design-new-york-city',
        'fr': 'https://cozuna.com/fr/web-design-new-york-city',
        'x-default': 'https://cozuna.com/en/web-design-new-york-city'
      }
    }
  };
}

export default async function WebDesignNewYorkCity({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const content = lang === 'es' ? {
    badge: "New York City • Manhattan • Brooklyn • Queens • Bronx • Staten Island",
    title: "Diseño Web de Élite y Alta Conversión en New York City",
    subtitle: "Ayudamos a pequeñas y medianas empresas de Nueva York a superar a su competencia con sitios web a medida construidos en Next.js. Máxima velocidad, diseño visual premium y optimización SEO local para dominar Google.",
    priceTag: "Páginas web a medida desde $950 USD • Entrega en 2 a 4 semanas",
    features: [
      { title: "Arquitectura 100% Personalizada", description: "Cero plantillas infladas o lentas. Cada sitio web se codifica a medida para reflejar la categoría de tu negocio.", icon: MonitorSmartphone },
      { title: "Velocidad Extrema Next.js", description: "Puntuación de 95+ en Google Core Web Vitals. Carga instantánea que reduce la tasa de rebote.", icon: Zap },
      { title: "Dominio en Google & Google Maps", description: "Estrategias de SEO local y AEO para que tu negocio aparezca en las búsquedas con mayor intención de compra.", icon: Search },
      { title: "Soporte Local en NYC", description: "Atención cercana y confiable con base en Manhattan. Comunicación fluida en inglés y español.", icon: ShieldCheck },
    ],
    boroughsTitle: "Servicio Especializado en los 5 Distritos de Nueva York",
    boroughs: [
      { name: "Manhattan", desc: "Midtown, Downtown, Financial District, Upper West Side, Harlem y Washington Heights." },
      { name: "Brooklyn", desc: "Williamsburg, DUMBO, Bushwick, Downtown Brooklyn, Bay Ridge y Sunset Park." },
      { name: "Queens", desc: "Astoria, Long Island City, Flushing, Sunnyside, Jackson Heights y Forest Hills." },
      { name: "The Bronx & Staten Island", desc: "South Bronx, Riverdale, St. George y corredores comerciales en expansión." }
    ],
    whyTitle: "¿Por Qué Elegir a COzuna Sobre Otras Agencias de Nueva York?",
    whyBullets: [
      "Tarifas transparentes y accesibles: entregamos calidad de agencia corporativa sin cobrar $15,000+.",
      "Casos de éxito reales en NYC (Degan Tax, Refried Beans NYC, Elsy Leonso, AJS Mechanical).",
      "Solución integral 360°: diseño web, branding, letreros comerciales y materiales impresos.",
      "Alojamiento edge en Cloudflare para máxima velocidad y seguridad contra caídas."
    ],
    ctaQuote: "Cotizar Proyecto en NYC",
    ctaCall: "Llamar a Nuestra Oficina en NYC"
  } : {
    badge: "New York City • Manhattan • Brooklyn • Queens • Bronx • Staten Island",
    title: "Top-Tier Custom Web Design & Development in New York City",
    subtitle: "We build bespoke, high-converting websites engineered to help NYC small and midsize businesses outperform competitors. Blazing Next.js performance, elite visual design, and aggressive local SEO.",
    priceTag: "Custom NYC Websites From $950 USD • Turnaround in 2 to 4 Weeks",
    features: [
      { title: "100% Bespoke Engineering", description: "Zero generic templates or clunky builders. Hand-crafted Next.js architecture built for conversion.", icon: MonitorSmartphone },
      { title: "Next.js Edge Speed", description: "Consistent 95+ Google Core Web Vitals scores. Sub-second loading keeps New Yorkers engaged.", icon: Zap },
      { title: "NYC Local SEO & AEO Dominance", description: "Engineered to rank in the Google Local 3-Pack and power direct citations on SearchGPT & Perplexity.", icon: Search },
      { title: "Local NYC Support", description: "Headquartered in Upper Manhattan. Direct communication with senior web designers and engineers.", icon: ShieldCheck },
    ],
    boroughsTitle: "Serving All 5 Boroughs of New York City",
    boroughs: [
      { name: "Manhattan", desc: "Midtown, Financial District, SoHo, Harlem, Upper East/West Side & Washington Heights." },
      { name: "Brooklyn", desc: "Williamsburg, DUMBO, Downtown Brooklyn, Bushwick, Greenpoint & Park Slope." },
      { name: "Queens", desc: "Astoria, Long Island City, Sunnyside, Flushing, Jackson Heights & Forest Hills." },
      { name: "The Bronx & Staten Island", desc: "Mott Haven, Riverdale, St. George, and thriving regional commercial hubs." }
    ],
    whyTitle: "Why NYC Businesses Partner with COzuna Over Big Agencies",
    whyBullets: [
      "Transparent, accessible pricing: elite Madison Avenue agency quality without the $20,000 price tag.",
      "Proven local portfolio: Degan Tax NYC, Refried Beans Mexican Grill, Elsy Leonso, and AJS Mechanical.",
      "Full-service 360° ecosystem: web design, brand identity, storefront signage & commercial printing.",
      "Cloudflare edge deployment ensuring 99.99% uptime and instant TTFB across the tri-state area."
    ],
    ctaQuote: "Request Your Free NYC Quote",
    ctaCall: "Call Our NYC Team"
  };

  const nycSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "COzuna Web Design New York City",
    "image": "https://cozuna.com/assets/images/2024/10/main-photo.webp",
    "url": `https://cozuna.com/${lang}/web-design-new-york-city`,
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
    "areaServed": [
      { "@type": "City", "name": "New York City" },
      { "@type": "AdministrativeArea", "name": "Manhattan" },
      { "@type": "AdministrativeArea", "name": "Brooklyn" },
      { "@type": "AdministrativeArea", "name": "Queens" },
      { "@type": "AdministrativeArea", "name": "Bronx" },
      { "@type": "AdministrativeArea", "name": "Staten Island" }
    ],
    "offers": {
      "@type": "Offer",
      "price": "950.00",
      "priceCurrency": "USD",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "url": `https://cozuna.com/${lang}/web-design-new-york-city`
    }
  };

  return (
    <div className="bg-zinc-950 py-20 sm:py-28 flex-grow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nycSchema) }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
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

          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href={`/${lang}/get-a-quote`} 
              className="rounded-full bg-brand-primary px-8 py-4 text-sm font-bold tracking-wide uppercase text-white shadow-xl shadow-brand-primary/30 hover:bg-blue-600 hover:scale-[1.03] transition-all flex items-center gap-2"
            >
              <span>{content.ctaQuote}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="tel:+16468831869"
              className="rounded-full bg-zinc-900 border border-zinc-800 px-8 py-4 text-sm font-bold tracking-wide uppercase text-zinc-200 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-primary" />
              <span>{content.ctaCall}</span>
            </a>
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

        {/* Why COzuna in NYC */}
        <div className="mx-auto mt-20 max-w-4xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-brand-dark rounded-3xl border border-zinc-800 p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">{content.whyTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.whyBullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300">{bullet}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Boroughs Coverage */}
        <div className="mx-auto mt-16 max-w-4xl bg-zinc-900/60 rounded-3xl border border-zinc-800/80 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{content.boroughsTitle}</h2>
            <p className="text-sm text-zinc-400">Targeted web design and digital infrastructure built for the distinct business environments of New York City.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.boroughs.map((b) => (
              <div key={b.name} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-white">{b.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
