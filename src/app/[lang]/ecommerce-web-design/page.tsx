import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, CreditCard, Search, TrendingUp, MapPin, CheckCircle2 } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const title = lang === 'fr'
    ? "Création de Boutique en Ligne & E-Commerce | NYC, NJ & Rep. Dominicaine | COzuna"
    : lang === 'es' 
    ? "Diseño de Tiendas Online y E-Commerce | NYC, NJ, RI y Rep. Dominicana | COzuna" 
    : "E-Commerce Web Design & Online Stores | NYC, NJ, RI & Dominican Republic | COzuna";

  const description = lang === 'fr' 
    ? "Création de boutiques e-commerce performantes avec Stripe et paiements sécurisés à New York, New Jersey et République Dominicaine. Convertissez vos visiteurs en ventes."
    : lang === 'es' 
    ? "Diseño y desarrollo de tiendas online e-commerce que convierten visitantes en clientes en New York, New Jersey, Rhode Island y Rep. Dominicana. Integración con Stripe y pagos locales." 
    : "High-converting e-commerce web design and online store development for businesses across New York, New Jersey, Rhode Island, and the Dominican Republic. Seamless Stripe and payment integrations.";

  return {
    title,
    description,
    keywords: "ecommerce web design new york, ecommerce website new jersey, online store development providence ri, diseno tienda virtual santo domingo, tiendas online santiago rd, stripe payment integration website",
    alternates: {
      canonical: `https://cozuna.com/${lang}/ecommerce-web-design`,
      languages: {
        'en': 'https://cozuna.com/en/ecommerce-web-design',
        'es': 'https://cozuna.com/es/ecommerce-web-design',
        'fr': 'https://cozuna.com/fr/ecommerce-web-design',
        'x-default': 'https://cozuna.com/en/ecommerce-web-design'
      }
    }
  };
}

export default async function EcommerceWebDesign({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const content = lang === 'fr' ? {
    badge: "Boutiques en Ligne • NYC • New Jersey • Rhode Island • Rep. Dominicaine",
    title: "Conception de Boutiques E-Commerce à Fort Taux de Conversion",
    subtitle: "Vendez vos produits localement et mondialement. Nous concevons des boutiques virtuelles sécurisées, ultra-rapides et entièrement optimisées pour le paiement instantané.",
    features: [
      { title: "Design Orienté Ventes", description: "Expérience d'achat intuitive avec paiement rapide en un clic.", icon: ShoppingCart },
      { title: "Paiements Sécurisés", description: "Intégration Stripe, PayPal, Apple Pay et passerelles régionales.", icon: CreditCard },
      { title: "SEO pour Boutiques", description: "Positionnez vos fiches produits directement en première page de Google.", icon: Search },
      { title: "Scalabilité Sans Limite", description: "Votre catalogue et vos stocks évoluent sans jamais ralentir votre site.", icon: TrendingUp },
    ],
    cta: "Lancer Ma Boutique en Ligne"
  } : lang === 'es' ? {
    badge: "Tiendas Online • NYC • New Jersey • Rhode Island • Rep. Dominicana",
    title: "Diseño de Tiendas Online que Venden Más",
    subtitle: "Lleva tus productos al mundo entero. Creamos tiendas virtuales (e-commerce) rápidas, seguras y diseñadas con embudos de compra que maximizan tus ventas.",
    features: [
      { title: "Diseño Orientado a Ventas", description: "Interfaces intuitivas y procesos de pago rápidos en 1 clic.", icon: ShoppingCart },
      { title: "Pagos Seguros y Locales", description: "Integración con Stripe, PayPal, Apple Pay y pasarelas de pago regionales.", icon: CreditCard },
      { title: "SEO para E-commerce", description: "Tus productos aparecerán en Google Shopping y búsquedas locales de clientes listos para comprar.", icon: Search },
      { title: "Escalabilidad Total", description: "Gestiona inventario, pedidos y envíos con facilidad a medida que tu negocio crece.", icon: TrendingUp },
    ],
    cta: "Inicia Tu Tienda Hoy"
  } : {
    badge: "Online Stores • NYC • New Jersey • Rhode Island • Dominican Republic",
    title: "High-Converting E-Commerce Stores Engineered to Scale Sales",
    subtitle: "Sell your products locally and across the globe. We build lightning-fast, ultra-secure e-commerce experiences engineered for maximum checkout conversions.",
    features: [
      { title: "Conversion-Driven UI", description: "Frictionless browsing and 1-click checkout flows to minimize abandoned carts.", icon: ShoppingCart },
      { title: "Global & Local Gateways", description: "Native integration with Stripe, PayPal, Apple Pay, and local banking gateways.", icon: CreditCard },
      { title: "E-Commerce SEO", description: "Get your product catalog indexed and ranking on Google Shopping and Search.", icon: Search },
      { title: "Enterprise Scalability", description: "Automated inventory management, real-time shipping calculation, and effortless scaling.", icon: TrendingUp },
    ],
    cta: "Launch Your Store Today"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "E-Commerce Web Design & Development",
    "serviceType": "E-Commerce Development",
    "provider": {
      "@type": "ProfessionalService",
      "name": "COzuna Web Design Agency",
      "url": "https://cozuna.com",
      "telephone": "+16468831869"
    },
    "areaServed": [
      { "@type": "City", "name": "New York City" },
      { "@type": "State", "name": "New Jersey" },
      { "@type": "State", "name": "Rhode Island" },
      { "@type": "Country", "name": "Dominican Republic" }
    ],
    "offers": {
      "@type": "Offer",
      "price": "1499.00",
      "priceCurrency": "USD",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "url": `https://cozuna.com/${lang}/ecommerce-web-design`
    }
  };

  return (
    <div className="bg-zinc-950 py-20 sm:py-28 flex-grow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{content.badge}</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 text-balance">
            {content.title}
          </h1>
          <p className="text-lg leading-8 text-zinc-300 mb-10 text-balance font-light">
            {content.subtitle}
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
      </div>
    </div>
  );
}
