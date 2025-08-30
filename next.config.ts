import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Add webpack configuration to handle React 19 compatibility
  webpack: (config, { isServer }) => {
    // Add alias for React to ensure compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
    };
    
    return config;
  },
  // Configure Turbopack for better performance
  turbopack: {
    // Set the root directory to avoid warnings
    root: process.cwd(),
  },
};

export default nextConfig;