/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/e-commerce-audit-dashboard',
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: '.',
  },
}

export default nextConfig