-- Portfolio Database Schema for PostgreSQL

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    featured_image VARCHAR(500),
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts (created_at);

-- Repositories table
CREATE TABLE IF NOT EXISTS repositories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    github_url VARCHAR(500) NOT NULL,
    demo_url VARCHAR(500),
    thumbnail VARCHAR(500),
    technologies TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_repositories_featured ON repositories (featured);
CREATE INDEX IF NOT EXISTS idx_repositories_created_at ON repositories (created_at);

-- Insert sample data for blog posts
-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at);

-- Create trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER IF NOT EXISTS update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_repositories_updated_at BEFORE UPDATE ON repositories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for blog posts
INSERT INTO blog_posts (title, content, excerpt, slug, published) VALUES
(
    'Getting Started with Next.js 14',
    '# Getting Started with Next.js 14\n\nNext.js 14 is the latest version of the React framework that provides an excellent developer experience with features like:\n\n- App Router\n- Server Components\n- Improved performance\n- Better TypeScript support\n\n## Installation\n\n```bash\nnpx create-next-app@latest my-app\ncd my-app\nnpm run dev\n```\n\n## Key Features\n\n1. **App Router**: The new file-system based router\n2. **Server Components**: Components that run on the server\n3. **Streaming**: Progressive rendering of pages\n4. **Turbopack**: Faster bundler for development\n\nThis is just the beginning of what Next.js 14 has to offer. Stay tuned for more tutorials!',
    'Learn how to get started with Next.js 14 and explore its new features including the App Router and Server Components.',
    'getting-started-with-nextjs-14',
    true
),
(
    'Building a Portfolio with TailwindCSS',
    '# Building a Portfolio with TailwindCSS\n\nTailwindCSS is a utility-first CSS framework that makes building modern websites a breeze. In this post, we will explore how to create a beautiful portfolio website using TailwindCSS.\n\n## Why TailwindCSS?\n\n- Rapid development\n- Consistent design system\n- Highly customizable\n- Small bundle size\n\n## Getting Started\n\n```bash\nnpm install -D tailwindcss\nnpx tailwindcss init\n```\n\n## Key Concepts\n\n1. **Utility Classes**: Pre-built classes for common styles\n2. **Responsive Design**: Built-in responsive utilities\n3. **Dark Mode**: Easy dark mode implementation\n4. **Customization**: Extend with your own design tokens\n\nTailwindCSS has revolutionized how we approach CSS and has become an essential tool in modern web development.',
    'Discover how to create stunning portfolio websites using TailwindCSS utility-first approach.',
    'building-portfolio-with-tailwindcss',
    true
),
(
    'The Future of Full Stack Development',
    '# The Future of Full Stack Development\n\nFull stack development is evolving rapidly with new technologies and paradigms emerging every day. Let us explore what the future holds for developers.\n\n## Emerging Trends\n\n- **Edge Computing**: Bringing computation closer to users\n- **AI Integration**: Machine learning in web applications\n- **WebAssembly**: High-performance web applications\n- **Micro Frontends**: Scalable frontend architectures\n\n## Skills for the Future\n\n1. **Cloud Native**: Understanding cloud platforms\n2. **DevOps**: CI/CD and infrastructure as code\n3. **Security**: Web security best practices\n4. **Performance**: Optimization and monitoring\n\n## Conclusion\n\nThe future of full stack development is exciting and full of opportunities. Continuous learning and adaptation are key to staying relevant in this ever-evolving field.',
    'Explore the emerging trends and skills needed for the future of full stack development.',
    'future-of-full-stack-development',
    true
);

-- Insert sample data for repositories
INSERT INTO repositories (title, description, github_url, demo_url, technologies, featured) VALUES
(
    'Portfolio Website',
    'A modern, responsive portfolio website built with Next.js and TailwindCSS. Features include blog management, project showcase, and admin dashboard.',
    'https://github.com/yourusername/portfolio-website',
    'https://your-portfolio.com',
    'Next.js,React,TypeScript,TailwindCSS,MySQL,Firebase',
    true
),
(
    'E-commerce Platform',
    'A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration.',
    'https://github.com/yourusername/ecommerce-platform',
    'https://your-ecommerce.com',
    'React,Node.js,Express,MongoDB,Stripe',
    true
),
(
    'Task Management App',
    'A collaborative task management application with real-time updates, team collaboration, and progress tracking.',
    'https://github.com/yourusername/task-manager',
    'https://your-task-manager.com',
    'React,Firebase,TypeScript,TailwindCSS',
    false
),
(
    'Weather Dashboard',
    'A weather dashboard that displays current weather conditions and forecasts using multiple weather APIs.',
    'https://github.com/yourusername/weather-dashboard',
    'https://your-weather-app.com',
    'React,OpenWeather API,Chart.js,CSS3',
    false
),
(
    'Blog CMS',
    'A content management system for blogs with markdown support, image uploads, and SEO optimization.',
    'https://github.com/yourusername/blog-cms',
    'https://your-blog-cms.com',
    'Next.js,Prisma,PostgreSQL,NextAuth',
    false
),
(
    'Social Media Clone',
    'A social media platform clone with features like posts, comments, likes, and user profiles.',
    'https://github.com/yourusername/social-media-clone',
    'https://your-social-app.com',
    'React,Node.js,Express,MongoDB,Socket.io',
    false
); 