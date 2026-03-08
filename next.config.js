/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        qualities: [75, 100],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
}

module.exports = nextConfig
