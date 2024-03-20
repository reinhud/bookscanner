/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/signin/intro',
                permanent: true
            }
        ];
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'sass')]
    },
    images: {
        unoptimized: true,
        //domains: ['books.google.com'], // Add books.google.com to allow images from this domain
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'http',
                hostname: 'books.google.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
              },
        ]
    }
};

module.exports = nextConfig;
