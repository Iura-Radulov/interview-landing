import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allows building into a scratch directory (NEXT_DIST_DIR=.next_build) so a
  // production `next start` can keep serving the live build while a new one is
  // compiled. Without this, a rebuild requires stopping the service, and on a
  // memory-constrained box a long build means a long outage.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  serverExternalPackages: ['better-sqlite3'],
  allowedDevOrigins: ['techinterviewai.com', 'www.techinterviewai.com'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
