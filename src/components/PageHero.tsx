import Image from "next/image";

interface PageHeroProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  backgroundImage?: string;
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative w-full h-[25vh] min-h-[180px] flex items-center justify-center border-b border-zinc-900 overflow-hidden bg-brand-dark">
      {/* Background Image & Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
      )}

      {/* Fallback Glow Effects (if no image) */}
      {!backgroundImage && (
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-brand-primary/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl text-center px-6 mt-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg leading-8 text-zinc-300 max-w-2xl mx-auto font-light whitespace-pre-wrap">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
