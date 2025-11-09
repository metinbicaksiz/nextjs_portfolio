import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { getAllBlogPosts } from '@/lib/database';
import Image from "next/image";

export default async function BlogPage() {
    const blogPosts = await getAllBlogPosts();

    return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                My <span className="text-gradient">Blog</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Thoughts, tutorials, and insights about web development, technology, and my journey as a developer.
              </p>
            </div>

            {/* Blog Posts Grid */}
            {blogPosts?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts?.map((post: any) => (
                  <article key={post.id} className="card hover:shadow-xl transition-shadow duration-300">
                    {/* Featured Image */}
                    {post.featured_image && (
                      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          sizes="(max-width: 768px) 100vw, 896px"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {post.created_at ? format(new Date(post.created_at), 'MMM dd, yyyy') : 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>5 min read</span>
                          </div>
                        </div>
                      </div>

                      {/* Read More Link */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No blog posts yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Check back soon for new articles!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 