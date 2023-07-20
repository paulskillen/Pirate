// /** @type {import('next').NextConfig} */

// const withPWA = require("next-pwa")({
//     dest: "public",
//     register: true,
//     disable: process.env.REACT_APP_ENV === "dev",
//     skipWaiting: true,
// });
// const nextConfig = withPWA({
//     reactStrictMode: true,
//     env: {
//         REACT_APP_ENV: process.env.REACT_APP_ENV,
//     },
// });
// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        REACT_APP_ENV: process.env.REACT_APP_ENV,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

module.exports = nextConfig;
