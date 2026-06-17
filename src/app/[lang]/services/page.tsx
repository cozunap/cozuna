import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Web Design & Development",
    description:
      "Your website is the digital storefront of your business. We build responsive, fast-loading, and visually stunning websites engineered to convert your visitors into loyal customers. From corporate sites to dynamic e-commerce platforms, we handle it all.",
    features: ["Responsive Design", "SEO Optimization", "Fast Load Times", "Custom Development"],
    image: "/assets/images/2024/10/web-design.jpg",
  },
  {
    title: "Graphic Design & Branding",
    description:
      "First impressions matter. From striking logos to complete brand identities, we ensure your visual communication is unforgettable. We help you create a consistent look and feel across all your marketing channels.",
    features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Social Media Graphics"],
    image: "/assets/images/2024/10/graphic-design.webp",
  },
  {
    title: "Premium Printing Services",
    description:
      "Bridge the gap between digital and physical with high-quality printed materials. We offer affordable and professional printing for business cards, flyers, restaurant menus, brochures, and more.",
    features: ["Business Cards", "Restaurant Menus", "Flyers & Brochures", "Large Format"],
    image: "/assets/images/2024/10/printing.webp",
  },
  {
    title: "Custom Signage",
    description:
      "Get noticed instantly with eye-catching indoor and outdoor signage. Whether you need a storefront banner, a light box, or directional signs, we design and produce signage that demands attention.",
    features: ["Outdoor Banners", "Light Boxes", "Window Graphics", "Indoor Signs"],
    image: "/assets/images/2024/10/signage.webp",
  },
];

export const metadata = {
  title: "Our Services | COzuna Web Design & Printing",
  description: "Explore our professional web design, graphic design, printing, and signage services.",
};

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const cmsData = await getPageData('services');

  const heroTitle = cmsData?.heroTitle?.[lang] || "Our Services";
  const heroSubtitle = cmsData?.heroSubtitle?.[lang] || "Everything you need to launch, grow, and scale your brand under one roof.";

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      {/* Header */}
      <section className="relative py-24 sm:py-32 px-6 lg:px-8 border-b border-zinc-900 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.brand.primary/5),theme(colors.zinc.950))] opacity-50" />
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">{heroTitle}</h1>
          <p className="mt-6 text-xl leading-8 text-zinc-300 max-w-2xl mx-auto font-light">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`flex flex-col lg:flex-row gap-16 items-center ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden group border border-zinc-800">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                    {service.title}
                  </h2>
                  <p className="text-lg leading-8 text-zinc-400 mb-8 font-light">
                    {service.description}
                  </p>
                  
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <Link
                      href="/get-a-quote"
                      className="inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 border border-zinc-800 hover:border-brand-primary"
                    >
                      Request a Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-primary px-6 lg:px-8 text-center mt-auto">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto">
            Let's discuss how we can help your business stand out from the competition.
          </p>
          <Link
            href="/get-a-quote"
            className="inline-block rounded-full bg-white px-8 py-4 text-sm font-bold text-brand-primary shadow-lg hover:bg-zinc-100 transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </main>
  );
}
