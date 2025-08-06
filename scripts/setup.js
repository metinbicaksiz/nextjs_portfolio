#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Portfolio Website...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Node.js version 18 or higher is required');
  console.error(`Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log('✅ Node.js version check passed');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this script from the project root directory.');
  process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Create .env.local if it doesn't exist
const envPath = '.env.local';
if (!fs.existsSync(envPath)) {
  console.log('\n📝 Creating .env.local file...');
  const envExample = fs.readFileSync('env.example', 'utf8');
  fs.writeFileSync(envPath, envExample);
  console.log('✅ .env.local file created');
  console.log('⚠️  Please update .env.local with your configuration');
} else {
  console.log('✅ .env.local file already exists');
}

// Create public directory if it doesn't exist
const publicDir = 'public';
if (!fs.existsSync(publicDir)) {
  console.log('\n📁 Creating public directory...');
  fs.mkdirSync(publicDir);
  console.log('✅ Public directory created');
}

// Create a sample resume.pdf placeholder
const resumePath = path.join(publicDir, 'resume.pdf');
if (!fs.existsSync(resumePath)) {
  console.log('\n📄 Creating placeholder resume.pdf...');
  // Create a simple text file as placeholder
  fs.writeFileSync(resumePath, 'Resume PDF placeholder. Replace with your actual resume.');
  console.log('✅ Placeholder resume.pdf created');
  console.log('⚠️  Please replace public/resume.pdf with your actual resume');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Update .env.local with your Firebase and MySQL configuration');
console.log('2. Set up your MySQL database using database/schema.sql');
console.log('3. Create a Firebase project and enable authentication');
console.log('4. Run "npm run dev" to start the development server');
console.log('\n📚 For detailed instructions, see README.md'); 