import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name || '';
    const contact = body.contact || body.phone || '';
    const message = body.message || body.need || '';
    const lang = body.lang || 'en';
    const page = body.page || body.source || '';

    if (!name || !contact) {
      return NextResponse.json({ error: 'Name and contact are required' }, { status: 400 });
    }

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    // 1. Save lead to Firestore REST if configured
    if (projectId) {
      try {
        const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/leads${apiKey ? `?key=${apiKey}` : ''}`;
        await fetch(firestoreUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              name: { stringValue: String(name).slice(0, 100) },
              contact: { stringValue: String(contact).slice(0, 100) },
              message: { stringValue: String(message || '').slice(0, 500) },
              lang: { stringValue: String(lang).slice(0, 10) },
              page: { stringValue: String(page).slice(0, 200) },
              source: { stringValue: 'ai_receptionist' },
              createdAt: { timestampValue: new Date().toISOString() },
            }
          })
        });
      } catch (dbErr) {
        console.warn('Failed to save receptionist lead to Firestore:', dbErr);
      }
    }

    // 2. Forward lead notification & full conversation to cmozunap@gmail.com
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (scriptUrl) {
      try {
        const historyText = Array.isArray(body.history) && body.history.length > 0
          ? body.history.map((h: any) => `${h.role === 'user' ? 'Visitor' : 'AI Receptionist'}: ${h.content}`).join('\n')
          : 'No previous chat history.';

        await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipient: 'cmozunap@gmail.com',
            firstName: name,
            lastName: '(AI Chat Callback)',
            email: contact.includes('@') ? contact : 'cmozunap@gmail.com',
            service: 'AI Receptionist Callback / Lead',
            budget: 'N/A',
            timeline: 'Urgent Callback Requested',
            message: `New Lead Captured by COzuna AI Receptionist\n\nName: ${name}\nPhone / Contact: ${contact}\nNeed / Note: ${message || 'No additional note'}\nLanguage: ${lang}\nPage: ${page}\n\n====================\nCHAT CONVERSATION HISTORY:\n====================\n${historyText}`,
            lang: lang
          })
        });
      } catch (scriptErr) {
        console.warn('Failed to forward lead to Google Script:', scriptErr);
      }
    }

    return NextResponse.json({ success: true }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error: any) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Failed to record lead' }, { status: 500 });
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
