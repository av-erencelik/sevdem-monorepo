/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mysql12"],
    serverActions: true,
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  transpilePackages: ["ui", "tailwindconfig"],
};

module.exports = nextConfig;
