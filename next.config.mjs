import NextBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias['@mui/material'] = '@mui/joy'
        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.dystopia.vkwok.dev',
                port: ''
            },
        ],
    },
};

export default withBundleAnalyzer(nextConfig);
