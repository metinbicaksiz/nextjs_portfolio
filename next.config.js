/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack
  turbopack: {
    // Add any Turbopack-specific configurations here
  },
  experimental: {
    // Keep webpack for now for compatibility
    webpackBuildWorker: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'metin.bicaksiz.com',
      }
    ],
  },
  
  // Webpack configuration (kept for compatibility)
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
    
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push('undici');
      
      config.resolve.alias = {
        ...config.resolve.alias,
        undici: false,
      };
    }
    
    config.module.rules.push({
      test: /node_modules[\\/]undici[\\/].*\.js$/,
      loader: 'null-loader',
    });
    
    return config;
  },
  
  transpilePackages: ['firebase', '@firebase/auth', '@firebase/firestore'],
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Handle deprecated middleware warning
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-middleware-request-marker',
            value: 'true',
          },
        ],
      },
    ];
  },
};

// Conditionally apply Turbopack configuration
if (process.env.TURBOPACK) {
  delete nextConfig.webpack;
}

module.exports = nextConfig;