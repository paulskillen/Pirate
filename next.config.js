/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
    pwa: {
        dest: "public",
        register: true,
        disable: process.env.REACT_APP_ENV === "dev",
        skipWaiting: true,
    },
});
const nextConfig = withPWA({
    reactStrictMode: true,
    env: {
        REACT_APP_ENV: process.env.REACT_APP_ENV,
    },
});
module.exports = nextConfig;
