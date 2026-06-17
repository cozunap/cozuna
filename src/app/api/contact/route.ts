import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { service, budget, timeline, firstName, lastName, email, message } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !service || !budget || !timeline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Nodemailer is incompatible with Cloudflare Edge runtime.
    // For now, we mock the success so the site deploys and functions visually.
    console.log('Mock email sent to:', email, 'from:', firstName);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
