import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const fallbackPortfolioItems = [
  {
    title: "La Casa Del Mofongo MD",
    category: "Web & Print",
    image: "/assets/images/2024/10/la-casa-del-mofongo.webp",
    slug: "la-casa-del-mofongo"
  },
  {
    title: "Monica Nails Spa",
    category: "Brand Identity",
    image: "/assets/images/2024/10/spa.webp",
    slug: "monica-nails-spa"
  },
  {
    title: "La Shisha Restaurant",
    category: "Web Design",
    image: "/assets/images/2024/10/lashisha.webp",
    slug: "la-shisha-restaurant"
  },
  {
    title: "Elsy Leonso",
    category: "Graphic Design",
    image: "/assets/images/2024/10/elsyleonso.webp",
    slug: "elsy-leonso"
  },
  {
    title: "Crossway Driving School",
    category: "Printing",
    image: "/assets/images/2024/10/crossway_business_card.webp",
    slug: "crossway-driving-school"
  },
  {
    title: "City Shields NY",
    category: "Brand Identity",
    image: "/assets/images/2024/10/cityshieldsny.webp",
    slug: "city-shields-ny"
  },
  {
    title: "Overall HVAC NJ",
    category: "Web Development",
    image: "/assets/images/2024/10/overallhvacnj.webp",
    slug: "overall-hvac-nj"
  },
  {
    title: "Jacinthe Studio",
    category: "Graphic Design",
    image: "/assets/images/2024/10/jacinthestudio.webp",
    slug: "jacinthe-studio"
  },
  {
    title: "TBS Tax Services",
    category: "Brand Identity & Print",
    image: "/assets/images/2024/10/tbstax.webp",
    slug: "tbs-tax-services"
  },
];

export async function GET() {
  try {
    const projectsRef = collection(db, 'projects');
    
    for (const item of fallbackPortfolioItems) {
      await addDoc(projectsRef, {
        title: item.title,
        slug: item.slug,
        category: item.category,
        description: "A showcase project by COZUNA.",
        image: item.image,
        createdAt: serverTimestamp()
      });
    }

    return NextResponse.json({ success: true, message: 'Seeded projects successfully!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
