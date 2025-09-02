// import { createClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server';

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

// Blog functions
export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const supabase = await createClient();
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
      const supabase = await createClient();
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
      const supabase = await createClient();
      const { error } = await supabase
      .from('blog_post')
      .update(post)
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return false;
  }
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('blog_post')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

// Repository functions
export async function getAllRepositories(): Promise<Repository[]> {
  try {
      const supabase = await createClient();

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

export async function createRepository(repo: Repository): Promise<boolean> {
  try {
      const supabase = await createClient();

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
      const supabase = await createClient();

      const { error } = await supabase
      .from('repositories')
      .update(repo)
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating repository:', error);
    return false;
  }
}

export async function deleteRepository(id: number): Promise<boolean> {
  try {
      const supabase = await createClient();

      const { error } = await supabase
      .from('repositories')
      .delete()
      .eq('id', id);
    if (error) throw error;
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
      const supabase = await createClient();
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