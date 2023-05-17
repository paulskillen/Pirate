/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        REACT_APP_ENV: process.env.REACT_APP_ENV,
    },
};

module.exports = nextConfig;
