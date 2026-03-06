/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["axios", "lucide-react"],
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [32, 48, 64, 96, 128, 256, 384],
        qualities: [75],
    },
};
module.exports = nextConfig;
