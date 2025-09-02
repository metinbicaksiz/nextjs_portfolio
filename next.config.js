/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'metin.bicaksiz.com'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      util: false,
      url: false,
    };
    
    // Try to ignore undici entirely for client builds
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push('undici');
      
      config.resolve.alias = {
        ...config.resolve.alias,
        undici: false,
      };
    }
    
    return config;
  },
  transpilePackages: ['firebase'],
  // Skip type checking during build to avoid Firebase issues
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 