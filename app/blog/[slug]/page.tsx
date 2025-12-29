import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/database';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

// Enhanced typography styles for rich text content with improved readability
const proseClasses = cn(
  'prose prose-lg dark:prose-invert max-w-none',
  // Base text styling for better readability
  'prose-base md:prose-lg',
  'text-gray-700 dark:text-gray-300',
  // Headings with better hierarchy
  'prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white',
  'prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:mb-8 prose-h1:leading-tight',
  'prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:leading-snug prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-800 prose-h2:pb-3',
  'prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:leading-snug',
  'prose-h4:text-xl md:prose-h4:text-2xl prose-h4:mt-10 prose-h4:mb-3',
  // Paragraphs with enhanced spacing and line height
  'prose-p:leading-relaxed prose-p:my-6 prose-p:text-[1.0625rem] prose-p:font-normal',
  // Links with subtle styling
  'prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium prose-a:no-underline prose-a:transition-all',
  'hover:prose-a:underline hover:prose-a:decoration-2 hover:prose-a:underline-offset-2',
  // Lists with better spacing
  'prose-ul:my-6 prose-ol:my-6 prose-li:my-3 prose-li:leading-relaxed',
  'prose-ul:list-disc prose-ol:list-decimal',
  'prose-li:marker:text-gray-400 dark:prose-li:marker:text-gray-600',
  // Blockquotes with distinctive styling
  'prose-blockquote:my-8 prose-blockquote:border-l-4 prose-blockquote:border-blue-500',
  'prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-950/20',
  'prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-4 prose-blockquote:rounded-r-lg',
  'prose-blockquote:not-italic prose-blockquote:font-normal',
  'prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300',
  // Images with better presentation
  'prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8',
  'prose-img:w-full prose-img:h-auto',
  // Code blocks with improved styling
  'prose-code:bg-gray-100 dark:prose-code:bg-gray-800',
  'prose-code:px-2 prose-code:py-1 prose-code:rounded-md',
  'prose-code:font-mono prose-code:text-sm prose-code:text-pink-600 dark:prose-code:text-pink-400',
  'prose-code:font-semibold',
  'prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950',
  'prose-pre:text-gray-100 dark:prose-pre:text-gray-200',
  'prose-pre:p-6 prose-pre:rounded-xl prose-pre:my-8',
  'prose-pre:overflow-x-auto prose-pre:shadow-xl',
  'prose-pre:border prose-pre:border-gray-700',
  'prose-code:before:hidden prose-code:after:hidden',
  // Strong and emphasis
  'prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold',
  'prose-em:text-gray-800 dark:prose-em:text-gray-200',
  // HR separator
  'prose-hr:my-12 prose-hr:border-gray-300 dark:prose-hr:border-gray-700',
  // Tables
  'prose-table:my-8',
  'prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:font-semibold',
  'prose-td:border-gray-300 dark:prose-td:border-gray-700'
);

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
        <Navigation />

        <main className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb navigation */}
          <div className="max-w-4xl mx-auto mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to all posts
            </Link>
          </div>

          <article className="max-w-4xl mx-auto">
            {/* Article header */}
            <header className="mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>

              {/* Meta information with enhanced styling */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  <time dateTime={post.created_at?.toISOString()} className="font-medium">
                    {post.created_at ? format(post.created_at, 'MMMM d, yyyy') : 'Unknown date'}
                  </time>
                </div>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="font-medium">
                    {Math.ceil((post.content?.split(/\s+/)?.length || 0) / 200)} min read
                  </span>
                </div>
              </div>
            </header>

            {/* Featured image with enhanced styling */}
            {post.featured_image && (
              <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800">
                  <img
                      src={post.featured_image}
                      alt={post.title}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 896px"
                  />
              </div>
            )}

            {/* Article content with enhanced container */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-12 lg:p-16 border border-gray-100 dark:border-gray-800">
              <div className={proseClasses}>
                {(() => {
                  const content = post.content || '';
                  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(content);
                  if (looksLikeHtml) {
                    return <div dangerouslySetInnerHTML={{ __html: content }} />;
                  }
                  return <ReactMarkdown>{content}</ReactMarkdown>;
                })()}
              </div>
            </div>

            {/* Bottom navigation with enhanced styling */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors shadow-md hover:shadow-lg group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to all posts
                </Link>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    // openGraph: {
    //   title: post.title,
    //   description: post.excerpt || post.content.slice(0, 160),
    //   images: post.featured_image ? [post.featured_image] : [],
    //   type: 'article',
    //   publishedTime: post.created_at,
    //   modifiedTime: post.updated_at || post.created_at,
    // },
  };
}
