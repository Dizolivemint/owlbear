/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './supabase-image-loader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://cdn.stablediffusionapi.com',
        port: '',
        pathname: '/generations/**',
      },
      {
        protocol: 'https',
        hostname: 'https://cdn.stablediffusionapi.com',
        port: '',
        pathname: '/generations/**',
      },
      {
        protocol: 'https',
        hostname: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev',
        port: '',
        pathname: '/generations/**',
      }
    ],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig