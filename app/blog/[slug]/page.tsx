import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/database';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Add typography styles for rich text content
const proseClasses = [
  'prose',
  'dark:prose-invert',
  'max-w-none',
  'prose-headings:mt-8',
  'prose-headings:mb-4',
  'prose-h1:text-4xl',
  'prose-h2:text-3xl',
  'prose-h3:text-2xl',
  'prose-p:leading-relaxed',
  'prose-p:mb-4',
  'prose-ul:list-disc',
  'prose-ol:list-decimal',
  'prose-li:my-1',
  'prose-a:text-primary-600',
  'dark:prose-a:text-primary-400',
  'prose-a:no-underline',
  'hover:prose-a:underline',
  'prose-blockquote:border-l-4',
  'prose-blockquote:border-primary-600',
  'prose-blockquote:pl-4',
  'prose-blockquote:italic',
  'prose-img:rounded-lg',
  'prose-img:shadow-lg',
  'prose-pre:bg-gray-100',
  'dark:prose-pre:bg-gray-800',
  'prose-pre:rounded-lg',
  'prose-pre:p-4',
  'prose-code:before:hidden',
  'prose-code:after:hidden',
  'prose-code:bg-gray-100',
  'dark:prose-code:bg-gray-800',
  'prose-code:px-1.5',
  'prose-code:py-0.5',
  'prose-code:rounded',
  'prose-code:text-sm',
].join(' ');

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-950">
        <Navigation />
        
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </Link>
          
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 text-sm gap-4 mb-8">
              <time 
                dateTime={post.created_at?.toISOString()} 
                className="flex items-center bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {post.created_at ? format(post.created_at, 'MMMM d, yyyy') : 'Unknown date'}
              </time>
              <span className="flex items-center bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 mr-2" />
                {Math.ceil((post.content?.split(/\s+/)?.length || 0) / 200)} min read
              </span>
            </div>
            
            {post.featured_image && (
              <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-[21/9] mb-12 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1000px"
                />
              </div>
            )}
          </header>

          <div className={cn(proseClasses, 'mx-auto')}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          <Separator className="my-12" />
          
          <div className="text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all posts
            </Link>
          </div>
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
