import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export async function GET() {
  try {
    const projectsRef = collection(db, 'projects');
    const snapshot = await getDocs(projectsRef);
    
    let updatedCount = 0;
    const categoriesFound: string[] = [];

    for (const projectDoc of snapshot.docs) {
      const data = projectDoc.data();
      const oldCategory = data.category || '';
      categoriesFound.push(oldCategory);
      
      let newCategory = oldCategory;

      if (['Graphic Design', 'Brand Identity', 'Printing', 'Brand Identity & Print', 'Graphic Design / Branding'].includes(oldCategory)) {
        newCategory = 'Graphic Design / Branding';
      } else {
        newCategory = 'Web Design and Development';
      }

      await updateDoc(doc(db, 'projects', projectDoc.id), {
        category: newCategory
      });
      updatedCount++;
    }

    return NextResponse.json({ success: true, message: `Migrated ${updatedCount} projects!`, categoriesFound });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
