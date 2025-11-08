import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
      const { name, email, phone, message }  = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

      const transponder = nodemailer.createTransport({
          service: 'gmail',
          host: process.env.EMAIL_HOST,
          port: 587,
          secure: true,
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
          }
      })

      const mailOption = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: name,
          html: `Message:${message} </br> Telephone:${phone}`,
      }

      await transponder.sendMail(mailOption);

    // Settings for RESEND library

    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //     from: 'onboarding@resend.dev',
    //     to: 'metinbicaksiz@gmail.com',
    //     subject: name,
    //     html: message,
    // })
    // Save contact form submission to database
    // const result = await saveContact({
    //   name,
    //   email,
    //   phone,
    //   message
    // });
    //
    //   if (!result) {
    //       throw new Error('Failed to save contact form submission');
    //   }

    // Log the successful submission
    // console.log('Contact form submission saved:', {
    //   name,
    //   email,
    //   phone: phone || 'Not provided',
    //   timestamp: new Date().toISOString()
    // });

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    // const result = await deleteContact(parseInt(id));

    // if (!result) {
    //   return NextResponse.json(
    //     { error: 'Contact not found or could not be deleted' },
    //     { status: 404 }
    //   );
    }

  //   console.log('Contact deleted:', { id, timestamp: new Date().toISOString() });
  //
  //   return NextResponse.json(
  //     { message: 'Message deleted successfully' },
  //     { status: 200 }
  //   );
  // }
  catch (error) {
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { error: 'Failed to delete message. Please try again.' },
      { status: 500 }
    );
  }
}
