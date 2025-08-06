import { NextRequest, NextResponse } from 'next/server';
import { saveContact, deleteContact } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

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

    // Save contact form submission to database
    const result = await saveContact({
      name,
      email,
      phone,
      message
    });

    if (!result) {
      throw new Error('Failed to save contact form submission');
    }

    // Log the successful submission
    console.log('Contact form submission saved:', {
      name,
      email,
      phone: phone || 'Not provided',
      timestamp: new Date().toISOString()
    });

    // You can also integrate with services like:
    // - SendGrid for email notifications
    // - CRM systems like HubSpot or Salesforce

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

    const result = await deleteContact(parseInt(id));

    if (!result) {
      return NextResponse.json(
        { error: 'Contact not found or could not be deleted' },
        { status: 404 }
      );
    }

    console.log('Contact deleted:', { id, timestamp: new Date().toISOString() });

    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { error: 'Failed to delete message. Please try again.' },
      { status: 500 }
    );
  }
}
