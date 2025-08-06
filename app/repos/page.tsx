import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RepositoryCard from '@/components/RepositoryCard';
import { getAllRepositories } from '@/lib/database';

export default async function ReposPage() {
  const repositories = await getAllRepositories();

  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                My <span className="text-gradient">Projects</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Here are some of the projects I've worked on. Each one represents a unique challenge 
                and learning experience in my journey as a developer.
              </p>
            </div>

            {/* Repositories Grid */}
            {repositories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repositories.map((repo) => (
                  <RepositoryCard
                    key={repo.id}
                    title={repo.title}
                    description={repo.description}
                    githubUrl={repo.github_url}
                    demoUrl={repo.demo_url}
                    thumbnail={repo.thumbnail}
                    technologies={repo.technologies.split(',').map(tech => tech.trim())}
                    featured={repo.featured}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No repositories found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Check back soon for new projects!
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