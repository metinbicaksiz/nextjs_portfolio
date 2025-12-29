import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostById, updateBlogPost, deleteBlogPost, BlogPost } from '@/lib/database';

// GET /api/admin/blog/[id] - Get a specific blog post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: 'Invalid blog post ID' },
        { status: 400 }
      );
    }

    const post = await getBlogPostById(postId);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/blog/[id] - Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: 'Invalid blog post ID' },
        { status: 400 }
      );
    }

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

    const updateData: Partial<BlogPost> = {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      slug: slug,
      featured_image: body.featured_image || null,
      published: body.published || false,
    };

    const success = await updateBlogPost(postId, updateData);
    
    if (success) {
      return NextResponse.json(
        { message: 'Blog post updated successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog/[id] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: 'Invalid blog post ID' },
        { status: 400 }
      );
    }

    const success = await deleteBlogPost(postId);
    
    if (success) {
      return NextResponse.json(
        { message: 'Blog post deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to delete blog post' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
