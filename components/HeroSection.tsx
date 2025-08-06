'use client';

import { motion } from 'framer-motion';
import {ArrowDown, Github, Laptop, Linkedin, Twitter} from 'lucide-react';
import Link from "next/link";

const HeroSection = () => {
  const scrollToSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Animated Developer Character */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Animated Developer Character */}
              <div className="w-80 h-80 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center animate-float">
                <div className="w-64 h-64 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-6xl">👨‍💻</span>
                    </div>
                    <div className="space-y-2">
                      <div className="w-32 h-2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                      <div className="w-24 h-2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                      <div className="w-28 h-2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                <span className="text-sm">⚡</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center"
              >
                <span className="text-sm">🚀</span>
              </motion.div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -right-8 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center"
              >
                <span className="text-xs"><Laptop /></span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Engaging Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-gradient">Full Stack</span>
              <br />
              <span className="text-gray-800 dark:text-white">Software</span>
              <br />
              <span className="text-gradient">Developer</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Crafting digital experiences with modern technologies. 
              Passionate about creating scalable, user-friendly applications 
              that make a difference.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <button className="btn-primary text-lg px-8 py-3">
                <Link href="/repos">View My Work</Link>
              </button>
              <button 
                onClick={scrollToSkills}
                className="btn-secondary text-lg px-8 py-3 flex items-center justify-center gap-2"
              >
                <ArrowDown className="w-5 h-5" />
                See Skills
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center lg:justify-start space-x-6"
            >
              <a
                href="https://github.com/metinbicaksiz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/dkmb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 