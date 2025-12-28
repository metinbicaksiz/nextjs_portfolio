'use client';

import { useState, useEffect } from 'react';
// Removed direct database import - using API routes instead
import {
    Plus,
    Edit,
    Trash2,
    Star,
    GitBranch,
    ExternalLink,
    Calendar,
    Code, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Repository {
  id: number;
  title: string;
  description: string;
  github_url: string;
  demo_url?: string;
  thumbnail?: string;
  technologies: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/yonet/repos');
        if (response.ok) {
          const repositories = await response.json();
          setRepos(repositories);
        } else {
          console.error('Failed to fetch repositories:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeleteLoading(id);

    try {
      const response = await fetch(`/api/yonet/repos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Repository deleted successfully!');
        // Remove the deleted repo from the list
        setRepos(repos.filter(repo => repo.id !== id));
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to delete repository');
      }
    } catch (error) {
      console.error('Error deleting repository:', error);
      toast.error('Failed to delete repository. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Link
                    href="/yonet"
                    className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>
            </div>
        </div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Repositories</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your project repositories</p>
        </div>
        <Link
          href="/yonet/repos/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Repository
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Code className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Repos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {repos.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Featured
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {repos.filter(repo => repo.featured).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-8 w-8 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Stars
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {repos.length > 0 ? 'N/A' : '0'}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GitBranch className="h-8 w-8 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Languages
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {new Set(repos.map(repo => repo.technologies)).size}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
            Your Repositories
          </h3>
          
          {repos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Code className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">No repositories</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Get started by adding your first repository.
              </p>
              <Link
                href="/yonet/repos/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Repository
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <div key={repo.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <GitBranch className="h-5 w-5 text-gray-400 mr-2" />
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {repo.title}
                      </h4>
                    </div>
                    {repo.featured && (
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {repo.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      {repo.technologies}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      N/A
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(repo.created_at).toLocaleDateString()}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <a
                        href={repo.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <Link
                        href={`/yonet/repos/edit/${repo.id}`}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                        title="Edit repository"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                        onClick={() => handleDelete(repo.id, repo.title)}
                        disabled={deleteLoading === repo.id}
                        title="Delete repository"
                      >
                        {deleteLoading === repo.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}