// import { createClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server';
import { createServiceClient } from '@/utils/supabase/service';

// Helper function to get service client for admin operations
function getServiceClient() {
  return createServiceClient();
}

// Blog post types
export interface BlogPost {
  id?: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featured_image?: string;
  published: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Repository types
export interface Repository {
  id?: number;
  title: string;
  description: string;
  github_url: string;
  demo_url?: string;
  thumbnail?: string;
  technologies: string;
  featured: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Contact form types
export interface Contact {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: Date;
}

// Helper function to get appropriate client
// For read-only operations during build time, use service client to avoid cookies
async function getClient() {
  try {
    // Check if we're in a build context or if cookies are unavailable
    return await createClient();
  } catch (error) {
    // Fallback to service client for build-time operations
    return createServiceClient();
  }
}

// Blog functions
export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const supabase = await getClient();
    try {
    const { data:posts, error } = await supabase
      .from('blog_post')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (posts || []) as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Admin function to get all blog posts (including unpublished)
export async function getAllBlogPostsForAdmin(): Promise<BlogPost[]> {
    // Use service client for admin operations to bypass RLS
    const supabase = getServiceClient();
    try {
    const { data:posts, error } = await supabase
      .from('blog_post')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (posts || []) as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts for admin:', error);
    return [];
  }
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  try {
    // Use service client for admin operations to bypass RLS
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('blog_post')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return (data as BlogPost) || null;
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    return null;
  }
}
//
// export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
//   try {
//     const { data, error } = await supabase
//       .from('blog_posts')
//       .select('*')
//       .eq('slug', slug)
//       .eq('published', true)
//       .maybeSingle();
//     if (error) throw error;
//     return (data as BlogPost) || null;
//   } catch (error) {
//     console.error('Error fetching blog post:', error);
//     return null;
//   }
// }

export async function createBlogPost(post: BlogPost): Promise<boolean> {
  try {
      // Use service client for admin operations to bypass RLS
      const supabase = getServiceClient();
      const { error } = await supabase
      .from('blog_post')
      .insert([{
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        slug: post.slug,
        featured_image: post.featured_image || null,
        published: post.published,
      }]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return false;
  }
}

export async function updateBlogPost(id: number, post: Partial<BlogPost>): Promise<boolean> {
  try {
      // Use service client for admin operations to bypass RLS
      const supabase = getServiceClient();
      console.log('Attempting to update blog post:', { id, post });
      
      const { data, error } = await supabase
      .from('blog_post')
      .update(post)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Supabase error updating blog post:', error);
      throw error;
    }
    
    console.log('Blog post updated successfully:', data);
    return true;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return false;
  }
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  try {
    // Use service client for admin operations to bypass RLS
    const supabase = getServiceClient();
    console.log('Attempting to delete blog post with ID:', id);
    
    const { data, error } = await supabase
      .from('blog_post')
      .delete()
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Supabase error deleting blog post:', error);
      throw error;
    }
    
    console.log('Blog post deleted successfully:', data);
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

// Repository functions
export async function getAllRepositories(): Promise<Repository[]> {
  try {
      const supabase = await getClient();

      const { data, error } = await supabase
      .from('repositories')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Repository[];
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

// Admin function to get all repositories
export async function getAllRepositoriesForAdmin(): Promise<Repository[]> {
  try {
      // Use service client for admin operations to bypass RLS
      const supabase = getServiceClient();

      const { data, error } = await supabase
      .from('repositories')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Repository[];
  } catch (error) {
    console.error('Error fetching repositories for admin:', error);
    return [];
  }
}

export async function getRepositoryById(id: number): Promise<Repository | null> {
  try {
    // Use service client for admin operations to bypass RLS
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('repositories')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return (data as Repository) || null;
  } catch (error) {
    console.error('Error fetching repository by ID:', error);
    return null;
  }
}

export async function createRepository(repo: Repository): Promise<boolean> {
  try {
      // Use service client for admin operations to bypass RLS
      const supabase = getServiceClient();

      const { error } = await supabase
      .from('repositories')
      .insert([{
        title: repo.title,
        description: repo.description,
        github_url: repo.github_url,
        demo_url: repo.demo_url || null,
        thumbnail: repo.thumbnail || null,
        technologies: repo.technologies,
        featured: repo.featured,
      }]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating repository:', error);
    return false;
  }
}

export async function updateRepository(id: number, repo: Partial<Repository>): Promise<boolean> {
  try {
      // Use service client for admin operations to bypass RLS
      const supabase = getServiceClient();
      console.log('Attempting to update repository:', { id, repo });

      const { data, error } = await supabase
      .from('repositories')
      .update(repo)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Supabase error updating repository:', error);
      throw error;
    }
    
    console.log('Repository updated successfully:', data);
    return true;
  } catch (error) {
    console.error('Error updating repository:', error);
    return false;
  }
}

export async function deleteRepository(id: number): Promise<boolean> {
  try {
      // Use service client for admin operations to bypass RLS
      const supabase = getServiceClient();
      console.log('Attempting to delete repository with ID:', id);

      const { data, error } = await supabase
      .from('repositories')
      .delete()
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Supabase error deleting repository:', error);
      throw error;
    }
    
    console.log('Repository deleted successfully:', data);
    return true;
  } catch (error) {
    console.error('Error deleting repository:', error);
    return false;
  }
}

// Contact form functions
export async function saveContact(contact: Contact): Promise<boolean> {
  try {
      const supabase = await createClient();
      const { error } = await supabase
      .from('contact')
      .insert([{
        name: contact.name,
        email: contact.email,
        phone: contact.phone || null,
        message: contact.message,
      }]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving contact form submission:', error);
    return false;
  }
}

export async function getAllContacts(): Promise<Contact[]> {
  try {
      const supabase = await getClient();
      const { data, error } = await supabase
      .from('contact')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Contact[];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

export async function deleteContact(id: number): Promise<boolean> {
  try {
      const supabase = await createClient();
      const { error } = await supabase
      .from('contact')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting contact:', error);
    return false;
  }
}