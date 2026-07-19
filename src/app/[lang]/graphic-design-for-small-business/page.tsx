import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, PenTool, Layout, Image as ImageIcon, Printer } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const title = lang === 'es' 
    ? "Diseño Gráfico Profesional para Pequeñas Empresas | COzuna" 
    : "Professional Graphic Design for Small Businesses | COzuna";
  const description = lang === 'es' 
    ? "Servicios de diseño gráfico, creación de logos, branding y diseño para impresión. Dale a tu negocio una imagen corporativa profesional." 
    : "Graphic design services, logo creation, branding, and print design. Give your business a professional corporate image.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/graphic-design-for-small-business`
    }
  };
}

export default async function GraphicDesign({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const content = lang === 'es' ? {
    title: "Diseño Gráfico Profesional para tu Marca",
    subtitle: "Una imagen vale más que mil palabras. Construimos la identidad visual de tu empresa para transmitir profesionalismo, confianza y calidad.",
    features: [
      { title: "Diseño de Logos", description: "Logotipos únicos que capturan la esencia de tu marca.", icon: PenTool },
      { title: "Identidad Corporativa", description: "Manuales de marca, paletas de colores y tipografías.", icon: Layout },
      { title: "Material de Marketing", description: "Diseño para redes sociales, banners y anuncios.", icon: ImageIcon },
      { title: "Diseño para Impresión", description: "Tarjetas de presentación, flyers, banners y más.", icon: Printer },
    ],
    cta: "Mejora Tu Imagen"
  } : {
    title: "Professional Graphic Design for Your Brand",
    subtitle: "A picture is worth a thousand words. We build your company's visual identity to convey professionalism, trust, and quality.",
    features: [
      { title: "Logo Design", description: "Unique logos that capture the essence of your brand.", icon: PenTool },
      { title: "Corporate Identity", description: "Brand guidelines, color palettes, and typography.", icon: Layout },
      { title: "Marketing Materials", description: "Design for social media, banners, and ads.", icon: ImageIcon },
      { title: "Print Design", description: "Business cards, flyers, banners, and more.", icon: Printer },
    ],
    cta: "Improve Your Image"
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
