import type { NextConfig } from "next";
import { legacyBlogStoryRedirects } from "./src/lib/blog";

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(legacyBlogStoryRedirects).map(([slug, destination]) => ({
      source: `/blog/${slug}`,
      destination,
      permanent: true,
    }));
  },
  experimental: {
    viewTransition: true,
  },
  images: {
    qualities: [75, 80, 85, 90, 92, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
