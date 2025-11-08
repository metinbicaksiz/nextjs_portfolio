'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
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

export default function EditRepository() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github_url: '',
    demo_url: '',
    thumbnail: '',
    technologies: '',
    featured: false
  });

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await fetch(`/api/yonet/repos/${params.id}`);
        if (response.ok) {
          const repo: Repository = await response.json();
          
          setFormData({
            title: repo.title,
            description: repo.description,
            github_url: repo.github_url,
            demo_url: repo.demo_url || '',
            thumbnail: repo.thumbnail || '',
            technologies: repo.technologies,
            featured: repo.featured
          });
        } else if (response.status === 404) {
          toast.error('Repository not found');
          router.push('/yonet/repos');
        } else {
          toast.error('Failed to fetch repository');
          router.push('/yonet/repos');
        }
      } catch (error) {
        console.error('Error fetching repository:', error);
        toast.error('Failed to fetch repository');
        router.push('/yonet/repos');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRepo();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.github_url) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/yonet/repos/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Repository updated successfully!');
        router.push('/yonet/repos');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update repository');
      }
    } catch (error) {
      console.error('Error updating repository:', error);
      toast.error('Failed to update repository. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
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
            href="/yonet/repos"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Repositories
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Repository</h1>
        <p className="text-gray-600 dark:text-gray-400">Update your project repository</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Repository Name *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter repository name"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description *
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                required
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Brief description of the project"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label htmlFor="github_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GitHub URL *
              </label>
              <input
                type="url"
                name="github_url"
                id="github_url"
                required
                value={formData.github_url}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://github.com/username/repository"
              />
            </div>

            {/* Demo URL */}
            <div>
              <label htmlFor="demo_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Demo URL
              </label>
              <input
                type="url"
                name="demo_url"
                id="demo_url"
                value={formData.demo_url}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://your-demo.com"
              />
            </div>

            {/* Technologies */}
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Technologies
              </label>
              <input
                type="text"
                name="technologies"
                id="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="React, TypeScript, Node.js"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Comma-separated list of technologies used
              </p>
            </div>

            {/* Thumbnail */}
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                name="thumbnail"
                id="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Feature this repository
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6">
            <div className="flex justify-end space-x-3">
              <Link
                href="/yonet/repos"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Updating...' : 'Update Repository'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
