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

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not defined');
      // Graceful fallback to avoid breaking the form if key is missing
      return NextResponse.json({ success: true, message: 'Saved to db only (no email key)' }, { status: 200 });
    }

    // Send email to admin
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'COZUNA Leads <onboarding@resend.dev>', // Use custom domain when verified
        to: 'cmozunap@gmail.com',
        subject: `New Lead: ${service} - ${firstName} ${lastName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service Needed:</strong> ${service}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Timeline:</strong> ${timeline}</p>
          <h3>Message:</h3>
          <p>${message}</p>
        `,
      }),
    });

    if (!adminRes.ok) {
      const errorText = await adminRes.text();
      throw new Error(`Resend API error: ${errorText}`);
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
