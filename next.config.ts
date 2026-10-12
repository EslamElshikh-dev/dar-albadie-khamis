import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  redirects() {
    return [
      {
        source: "/services/detox-cupping-muhayil",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

