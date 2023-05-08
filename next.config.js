/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './supabase-image-loader.js',
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig