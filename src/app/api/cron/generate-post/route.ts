import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'edge';

// We use the REST API to write to Firestore so we don't need the heavy firebase-admin SDK on edge
async function writeToFirestore(projectId: string, post: any) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/posts`;
  
  // Format for Firestore REST API
  const document = {
    fields: {
      title: { stringValue: post.title_en || post.title || 'Untitled' },
      title_en: { stringValue: post.title_en || post.title || 'Untitled' },
      title_es: { stringValue: post.title_es || '' },
      title_fr: { stringValue: post.title_fr || '' },
      slug: { stringValue: post.slug || (post.title_en || post.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4) },
      excerpt: { stringValue: post.excerpt_en || post.excerpt || '' },
      excerpt_en: { stringValue: post.excerpt_en || post.excerpt || '' },
      excerpt_es: { stringValue: post.excerpt_es || '' },
      excerpt_fr: { stringValue: post.excerpt_fr || '' },
      content: { stringValue: post.content_en || post.content || '' },
      content_en: { stringValue: post.content_en || post.content || '' },
      content_es: { stringValue: post.content_es || '' },
      content_fr: { stringValue: post.content_fr || '' },
      category: { stringValue: post.category_en || post.category || 'Blog' },
      category_en: { stringValue: post.category_en || post.category || 'Blog' },
      category_es: { stringValue: post.category_es || '' },
      category_fr: { stringValue: post.category_fr || '' },
      author: { stringValue: post.author || 'cozuna' },
      createdAt: { timestampValue: new Date().toISOString() },
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(document),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Firestore write failed: ${err}`);
  }

  return await response.json();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return NextResponse.json({ error: 'Firebase Project ID is not set' }, { status: 500 });
  }

  const topics = [
    "How Affordable Web Design Drives Small Business Growth",
    "The True ROI of Professional Web Development for Small Businesses",
    "Why Your Small Business Needs a Custom Website in 2026",
    "Web Design vs Templates: What Small Businesses Need to Know",
    "The Importance of Mobile-First Web Design for Local SEO",
    "How to Choose an Affordable Web Development Agency",
    "Maximizing Online Presence for Small Businesses on a Budget",
    "Graphic Design Psychology for High-Converting Websites"
  ];

  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `You are a professional tech and marketing blogger for 'COzuna', an Affordable Web Design and Development agency.
Write a highly engaging, SEO-optimized blog post about: "${randomTopic}".

CRITICAL SEO INSTRUCTION:
You MUST include at least one natural internal link in the HTML content pointing to the agency's primary service page.
- In English: <a href="/en/affordable-web-development">affordable web development</a>
- In Spanish: <a href="/es/affordable-web-development">desarrollo web económico</a>
- In French: <a href="/fr/affordable-web-development">développement web abordable</a>

Return EXACTLY a JSON object with no markdown formatting, no backticks, just the raw JSON with these exact keys:
{
  "title_en": "A catchy, SEO friendly title in English",
  "title_es": "A catchy, SEO friendly title in Spanish",
  "title_fr": "A catchy, SEO friendly title in French",
  "slug": "url-friendly-slug-of-the-english-title",
  "excerpt_en": "A 2 sentence summary in English",
  "excerpt_es": "A 2 sentence summary in Spanish",
  "excerpt_fr": "A 2 sentence summary in French",
  "content_en": "The full article in English (HTML format). Use <h2>, <p>, <ul>, <li>, <strong>. Minimum 600 words. Do NOT include <h1> or <html>/<body> tags. MUST include the internal link.",
  "content_es": "The full article translated to Spanish (HTML format). MUST include the Spanish internal link.",
  "content_fr": "The full article translated to French (HTML format). MUST include the French internal link.",
  "category_en": "${randomTopic}",
  "category_es": "Categoría en Español",
  "category_fr": "Catégorie en Français",
  "author": "cozuna"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || '';
    
    // Clean up potential markdown blocks if the AI ignored the instruction
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const postData = JSON.parse(cleanedText);

    // Write to database
    await writeToFirestore(projectId, postData);

    return NextResponse.json({ success: true, post: postData.title });
  } catch (error: any) {
    console.error('Error generating post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
