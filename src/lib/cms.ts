const convertCFUrl = (val: string) => val && typeof val === 'string' ? val.replace(/https:\/\/imagedelivery\.net\/eJfkbxcvXp804aif1wioXw\/([^\/]+)\/public/g, '/uploads/$1.webp') : val;

export async function getPageData(pageId: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId) return null;

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/pages/${pageId}?key=${apiKey}`,
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
        data[key] = convertCFUrl(value.stringValue);
      } else if (value.mapValue) {
        data[key] = {};
        for (const [subKey, subValue] of Object.entries(value.mapValue.fields) as any) {
          data[key][subKey] = convertCFUrl(subValue.stringValue || '');
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
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId) return [];

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/projects?key=${apiKey}`,
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
        if (value.stringValue !== undefined) data[key] = convertCFUrl(value.stringValue);
        else if (value.integerValue !== undefined) data[key] = parseInt(value.integerValue, 10);
        else if (value.arrayValue) {
          data[key] = value.arrayValue.values?.map((v: any) => convertCFUrl(v.stringValue)) || [];
        }
      }
      return data;
    });
  } catch (error) {
    console.error(`Error fetching projects:`, error);
    return [];
  }
}

export async function getQuoteSettings() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return null;

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/quote`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (!json.fields) return null;

    const data: any = { services: [], budgets: [] };
    
    if (json.fields.services?.arrayValue?.values) {
      data.services = json.fields.services.arrayValue.values.map((v: any) => {
        const fields = v.mapValue?.fields || {};
        return {
          id: fields.id?.stringValue || '',
          title: fields.title?.stringValue || '',
          iconName: fields.iconName?.stringValue || '',
        };
      });
    }

    if (json.fields.budgets?.arrayValue?.values) {
      data.budgets = json.fields.budgets.arrayValue.values.map((v: any) => {
        const fields = v.mapValue?.fields || {};
        return {
          id: fields.id?.stringValue || '',
          label: fields.label?.stringValue || '',
        };
      });
    }

    return data;
  } catch (error) {
    console.error(`Error fetching quote settings:`, error);
    return null;
  }
}

export async function getAEOFAQs(lang: string = 'en') {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const { defaultFaqs } = await import('./defaultFaqs');

  if (!projectId) {
    return defaultFaqs.map(f => ({
      id: f.id,
      question: (lang === 'es' ? f.question_es : lang === 'fr' ? f.question_fr : f.question_en) || f.question,
      answer: (lang === 'es' ? f.answer_es : lang === 'fr' ? f.answer_fr : f.answer_en) || f.answer,
    }));
  }

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/aeo_faqs?key=${apiKey || ''}`,
      { next: { revalidate: 300 } } // Refresh every 5 minutes
    );

    if (!res.ok) {
      return defaultFaqs.map(f => ({
        id: f.id,
        question: (lang === 'es' ? f.question_es : lang === 'fr' ? f.question_fr : f.question_en) || f.question,
        answer: (lang === 'es' ? f.answer_es : lang === 'fr' ? f.answer_fr : f.answer_en) || f.answer,
      }));
    }

    const json = await res.json();
    if (!json.fields?.items?.arrayValue?.values) {
      return defaultFaqs.map(f => ({
        id: f.id,
        question: (lang === 'es' ? f.question_es : lang === 'fr' ? f.question_fr : f.question_en) || f.question,
        answer: (lang === 'es' ? f.answer_es : lang === 'fr' ? f.answer_fr : f.answer_en) || f.answer,
      }));
    }

    const liveItems = json.fields.items.arrayValue.values.map((v: any, idx: number) => {
      const f = v.mapValue?.fields || {};
      const q = (lang === 'es' ? f.question_es?.stringValue : lang === 'fr' ? f.question_fr?.stringValue : f.question_en?.stringValue) 
        || f.question?.stringValue || '';
      const a = (lang === 'es' ? f.answer_es?.stringValue : lang === 'fr' ? f.answer_fr?.stringValue : f.answer_en?.stringValue) 
        || f.answer?.stringValue || '';
      return {
        id: f.id?.stringValue || `aeo-live-faq-${idx}`,
        question: q,
        answer: a,
      };
    }).filter((item: any) => item.question && item.answer);

    if (liveItems.length === 0) {
      return defaultFaqs.map(f => ({
        id: f.id,
        question: (lang === 'es' ? f.question_es : lang === 'fr' ? f.question_fr : f.question_en) || f.question,
        answer: (lang === 'es' ? f.answer_es : lang === 'fr' ? f.answer_fr : f.answer_en) || f.answer,
      }));
    }

    return liveItems;
  } catch (error) {
    console.error("Error fetching live AEO FAQs:", error);
    return defaultFaqs.map(f => ({
      id: f.id,
      question: (lang === 'es' ? f.question_es : lang === 'fr' ? f.question_fr : f.question_en) || f.question,
      answer: (lang === 'es' ? f.answer_es : lang === 'fr' ? f.answer_fr : f.answer_en) || f.answer,
    }));
  }
}

