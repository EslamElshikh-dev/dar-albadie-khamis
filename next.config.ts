import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  redirects() {
    return [
      {
        source: "/services/detox-cupping-khamis-mushait",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
