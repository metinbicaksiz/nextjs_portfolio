import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/database';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <time dateTime={post.created_at?.toISOString()} className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-2" />
                {post.created_at ? format(post.created_at, 'MMMM d, yyyy') : 'Unknown date'}
              </time>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {Math.ceil((post.content?.split(/\s+/)?.length || 0) / 200)} min read
              </span>
            </div>
          </header>

          {post.featured_image && (
            <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        
        <Footer />
      </main>
    </>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160),
      images: post.featured_image ? [post.featured_image] : [],
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
    },
  };
}
