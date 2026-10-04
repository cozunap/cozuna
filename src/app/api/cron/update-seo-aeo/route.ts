import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { defaultFaqs } from '@/lib/defaultFaqs';

export const runtime = 'edge';

// Writes or updates the document at settings/aeo_faqs in Firestore
async function writeAEOFAQsToFirestore(projectId: string, faqs: any[], apiKey?: string) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/aeo_faqs${apiKey ? `?key=${apiKey}` : ''}`;

  const formattedItems = faqs.map((faq, index) => ({
    mapValue: {
      fields: {
        id: { stringValue: faq.id || `faq-dynamic-${index}-${Date.now()}` },
        question: { stringValue: faq.question_en || faq.question || '' },
        question_en: { stringValue: faq.question_en || faq.question || '' },
        question_es: { stringValue: faq.question_es || '' },
        question_fr: { stringValue: faq.question_fr || '' },
        answer: { stringValue: faq.answer_en || faq.answer || '' },
        answer_en: { stringValue: faq.answer_en || faq.answer || '' },
        answer_es: { stringValue: faq.answer_es || '' },
        answer_fr: { stringValue: faq.answer_fr || '' },
        category: { stringValue: faq.category || 'General' },
      }
    }
  }));

  const document = {
    fields: {
      items: {
        arrayValue: {
          values: formattedItems
        }
      },
      updatedAt: { timestampValue: new Date().toISOString() },
      version: { stringValue: `AEO-${new Date().toISOString().slice(0, 10)}` }
    }
  };

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(document),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Firestore AEO write failed: ${err}`);
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

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `You are a world-class SEO & AEO (Answer Engine Optimization) expert for 'COzuna Web Design Agency' (https://cozuna.com).
COzuna offers affordable, custom web development, e-commerce, graphic design, and printing services globally (Montreal, Laval, Quebec, Toronto, Miami, New York, Santo Domingo, Dominican Republic, and worldwide).

Analyze current high-intent user search queries and AI answer engine patterns (from ChatGPT, Perplexity, Google SGE, and Gemini).
Produce 6 highly authoritative, direct, and conversational Q&A pairs (FAQs) optimized to get cited by AI answer engines and featured in Google rich snippets.

Existing baseline FAQs for reference:
${JSON.stringify(defaultFaqs.map(f => ({ question: f.question, category: f.category })))}

Requirements:
1. Cover core intent topics: Affordable custom web design vs page builders, small business website pricing & ROI, local SEO & AEO strategy, international/multi-currency capabilities, timeline & custom deliverables, ongoing support & maintenance.
2. Provide concise, direct answers that an AI engine can quote directly as an authoritative answer.
3. Provide full, high-quality translations in English, Spanish, and French for every single question and answer.

Return EXACTLY a JSON array of 6 objects with no markdown backticks, no wrapping text:
[
  {
    "id": "faq-unique-slug",
    "category": "Topic Category",
    "question_en": "Question in English",
    "question_es": "Pregunta en Español",
    "question_fr": "Question en Français",
    "answer_en": "Direct, authoritative answer in English (2-3 sentences max).",
    "answer_es": "Respuesta directa y autoritaria en Español (2-3 oraciones).",
    "answer_fr": "Réponse directe et autoritaire en Français (2-3 phrases)."
  }
]`;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = aiResponse.text || '';
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let generatedFaqs: any[];
    try {
      generatedFaqs = JSON.parse(cleanedText);
    } catch (parseError) {
      console.warn("Failed to parse Gemini output, falling back to enhanced defaults:", parseError);
      generatedFaqs = defaultFaqs;
    }

    if (!Array.isArray(generatedFaqs) || generatedFaqs.length === 0) {
      generatedFaqs = defaultFaqs;
    }

    // Save to Firestore
    await writeAEOFAQsToFirestore(projectId, generatedFaqs, apiKey);

    return NextResponse.json({
      success: true,
      message: 'AEO and SEO FAQ schema updated successfully',
      updatedCount: generatedFaqs.length,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error updating AEO FAQs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
