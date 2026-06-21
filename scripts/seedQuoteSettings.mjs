import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

async function main() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const quoteSettings = {
      services: [
        { id: "web", title: "Web Design", iconName: "MonitorSmartphone" },
        { id: "graphic", title: "Graphic Design", iconName: "PenTool" },
        { id: "print", title: "Printing", iconName: "Printer" },
        { id: "signage", title: "Signage", iconName: "Signpost" }
      ],
      budgets: [
        { id: "under_1k", label: "Under $1,000" },
        { id: "1k_to_5k", label: "$1,000 - $5,000" },
        { id: "5k_to_10k", label: "$5,000 - $10,000" },
        { id: "10k_plus", label: "$10,000+" }
      ]
    };

    await setDoc(doc(db, 'settings', 'quote'), quoteSettings);
    console.log("Successfully seeded quote settings using Client SDK!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding:", err);
    process.exit(1);
  }
}

main();
