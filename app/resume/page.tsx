import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Download } from 'lucide-react';
import {unshiftLoader} from "next/dist/build/webpack/config/helpers";

const experiences = [
  {
    title: 'Computer Studies Teacher',
    company: 'Gobind Sarvar Surrey',
    period: 'Feb 2025 - Present',
    description:
        <ul>
          <li>Teaching ADST to students from grade 6 to 11</li>
          <li>Teaching Career Studies to grade 9 students</li>
          <li>Teaching Digital literacy and visual programming to grade 6 and 7</li>
          <li>Teaching Digital literacy and basic Web development to grade 8</li>
          <li>Teaching Computer studies classes to grade 10 and grade 11 according to BC curriculum along with teaching them basic level of C language, data types, algorithms and Python.</li>
        </ul>,
    technologies: ['Python', 'C', 'Scratch']
  },
  {
    title: 'Full Stack Developer',
    company: 'Freelance',
    period: 'Feb 2022 - Present',
    description:
        <ul>
          <li>Implementing event-driven applications, using React library, and building reusable code for future use;</li>
          <li>Ensuring the best possible performance, quality, and responsiveness of the application;</li>
          <li>Getting the comprehended understanding of asynchronous single-threaded JavaScript environment and DOM events;</li>
          <li>Following and improving code quality standards performing team-mate code reviews, identifying areas of improvement in the codebase;</li>
          <li>Reviewing design documents and providing the solution;</li>
          <li>Making architectural decisions for converting prototypes into products;</li>
          <li>Staying up to date with new technology trends, applications, and protocols;</li>
          <li>Delivering results within the discussed deadlines.</li>
        </ul>,
    technologies: ['JavaScript', 'Python', 'PostgreSQL', 'MySQL', 'React', 'Next.js', 'Spring Boot', 'Microservices', 'MongoDB'],
  },
  {
    title: 'Website & Communication Manager',
    company: 'Dafne Kids Style',
    period: '2020 - 2022',
    description:
        <ul>
          <li>Maintaining and managing the website;</li>
          <li>Creating and updating the website content to ensure it is in harmony with the company's overall objectives;</li>
          <li>Ensuring a high customer satisfaction rate via communicating with customers and clients via email and phone.</li>
        </ul>,
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'WordPress','PHP', 'MySQL']
  },
  {
    title: 'Web Administrator',
    company: 'ISTESOL',
    period: '2015 - 2020',
    description:
        <ul>
          <li>Designing, developing, maintaining, and troubleshooting the website;</li>
          <li>Ensuring a safe and eﬃcient user experience, implementing security protocols, modifying programs, creating backups, resolving software problems;</li>
          <li>Managing and taking care of the maintenance of the website.</li>
          <li>Installing, updating and maintaining the LMS of the school.</li>
        </ul>,
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress','PHP', 'MySQL']
  }
];

export default function ResumePage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  My <span className="text-gradient">Resume</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Professional experience and achievements
                </p>
              </div>
              
              {/* Download Button */}
              <a
                href="/resume.pdf"
                download
                className="btn-primary flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download RESUME</span>
              </a>
            </div>

            {/* Experience Timeline */}
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <div key={index} className="card relative">
                  {/* Timeline connector */}
                  {index < experiences.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-8 bg-gray-300 dark:bg-gray-600"></div>
                  )}
                  
                  <div className="flex items-start space-x-6">
                    {/* Timeline dot */}
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {index + 1}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {experience.title}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                          {experience.period}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3">
                        {experience.company}
                      </h4>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {experience.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Education
              </h2>
              
              <div className="card mt-2">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    🎓
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Masters of Computer Engineering
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                        2021 - 2024
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">
                      Istanbul Kultur University
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300">
                     Focused on software engineering, algorithms, distributed systems, and information security.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card mt-2">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    🎓
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Bachelor in English Language Teaching
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                        2001 - 2005
                      </span>
                    </div>

                    <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">
                      Eskisehir Anadolu University
                    </h4>

                    <p className="text-gray-600 dark:text-gray-300">
                     Language acquisition, linguistics, TEFL standards
                    </p>
                  </div>
                </div>
              </div>
              <div className="card mt-2">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    🎓
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Web Deelopment BootCamp
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                        2022 - 2023
                      </span>
                    </div>

                    <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">
                      Mate Academy
                    </h4>

                    <p className="text-gray-600 dark:text-gray-300">
                      Focused on Front end technologies such as javascript, typescript, React
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Summary */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Skills Summary
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Technical Skills
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Full Stack Web Development</li>
                    <li>• React, Next.js, Node.js</li>
                    <li>• Python, JavaScript, TypeScript, Spring Boot</li>
                    <li>• MySQL, MongoDB, PostgreSQL</li>
                    <li>• Docker, AWS, CI/CD</li>
                    <li>• Git, Agile Methodologies</li>
                  </ul>
                </div>
                
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Soft Skills
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Team Leadership & Mentoring</li>
                    <li>• Problem Solving & Critical Thinking</li>
                    <li>• Communication & Collaboration</li>
                    <li>• Project Management</li>
                    <li>• Continuous Learning</li>
                    <li>• Attention to Detail</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 