import Image from "next/image";

interface PageHeroProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  backgroundImage?: string;
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative w-full h-[150px] min-h-[150px] max-h-[150px] flex flex-col items-center justify-center border-b border-zinc-900 overflow-hidden bg-brand-dark">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage || "/assets/images/2024/10/main-photo.webp"} 
          alt="Hero Background" 
          className="w-full h-full object-cover object-center" 
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl text-center px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base leading-7 text-zinc-300 max-w-2xl mx-auto font-light whitespace-pre-wrap">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
