import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, CreditCard, Search, TrendingUp } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const title = lang === 'es' 
    ? "Diseño de Tiendas Online | E-Commerce | COzuna" 
    : "E-Commerce Web Design | Online Stores | COzuna";
  const description = lang === 'es' 
    ? "Diseño y desarrollo de tiendas online e-commerce que convierten visitantes en clientes. Aumenta tus ventas con una tienda virtual rápida y segura." 
    : "E-commerce web design and development that converts visitors into customers. Increase your sales with a fast and secure online store.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/ecommerce-web-design`
    }
  };
}

export default async function EcommerceWebDesign({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const content = lang === 'es' ? {
    title: "Diseño de Tiendas Online que Venden Más",
    subtitle: "Lleva tus productos al mundo entero. Creamos tiendas virtuales (e-commerce) rápidas, seguras y diseñadas para maximizar tus ventas.",
    features: [
      { title: "Diseño Orientado a Ventas", description: "Interfaces intuitivas que guían al usuario a comprar.", icon: ShoppingCart },
      { title: "Pagos Seguros", description: "Integración con Stripe, PayPal y pasarelas locales.", icon: CreditCard },
      { title: "SEO para E-commerce", description: "Tus productos aparecerán en Google cuando te busquen.", icon: Search },
      { title: "Escalabilidad", description: "Tu tienda crece al mismo ritmo que tu negocio.", icon: TrendingUp },
    ],
    cta: "Inicia Tu Tienda Hoy"
  } : {
    title: "E-Commerce Web Design that Sells More",
    subtitle: "Take your products worldwide. We create fast, secure, and conversion-optimized e-commerce stores designed to maximize your sales.",
    features: [
      { title: "Sales-Driven Design", description: "Intuitive interfaces that guide users to checkout.", icon: ShoppingCart },
      { title: "Secure Payments", description: "Integration with Stripe, PayPal, and local gateways.", icon: CreditCard },
      { title: "E-commerce SEO", description: "Your products will show up on Google when people search.", icon: Search },
      { title: "Scalability", description: "Your store grows at the same pace as your business.", icon: TrendingUp },
    ],
    cta: "Start Your Store Today"
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
