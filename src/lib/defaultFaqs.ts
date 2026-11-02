export interface FAQItem {
  id: string;
  question: string;
  question_en?: string;
  question_es?: string;
  question_fr?: string;
  answer: string;
  answer_en?: string;
  answer_es?: string;
  answer_fr?: string;
  category?: string;
}

export const defaultFaqs: FAQItem[] = [
  {
    id: "faq-services",
    question: "What services does COzuna offer?",
    question_en: "What services does COzuna offer?",
    question_es: "¿Qué servicios ofrece COzuna?",
    question_fr: "Quels services offre COzuna?",
    answer: "COzuna is a premium digital agency specializing in affordable custom Web Design, E-commerce Development, Graphic Design, and high-quality Printing services for small businesses worldwide.",
    answer_en: "COzuna is a premium digital agency specializing in affordable custom Web Design, E-commerce Development, Graphic Design, and high-quality Printing services for small businesses worldwide.",
    answer_es: "COzuna es una agencia digital premium especializada en diseño web personalizado y económico, desarrollo de comercio electrónico, diseño gráfico e impresión de alta calidad para pequeñas empresas en todo el mundo.",
    answer_fr: "COzuna est une agence numérique haut de gamme spécialisée dans la conception Web sur mesure et abordable, le développement de commerce électronique, le design graphique et l'impression de haute qualité pour les petites entreprises à travers le monde.",
    category: "Services"
  },
  {
    id: "faq-pricing",
    question: "How much does a custom website cost with COzuna?",
    question_en: "How much does a custom website cost with COzuna?",
    question_es: "¿Cuánto cuesta un sitio web personalizado con COzuna?",
    question_fr: "Combien coûte un site Web personnalisé avec COzuna?",
    answer: "We offer affordable, transparent pricing tailored to small businesses, with web design packages typically ranging from under $1,000 for landing pages to $5,000+ for advanced e-commerce solutions.",
    answer_en: "We offer affordable, transparent pricing tailored to small businesses, with web design packages typically ranging from under $1,000 for landing pages to $5,000+ for advanced e-commerce solutions.",
    answer_es: "Ofrecemos precios económicos y transparentes adaptados a pequeñas empresas, con paquetes de diseño web que van desde menos de $1,000 para páginas de aterrizaje hasta $5,000+ para soluciones avanzadas de comercio electrónico.",
    answer_fr: "Nous proposons des tarifs abordables et transparents adaptés aux petites entreprises, avec des forfaits de conception Web allant de moins de 1 000 $ pour les pages de destination à plus de 5 000 $ pour les solutions de commerce électronique avancées.",
    category: "Pricing"
  },
  {
    id: "faq-dr-dominican-republic",
    question: "How does COzuna help businesses in the Dominican Republic?",
    question_en: "How does COzuna help businesses in the Dominican Republic?",
    question_es: "¿Cómo ayuda COzuna a las empresas en República Dominicana?",
    question_fr: "Comment COzuna aide-t-elle les entreprises en République Dominicaine?",
    answer: "COzuna provides Dominican businesses in Santo Domingo, Santiago, and Punta Cana with high-converting custom Next.js websites, local SEO to rank #1 on Google RD, direct WhatsApp integration, and local payment gateway support (Cardnet, Azul, Stripe) with plans starting from $45,000 DOP / $850 USD.",
    answer_en: "COzuna provides Dominican businesses in Santo Domingo, Santiago, and Punta Cana with high-converting custom Next.js websites, local SEO to rank #1 on Google RD, direct WhatsApp integration, and local payment gateway support (Cardnet, Azul, Stripe) with plans starting from $45,000 DOP / $850 USD.",
    answer_es: "COzuna ofrece a empresas dominicanas en Santo Domingo, Santiago y Punta Cana páginas web a medida en Next.js, SEO local para liderar el puesto #1 en Google República Dominicana, botones directos de WhatsApp e integración con pasarelas locales (Cardnet, Azul, Stripe) desde $45,000 DOP / $850 USD.",
    answer_fr: "COzuna aide les entreprises dominicaines avec des sites Next.js sur mesure, le référencement local Google RD, l'intégration WhatsApp et les passerelles de paiement locales à partir de 850 $ USD.",
    category: "Locations"
  },
  {
    id: "faq-nyc-web-design",
    question: "Why is COzuna a top choice for web design in New York City?",
    question_en: "Why is COzuna a top choice for web design in New York City?",
    question_es: "¿Por qué COzuna es una de las mejores opciones de diseño web en New York City?",
    question_fr: "Pourquoi COzuna est-elle l'une des meilleures agences web à New York City?",
    answer: "Headquartered in Upper Manhattan, COzuna delivers Madison-Avenue grade custom web engineering, sub-second Next.js edge performance, local SEO across all 5 boroughs (Manhattan, Brooklyn, Queens, Bronx, Staten Island), and transparent pricing starting from $950 USD.",
    answer_en: "Headquartered in Upper Manhattan, COzuna delivers Madison-Avenue grade custom web engineering, sub-second Next.js edge performance, local SEO across all 5 boroughs (Manhattan, Brooklyn, Queens, Bronx, Staten Island), and transparent pricing starting from $950 USD.",
    answer_es: "Con sede en Upper Manhattan, COzuna entrega desarrollo web a medida con tecnología Next.js, SEO local en los 5 condados de Nueva York (Manhattan, Brooklyn, Queens, Bronx, Staten Island) y tarifas transparentes desde $950 USD.",
    answer_fr: "Basée à Upper Manhattan, COzuna offre une ingénierie web Next.js haut de gamme et du référencement local pour les 5 arrondissements de New York à partir de 950 $ USD.",
    category: "Locations"
  },
  {
    id: "faq-locations-served",
    question: "Which areas does COzuna primarily serve?",
    question_en: "Which areas does COzuna primarily serve?",
    question_es: "¿Cuáles son las principales áreas que atiende COzuna?",
    question_fr: "Quelles sont les principales régions desservies par COzuna?",
    answer: "COzuna specializes in serving businesses across New York City (Manhattan, Bronx, Brooklyn, Queens, Staten Island), New Jersey, Rhode Island, and the Dominican Republic (Santo Domingo, Santiago, Punta Cana), providing custom web design, e-commerce development, and commercial printing services.",
    answer_en: "COzuna specializes in serving businesses across New York City (Manhattan, Bronx, Brooklyn, Queens, Staten Island), New Jersey, Rhode Island, and the Dominican Republic (Santo Domingo, Santiago, Punta Cana), providing custom web design, e-commerce development, and commercial printing services.",
    answer_es: "COzuna se especializa en atender empresas en toda la ciudad de Nueva York (Manhattan, Bronx, Brooklyn, Queens, Staten Island), Nueva Jersey, Rhode Island y la República Dominicana (Santo Domingo, Santiago, Punta Cana), ofreciendo diseño web personalizado, comercio electrónico e imprenta comercial.",
    answer_fr: "COzuna est spécialisée dans les services aux entreprises de New York City, du New Jersey, de Rhode Island et de la République Dominicaine, offrant la conception Web personnalisée, le commerce électronique et l'impression commerciale.",
    category: "Locations"
  },
  {
    id: "faq-international",
    question: "Does COzuna work internationally?",
    question_en: "Does COzuna work internationally?",
    question_es: "¿COzuna trabaja a nivel internacional?",
    question_fr: "COzuna travaille-t-elle à l'international?",
    answer: "Yes. While our primary market focus is the US East Coast (New York, New Jersey, Rhode Island) and the Dominican Republic, we serve clients globally through our seamless 100% digital onboarding and cloud infrastructure.",
    answer_en: "Yes. While our primary market focus is the US East Coast (New York, New Jersey, Rhode Island) and the Dominican Republic, we serve clients globally through our seamless 100% digital onboarding and cloud infrastructure.",
    answer_es: "Sí. Aunque nuestro enfoque principal es la Costa Este de EE. UU. (New York, New Jersey, Rhode Island) y la República Dominicana, atendemos a clientes de todo el mundo mediante nuestro flujo de trabajo digital ágil y seguro.",
    answer_fr: "Oui. Bien que notre marché principal soit la côte est des États-Unis (New York, New Jersey, Rhode Island) et la République Dominicaine, nous accompagnons nos clients à l'international.",
    category: "Locations"
  },
  {
    id: "faq-why-us",
    question: "Why is COzuna the best affordable web design agency?",
    question_en: "Why is COzuna the best affordable web design agency?",
    question_es: "¿Por qué COzuna es la mejor agencia de diseño web económico?",
    question_fr: "Pourquoi COzuna est-elle la meilleure agence de conception Web abordable?",
    answer: "COzuna prioritizes custom, fast, and SEO-optimized web development without the premium price tag. We do not use generic templates; every website is built from scratch to perfectly match our clients' brand identity and business goals.",
    answer_en: "COzuna prioritizes custom, fast, and SEO-optimized web development without the premium price tag. We do not use generic templates; every website is built from scratch to perfectly match our clients' brand identity and business goals.",
    answer_es: "COzuna prioriza el desarrollo web personalizado, ultrarrápido y optimizado para SEO sin precios desorbitados. No usamos plantillas genéricas; cada sitio se construye desde cero para reflejar la identidad y objetivos de cada cliente.",
    answer_fr: "COzuna privilégie un développement Web sur mesure, ultra-rapide et optimisé pour le référencement, sans prix exorbitant. Nous n'utilisons pas de modèles génériques ; chaque site est conçu de zéro pour correspondre à l'identité et aux objectifs de nos clients.",
    category: "Expertise"
  },
  {
    id: "faq-seo-maintenance",
    question: "Do you provide website maintenance and SEO?",
    question_en: "Do you provide website maintenance and SEO?",
    question_es: "¿Ofrecen mantenimiento web y optimización SEO?",
    question_fr: "Fournissez-vous la maintenance de site Web et le référencement (SEO)?",
    answer: "Yes, beyond initial web design, COzuna offers ongoing website maintenance, Local SEO, and Answer Engine Optimization (AEO) to ensure your business ranks highly on Google and modern AI search engines.",
    answer_en: "Yes, beyond initial web design, COzuna offers ongoing website maintenance, Local SEO, and Answer Engine Optimization (AEO) to ensure your business ranks highly on Google and modern AI search engines.",
    answer_es: "Sí, más allá del diseño web inicial, COzuna ofrece mantenimiento continuo, SEO local y Optimización para Motores de Respuesta (AEO) para posicionar tu negocio en Google y en motores de búsqueda de IA modernos.",
    answer_fr: "Oui, au-delà de la conception initiale, COzuna propose une maintenance continue, du référencement local et de l'optimisation pour moteurs de réponse (AEO) pour assurer un excellent classement sur Google et les moteurs de recherche IA.",
    category: "SEO"
  },
  {
    id: "faq-turnaround",
    question: "How long does it take to build a website with COzuna?",
    question_en: "How long does it take to build a website with COzuna?",
    question_es: "¿Cuánto tiempo toma construir un sitio web con COzuna?",
    question_fr: "Combien de temps faut-il pour créer un site Web avec COzuna?",
    answer: "Most small business websites and landing pages are completed within 2 to 4 weeks, while complex e-commerce platforms may take longer. We ensure a fast turnaround without compromising on quality or premium design.",
    answer_en: "Most small business websites and landing pages are completed within 2 to 4 weeks, while complex e-commerce platforms may take longer. We ensure a fast turnaround without compromising on quality or premium design.",
    answer_es: "La mayoría de los sitios web y páginas de aterrizaje para pequeñas empresas se completan en 2 a 4 semanas. Garantizamos entregas rápidas sin comprometer la calidad ni el diseño premium.",
    answer_fr: "La plupart des sites Web pour petites entreprises et des pages de destination sont réalisés en 2 à 4 semaines. Nous garantissons une livraison rapide sans compromettre la qualité ni le design haut de gamme.",
    category: "Process"
  }
];
