/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'metin.bicaksiz.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Exclude undici from being processed by webpack
    config.module.rules.push({
      test: /node_modules\/undici/,
      use: 'null-loader',
    });
    
    return config;
  },
  transpilePackages: ['firebase'],
  experimental: {
    serverComponentsExternalPackages: ['undici'],
  },
}

module.exports = nextConfig 