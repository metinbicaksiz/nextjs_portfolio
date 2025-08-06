# Portfolio Website

A modern, full-stack portfolio website built with Next.js, TailwindCSS, MySQL, and Firebase. Features a clean and minimalist design with multiple pages including Home, Repositories, Blog, Resume, and Contact.

## Features

### 🏠 Home Page
- Hero section with animated developer character
- Engaging text and call-to-action buttons
- Skills section with colorful progress bars
- Smooth animations and transitions

### 📁 Repositories Page
- Project cards with thumbnails and descriptions
- GitHub and demo links for each project
- Technology tags for each repository
- Featured projects highlighting

### 📝 Blog Page
- Blog post listings with excerpts
- Markdown content support
- Featured images and metadata
- SEO optimized

### 📄 Resume Page
- Professional experience timeline
- Education and skills summary
- Downloadable PDF version
- Clean and organized layout

### 📧 Contact Page
- Contact information display
- Contact form with validation
- Social media links
- Responsive design

### 🔐 Admin Dashboard
- Firebase authentication
- Blog post management (CRUD operations)
- Repository management
- Dashboard with statistics
- Responsive admin interface

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: TailwindCSS
- **Database**: MySQL
- **Authentication**: Firebase Auth
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # MySQL Database Configuration
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=portfolio
   DB_PORT=3306
   ```

4. **Set up the database**
   ```bash
   # Connect to your MySQL server
   mysql -u your_username -p
   
   # Run the schema file
   source database/schema.sql
   ```

5. **Set up Firebase**
   - Create a new Firebase project
   - Enable Authentication (Email/Password)
   - Add your Firebase configuration to `.env.local`
   - Create an admin user in Firebase Authentication

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── blog/              # Blog pages
│   ├── repos/             # Repository pages
│   ├── resume/            # Resume page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Navigation.tsx     # Navigation component
│   ├── HeroSection.tsx    # Hero section
│   ├── SkillsSection.tsx  # Skills section
│   └── RepositoryCard.tsx # Repository card
├── lib/                   # Utility libraries
│   ├── firebase.ts        # Firebase configuration
│   └── database.ts        # Database utilities
├── database/              # Database files
│   └── schema.sql         # MySQL schema
├── public/                # Static assets
└── package.json           # Dependencies
```

## Customization

### Personal Information
Update the following files with your information:
- `app/layout.tsx` - Update metadata
- `components/HeroSection.tsx` - Update hero text and social links
- `app/resume/page.tsx` - Update experience and education
- `app/contact/page.tsx` - Update contact information

### Styling
- Colors: Update the color scheme in `tailwind.config.js`
- Fonts: Change fonts in `app/layout.tsx`
- Animations: Modify animations in `app/globals.css`

### Content
- Blog posts: Add/edit posts through the admin dashboard
- Repositories: Add/edit projects through the admin dashboard
- Skills: Update skills in `components/SkillsSection.tsx`

## Admin Dashboard

Access the admin dashboard at `/admin` after setting up Firebase authentication.

### Features:
- **Dashboard**: Overview of blog posts and repositories
- **Blog Management**: Create, edit, delete blog posts
- **Repository Management**: Add, edit, delete projects
- **Authentication**: Secure login with Firebase

### Admin Setup:
1. Create a Firebase project
2. Enable Email/Password authentication
3. Create an admin user in Firebase Console
4. Use those credentials to log into the admin panel

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Database Migration

When deploying to production:
1. Set up a production MySQL database
2. Update environment variables with production database credentials
3. Run the schema file on your production database
4. Import any existing data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/portfolio/issues) page
2. Create a new issue with detailed information
3. Contact me through the contact form on the website

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Firebase](https://firebase.google.com/) for authentication
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for beautiful icons # next-s-portfolio
