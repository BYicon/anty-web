/** @type {import('next').NextConfig} */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: `${API_BASE_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
