/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/tech-interview/:path*", // Requesting /tech-interview/*
        destination: "http://localhost:5173/tech-interview/:path*", // Proxying to Vite's /tech-interview/*
      },
    ];
  },
};

module.exports = nextConfig;
