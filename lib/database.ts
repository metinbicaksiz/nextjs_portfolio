import { Pool } from 'pg';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio',
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Create connection pool
const pool = new Pool(dbConfig);

// Test database connection
export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
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

// Blog functions
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC'
    );
    return result.rows as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE slug = $1 AND published = true',
      [slug]
    );
    return result.rows.length > 0 ? result.rows[0] as BlogPost : null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function createBlogPost(post: BlogPost): Promise<boolean> {
  try {
    await pool.query(
      'INSERT INTO blog_posts (title, content, excerpt, slug, featured_image, published) VALUES ($1, $2, $3, $4, $5, $6)',
      [post.title, post.content, post.excerpt, post.slug, post.featured_image, post.published]
    );
    return true;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return false;
  }
}

export async function updateBlogPost(id: number, post: Partial<BlogPost>): Promise<boolean> {
  try {
    const fields = Object.keys(post).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = Object.values(post);
    values.push(id);
    
    await pool.query(
      `UPDATE blog_posts SET ${fields} WHERE id = $${values.length}`,
      values
    );
    return true;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return false;
  }
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  try {
    await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

// Repository functions
export async function getAllRepositories(): Promise<Repository[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM repositories ORDER BY created_at DESC'
    );
    return result.rows as Repository[];
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

export async function createRepository(repo: Repository): Promise<boolean> {
  try {
    await pool.query(
      'INSERT INTO repositories (title, description, github_url, demo_url, thumbnail, technologies, featured) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [repo.title, repo.description, repo.github_url, repo.demo_url, repo.thumbnail, repo.technologies, repo.featured]
    );
    return true;
  } catch (error) {
    console.error('Error creating repository:', error);
    return false;
  }
}

export async function updateRepository(id: number, repo: Partial<Repository>): Promise<boolean> {
  try {
    const fields = Object.keys(repo).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = Object.values(repo);
    values.push(id);
    
    await pool.query(
      `UPDATE repositories SET ${fields} WHERE id = $${values.length}`,
      values
    );
    return true;
  } catch (error) {
    console.error('Error updating repository:', error);
    return false;
  }
}

export async function deleteRepository(id: number): Promise<boolean> {
  try {
    await pool.query('DELETE FROM repositories WHERE id = $1', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting repository:', error);
    return false;
  }
}

// Contact form functions
export async function saveContact(contact: Contact): Promise<boolean> {
  try {
    await pool.query(
      'INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4)',
      [contact.name, contact.email, contact.phone, contact.message]
    );
    return true;
  } catch (error) {
    console.error('Error saving contact form submission:', error);
    return false;
  }
}

export async function getAllContacts(): Promise<Contact[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    return result.rows as Contact[];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

export async function deleteContact(id: number): Promise<boolean> {
  try {
    const result = await pool.query(
      'DELETE FROM contacts WHERE id = $1',
      [id]
    );
    return result.rowCount !== null && result.rowCount > 0;
  } catch (error) {
    console.error('Error deleting contact:', error);
    return false;
  }
}



export default pool;