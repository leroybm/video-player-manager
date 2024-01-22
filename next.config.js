/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
  },
  output: "standalone",
}

module.exports = nextConfig
