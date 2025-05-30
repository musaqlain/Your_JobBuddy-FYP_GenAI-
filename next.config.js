/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/tech-interview/:path*",
        destination: "http://localhost:5173/tech-interview/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
