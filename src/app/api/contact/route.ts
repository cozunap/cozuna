import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Configure Nodemailer transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This must be an App Password, not the regular Gmail password
      },
    });

    // 1. Send the email to the ADMIN (ozunaprinting@gmail.com)
    const adminMailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Quote Request: ${service.toUpperCase()} from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #ef4444;">New Project Quote Request</h2>
          <hr style="border: 1px solid #eee;" />
          
          <h3>Client Details</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          
          <h3>Project Details</h3>
          <p><strong>Service Requested:</strong> ${service}</p>
          <p><strong>Budget Range:</strong> ${budget.replace(/_/g, ' ')}</p>
          <p><strong>Timeline:</strong> ${timeline.replace(/_/g, ' ')}</p>
          
          <h3>Message / Vision</h3>
          <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #ef4444;">
            ${message || 'No additional message provided.'}
          </p>
          
          <br/>
          <p style="font-size: 12px; color: #999;">This email was sent automatically from the COzuna website.</p>
        </div>
      `,
    };

    // 2. Send the confirmation email to the CLIENT
    const clientMailOptions = {
      from: `"COzuna Web Design & Printing" <${process.env.EMAIL_USER}>`,
      to: email, // Send to the client's email
      subject: `We received your quote request, ${firstName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #ef4444; margin: 0;">COzuna.</h1>
            <p style="color: #666; margin-top: 5px;">Web Design & Printing</p>
          </div>
          
          <p>Hi ${firstName},</p>
          
          <p>Thank you for reaching out to us! We have successfully received your request for a <strong>${service}</strong> project.</p>
          
          <p>Our team is currently reviewing the details you provided, and we will get back to you within 24 hours with the next steps or a preliminary quote.</p>
          
          <p>If you have any urgent questions or additional details to share, feel free to reply directly to this email.</p>
          
          <br/>
          <p>Best regards,</p>
          <p><strong>The COzuna Team</strong></p>
          <a href="https://cozuna.com" style="color: #ef4444; text-decoration: none;">www.cozuna.com</a>
        </div>
      `,
    };

    // Send both emails simultaneously
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
