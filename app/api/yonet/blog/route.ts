import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPostsForAdmin, createBlogPost, BlogPost } from '@/lib/database';

// GET /api/admin/blog - Get all blog posts (including unpublished for admin)
export async function GET() {
  try {
    const posts = await getAllBlogPostsForAdmin();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.excerpt) {
      return NextResponse.json(
        { error: 'Title, content, and excerpt are required' },
        { status: 400 }
      );
    }

    // Generate slug from title if not provided
    const slug = body.slug || body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const blogPost: BlogPost = {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      slug: slug,
      featured_image: body.featured_image || null,
      published: body.published || false,
    };

    const success = await createBlogPost(blogPost);
    
    if (success) {
      return NextResponse.json(
        { message: 'Blog post created successfully' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to create blog post' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
