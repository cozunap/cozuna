import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'edge';

// We use the REST API to write to Firestore so we don't need the heavy firebase-admin SDK on edge
async function writeToFirestore(projectId: string, post: any) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/posts`;
  
  // Format for Firestore REST API
  const document = {
    fields: {
      title: { stringValue: post.title },
      slug: { stringValue: post.slug },
      excerpt: { stringValue: post.excerpt },
      content: { stringValue: post.content },
      category: { stringValue: post.category },
      author: { stringValue: post.author },
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
    "Artificial Intelligence in Design",
    "Modern Web Development Trends",
    "Graphic Design Psychology",
    "Adobe Photoshop Tips for Businesses",
    "The Future of Digital Signage",
    "Innovations in Printing Technology",
    "Why Affordable Web Design Matters",
    "Illustrator vs InDesign for Branding"
  ];

  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `You are a professional tech and design blogger for 'COzuna', a Web Design and Printing agency.
Write a highly engaging, SEO-optimized blog post about: "${randomTopic}".

Return EXACTLY a JSON object with no markdown formatting, no backticks, just the raw JSON with these exact keys:
{
  "title_en": "A catchy, SEO friendly title in English",
  "title_es": "A catchy, SEO friendly title in Spanish",
  "title_fr": "A catchy, SEO friendly title in French",
  "slug": "url-friendly-slug-of-the-english-title",
  "excerpt_en": "A 2 sentence summary in English",
  "excerpt_es": "A 2 sentence summary in Spanish",
  "excerpt_fr": "A 2 sentence summary in French",
  "content_en": "The full article in English (HTML format). Use <h2>, <p>, <ul>, <li>, <strong>. Minimum 600 words. Do NOT include <h1> or <html>/<body> tags.",
  "content_es": "The full article translated to Spanish (HTML format). Use the exact same HTML structure as English.",
  "content_fr": "The full article translated to French (HTML format). Use the exact same HTML structure as English.",
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
