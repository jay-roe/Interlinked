/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  images: {
    domains: [
      'storage.googleapis.com',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'www.gravatar.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `firebasestorage.googleapis.com/**/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/**`,
      },
    ],
  },
};

module.exports = nextConfig;
