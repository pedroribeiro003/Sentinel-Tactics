import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pub-ed44b012f9a14c9587020f457a4d597e.r2.dev",
            },
        ],
    },
};

export default nextConfig;
