import { NextRequest, NextResponse } from 'next/server';
import { updateRepository, deleteRepository, Repository } from '@/lib/database';

// PUT /api/admin/repos/[id] - Update a repository
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid repository ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.github_url) {
      return NextResponse.json(
        { error: 'Title, description, and GitHub URL are required' },
        { status: 400 }
      );
    }

    // Validate GitHub URL format
    const githubUrlPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/;
    if (!githubUrlPattern.test(body.github_url)) {
      return NextResponse.json(
        { error: 'Please provide a valid GitHub URL' },
        { status: 400 }
      );
    }

    const updateData: Partial<Repository> = {
      title: body.title,
      description: body.description,
      github_url: body.github_url,
      demo_url: body.demo_url || null,
      thumbnail: body.thumbnail || null,
      technologies: body.technologies || 'JavaScript',
      featured: body.featured || false,
    };

    const success = await updateRepository(id, updateData);
    
    if (success) {
      return NextResponse.json(
        { message: 'Repository updated successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to update repository' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating repository:', error);
    return NextResponse.json(
      { error: 'Failed to update repository' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/repos/[id] - Delete a repository
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid repository ID' },
        { status: 400 }
      );
    }

    const success = await deleteRepository(id);
    
    if (success) {
      return NextResponse.json(
        { message: 'Repository deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to delete repository' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting repository:', error);
    return NextResponse.json(
      { error: 'Failed to delete repository' },
      { status: 500 }
    );
  }
}
