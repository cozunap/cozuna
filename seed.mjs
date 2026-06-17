import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
  }
];

async function seed() {
  try {
    console.log("Logging in...");
    await signInWithEmailAndPassword(auth, "cmozunap@gmail.com", "c@2094op/##$");
    console.log("Logged in successfully. Seeding database...");

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
      console.log(`Added project: ${item.title}`);
    }

    console.log("Finished seeding!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
