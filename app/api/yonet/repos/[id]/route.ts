import { NextRequest, NextResponse } from 'next/server';
import { getRepositoryById, updateRepository, deleteRepository, Repository } from '@/lib/database';

// GET /api/admin/repos/[id] - Get a specific repository by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const repoId = parseInt(id);
    if (isNaN(repoId)) {
      return NextResponse.json(
        { error: 'Invalid repository ID' },
        { status: 400 }
      );
    }

    const repo = await getRepositoryById(repoId);
    
    if (!repo) {
      return NextResponse.json(
        { error: 'Repository not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(repo);
  } catch (error) {
    console.error('Error fetching repository:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repository' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/repos/[id] - Update a repository
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const repoId = parseInt(id);
    if (isNaN(repoId)) {
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

    const success = await updateRepository(repoId, updateData);
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const repoId = parseInt(id);
    if (isNaN(repoId)) {
      return NextResponse.json(
        { error: 'Invalid repository ID' },
        { status: 400 }
      );
    }

    const success = await deleteRepository(repoId);
    
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
