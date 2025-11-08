import mysql, { Pool } from 'mysql2/promise';

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

// MySQL pool
let pool: Pool | undefined;

function getPool(): Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'portfolio',
      port: Number(process.env.DB_PORT || 3306),
      connectionLimit: 10,
      waitForConnections: true,
      connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 10000),
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const [rows] = await getPool().execute(sql, params);
  return rows as T[];
}

// Simple connectivity check
export async function pingDatabase(): Promise<{ ok: boolean; serverVersion?: string; error?: string }>{
  try {
    const pool = getPool();
    // Run a lightweight query
    const [rows] = await pool.query('SELECT VERSION() AS version');
    const version = Array.isArray(rows) && rows.length > 0 && (rows[0] as any).version;
    return { ok: true, serverVersion: version };
  } catch (err: any) {
    return { ok: false, error: err?.message || String(err) };
  }
}

// Blog functions
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const rows = await query<BlogPost>(
      'SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC'
    );
    return rows;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Admin function to get all blog posts (including unpublished)
export async function getAllBlogPostsForAdmin(): Promise<BlogPost[]> {
  try {
    const rows = await query<BlogPost>(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    );
    return rows;
  } catch (error) {
    console.error('Error fetching blog posts for admin:', error);
    return [];
  }
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  try {
    const rows = await query<BlogPost>(
      'SELECT * FROM blog_posts WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    return null;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const [rows] = await getPool().execute<mysql.RowDataPacket[]>(
      'SELECT * FROM blog_posts WHERE slug = ? AND published = 1',
      [slug]
    );
    
    if (rows.length === 0) return null;
    
    // Convert date strings to Date objects
    const post = rows[0];
    if (post.created_at) post.created_at = new Date(post.created_at);
    if (post.updated_at) post.updated_at = new Date(post.updated_at);
    
    return post as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

export async function createBlogPost(post: BlogPost): Promise<boolean> {
  try {
    await query(
      'INSERT INTO blog_posts (title, content, excerpt, slug, featured_image, published) VALUES (?, ?, ?, ?, ?, ?)',
      [
        post.title,
        post.content,
        post.excerpt,
        post.slug,
        post.featured_image || null,
        post.published ? 1 : 0,
      ]
    );
    return true;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return false;
  }
}

export async function updateBlogPost(id: number, post: Partial<BlogPost>): Promise<boolean> {
  try {
    const fields: string[] = [];
    const values: any[] = [];
    if (post.title !== undefined) { fields.push('title = ?'); values.push(post.title); }
    if (post.content !== undefined) { fields.push('content = ?'); values.push(post.content); }
    if (post.excerpt !== undefined) { fields.push('excerpt = ?'); values.push(post.excerpt); }
    if (post.slug !== undefined) { fields.push('slug = ?'); values.push(post.slug); }
    if (post.featured_image !== undefined) { fields.push('featured_image = ?'); values.push(post.featured_image); }
    if (post.published !== undefined) { fields.push('published = ?'); values.push(post.published ? 1 : 0); }
    if (fields.length === 0) return true;
    values.push(id);
    await query(
      `UPDATE blog_posts SET ${fields.join(', ')} WHERE id = ?`,
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
    await query('DELETE FROM blog_posts WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

// Repository functions
export async function getAllRepositories(): Promise<Repository[]> {
  try {
    const rows = await query<Repository>(
      'SELECT * FROM repositories ORDER BY created_at DESC'
    );
    return rows;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

// Admin function to get all repositories
export async function getAllRepositoriesForAdmin(): Promise<Repository[]> {
  try {
    const rows = await query<Repository>(
      'SELECT * FROM repositories ORDER BY created_at DESC'
    );
    return rows;
  } catch (error) {
    console.error('Error fetching repositories for admin:', error);
    return [];
  }
}

export async function getRepositoryById(id: number): Promise<Repository | null> {
  try {
    const rows = await query<Repository>(
      'SELECT * FROM repositories WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching repository by ID:', error);
    return null;
  }
}

export async function createRepository(repo: Repository): Promise<boolean> {
  try {
    await query(
      'INSERT INTO repositories (title, description, github_url, demo_url, thumbnail, technologies, featured) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        repo.title,
        repo.description,
        repo.github_url,
        repo.demo_url || null,
        repo.thumbnail || null,
        repo.technologies,
        repo.featured ? 1 : 0,
      ]
    );
    return true;
  } catch (error) {
    console.error('Error creating repository:', error);
    return false;
  }
}

export async function updateRepository(id: number, repo: Partial<Repository>): Promise<boolean> {
  try {
    const fields: string[] = [];
    const values: any[] = [];
    if (repo.title !== undefined) { fields.push('title = ?'); values.push(repo.title); }
    if (repo.description !== undefined) { fields.push('description = ?'); values.push(repo.description); }
    if (repo.github_url !== undefined) { fields.push('github_url = ?'); values.push(repo.github_url); }
    if (repo.demo_url !== undefined) { fields.push('demo_url = ?'); values.push(repo.demo_url); }
    if (repo.thumbnail !== undefined) { fields.push('thumbnail = ?'); values.push(repo.thumbnail); }
    if (repo.technologies !== undefined) { fields.push('technologies = ?'); values.push(repo.technologies); }
    if (repo.featured !== undefined) { fields.push('featured = ?'); values.push(repo.featured ? 1 : 0); }
    if (fields.length === 0) return true;
    values.push(id);
    await query(
      `UPDATE repositories SET ${fields.join(', ')} WHERE id = ?`,
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
    await query('DELETE FROM repositories WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting repository:', error);
    return false;
  }
}

// Contact form functions
export async function saveContact(contact: Contact): Promise<boolean> {
  try {
    await query(
      'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [contact.name, contact.email, contact.phone || null, contact.message]
    );
    return true;
  } catch (error) {
    console.error('Error saving contact form submission:', error);
    return false;
  }
}

export async function getAllContacts(): Promise<Contact[]> {
  try {
    const rows = await query<Contact>(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    return rows;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

export async function deleteContact(id: number): Promise<boolean> {
  try {
    await query('DELETE FROM contacts WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting contact:', error);
    return false;
  }
}

// Admin settings (single-row table)
export interface AdminSettings {
  id?: number; // defaults to 1
  name: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  email_notifications: boolean;
  push_notifications: boolean;
  weekly_digest: boolean;
  security_alerts: boolean;
  updated_at?: Date;
}

export async function getAdminSettings(): Promise<AdminSettings | null> {
  try {
    const rows = await query<AdminSettings>(
      'SELECT * FROM admin_settings WHERE id = 1 LIMIT 1'
    );
    if (!rows[0]) return null;
    const s = rows[0] as any;
    // normalize booleans if stored as tinyint
    s.email_notifications = !!s.email_notifications;
    s.push_notifications = !!s.push_notifications;
    s.weekly_digest = !!s.weekly_digest;
    s.security_alerts = !!s.security_alerts;
    return s as AdminSettings;
  } catch (error) {
    console.error('Error fetching admin settings:', error);
    return null;
  }
}

export async function upsertAdminSettings(settings: AdminSettings): Promise<boolean> {
  try {
    await query(
      'INSERT INTO admin_settings (id, name, email, bio, location, website, email_notifications, push_notifications, weekly_digest, security_alerts, updated_at) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email), bio=VALUES(bio), location=VALUES(location), website=VALUES(website), email_notifications=VALUES(email_notifications), push_notifications=VALUES(push_notifications), weekly_digest=VALUES(weekly_digest), security_alerts=VALUES(security_alerts), updated_at=NOW()'
      , [
        settings.name,
        settings.email,
        settings.bio,
        settings.location,
        settings.website,
        settings.email_notifications ? 1 : 0,
        settings.push_notifications ? 1 : 0,
        settings.weekly_digest ? 1 : 0,
        settings.security_alerts ? 1 : 0,
      ]
    );
    return true;
  } catch (error) {
    console.error('Error upserting admin settings:', error);
    return false;
  }
}