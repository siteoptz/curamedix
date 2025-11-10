/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-domain.com'], // Add your image domains here
  },
  // Enable static export if you want to deploy as static files
  // output: 'export',
  // trailingSlash: true,
}

module.exports = nextConfig















