import { getAllBlogPosts, getAllRepositories, getAllContacts } from '@/lib/database';
import { 
  FileText, 
  Code, 
  Eye, 
  Plus,
  TrendingUp,
  Users,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

// Ensure this page is always rendered dynamically
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function AdminDashboard() {
  const blogPosts = await getAllBlogPosts();
  const repositories = await getAllRepositories();
  const contacts = await getAllContacts();

  const stats = [
    {
      title: 'Total Blog Posts',
      value: blogPosts.length,
      icon: FileText,
      color: 'bg-blue-500',
      href: '/admin/blog'
    },
    {
      title: 'Total Repositories',
      value: repositories.length,
      icon: Code,
      color: 'bg-green-500',
      href: '/admin/repos'
    },
      {
          title: 'Messages',
          value: contacts.length,
          icon: FileText,
          color: 'bg-blue-500',
          href: '/admin/messages'
      },
    {
      title: 'Published Posts',
      value: blogPosts.filter(post => post.published).length,
      icon: Eye,
      color: 'bg-purple-500',
      href: '/admin/blog'
    },
    {
      title: 'Featured Repos',
      value: repositories.filter(repo => repo.featured).length,
      icon: TrendingUp,
      color: 'bg-orange-500',
      href: '/admin/repos'
    }
  ];

  const quickActions = [
    {
      title: 'Create Blog Post',
      description: 'Add a new blog post to your portfolio',
      icon: Plus,
      href: '/admin/blog/new',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Add Repository',
      description: 'Add a new project to showcase',
      icon: Code,
      href: '/admin/repos/new',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  return (
    <main className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Welcome to your admin panel. Here's an overview of your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              href={stat.href}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                href={action.href}
                className="card hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center transition-colors duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Blog Posts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Blog Posts
            </h3>
            <Link
              href="/admin/blog"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>
          
          {blogPosts.slice(0, 5).length > 0 ? (
            <div className="space-y-3">
              {blogPosts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.published 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No blog posts yet
            </p>
          )}
        </div>

        {/* Recent Repositories */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Repositories
            </h3>
            <Link
              href="/admin/repos"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>
          
          {repositories.slice(0, 5).length > 0 ? (
            <div className="space-y-3">
              {repositories.slice(0, 5).map((repo) => (
                <div key={repo.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {repo.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {repo.created_at ? new Date(repo.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  {repo.featured && (
                    <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No repositories yet
            </p>
          )}
        </div>
      </div>
    </main>
  );
} 