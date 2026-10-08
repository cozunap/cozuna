import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { RECEPTIONIST_KB } from '@/lib/receptionistKb';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history = [], lang = 'en' } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'AI key not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemInstruction = `You are the friendly, professional AI receptionist for COzuna Web Design and Printing (cozuna.com) in Laval, Quebec.
You assist potential clients in ${lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : 'English'}, or whichever language the user writes in.

Tone: Warm, welcoming, professional, and concise (1 to 3 sentences maximum per reply).

Core Directives:
1. Ground all answers strictly on the KNOWLEDGE BASE below.
2. If the user asks about prices, give indicative ranges (e.g. landing pages typically under $1,000, advanced e-commerce $5,000+) and emphasize that every project receives a free personalized quote.
3. If the user asks for a callback, a custom quote, or something not in the knowledge base, invite them to use the "Request a callback" button or share their name and phone/email.
4. Never invent business hours or unlisted services. Phone is +1 (438) 393-9465.

KNOWLEDGE BASE:
${RECEPTIONIST_KB}`;

    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join('\n')
      : '';

    const prompt = `${formattedHistory ? `Previous Conversation:\n${formattedHistory}\n\n` : ''}User: ${message.trim()}\nAssistant:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }
      ],
    });

    const reply = response.text?.trim() || (
      lang === 'fr'
        ? "Merci pour votre message ! Pour vous donner une réponse précise, je vous invite à demander un rappel ou à nous contacter au +1 (438) 393-9465."
        : lang === 'es'
        ? "¡Gracias por tu mensaje! Para darte una respuesta exacta, solicita una llamada o llámanos directamente al +1 (438) 393-9465."
        : "Thanks for your message! To give you an exact answer, feel free to request a callback or call us at +1 (438) 393-9465."
    );

    return NextResponse.json({ reply }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
