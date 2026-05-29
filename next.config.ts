import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  allowedDevOrigins: ['techinterviewai.com', 'www.techinterviewai.com'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
