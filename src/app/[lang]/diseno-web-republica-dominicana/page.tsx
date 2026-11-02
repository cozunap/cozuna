import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MonitorSmartphone, Code, Search, Rocket, MapPin, CheckCircle2, ShieldCheck, Zap, MessageSquare, Phone } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const title = lang === 'fr'
    ? "Conception de Sites Web en République Dominicaine | Santo Domingo & Santiago | COzuna"
    : lang === 'es' 
    ? "Diseño de Páginas Web en República Dominicana | Santo Domingo, Santiago y Punta Cana | COzuna" 
    : "Web Design in Dominican Republic | Santo Domingo, Santiago & Punta Cana | COzuna";

  const description = lang === 'fr'
    ? "Agence leader en conception web sur mesure en République Dominicaine. Sites ultra-rapides, e-commerce et référencement Google à Santo Domingo, Santiago et Punta Cana."
    : lang === 'es' 
    ? "Agencia líder en diseño de páginas web profesionales en República Dominicana. Desarrollo web a medida, tiendas online y posicionamiento SEO #1 en Santo Domingo, Santiago y Punta Cana. Cotiza por WhatsApp." 
    : "Top-rated custom web design agency in the Dominican Republic. Fast Next.js websites, e-commerce, and high-ranking SEO in Santo Domingo, Santiago, and Punta Cana.";

  return {
    title,
    description,
    keywords: "diseno web republica dominicana, diseno de paginas web santo domingo, creacion de sitios web santiago rd, diseno web punta cana, desarrollo web rd, agencia digital republica dominicana, diseno web economico santo domingo, paginas web profesionales rd",
    alternates: {
      canonical: `https://cozuna.com/${lang}/diseno-web-republica-dominicana`,
      languages: {
        'en': 'https://cozuna.com/en/diseno-web-republica-dominicana',
        'es': 'https://cozuna.com/es/diseno-web-republica-dominicana',
        'fr': 'https://cozuna.com/fr/diseno-web-republica-dominicana',
        'x-default': 'https://cozuna.com/es/diseno-web-republica-dominicana'
      }
    }
  };
}

