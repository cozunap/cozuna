import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { service, budget, timeline, firstName, lastName, email, message, lang } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !service || !budget || !timeline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      console.error('GOOGLE_SCRIPT_URL is not defined');
      // Graceful fallback to avoid breaking the form if key is missing
      return NextResponse.json({ success: true, message: 'Saved to db only (no script URL)' }, { status: 200 });
    }

    // Forward to Google Apps Script
    const adminRes = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        service,
        budget,
        timeline,
        message: message || "No additional message.",
        lang: lang || 'en'
      }),
    });

    if (!adminRes.ok) {
      const errorText = await adminRes.text();
      throw new Error(`Google Script error: ${errorText}`);
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
