'use client';

import { motion } from 'framer-motion';
import {ReactElement, useEffect, useState} from 'react';

interface Skill {
  name: string;
  percentage: number;
  color: string;
  icon: ReactElement;
}

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const skills: Skill[] = [
    { name: 'JavaScript', percentage: 95, color: '#F7DF1E', icon: <i className="devicon-javascript-plain colored"></i> },
    { name: 'TypeScript', percentage: 90, color: '#3178C6', icon: <i className="devicon-typescript-plain colored"></i> },
    { name: 'React', percentage: 92, color: '#61DBFB', icon: <i className="devicon-react-plain colored"></i> },
    { name: 'Next.js', percentage: 88, color: '#000000', icon: <i className="devicon-nextjs-plain colored"></i> },
    { name: 'TailwindCSS', percentage: 88, color: '#06B6D4', icon: <i className="devicon-tailwindcss-plain colored"></i> },
    { name: 'Node.js', percentage: 85, color: '#68A063', icon: <i className="devicon-nodejs-plain colored"></i> },
    { name: 'Python', percentage: 80, color: '#ffde57', icon: <i className="devicon-python-plain colored"></i> },
    { name: 'Spring Boot', percentage: 80, color: '#339933', icon: <i className="devicon-spring-plain colored"></i> },
    { name: 'Java', percentage: 60, color: '#f89820', icon: <i className="devicon-java-plain colored"></i> },
    { name: 'C', percentage: 60, color: '#00AEEF', icon: <i className="devicon-c-original colored"></i> },
    { name: 'C#', percentage: 60, color: '#BCDBFE', icon: <i className="devicon-csharp-plain colored"></i> },
    { name: 'MySQL', percentage: 85, color: '#F29111', icon: <i className="devicon-mysql-plain colored"></i>},
    { name: 'MongoDB', percentage: 78, color: '#47A248', icon: <i className="devicon-mongodb-plain colored"></i>},
    { name: 'PostgreSQL', percentage: 78, color: '#336791', icon: <i className="devicon-postgresql-plain colored"></i>},
    { name: 'Docker', percentage: 75, color: '#2496ED', icon: <i className="devicon-docker-plain colored"></i> },
    { name: 'Git', percentage: 90, color: '#F05032', icon: <i className="devicon-git-plain colored"></i>},
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I've worked with a variety of technologies to create amazing digital experiences. 
            Here's what I bring to the table.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {skill.percentage}%
                </span>
              </div>
              
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${skill.percentage}%` } : {}}
                  transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Frontend Development
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Creating responsive and interactive user interfaces with modern frameworks and tools.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Backend Development
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Building robust APIs and server-side applications with scalable architectures.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              DevOps & Deployment
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Managing deployments, CI/CD pipelines, and cloud infrastructure.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection; 