export default async function DisenoWebRepublicaDominicana({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const content = lang === 'es' ? {
    badge: "República Dominicana • Santo Domingo • Santiago • Punta Cana",
    title: "Diseño de Páginas Web Profesionales en República Dominicana",
    subtitle: "Construimos sitios web de alto rendimiento diseñados específicamente para el mercado dominicano. Rápidos, adaptados a celulares y 100% integrados con WhatsApp para cerrar clientes todos los días.",
    priceTag: "Planes web desde $45,000 DOP / $850 USD • Entrega en 2 a 3 semanas",
    features: [
      { title: "Optimizado para Celulares", description: "Más del 85% del tráfico en RD es móvil. Tu web cargará al instante en cualquier teléfono.", icon: MonitorSmartphone },
      { title: "Integración Directa con WhatsApp", description: "Botones interactivos que envían prospectos calificados directamente al chat de tu negocio.", icon: MessageSquare },
      { title: "Posicionamiento Google #1", description: "Estructura optimizada para dominar las búsquedas de tu sector en Santo Domingo y Santiago.", icon: Search },
      { title: "Velocidad Extrema Next.js", description: "Sin plantillas lentas de WordPress. Tecnología moderna con tiempos de carga menores a 1 segundo.", icon: Zap },
    ],
    citiesTitle: "Cobertura Completa en Toda la República Dominicana",
    cities: [
      { name: "Santo Domingo (Distrito Nacional & Este/Oeste)", desc: "Piantini, Naco, Bella Vista, Gazcue, Arroyo Hondo y zonas comerciales metropolitanas." },
      { name: "Santiago de los Caballeros", desc: "Los Jardines, Villa Olga, La Trinitaria y todo el Cibao empresarial e industrial." },
      { name: "Punta Cana & Bávaro", desc: "Empresas turísticas, inmobiliarias, excursiones y servicios de hospitalidad internacional." },
      { name: "La Romana, Puerto Plata & Samaná", desc: "Desarrollo de portales para marcas de turismo, hotelería y comercio en el Caribe." }
    ],
    whyTitle: "¿Por qué COzuna es la Agencia Web #1 para Empresas Dominicanas?",
    whyBullets: [
      "No usamos plantillas genéricas: cada diseño es único y refleja la identidad de tu empresa.",
      "Integración nativa con pasarelas de pago (Carnet, Azul, Cardnet, Stripe y PayPal).",
      "Soporte continuo y capacitación para que gestiones tus promociones y contenidos.",
      "Garantía de velocidad y seguridad contra ataques cibernéticos."
    ],
    ctaWhatsApp: "Cotizar por WhatsApp al Instante",
    ctaQuote: "Solicitar Presupuesto Online"
  } : {
    badge: "Dominican Republic • Santo Domingo • Santiago • Punta Cana",
    title: "Professional Custom Web Design in the Dominican Republic",
    subtitle: "We build high-performance websites engineered specifically to win clients across the Dominican Republic. Mobile-first, ultra-fast Next.js architecture, and instant WhatsApp lead capture.",
    priceTag: "Packages from $850 USD / $45,000 DOP • Delivered in 2 to 3 weeks",
    features: [
      { title: "Mobile-First Design", description: "Over 85% of traffic in the Dominican Republic is mobile. Your site loads instantly on all devices.", icon: MonitorSmartphone },
      { title: "WhatsApp Lead Funnels", description: "Seamless click-to-chat triggers that route qualified buyers directly to your sales team.", icon: MessageSquare },
      { title: "#1 Google Ranking SEO", description: "On-page and technical architecture designed to capture high-value search queries across RD.", icon: Search },
      { title: "Next.js Performance", description: "Zero bloated WordPress templates. Custom React & Next.js code with sub-second loading speeds.", icon: Zap },
    ],
    citiesTitle: "Primary Coverage Across the Dominican Republic",
    cities: [
      { name: "Santo Domingo (National District & Greater Santo Domingo)", desc: "Piantini, Naco, Bella Vista, Gazcue, and top business corridors." },
      { name: "Santiago de los Caballeros", desc: "Los Jardines, Villa Olga, and the growing Cibao commercial region." },
      { name: "Punta Cana & Bávaro", desc: "Tourism, luxury real estate development, excursions, and international hospitality." },
      { name: "La Romana, Puerto Plata & Samaná", desc: "High-end corporate, travel, and retail web solutions." }
    ],
    whyTitle: "Why COzuna Is The Preferred Digital Partner in the Dominican Republic",
    whyBullets: [
      "Custom UI/UX crafted to turn visits into paying customers without generic templates.",
      "Payment gateway integration ready for Cardnet, Azul, Stripe, and PayPal.",
      "Dedicated bilingual support in Spanish and English for local and diaspora clients.",
      "Enterprise edge hosting on Cloudflare for 100% uptime and blazing fast response."
    ],
    ctaWhatsApp: "Instant WhatsApp Consultation",
    ctaQuote: "Request A Free Quote"
  };

  const drSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Diseño de Páginas Web en República Dominicana",
    "serviceType": "Web Design & Development",
    "provider": {
      "@type": "ProfessionalService",
      "name": "COzuna Web Design Agency",
      "url": "https://cozuna.com",
      "telephone": "+16468831869",
      "email": "ozunaprinting@gmail.com"
    },
    "areaServed": [
      { "@type": "Country", "name": "Dominican Republic" },
      { "@type": "City", "name": "Santo Domingo" },
      { "@type": "City", "name": "Santiago de los Caballeros" },
      { "@type": "City", "name": "Punta Cana" }
    ],
    "offers": {
      "@type": "Offer",
      "price": "850.00",
      "priceCurrency": "USD",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "url": `https://cozuna.com/${lang}/diseno-web-republica-dominicana`
    }
  };

  const whatsappMessage = encodeURIComponent(
    lang === 'es'
      ? "Hola COzuna, quiero información y cotización para una página web en República Dominicana."
      : "Hello COzuna, I would like information and a quote for a website in the Dominican Republic."
  );

  return (
    <div className="bg-zinc-950 py-20 sm:py-28 flex-grow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(drSchema) }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="mx-auto max-w-3xl text-center">
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

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={`https://wa.me/16468831869?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold tracking-wide uppercase text-white shadow-xl shadow-green-500/20 hover:bg-[#20ba59] hover:scale-[1.03] transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{content.ctaWhatsApp}</span>
            </a>
            <Link 
              href={`/${lang}/get-a-quote`} 
              className="rounded-full bg-zinc-900 border border-zinc-800 px-8 py-4 text-sm font-bold tracking-wide uppercase text-zinc-200 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all flex items-center gap-2"
            >
              <span>{content.ctaQuote}</span>
              <ArrowRight className="w-4 h-4" />
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

        {/* Why COzuna in DR */}
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

        {/* Coverage in Dominican Republic */}
        <div className="mx-auto mt-16 max-w-4xl bg-zinc-900/60 rounded-3xl border border-zinc-800/80 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{content.citiesTitle}</h2>
            <p className="text-sm text-zinc-400">Desarrollo web estratégico con enfoque local para negocios y emprendedores en toda la isla.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.cities.map((city) => (
              <div key={city.name} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-white">{city.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{city.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
