export async function getPageData(pageId: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return null;

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/pages/${pageId}`,
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (!json.fields) return null;

    // Convert Firestore REST format to simple JS object
    const data: any = {};
    for (const [key, value] of Object.entries(json.fields) as any) {
      if (value.stringValue !== undefined) {
        data[key] = value.stringValue;
      } else if (value.mapValue) {
        data[key] = {};
        for (const [subKey, subValue] of Object.entries(value.mapValue.fields) as any) {
          data[key][subKey] = subValue.stringValue || '';
        }
      }
    }
    return data;
  } catch (error) {
    console.error(`Error fetching page ${pageId}:`, error);
    return null;
  }
}

export async function getPortfolioProjects() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return [];

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/projects`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    if (!json.documents) return [];

    return json.documents.map((doc: any) => {
      const data: any = { id: doc.name.split('/').pop() };
      for (const [key, value] of Object.entries(doc.fields) as any) {
        if (value.stringValue !== undefined) data[key] = value.stringValue;
        else if (value.integerValue !== undefined) data[key] = parseInt(value.integerValue, 10);
        else if (value.arrayValue) {
          data[key] = value.arrayValue.values?.map((v: any) => v.stringValue) || [];
        }
      }
      return data;
    });
  } catch (error) {
    console.error(`Error fetching projects:`, error);
    return [];
  }
}
