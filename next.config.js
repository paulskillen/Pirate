/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        REACT_APP_ENV: process.env.REACT_APP_ENV,
    },
};

module.exports = nextConfig;

const withPWA = require("next-pwa");
module.exports = withPWA({
    pwa: {
        dest: "public",
        register: true,
        disable: process.env.REACT_APP_ENV === "dev",
        skipWaiting: true,
    },
});
