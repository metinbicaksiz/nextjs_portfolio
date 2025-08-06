import { NextRequest, NextResponse } from 'next/server';
import { getAllRepositories, createRepository, Repository } from '@/lib/database';

// GET /api/admin/repos - Get all repositories
export async function GET() {
  try {
    const repos = await getAllRepositories();
    return NextResponse.json(repos);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}

// POST /api/admin/repos - Create a new repository
export async function POST(request: NextRequest) {
  try {
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

    const repository: Repository = {
      title: body.title,
      description: body.description,
      github_url: body.github_url,
      demo_url: body.demo_url || null,
      thumbnail: body.thumbnail || null,
      technologies: body.technologies || 'JavaScript',
      featured: body.featured || false,
    };

    const success = await createRepository(repository);
    
    if (success) {
      return NextResponse.json(
        { message: 'Repository created successfully' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to create repository' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating repository:', error);
    return NextResponse.json(
      { error: 'Failed to create repository' },
      { status: 500 }
    );
  }
}
